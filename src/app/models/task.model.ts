export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'Pending' | 'In Progress' | 'Complete' | 'On Hold';
}
