// src/libs/classes/validatedToken.ts


// Import Logging Essentials
import path from "path";
import { setDevLog, level, masterLog } from "../../utils/log";
const filename = path.basename(__filename);

// Import Essential Librarys
import { Jwt, JwtPayload } from "jsonwebtoken";

// Import Essential Dto Classes ??

// Import Required Schemas ??

// Import Required Model ??

// Import Other ??


/// <reference types="node" />
export interface validatedToken {
    valid: boolean;
    expired: boolean;
    decoded: Jwt | JwtPayload | string | null;
    // decoded: {} | null;
}