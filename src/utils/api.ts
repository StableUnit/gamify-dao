import axios from "axios";
import { CreateTaskType, TaskType, TaskWithProofType, TaskWithVerificationProofType } from "./types";

const responseWrapper = async (f: Promise<any>) => {
    const response = await f;
    return response.data;
};

const credentialConfig = {
    withCredentials: true,
};

const ENDPOINT = "https://gamify-dao.netlify.app";

export const createTask = async (task: CreateTaskType) =>
    responseWrapper(axios.post(`${ENDPOINT}/createTask`, task, credentialConfig));

export const getTasks: () => Promise<TaskType> = async () => responseWrapper(axios.get(`${ENDPOINT}/getTasks`));

export const getUserTasks: (userAddress: string) => Promise<TaskWithProofType> = async (userAddress) =>
    responseWrapper(axios.get(`${ENDPOINT}/getUserTasks?userAddress=${userAddress}`));

export const takeTask = async (userAddress: string, taskId: number) =>
    responseWrapper(axios.post(`${ENDPOINT}/takeTask`, { userAddress, taskId }));

export const confirmTask = async (userAddress: string, taskId: number, isConfirmed: boolean) =>
    responseWrapper(axios.post(`${ENDPOINT}/confirmTask`, { userAddress, taskId, isConfirmed }));

export const completeTask = async (userAddress: string, taskId: number, proofs: Record<string, string>) =>
    responseWrapper(axios.post(`${ENDPOINT}/completeTask`, { userAddress, taskId, proofs }));

export const getTasksToVerificate: (userAddress: string) => Promise<TaskWithVerificationProofType> = async (
    userAddress
) => responseWrapper(axios.post(`${ENDPOINT}/getTasksToVerificate`, { userAddress }));
