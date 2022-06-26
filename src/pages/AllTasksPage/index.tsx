import React, { useContext, useEffect, useState } from "react";

import { getTasks, takeTask } from "../../utils/api";
import { TaskType } from "../../utils/types";
import { StateContext } from "../../reducer/constants";
import { addErrorNotification, addSuccessNotification, sleep } from "../../utils/notifications";
import Task from "../../components/Task";

import "./index.scss";

const MyTasksPage = () => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const { account } = useContext(StateContext);

    const updateTasks = async () => {
        await sleep(1000);
        // const newTasks = await getTasks();
        // setTasks(newTasks);
        setTasks([
            {
                ident: 1,
                name: "Like",
                description:
                    "https://medium.com/stableunit/engagement-rates-across-stablecoins-what-can-we-learn-ade855eb5b7b",
                xp: 2,
                deadlineMs: 1656299214523,
            },
            {
                ident: 1,
                name: "Comment",
                description:
                    "https://medium.com/stableunit/engagement-rates-across-stablecoins-what-can-we-learn-ade855eb5b7b",
                xp: 3,
                deadlineMs: 1656299214523,
            },
        ]);
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
                addSuccessNotification("Success", "Task has been added to your tasks");
                // addErrorNotification("Error", "Task has not been added");
            }
        }
    };

    return (
        <div className="allTasks">
            <div className="title">All tasks</div>
            <div className="allTasks__content">
                {tasks?.map((task) => (
                    <Task key={task.ident} task={task} onClick={handleCompleteTask(task.ident)} />
                ))}
            </div>
        </div>
    );
};

export default MyTasksPage;
