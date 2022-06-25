import axios from "axios";
import { CreateTaskType, TaskType } from "./types";

const responseWrapper = async (f: Promise<any>) => {
    const response = await f;
    return response.data;
};

const credentialConfig = {
    withCredentials: true,
};

const ENDPOINT = "https://api.stableunit.org";

export const createTask = async (task: CreateTaskType) =>
    responseWrapper(axios.post(`${ENDPOINT}/createTask`, task, credentialConfig));

export const getTasks: () => Promise<TaskType> = async () => responseWrapper(axios.get(`${ENDPOINT}/getTasks`));

export const takeTask = async (userAddress: string, taskId: number) =>
    responseWrapper(axios.post(`${ENDPOINT}/takeTask`, { userAddress, taskId }));
