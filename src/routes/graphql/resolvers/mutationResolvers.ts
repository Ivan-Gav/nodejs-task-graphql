import {
  TContext,
  TDto,
  PostChange,
  PostInput,
  ProfileChange,
  ProfileInput,
  TSubscriptionInput,
  UserInput,
} from '../types/types.js';

export const mutationResolvers = {
  resolveCreateUser: async (
    _parent: unknown,
    { dto }: TDto<UserInput>,
    { prisma }: TContext,
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
    { dto }: TDto<PostInput>,
    { prisma }: TContext,
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
    { dto }: TDto<ProfileInput>,
    { prisma }: TContext,
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
    { prisma }: TContext,
  ) => {
    await prisma.user.delete({
      where: { id },
    });
    return id;
  },

  resolveDeletePost: async (
    _parent: unknown,
    { id }: { id: string },
    { prisma }: TContext,
  ) => {
    await prisma.post.delete({
      where: { id },
    });
    return id;
  },

  resolveDeleteProfile: async (
    _parent: unknown,
    { id }: { id: string },
    { prisma }: TContext,
  ) => {
    await prisma.profile.delete({
      where: { id },
    });
    return id;
  },

  resolveChangeUser: async (
    _parent: unknown,
    { id, dto }: { id: string; dto: TDto<UserInput> },
    { prisma }: TContext,
  ) =>
    prisma.user.update({
      where: { id },
      data: dto,
    }),

  resolveChangePost: async (
    _parent: unknown,
    { id, dto }: { id: string; dto: PostChange },
    { prisma }: TContext,
  ) =>
    prisma.post.update({
      where: { id },
      data: dto,
    }),

  resolveChangeProfile: async (
    _parent: unknown,
    { id, dto }: { id: string; dto: ProfileChange },
    { prisma }: TContext,
  ) =>
    prisma.profile.update({
      where: { id },
      data: dto,
    }),

  resolveSubscribeToUser: async (
    _parent: unknown,
    { userId, authorId }: TSubscriptionInput,
    { prisma }: TContext,
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
    { prisma }: TContext,
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
