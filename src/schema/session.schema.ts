// src/schema/user.schema.ts

import { any, object, string, TypeOf } from "zod";

export const SessionSchema = object({
    body: object({
        email: string({
            required_error: "E-mail is required"
        }),
        // }).email(" Not a valid email"),
        password: string({
            required_error: "Password is required"
        }),
        // }).min(6, "password Too short - should be 6 chars minimum"),
    }),
    query: object({
        rememberDevice: string({
            required_error: "rememberDevice is required"
        })
    })
});
export type SessionInput =  TypeOf<typeof SessionSchema>;
// export type SessionInput =  Omit<TypeOf<typeof SessionSchema>, "query.rememberDevice">
