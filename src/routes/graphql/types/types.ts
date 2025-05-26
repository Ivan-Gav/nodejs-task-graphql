import { Post, PrismaClient, User, Profile, MemberType } from '@prisma/client';
import { TLoaders } from '../loaders/loaders.js';

export type TUserInput = Omit<User, 'id'>;

export type TPostInput = Omit<Post, 'id'>;

export type TProfileInput = Omit<Profile, 'id'>;

export type TDto<T extends object> = Record<'dto', T>;

export type TPostChange = Pick<Post, 'title' | 'content'>;

export type TProfileChange = Omit<Profile, 'id' | 'userId'>;

export type TSubscriptionInput = { userId: string; authorId: string };

export type TContext = {
  prisma: PrismaClient;
  loaders: TLoaders;
};
