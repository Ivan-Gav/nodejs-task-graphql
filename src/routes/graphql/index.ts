import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {
  graphql,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';
import {
  EMemberTypeIdsEnum,
  TMemberType,
  TPost,
  TProfile,
  TUser,
} from './schema/schema.js';
import { getResolvers } from './resolvers/resolvers.js';
import { UUIDType } from './types/uuid.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },

    async handler(req) {
      return graphql({
        schema,
        contextValue: { prisma },
        source: req.body.query,
        variableValues: req.body.variables,
      });
    },
  });

  const {
    resolveMemberTypes,
    resolveTypeMemberById,
    resolvePosts,
    resolvePostById,
    resolveUsers,
    resolveUserById,
    resolveProfiles,
    resolveProfileById,
  } = getResolvers(prisma);

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
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
          resolve: async (_, { id }) => await resolveTypeMemberById(id as string),
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
          resolve: async (_, { id }) => await resolvePostById(id as string),
        },

        users: { type: new GraphQLList(TUser), resolve: resolveUsers },

        user: {
          type: TUser,
          args: {
            id: {
              type: new GraphQLNonNull(UUIDType),
            },
          },
          resolve: async (_, { id }) => await resolveUserById(id as string),
        },

        profiles: { type: new GraphQLList(TProfile), resolve: resolveProfiles },

        profile: {
          type: TProfile,
          args: {
            id: {
              type: new GraphQLNonNull(UUIDType),
            },
          },
          resolve: async (_, { id }) => await resolveProfileById(id as string),
        },
      },
    }),
  });
};

export default plugin;
