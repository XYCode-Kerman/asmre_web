import type { Klass } from "./klass";
import type { User } from "./user";

export interface Student {
    name: string,
    school_class: Klass,
    user: User,
    credit: number,
    id?: string
}