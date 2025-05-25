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
