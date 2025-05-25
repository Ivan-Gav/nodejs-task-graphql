import type { PrismaClient } from '@prisma/client';
import { TLoaders } from '../loaders/loaders.js';
import { TProfile, TUser } from '../types/types.js';

export interface Context {
  prisma: PrismaClient;
  loaders: TLoaders;
}

export const loaderResolvers = {
  resolvePostsWithLoader: async ({ id }: TUser, _args: unknown, { loaders }: Context) =>
    loaders.postsByAuthorId.load(id),

  resolveProfileWithLoader: async ({ id }: TUser, _args: unknown, { loaders }: Context) =>
    loaders.profileByUserId.load(id),

  resolveMemberTypeWithLoader: async (
    { memberTypeId }: TProfile,
    _args: unknown,
    { loaders }: Context,
  ) => (memberTypeId ? loaders.memberTypeById.load(memberTypeId) : null),

  resolveSubscribedToWithLoader: ({ id }: TUser, _args: unknown, { loaders }: Context) =>
    loaders.userSubscribedTo.load(id),

  resolveSubscribedToUserWithLoader: (
    { id }: TUser,
    _args: unknown,
    { loaders }: Context,
  ) => loaders.subscribedToUser.load(id),
};
