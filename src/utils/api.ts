import axios from "axios";

const responseWrapper = async (f: Promise<any>, needErrorMessage?: boolean) => {
    try {
        const response = await f;
        return response.data;
    } catch (e: any) {
        const errorMessage = e?.response?.data?.message ?? "Error";
        if (needErrorMessage) {
            return { responseError: errorMessage };
        }
    }
};

const credentialConfig = {
    withCredentials: true,
};

const ENDPOINT = "https://api.stableunit.org";

type TaskType = {
    name: string;
    description: string;
    xp: number;
    date: number;
};

export const createTask = async (task: TaskType) =>
    responseWrapper(axios.post(`${ENDPOINT}/createTask`, task, credentialConfig));
