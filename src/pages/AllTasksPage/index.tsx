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
        // const newTasks = await getTasks(); TODO: use it after backend implementation
        setTasks([
            {
                id: 1,
                name: "Like post on Medium",
                description:
                    // eslint-disable-next-line max-len
                    "Need to like this post: https://medium.com/stableunit/engagement-rates-across-stablecoins-what-can-we-learn-ade855eb5b7b",
                xp: 2,
                deadlineMs: 1656299214523,
            },
            {
                id: 2,
                name: "Comment post on Medium",
                description:
                    // eslint-disable-next-line max-len
                    "Need to Comment this post: https://medium.com/stableunit/engagement-rates-across-stablecoins-what-can-we-learn-ade855eb5b7b",
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
                addErrorNotification("Error", "Task has not been added");
            }
        }
    };

    return (
        <div className="allTasks">
            <div className="title">All tasks</div>
            <div className="allTasks__content">
                {tasks.map((task) => (
                    <Task key={task.id} task={task} onClick={handleCompleteTask(task.id)} />
                ))}
            </div>
        </div>
    );
};

export default MyTasksPage;
