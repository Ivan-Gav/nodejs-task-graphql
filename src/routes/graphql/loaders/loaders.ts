import DataLoader from 'dataloader';
import { PrismaClient } from '@prisma/client';
import { TPost, TProfile, TProfileMemberType, TUser } from '../types/types.js';
import { groupBy } from './utils.js';

export const createLoaders = (prisma: PrismaClient) => ({
  postsByAuthorId: new DataLoader<string, TPost[]>(
    async (authorIds: readonly string[]) => {
      const posts = await prisma.post.findMany({
        where: { authorId: { in: authorIds as string[] } },
      });

      const grouped = groupBy(posts, (post) => post.authorId);

      return authorIds.map((id) => grouped[id] ?? []);
    },
  ),

  profileByUserId: new DataLoader<string, TProfile | null>(
    async (userIds: readonly string[]) => {
      const profiles = await prisma.profile.findMany({
        where: { userId: { in: userIds as string[] } },
      });

      const map = Object.fromEntries(profiles.map((p) => [p.userId, p]));

      return userIds.map((id) => map[id] ?? null);
    },
  ),

  userSubscribedTo: new DataLoader<string, TUser[]>(
    async (userIds: readonly string[]) => {
      const subs = await prisma.subscribersOnAuthors.findMany({
        where: { subscriberId: { in: userIds as string[] } },
        include: { author: true },
      });

      const grouped = groupBy(subs, (s) => s.subscriberId);

      return userIds.map((id) => grouped[id]?.map((s) => s.author) ?? []);
    },
  ),

  subscribedToUser: new DataLoader<string, TUser[]>(
    async (userIds: readonly string[]) => {
      const subs = await prisma.subscribersOnAuthors.findMany({
        where: { authorId: { in: userIds as string[] } },
        include: { subscriber: true },
      });

      const grouped = groupBy(subs, (s) => s.authorId);

      return userIds.map((id) => grouped[id]?.map((s) => s.subscriber) ?? []);
    },
  ),

  memberTypeById: new DataLoader<string, TProfileMemberType | null>(
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
