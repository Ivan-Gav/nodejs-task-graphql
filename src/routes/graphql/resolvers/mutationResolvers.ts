import type { PrismaClient } from '@prisma/client';

import {
  TDto,
  TPostChange,
  TPostInput,
  TProfileChange,
  TProfileInput,
  TSubscriptionInput,
  TUserInput,
} from '../types/types.js';

export interface PrismaContext {
  prisma: PrismaClient;
}

export const vutationResolvers = {
  resolveCreateUser: async (
    _parent: unknown,
    { dto }: TDto<TUserInput>,
    { prisma }: PrismaContext,
  ) => {
    const { name, balance } = dto;

    return prisma.user.create({
      data: {
        name,
        balance,
      },
    });
  },

  resolveCreatePost: async (
    _parent: unknown,
    { dto }: TDto<TPostInput>,
    { prisma }: PrismaContext,
  ) => {
    const { title, content, authorId } = dto;

    return prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { id: authorId },
        },
      },
    });
  },

  resolveCreateProfile: async (
    _parent: unknown,
    { dto }: TDto<TProfileInput>,
    { prisma }: PrismaContext,
  ) => {
    const { isMale, yearOfBirth, userId, memberTypeId } = dto;
    return prisma.profile.create({
      data: {
        isMale,
        yearOfBirth,
        user: {
          connect: { id: userId },
        },
        memberType: {
          connect: { id: memberTypeId },
        },
      },
    });
  },

  resolveDeleteUser: async (
    _parent: unknown,
    { id }: { id: string },
    { prisma }: PrismaContext,
  ) => {
    await prisma.user.delete({
      where: { id },
    });
    return id;
  },

  resolveDeletePost: async (
    _parent: unknown,
    { id }: { id: string },
    { prisma }: PrismaContext,
  ) => {
    await prisma.post.delete({
      where: { id },
    });
    return id;
  },

  resolveDeleteProfile: async (
    _parent: unknown,
    { id }: { id: string },
    { prisma }: PrismaContext,
  ) => {
    await prisma.profile.delete({
      where: { id },
    });
    return id;
  },

  resolveChangeUser: async (
    _parent: unknown,
    { id, dto }: { id: string; dto: TDto<TUserInput> },
    { prisma }: PrismaContext,
  ) =>
    prisma.user.update({
      where: { id },
      data: dto,
    }),

  resolveChangePost: async (
    _parent: unknown,
    { id, dto }: { id: string; dto: TPostChange },
    { prisma }: PrismaContext,
  ) =>
    prisma.post.update({
      where: { id },
      data: dto,
    }),

  resolveChangeProfile: async (
    _parent: unknown,
    { id, dto }: { id: string; dto: TProfileChange },
    { prisma }: PrismaContext,
  ) =>
    prisma.profile.update({
      where: { id },
      data: dto,
    }),

  resolveSubscribeToUser: async (
    _parent: unknown,
    { userId, authorId }: TSubscriptionInput,
    { prisma }: PrismaContext,
  ) => {
    const subscription = await prisma.subscribersOnAuthors.create({
      data: {
        subscriberId: userId,
        authorId,
      },
    });
    return Boolean(subscription);
  },

  resolveUnubscribeFromUser: async (
    _parent: unknown,
    { userId, authorId }: TSubscriptionInput,
    { prisma }: PrismaContext,
  ) => {
    const deleted = await prisma.subscribersOnAuthors.delete({
      where: {
        subscriberId_authorId: {
          subscriberId: userId,
          authorId,
        },
      },
    });
    return Boolean(deleted);
  },
};
