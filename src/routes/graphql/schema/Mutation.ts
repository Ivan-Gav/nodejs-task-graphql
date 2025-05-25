import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { mutationResolvers } from '../resolvers/mutationResolvers.js';
import { Post, Profile, User } from './gqlEntities.js';
import {
  CreatePostInput,
  CreateProfileInput,
  CreateUserInput,
  ChangePostInput,
  ChangeProfileInput,
  ChangeUserInput,
} from './gqlInputs.js';
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
    } = mutationResolvers;

    return {
      createUser: {
        type: User,
        args: {
          dto: { type: new GraphQLNonNull(CreateUserInput) },
        },
        resolve: resolveCreateUser,
      },

      createPost: {
        type: Post,
        args: {
          dto: { type: new GraphQLNonNull(CreatePostInput) },
        },
        resolve: resolveCreatePost,
      },

      createProfile: {
        type: Profile,
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
        type: User,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
          dto: { type: new GraphQLNonNull(ChangeUserInput) },
        },
        resolve: resolveChangeUser,
      },

      changePost: {
        type: Post,
        args: {
          id: { type: new GraphQLNonNull(UUIDType) },
          dto: { type: new GraphQLNonNull(ChangePostInput) },
        },
        resolve: resolveChangePost,
      },

      changeProfile: {
        type: Profile,
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
