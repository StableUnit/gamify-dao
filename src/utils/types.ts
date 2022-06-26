export type CreateTaskType = {
    name: string;
    description: string;
    xp: number;
    deadlineMs: number;
};

export type TaskType = CreateTaskType & {
    ident: number;
};

export type TaskWithProofType = TaskType & {
    proofs: string[];
};

export type TaskWithVerificationProofType = TaskType & {
    proofs: Record<string, string>;
};
