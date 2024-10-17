import * as z from "zod";

export const registerStep1Scheme = z.object({
    email:z.string().email(),
    name:z.string().min(3)
})

export const registerStep2Scheme = z.object({
    password:z.string().min(6),
    username:z.string().min(3)
})

export const loginScheme = z.object({
    email:z.string().email(),
    password:z.string().min(6)
})