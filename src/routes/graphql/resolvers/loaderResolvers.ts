import { parseResolveInfo } from 'graphql-parse-resolve-info';
import { GraphQLResolveInfo } from 'graphql';
import { Prisma, Profile, SubscribersOnAuthors, User } from '@prisma/client';

import { TContext } from '../types/types.js';

export const loaderResolvers = {
  resolvePostsWithLoader: async ({ id }: User, _args: unknown, { loaders }: TContext) =>
    loaders.postsByAuthorId.load(id),

  resolveProfileWithLoader: async ({ id }: User, _args: unknown, { loaders }: TContext) =>
    loaders.profileByUserId.load(id),

  resolveMemberTypeWithLoader: async (
    { memberTypeId }: Profile,
    _args: unknown,
    { loaders }: TContext,
  ) => (memberTypeId ? loaders.memberTypeById.load(memberTypeId) : null),

  resolveSubscribedToWithLoader: ({ id }: User, _args: unknown, { loaders }: TContext) =>
    loaders.userSubscribedTo.load(id),

  resolveSubscribedToUserWithLoader: (
    { id }: User,
    _args: unknown,
    { loaders }: TContext,
  ) => loaders.subscribedToUser.load(id),

  resolveUsersLikeABoss: async (
    _parent: unknown,
    _args: unknown,
    { prisma, loaders }: TContext,
    info: GraphQLResolveInfo,
  ) => {
    const parsedInfo = parseResolveInfo(info);

    const fields = parsedInfo?.fieldsByTypeName?.User || {};
    const include: Prisma.UserFindManyArgs['include'] = {};

    if ('userSubscribedTo' in fields) {
      include.userSubscribedTo = true;
    }

    if ('subscribedToUser' in fields) {
      include.subscribedToUser = true;
    }

    const users = await prisma.user.findMany({ include });

    users.forEach((user) => {
      if (user.userSubscribedTo) {
        const authors = (
          user.userSubscribedTo as Array<SubscribersOnAuthors & { author: User }>
        ).map((s) => s.author);
        loaders.userSubscribedTo.prime(user.id, authors);
      }

      if (user.subscribedToUser) {
        const subscribers = (
          user.subscribedToUser as Array<SubscribersOnAuthors & { subscriber: User }>
        ).map((s) => s.subscriber);
        loaders.subscribedToUser.prime(user.id, subscribers);
      }
    });

    return users;
  },
};
