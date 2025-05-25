import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { resolvers } from '../resolvers/resolvers.js';
import { loaderResolvers } from '../resolvers/loaderResolvers.js';

const {
  resolveProfileByUserId,
  resolvePostsByUserId,
  resolveSubscribedToByUserId,
  resolveSubscribedToUserByUserId,
  resolveMemberTypeByProfileId,
} = resolvers;

const {
  resolveProfileWithLoader,
  resolvePostsWithLoader,
  resolveSubscribedToWithLoader,
  resolveSubscribedToUserWithLoader,
  resolveMemberTypeWithLoader,
} = loaderResolvers;

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
      resolve: resolveProfileWithLoader,
    },
    posts: {
      type: new GraphQLList(TPost),
      resolve: resolvePostsWithLoader,
    },
    userSubscribedTo: {
      type: new GraphQLList(TUser),
      resolve: resolveSubscribedToWithLoader,
    },
    subscribedToUser: {
      type: new GraphQLList(TUser),
      resolve: resolveSubscribedToUserWithLoader,
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
      resolve: resolveMemberTypeWithLoader,
    },
  }),
});
