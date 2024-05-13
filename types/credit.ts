import type { Student } from "./student";

export interface CreditUpdate {
    type: 'add' | 'reduce',
    number: number,
    student: Student,
    reason: string,
    create_time: string,
    update_time: string,
    id?: string
}