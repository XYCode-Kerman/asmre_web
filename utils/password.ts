import { sha1 } from "js-sha1";

export function hashPassword(password: string): string {
    return sha1.create().update(password).hex()
}