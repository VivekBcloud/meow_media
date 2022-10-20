import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

/**extend the built-in session types */
declare module "next-auth" {
    interface Session {
        token: string;
    }
}

/** extend the built-in types for JWT */
declare module "next-auth/jwt" {
    interface JWT {
        token: number;
    }
}
