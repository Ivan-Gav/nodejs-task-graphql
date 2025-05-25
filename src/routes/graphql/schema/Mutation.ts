import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { resolvers } from '../resolvers/resolvers.js';
import { TPost, TProfile, TUser } from '../types/gqlEntities.js';
import {
  CreatePostInput,
  CreateProfileInput,
  CreateUserInput,
} from '../types/gqlInputs.js';
import { UUIDType } from '../types/uuid.js';

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => {
    const {
      resolveCreateProfile,
      resolveCreatePost,
      resolveCreateUser,
      resolveDeletePost,
      resolveDeleteUser,
      resolveDeleteProfile,
    } = resolvers;

    return {
      createUser: {
        type: TUser,
        args: {
          dto: { type: new GraphQLNonNull(CreateUserInput) },
        },
        resolve: resolveCreateUser,
      },

      createPost: {
        type: TPost,
        args: {
          dto: { type: new GraphQLNonNull(CreatePostInput) },
        },
        resolve: resolveCreatePost,
      },

      createProfile: {
        type: TProfile,
        args: {
          dto: { type: new GraphQLNonNull(CreateProfileInput) },
        },
        resolve: resolveCreateProfile,
      },

      deleteUser: {
        type: UUIDType,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: resolveDeleteUser,
      },

      deletePost: {
        type: UUIDType,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: resolveDeletePost,
      },

      deleteProfile: {
        type: UUIDType,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: resolveDeleteProfile,
      },
    };
  },
});
