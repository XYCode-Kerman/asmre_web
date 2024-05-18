export interface Klass {
    id?: string,
    name: string,
    description: string
}

export interface KlassStats {
    total_students: number,
    total_credit_updates: number,
    average_credit: number
}

export interface Homework {
    subject: string,
    name: string,
    description: string,
    starttime: string, // datetime
    deadline: string // datetime
    klass: Klass,
    id?: string
}