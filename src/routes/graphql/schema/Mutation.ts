import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { resolvers } from '../resolvers/resolvers.js';
import { TPost, TProfile, TUser } from '../types/gqlEntities.js';
import {
  CreatePostInput,
  CreateProfileInput,
  CreateUserInput,
  ChangePostInput,
  ChangeProfileInput,
  ChangeUserInput,
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
      resolveChangeUser,
      resolveChangePost,
      resolveChangeProfile,
      resolveSubscribeToUser,
      resolveUnubscribeFromUser,
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

      changeUser: {
        type: TUser,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
          dto: { type: new GraphQLNonNull(ChangeUserInput) },
        },
        resolve: resolveChangeUser,
      },

      changePost: {
        type: TPost,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
          dto: { type: new GraphQLNonNull(ChangePostInput) },
        },
        resolve: resolveChangePost,
      },

      changeProfile: {
        type: TProfile,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
          dto: { type: new GraphQLNonNull(ChangeProfileInput) },
        },
        resolve: resolveChangeProfile,
      },

      subscribeTo: {
        type: GraphQLBoolean,
        args: {
          userId: { type: new GraphQLNonNull(UUIDType) },
          authorId: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: resolveSubscribeToUser,
      },

      unsubscribeFrom: {
        type: GraphQLBoolean,
        args: {
          userId: { type: new GraphQLNonNull(UUIDType) },
          authorId: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: resolveUnubscribeFromUser,
      },
    };
  },
});
