export type CreateTaskType = {
    name: string;
    description: string;
    xp: number;
    deadlineMs: number;
};

export type TaskType = {
    id: number;
    name: string;
    description: string;
    xp: number;
    deadlineMs: number;
};
