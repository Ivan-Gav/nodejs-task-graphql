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
import { UUIDType } from '../types/uuid.js';
import { loaderResolvers } from '../resolvers/loaderResolvers.js';

const {
  resolveProfileWithLoader,
  resolvePostsWithLoader,
  resolveSubscribedToWithLoader,
  resolveSubscribedToUserWithLoader,
  resolveMemberTypeWithLoader,
} = loaderResolvers;

export const MemberTypeIdsEnum = new GraphQLEnumType({
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

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: { type: new GraphQLNonNull(MemberTypeIdsEnum) },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  },
});

export const Post = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const User: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: Profile,
      resolve: resolveProfileWithLoader,
    },
    posts: {
      type: new GraphQLList(Post),
      resolve: resolvePostsWithLoader,
    },
    userSubscribedTo: {
      type: new GraphQLList(User),
      resolve: resolveSubscribedToWithLoader,
    },
    subscribedToUser: {
      type: new GraphQLList(User),
      resolve: resolveSubscribedToUserWithLoader,
    },
  }),
});

export const Profile = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: {
      type: MemberType,
      resolve: resolveMemberTypeWithLoader,
    },
  }),
});
