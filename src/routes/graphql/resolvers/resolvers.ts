import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library.js';

export const getResolvers = (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
) => ({
  resolveMemberTypes: async () => prisma.memberType.findMany(),
  resolveTypeMemberById: async (id: string) =>
    prisma.memberType.findUnique({
      where: {
        id,
      },
    }),

  resolvePosts: async () => prisma.post.findMany(),
  resolvePostById: async () => {},

  resolveUsers: async () => prisma.user.findMany(),
  resolveUserById: async () => {},

  resolveProfiles: async () => prisma.profile.findMany(),
  resolveProfileById: async () => {},
});
