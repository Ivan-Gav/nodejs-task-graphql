import type { MemberType, Post, PrismaClient, Profile, User } from '@prisma/client';

interface Context {
  prisma: PrismaClient;
}

export const resolvers = {
  resolveMemberTypes: async (_parent: unknown, _args: unknown, { prisma }: Context) =>
    prisma.memberType.findMany(),

  resolveTypeMemberById: async (
    _parent: unknown,
    { id }: MemberType,
    { prisma }: Context,
  ) => prisma.memberType.findUnique({ where: { id } }),

  resolvePosts: async (_parent: unknown, _args: unknown, { prisma }: Context) =>
    prisma.post.findMany(),

  resolvePostById: async (_parent: unknown, { id }: Post, { prisma }: Context) =>
    prisma.post.findUnique({ where: { id } }),

  resolveUsers: async (_parent: unknown, _args: unknown, { prisma }: Context) =>
    prisma.user.findMany(),

  resolveUserById: async (_parent: unknown, { id }: User, { prisma }: Context) =>
    prisma.user.findUnique({ where: { id } }),

  resolveProfiles: async (_parent: unknown, _args: unknown, { prisma }: Context) =>
    prisma.profile.findMany(),

  resolveProfileById: async (_parent: unknown, { id }: User, { prisma }: Context) =>
    prisma.profile.findUnique({ where: { id } }),

  resolveProfileByUserId: ({ id }: User, _args: unknown, { prisma }: Context) => {
    return prisma.profile.findUnique({ where: { userId: id } });
  },

  resolvePostsByUserId: ({ id }: User, _args: unknown, { prisma }: Context) => {
    return prisma.post.findMany({ where: { authorId: id } });
  },

  resolveSubscribedToByUserId: ({ id }: User, _args: unknown, { prisma }: Context) =>
    prisma.subscribersOnAuthors
      .findMany({
        where: { subscriberId: id },
        include: { author: true },
      })
      .then((subs) => subs.map((sub) => sub.author)),

  resolveSubscribedToUserByUserId: ({ id }: User, _args: unknown, { prisma }: Context) =>
    prisma.subscribersOnAuthors
      .findMany({
        where: { authorId: id },
        include: { subscriber: true },
      })
      .then((subs) => subs.map((sub) => sub.subscriber)),

  resolveMemberTypeByProfileId: (
    parent: Profile,
    _args: unknown,
    { prisma }: Context,
  ) => {
    return prisma.memberType.findUnique({ where: { id: parent.memberTypeId } });
  },
};
