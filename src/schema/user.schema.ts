// src/schema/user.schema.ts

// Import Essential Librarys ??

// Import Essential Dto Classes ??

// Import Required Schemas ??

// Import Required Model ??

// Import Other ??


import { Omit } from "lodash";
import { any, object, string, TypeOf } from "zod";

export const createUserSchema = object({
    body: object({
        userName: string({
            required_error: "Name is required"
        }).min(6, "UserName is Too short - should be 6 chars minimum"),
        name: string({
            required_error: "Name is required"
        }),
        password: string({
            required_error: "Password is required"
        }).min(6, "password Too short - should be 6 chars minimum"),
        confirmPassword: string({
            required_error: "PasswordConfirmation is required"
        }),
        email: string({
            required_error: "E-mail is required"
        }).email(" Not a valid email"),
    }).refine((data: any) => data.password === data.confirmPassword,{
        message: "Password do not match",
        path: ["passwordConfirmation"]
    })
});
export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">;
// export const UserSchema = object({
// export type UserInput = Omit<TypeOf<typeof UserSchema>, "body.passwordConfirmation">;

export const UpdateUserSchema = object({
    body: object({
        userName: string(),
        name: string({
            required_error: "Name is required"
        }),
        password: string({
            required_error: "Password is required"
        }).min(6, "password Too short - should be 6 chars minimum"),
        confirmPassword: string({
            required_error: "PasswordConfirmation is required"
        }),
        email: string({
            required_error: "E-mail is required"
        }).email(" Not a valid email"),
    }).refine((data: any) => data.password === data.confirmPassword,{
        message: "Password do not match",
        path: ["passwordConfirmation"]
    })
});
export type UpdateUserInput = Omit<TypeOf<typeof UpdateUserSchema>, "body.userName"|"body.passwordConfirmation">;


export const UserIDSchema = object({
    params: object({
    // query: object({
        _id: string({
            required_error: "UserId is required"
        })
    })
});
export type UserIDInput = TypeOf<typeof UserIDSchema>;