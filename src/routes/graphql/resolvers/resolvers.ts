import type { MemberType, Post, PrismaClient, Profile, User } from '@prisma/client';

import { TDto, TPostInput, TProfileInput, TUserInput } from '../types/types.js';

export interface PrismaContext {
  prisma: PrismaClient;
}

export const resolvers = {
  resolveMemberTypes: async (
    _parent: unknown,
    _args: unknown,
    { prisma }: PrismaContext,
  ) => prisma.memberType.findMany(),

  resolveTypeMemberById: async (
    _parent: unknown,
    { id }: MemberType,
    { prisma }: PrismaContext,
  ) => prisma.memberType.findUnique({ where: { id } }),

  resolvePosts: async (_parent: unknown, _args: unknown, { prisma }: PrismaContext) =>
    prisma.post.findMany(),

  resolvePostById: async (_parent: unknown, { id }: Post, { prisma }: PrismaContext) =>
    prisma.post.findUnique({ where: { id } }),

  resolveUsers: async (_parent: unknown, _args: unknown, { prisma }: PrismaContext) =>
    prisma.user.findMany(),

  resolveUserById: async (_parent: unknown, { id }: User, { prisma }: PrismaContext) =>
    prisma.user.findUnique({ where: { id } }),

  resolveProfiles: async (_parent: unknown, _args: unknown, { prisma }: PrismaContext) =>
    prisma.profile.findMany(),

  resolveProfileById: async (_parent: unknown, { id }: User, { prisma }: PrismaContext) =>
    prisma.profile.findUnique({ where: { id } }),

  resolveProfileByUserId: ({ id }: User, _args: unknown, { prisma }: PrismaContext) => {
    return prisma.profile.findUnique({ where: { userId: id } });
  },

  resolvePostsByUserId: ({ id }: User, _args: unknown, { prisma }: PrismaContext) => {
    return prisma.post.findMany({ where: { authorId: id } });
  },

  resolveSubscribedToByUserId: (
    { id }: User,
    _args: unknown,
    { prisma }: PrismaContext,
  ) =>
    prisma.subscribersOnAuthors
      .findMany({
        where: { subscriberId: id },
        include: { author: true },
      })
      .then((subs) => subs.map((sub) => sub.author)),

  resolveSubscribedToUserByUserId: (
    { id }: User,
    _args: unknown,
    { prisma }: PrismaContext,
  ) =>
    prisma.subscribersOnAuthors
      .findMany({
        where: { authorId: id },
        include: { subscriber: true },
      })
      .then((subs) => subs.map((sub) => sub.subscriber)),

  resolveMemberTypeByProfileId: (
    parent: Profile,
    _args: unknown,
    { prisma }: PrismaContext,
  ) => {
    return prisma.memberType.findUnique({ where: { id: parent.memberTypeId } });
  },

  // mutation resolvers

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
    { prisma }: { prisma: PrismaClient },
  ) => {
    await prisma.user.delete({
      where: { id },
    });
    return id;
  },

  resolveDeletePost: async (
    _parent: unknown,
    { id }: { id: string },
    { prisma }: { prisma: PrismaClient },
  ) => {
    await prisma.post.delete({
      where: { id },
    });
    return id;
  },

  resolveDeleteProfile: async (
    _parent: unknown,
    { id }: { id: string },
    { prisma }: { prisma: PrismaClient },
  ) => {
    await prisma.profile.delete({
      where: { id },
    });
    return id;
  },
};
