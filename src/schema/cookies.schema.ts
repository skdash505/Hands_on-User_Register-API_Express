// src/schema/cookies.schema.ts

// Import Essential Librarys ??

// Import Essential Dto Classes ??

// Import Required Schemas ??

// Import Required Model ??

// Import Other ??


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