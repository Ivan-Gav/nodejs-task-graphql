import DataLoader from 'dataloader';
import { MemberType, Post, PrismaClient, Profile, User } from '@prisma/client';

import { groupBy } from './utils.js';

export const createLoaders = (prisma: PrismaClient) => ({
  postsByAuthorId: new DataLoader<string, Post[]>(
    async (authorIds: readonly string[]) => {
      const posts = await prisma.post.findMany({
        where: { authorId: { in: authorIds as string[] } },
      });

      const grouped = groupBy(posts, (post) => post.authorId);

      return authorIds.map((id) => grouped[id] ?? []);
    },
  ),

  profileByUserId: new DataLoader<string, Profile | null>(
    async (userIds: readonly string[]) => {
      const profiles = await prisma.profile.findMany({
        where: { userId: { in: userIds as string[] } },
      });

      const map = Object.fromEntries(profiles.map((p) => [p.userId, p]));

      return userIds.map((id) => map[id] ?? null);
    },
  ),

  userSubscribedTo: new DataLoader<string, User[]>(async (userIds: readonly string[]) => {
    const subs = await prisma.subscribersOnAuthors.findMany({
      where: { subscriberId: { in: userIds as string[] } },
      include: { author: true },
    });

    const grouped = groupBy(subs, (s) => s.subscriberId);

    return userIds.map((id) => grouped[id]?.map((s) => s.author) ?? []);
  }),

  subscribedToUser: new DataLoader<string, User[]>(async (userIds: readonly string[]) => {
    const subs = await prisma.subscribersOnAuthors.findMany({
      where: { authorId: { in: userIds as string[] } },
      include: { subscriber: true },
    });

    const grouped = groupBy(subs, (s) => s.authorId);

    return userIds.map((id) => grouped[id]?.map((s) => s.subscriber) ?? []);
  }),

  memberTypeById: new DataLoader<string, MemberType | null>(
    async (ids: readonly string[]) => {
      const types = await prisma.memberType.findMany({
        where: { id: { in: ids as string[] } },
      });
      const map = new Map(types.map((t) => [t.id, t]));
      return ids.map((id) => map.get(id) ?? null);
    },
  ),
});

export type TLoaders = ReturnType<typeof createLoaders>;
