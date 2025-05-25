import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { EMemberTypeIdsEnum, TUser, TPost, TProfile } from './RootQuery.js';

import { PrismaContext, resolvers } from '../resolvers/resolvers.js';
import { Prisma } from '@prisma/client';
import { MemberTypeId } from '../../member-types/schemas.js';

interface CreateUserArgs {
  input: Prisma.UserCreateInput;
}

interface CreatePostArgs {
  input: Prisma.PostCreateInput;
}

interface CreateProfileArgs {
  input: Prisma.ProfileCreateInput;
}

export const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    // id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

export const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    // id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
});

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    // id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(EMemberTypeIdsEnum) },
  },
});

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => {
    const { createUser, createPost, createProfile } = resolvers;

    return {
      createUser: {
        type: TUser,
        args: {
          dto: { type: new GraphQLNonNull(CreateUserInput) },
        },
        resolve: (
          _parent: unknown,
          args: { dto: { name: string; balance: number } },
          context: PrismaContext,
        ) => createUser(args.dto, context),
      },
      createPost: {
        type: TPost,
        args: {
          dto: { type: new GraphQLNonNull(CreatePostInput) },
        },
        resolve: (
          _parent: unknown,
          args: { dto: { title: string; content: string; authorId: string } },
          context: PrismaContext,
        ) => createPost(args.dto, context),
      },
      createProfile: {
        type: TProfile,
        args: {
          dto: { type: new GraphQLNonNull(CreateProfileInput) },
        },
        resolve: (
          _parent: unknown,
          args: {
            dto: {
              isMale: boolean;
              yearOfBirth: number;
              userId: string;
              memberTypeId: MemberTypeId;
            };
          },
          context: PrismaContext,
        ) => createProfile(args.dto, context),
      },
    };
  },
});
