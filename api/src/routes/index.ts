import { Router } from "express";
import {
    createTask,
    getTaskToVerificate,
    confirmTask,
    getTasks,
    takeTask,
    getUserTasks,
    сompleteTask,
    ping,
} from "../controllers/tasks";

const router: Router = Router();

router.get("/ping", ping);

router.post("/createTask", createTask);

router.get("/getTaskToVerificate", getTaskToVerificate);

router.post("/confirmTask", confirmTask);

router.get("/getTasks", getTasks);

router.post("/takeTask", takeTask);

router.get("/getUserTasks", getUserTasks);

router.post("/completeTask", сompleteTask);

export default router;
