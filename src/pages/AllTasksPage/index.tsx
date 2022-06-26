import React, { useContext, useEffect, useState } from "react";

import { getTasks, takeTask } from "../../utils/api";
import { TaskType } from "../../utils/types";
import { StateContext } from "../../reducer/constants";
import { addErrorNotification, addSuccessNotification } from "../../utils/notifications";
import Task from "../../components/Task";

import "./index.scss";

const MyTasksPage = () => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const { account } = useContext(StateContext);

    const updateTasks = async () => {
        const newTasks = await getTasks();
        setTasks(newTasks);
    };
    useEffect(() => {
        updateTasks();
    }, []);

    const handleCompleteTask = (id: number) => async () => {
        if (account) {
            try {
                await takeTask(account, id);
                addSuccessNotification("Success", "Task has been added to your tasks");
            } catch (e) {
                addErrorNotification("Error", "Task has not been added");
            }
        }
    };

    return (
        <div className="allTasks">
            <div className="title">All tasks</div>
            <div className="allTasks__content">
                {tasks.map((task) => (
                    <Task key={task.ident} task={task} onClick={handleCompleteTask(task.ident)} />
                ))}
            </div>
        </div>
    );
};

export default MyTasksPage;
