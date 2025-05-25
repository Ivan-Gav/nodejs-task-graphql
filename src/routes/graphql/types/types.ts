export type TUserInput = {
  name: string;
  balance: number;
};

export type TPostInput = { title: string; content: string; authorId: string };

export type TProfileInput = {
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: string;
  userId: string;
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
