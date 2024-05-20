import type { Klass } from "./klass";
import type { User } from "./user";

export interface Student {
    name: string,
    school_class: Klass,
    user: User,
    credit: number,
    id?: string
}

export interface TaskAction {
    action: 'add_credit' | 'reduce_credit',
    data: any,
    completed: boolean,
    id?: string
}

export interface Task {
    student: Student,
    content: string,
    deadline: string,
    completed: boolean,
    actions_when_completed: TaskAction[],
    actions_when_not_completed: TaskAction[]
    id?: string
}