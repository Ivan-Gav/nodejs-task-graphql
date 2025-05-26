import { GraphQLObjectType, GraphQLNonNull, GraphQLList } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { queryResolvers } from '../resolvers/queryResolvers.js';
import { loaderResolvers } from '../resolvers/loaderResolvers.js';
import { MemberType, MemberTypeIdsEnum, Post, User, Profile } from './gqlEntities.js';

const {
  resolveMemberTypes,
  resolveTypeMemberById,
  resolvePosts,
  resolvePostById,
  resolveUserById,
  resolveProfiles,
  resolveProfileById,
} = queryResolvers;

const { resolveUsersLikeABoss } = loaderResolvers;

export const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: resolveMemberTypes,
    },

    memberType: {
      type: MemberType,
      args: {
        id: {
          type: new GraphQLNonNull(MemberTypeIdsEnum),
        },
      },
      resolve: resolveTypeMemberById,
    },

    posts: {
      type: new GraphQLList(Post),
      resolve: resolvePosts,
    },

    post: {
      type: Post,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: resolvePostById,
    },

    users: { type: new GraphQLList(User), resolve: resolveUsersLikeABoss },

    user: {
      type: User,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: resolveUserById,
    },

    profiles: { type: new GraphQLList(Profile), resolve: resolveProfiles },

    profile: {
      type: Profile,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: resolveProfileById,
    },
  },
});
