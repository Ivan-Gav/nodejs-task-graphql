// import type { MemberType, Post, Profile, User } from '@prisma/client';
import { TContext, Post, Profile, ProfileMemberType, User } from '../types/types.js';

export const queryResolvers = {
  resolveMemberTypes: async (_parent: unknown, _args: unknown, { prisma }: TContext) =>
    prisma.memberType.findMany(),

  resolveTypeMemberById: async (
    _parent: unknown,
    { id }: ProfileMemberType,
    { prisma }: TContext,
  ) => prisma.memberType.findUnique({ where: { id } }),

  resolvePosts: async (_parent: unknown, _args: unknown, { prisma }: TContext) =>
    prisma.post.findMany(),

  resolvePostById: async (_parent: unknown, { id }: Post, { prisma }: TContext) =>
    prisma.post.findUnique({ where: { id } }),

  resolveUsers: async (_parent: unknown, _args: unknown, { prisma }: TContext) =>
    prisma.user.findMany(),

  resolveUserById: async (_parent: unknown, { id }: User, { prisma }: TContext) =>
    prisma.user.findUnique({ where: { id } }),

  resolveProfiles: async (_parent: unknown, _args: unknown, { prisma }: TContext) =>
    prisma.profile.findMany(),

  resolveProfileById: async (_parent: unknown, { id }: User, { prisma }: TContext) =>
    prisma.profile.findUnique({ where: { id } }),

  resolveProfileByUserId: ({ id }: User, _args: unknown, { prisma }: TContext) => {
    return prisma.profile.findUnique({ where: { userId: id } });
  },

  resolvePostsByUserId: ({ id }: User, _args: unknown, { prisma }: TContext) => {
    return prisma.post.findMany({ where: { authorId: id } });
  },

  resolveSubscribedToByUserId: ({ id }: User, _args: unknown, { prisma }: TContext) =>
    prisma.subscribersOnAuthors
      .findMany({
        where: { subscriberId: id },
        include: { author: true },
      })
      .then((subs) => subs.map((sub) => sub.author)),

  resolveSubscribedToUserByUserId: ({ id }: User, _args: unknown, { prisma }: TContext) =>
    prisma.subscribersOnAuthors
      .findMany({
        where: { authorId: id },
        include: { subscriber: true },
      })
      .then((subs) => subs.map((sub) => sub.subscriber)),

  resolveMemberTypeByProfileId: (
    parent: Profile,
    _args: unknown,
    { prisma }: TContext,
  ) => {
    return prisma.memberType.findUnique({ where: { id: parent.memberTypeId } });
  },
};
