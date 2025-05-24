import { PrismaClient } from '@prisma/client';

export const getResolvers = (prisma: PrismaClient) => ({
  resolveMemberTypes: async () => prisma.memberType.findMany(),

  resolveTypeMemberById: async (id: string) =>
    prisma.memberType.findUnique({
      where: {
        id,
      },
    }),

  resolvePosts: async () => prisma.post.findMany(),

  resolvePostById: async (id: string) =>
    prisma.post.findUnique({
      where: {
        id,
      },
    }),

  resolveUsers: async () => prisma.user.findMany(),

  resolveUserById: async (id: string) =>
    prisma.user.findUnique({
      where: {
        id,
      },
    }),

  resolveProfiles: async () => prisma.profile.findMany(),
  resolveProfileById: async (id: string) =>
    prisma.profile.findUnique({
      where: {
        id,
      },
    }),
});
