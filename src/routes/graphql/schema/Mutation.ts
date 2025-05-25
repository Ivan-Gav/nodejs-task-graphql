import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { PrismaContext, resolvers } from '../resolvers/resolvers.js';
import { TPost, TProfile, TUser } from '../types/gqlEntities.js';
import {
  CreatePostInput,
  CreateProfileInput,
  CreateUserInput,
} from '../types/gqlInputs.js';
import { TDto, TPostInput, TProfileInput, TUserInput } from '../types/types.js';

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
        resolve: (_parent: unknown, args: TDto<TUserInput>, context: PrismaContext) =>
          createUser(args.dto, context),
      },
      createPost: {
        type: TPost,
        args: {
          dto: { type: new GraphQLNonNull(CreatePostInput) },
        },
        resolve: (_parent: unknown, args: TDto<TPostInput>, context: PrismaContext) =>
          createPost(args.dto, context),
      },
      createProfile: {
        type: TProfile,
        args: {
          dto: { type: new GraphQLNonNull(CreateProfileInput) },
        },
        resolve: (_parent: unknown, args: TDto<TProfileInput>, context: PrismaContext) =>
          createProfile(args.dto, context),
      },
    };
  },
});
