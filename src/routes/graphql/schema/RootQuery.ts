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
import { resolvers } from '../resolvers/resolvers.js';

const {
  resolveProfileByUserId,
  resolvePostsByUserId,
  resolveSubscribedToByUserId,
  resolveSubscribedToUserByUserId,
  resolveMemberTypeByProfileId,
  resolveMemberTypes,
  resolveTypeMemberById,
  resolvePosts,
  resolvePostById,
  resolveUsers,
  resolveUserById,
  resolveProfiles,
  resolveProfileById,
} = resolvers;

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

export const TUser: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: TProfile,
      resolve: resolveProfileByUserId,
    },
    posts: {
      type: new GraphQLList(TPost),
      resolve: resolvePostsByUserId,
    },
    userSubscribedTo: {
      type: new GraphQLList(TUser),
      resolve: resolveSubscribedToByUserId,
    },
    subscribedToUser: {
      type: new GraphQLList(TUser),
      resolve: resolveSubscribedToUserByUserId,
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
      resolve: resolveMemberTypeByProfileId,
    },
  }),
});

export const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    memberTypes: {
      type: new GraphQLList(TMemberType),
      resolve: resolveMemberTypes,
    },

    memberType: {
      type: TMemberType,
      args: {
        id: {
          type: new GraphQLNonNull(EMemberTypeIdsEnum),
        },
      },
      resolve: resolveTypeMemberById,
    },

    posts: {
      type: new GraphQLList(TPost),
      resolve: resolvePosts,
    },

    post: {
      type: TPost,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: resolvePostById,
    },

    users: { type: new GraphQLList(TUser), resolve: resolveUsers },

    user: {
      type: TUser,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: resolveUserById,
    },

    profiles: { type: new GraphQLList(TProfile), resolve: resolveProfiles },

    profile: {
      type: TProfile,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: resolveProfileById,
    },
  },
});
