import { Response, Request } from "express";
import { ITodo } from "../../types/todo";
import { ITask } from "../../types/task";
import { IJob } from "../../types/job";
import Todo from "../../types/models/todo";
import Task from "../../types/models/task";
import Job from "../../types/models/job";

const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<
            ITask,
            | "ident"
            | "name"
            | "description"
            | "proofFormat"
            | "xp"
            | "repeats"
            | "deadlineMs"
            | "proofs"
            | "status"
            | "onCompleteCall"
            | "minLevel"
        >;

        const task: ITask = new Task({
            ident: (await Task.count()) + 1,
            name: body.name,
            description: body.description,
            proofFormat: body.proofFormat,
            xp: body.xp,
            repeats: body.repeats,
            status: body.status,
            onCompleteCall: body.onCompleteCall,
            minLevel: body.minLevel,
            deadlineMs: body.deadlineMs,
        });

        const newTask: ITask = await task.save();
        const allTasks: ITask[] = await Task.find();

        res.status(200).json({ message: "Task added", task: newTask, tasks: allTasks });
    } catch (error) {
        res.status(503).send(error);
    }
};

const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks: ITask[] = await Task.find();
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(503).send(error);
    }
};

const getUserTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const jobs: IJob[] | null = await Job.find({ userId: req.params.userAddress }, { taskId: 1 });
        const taskIds = jobs.map((job) => job.taskId);

        const tasks: ITask[] = await Task.find({ ident: { $in: taskIds } });
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(503).send(error);
    }
    // try {
    //   const userTasks: IJob[] | null = await Job.find(
    //     { user_id :  req.params.userAddress }
    //   )
    //   const allTodos: ITodo[] = await Todo.find({
    //     { '_id': { $in: } }
    //   })
    //   res.status(200).json({
    //     message: "Todo deleted",
    //     todo: deletedTodo,
    //     todos: allTodos,
    //   })
    // } catch (error) {
    //   throw error
    // }
};

const getTaskToVerificate = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks: ITask[] = await Task.find();
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(503).send(error);
    }
};

const confirmTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks: ITask[] = await Task.find();
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(503).send(error);
    }
};

const takeTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IJob, "userAddress" | "taskId" | "proofs" | "status">;

        const job: IJob = new Job({
            userAddress: body.userAddress,
            taskId: body.taskId,
            proof: body.proofs,
            status: body.status,
        });

        const newJob: IJob = await job.save();

        res.status(200).json({ message: "Task taken" });
    } catch (error) {
        res.status(503).send(error);
    }

    // try {
    //   const body = req.body as Pick<ITask, "description" | "proof_format"
    //   | "reward" | "repeats" | "status" | "onCompleteCall" | "minLevel">
    //   req.params.id
    //   const task: ITask = new Task({
    //     description: body.description,
    //     proof_format: body.proof_format,
    //     reward: body.reward,
    //     repeats: body.repeats,
    //     status: body.status,
    //     onCompleteCall: body.onCompleteCall,
    //     minLevel: body.minLevel,
    //   })
    //   // const task: ITask = new Task({
    //   //   description: "sdfsdc",
    //   //   proof_format: "vcbcvb",
    //   //   reward:  3,
    //   //   repeats:  5,
    //   //   status:  "xcvxcv",
    //   //   onCompleteCall:  "sldmcsdc",
    //   //   minLevel:  7,
    //   // })
    //   const newTask: ITask = await task.save()
    //   const allTasks: ITask[] = await Task.find()
    //   res
    //     .status(201)
    //     .json({ message: "Task added", task: newTask, tasks: allTasks })
    // } catch (error) {
    //   res.status(503).send(error);
    // }
};

const сompleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IJob, "userAddress" | "taskId" | "proofs" | "status">;
        console.log(body);
        const updateTodo: IJob | null = await Job.updateOne({ taskId: body.taskId }, { $set: { proofs: body.proofs } });

        res.status(200).json(updateTodo);
    } catch (error) {
        res.status(503).send(error);
    }
};

// const updateTodo = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const {
//         params: { id },
//         body,
//       } = req
//       const updateTodo: ITodo | null = await Todo.find(
//         { _id: id },
//         body
//       )
//       const allTodos: ITodo[] = await Todo.find()
//       res.status(200).json({
//         message: "Todo updated",
//         todo: updateTodo,
//         todos: allTodos,
//       })
//     } catch (error) {
//       throw error
//     }
// }

// const deleteTodo = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(req.params.id);
//         const allTodos: ITodo[] = await Todo.find();
//         res.status(200).json({
//             message: "Todo deleted",
//             todo: deletedTodo,
//             todos: allTodos,
//         });
//     } catch (error) {
//         throw error;
//     }
// };

const ping = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
        message: "Api Online",
    });
};

export { createTask, getTaskToVerificate, confirmTask, getTasks, takeTask, getUserTasks, сompleteTask, ping };
