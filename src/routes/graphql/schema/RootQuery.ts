import { GraphQLObjectType, GraphQLNonNull, GraphQLList } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { resolvers } from '../resolvers/resolvers.js';
import {
  TMemberType,
  EMemberTypeIdsEnum,
  TPost,
  TUser,
  TProfile,
} from '../types/gqlEntities.js';

const {
  resolveMemberTypes,
  resolveTypeMemberById,
  resolvePosts,
  resolvePostById,
  resolveUsers,
  resolveUserById,
  resolveProfiles,
  resolveProfileById,
} = resolvers;

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
