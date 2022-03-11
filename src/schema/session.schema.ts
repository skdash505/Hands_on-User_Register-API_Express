// src/schema/session.schema.ts

// Import Essential Librarys ??

// Import Essential Dto Classes ??

// Import Required Schemas ??

// Import Required Model ??

// Import Other ??


import { any, boolean, object, string, TypeOf } from "zod";

export const CreateSessionSchema = object({
    body: object({
        email: string({
            required_error: "E-mail is required"
        }),
        password: string({
            required_error: "Password is required"
        }),
        rememberDevice: boolean({
            required_error: "rememberDevice is required"
        }),
        // valid: boolean({
        //     required_error: `"Valid" attribute is required`
        // }),
    })
});
export type CreateSessionInput =  Omit<TypeOf<typeof CreateSessionSchema>, "body.email" | "body.password">;

export const SessionIDSchema = object({
    params: object({
        _id: string({
            required_error: "SessionId is required"
        }),
    }),
});
export type SessionIDInput =  TypeOf<typeof SessionIDSchema>;

export const SessionValidSchema = object({
    body: object({
        valid: boolean({
            required_error: "Valid is required"
        }),
    }),
});
export type SessionValidInput =  TypeOf<typeof SessionValidSchema>;
