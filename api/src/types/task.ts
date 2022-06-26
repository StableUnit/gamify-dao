import { Document } from "mongoose";

export interface ITask extends Document {
    ident: number;
    name: string;
    description: string;
    proofFormat: string;
    xp: number;
    repeats: number;
    deadlineMs: number;
    proofs: string[];
    status: string;
    onCompleteCall: string;
    minLevel: string;
}
