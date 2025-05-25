import { PrismaClient } from '@prisma/client';
import { TLoaders } from '../loaders/loaders.js';

export type User = {
  id: string;
  name: string;
  balance: number;
};

// export type UserInput = {
//   name: string;
//   balance: number;
// };
export type UserInput = Omit<User, 'id'>;

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

// export type PostInput = { title: string; content: string; authorId: string };
export type PostInput = Omit<Post, 'id'>;

export type Profile = {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
};

// export type ProfileInput = {
//   isMale: boolean;
//   yearOfBirth: number;
//   memberTypeId: string;
//   userId: string;
// };
export type ProfileInput = Omit<Profile, 'id'>;

export type ProfileMemberType = {
  id: string;
  discount: number;
  postsLimitPerMonth: number;
};

export type TDto<T extends object> = Record<'dto', T>;

export type PostChange = {
  title?: string | undefined;
  content?: string | undefined;
};

export type ProfileChange = {
  isMale?: boolean | undefined;
  yearOfBirth?: number | undefined;
  memberTypeId?: string | undefined;
};

export type TSubscriptionInput = { userId: string; authorId: string };

export type TContext = {
  prisma: PrismaClient;
  loaders: TLoaders;
};
