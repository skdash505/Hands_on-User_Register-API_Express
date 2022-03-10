// src/schema/cookies.schema.ts

import { any, object, string, TypeOf } from "zod";

export const CookiesSchema = object({
    cookies: object({
        refreshToken: string({
            required_error: "Session Expaired."
        }),
        accessToken: string({
            // required_error: "Session ended wait to for restart"
        }),
    })
});
export type CookiesnInput =  TypeOf<typeof CookiesSchema>;