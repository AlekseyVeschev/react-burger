export type TIngredient = {
   readonly _id: string;
   readonly name: string;
   readonly type: string;
   readonly proteins?: number;
   readonly fat?: number;
   readonly carbohydrates?: number;
   readonly calories?: number;
   readonly price: number;
   readonly image: string;
   readonly image_mobile: string;
   readonly image_large: string;
   readonly __v?: number;
   count?: number | null;
}
export type TOrder = {
   readonly _id: string;
   readonly name: string;
   readonly status: string;
   readonly number: number;
   readonly createdAt: string;
   readonly updatedAt: string;
   readonly ingredients: Array<string>;
}
export type TSetOrder = Pick<TOrder, 'number'>;

export type TError = {
   success?: string,
   message?: string;
   type?: string;
   code?: number;
}
export type TForm = {
   email: string;
   password: string;
   name?: string;
}

export type TTokens = {
   refreshToken: string;
   accessToken: string;
}

export type TUser = {
   name: string;
   email: string;
}

export type TResetPasswordResponse = {
   message: string;
}