export interface Task {
    id?: string;
    title: string;
    description?: string;
    status?: 'Pending' | 'In Progress' | 'Complete' | 'On Hold';
    createdAt?: number;
}
