export type TUser = {
  id: string;
  name: string;
  balance: number;
};

// export type TUserInput = {
//   name: string;
//   balance: number;
// };
export type TUserInput = Omit<TUser, 'id'>;

export type TPost = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

// export type TPostInput = { title: string; content: string; authorId: string };
export type TPostInput = Omit<TPost, 'id'>;

export type TProfile = {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
};

// export type TProfileInput = {
//   isMale: boolean;
//   yearOfBirth: number;
//   memberTypeId: string;
//   userId: string;
// };
export type TProfileInput = Omit<TProfile, 'id'>;

export type TProfileMemberType = {
  id: string;
  discount: number;
  postsLimitPerMonth: number;
};

export type TDto<T extends object> = Record<'dto', T>;

export type TPostChange = {
  title?: string | undefined;
  content?: string | undefined;
};

export type TProfileChange = {
  isMale?: boolean | undefined;
  yearOfBirth?: number | undefined;
  memberTypeId?: string | undefined;
};

export type TSubscriptionInput = { userId: string; authorId: string };
