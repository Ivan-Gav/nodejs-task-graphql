import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { PrismaClient } from '@prisma/client';
import { User, Profile } from '@prisma/client';

export const EMemberTypeIdsEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: {
      value: 'BASIC',
    },
    BUSINESS: {
      value: 'BUSINESS',
    },
  },
});

export const TMemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: { type: new GraphQLNonNull(EMemberTypeIdsEnum) },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  },
});

export const TPost = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const TUser = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: TProfile,
      resolve: (parent: User, _, { prisma }: { prisma: PrismaClient }) => {
        return prisma.profile.findUnique({
          where: { userId: parent.id },
        });
      },
    },
    posts: {
      type: new GraphQLList(TPost),
      resolve: (parent, _, { prisma }) => {
        return prisma.post.findMany({
          where: { authorId: parent.id },
        });
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(TUser),
      resolve: async (parent: User, _, { prisma }: { prisma: PrismaClient }) => {
        return prisma.subscribersOnAuthors
          .findMany({
            where: {
              subscriberId: parent.id,
            },
            include: {
              author: true,
            },
          })
          .then((subs) => subs.map((sub) => sub.author));
      },
    },
    subscribedToUser: {
      type: new GraphQLList(TUser),
      resolve: async (parent, _, { prisma }) => {
        return prisma.subscribersOnAuthors
          .findMany({
            where: {
              authorId: parent.id,
            },
            include: {
              subscriber: true,
            },
          })
          .then((subs) => subs.map((sub) => sub.subscriber));
      },
    },
  }),
});

export const TProfile = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: {
      type: TMemberType,
      resolve: (parent: Profile, _, { prisma }: { prisma: PrismaClient }) => {
        return prisma.memberType.findUnique({
          where: { id: parent.memberTypeId },
        });
      },
    },
  }),
});
