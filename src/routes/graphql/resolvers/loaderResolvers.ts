import { Profile, User, TContext } from '../types/types.js';

export const loaderResolvers = {
  resolvePostsWithLoader: async ({ id }: User, _args: unknown, { loaders }: TContext) =>
    loaders.postsByAuthorId.load(id),

  resolveProfileWithLoader: async ({ id }: User, _args: unknown, { loaders }: TContext) =>
    loaders.profileByUserId.load(id),

  resolveMemberTypeWithLoader: async (
    { memberTypeId }: Profile,
    _args: unknown,
    { loaders }: TContext,
  ) => (memberTypeId ? loaders.memberTypeById.load(memberTypeId) : null),

  resolveSubscribedToWithLoader: ({ id }: User, _args: unknown, { loaders }: TContext) =>
    loaders.userSubscribedTo.load(id),

  resolveSubscribedToUserWithLoader: (
    { id }: User,
    _args: unknown,
    { loaders }: TContext,
  ) => loaders.subscribedToUser.load(id),
};
