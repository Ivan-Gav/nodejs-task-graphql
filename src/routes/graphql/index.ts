import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {
  graphql,
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
        source: req.body.query,
        variableValues: req.body.variables,
      });
    },
  });

  const {
    resolveMemberTypes,
    resolveTypeMemberById,
    resolvePosts,
    resolveUsers,
    resolveProfiles,
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
          resolve: (_, { id }) => resolveTypeMemberById(id),
        },
        posts: {
          type: new GraphQLList(TPost),
          resolve: resolvePosts,
        },
        users: { type: new GraphQLList(TUser), resolve: resolveUsers },
        profiles: { type: new GraphQLList(TProfile), resolve: resolveProfiles },
      },
    }),
  });
};

export default plugin;

// `query ($userId: UUID!, $profileId: UUID!, $memberTypeId: MemberTypeId!, $postId: UUID!) {
//         memberType(id: $memberTypeId) {
//             id
//             discount
//             postsLimitPerMonth
//         }
//         post(id: $postId) {
//             id
//             title
//             content
//         }
//         user(id: $userId) {
//             id
//             name
//             balance
//         }
//         profile(id: $profileId) {
//             id
//             isMale
//             yearOfBirth
//         }
//     }`
