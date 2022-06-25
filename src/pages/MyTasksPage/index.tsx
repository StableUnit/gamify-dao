import React, { useContext, useEffect, useState } from "react";

import "./index.scss";
import { completeTask, getUserTasks, takeTask } from "../../utils/api";
import { TaskWithProofType } from "../../utils/types";
import { StateContext } from "../../reducer/constants";
import { addErrorNotification, addSuccessNotification } from "../../utils/notifications";
import TaskComplete from "../../components/TaskComplete";

const MyTasksPage = () => {
    const [tasks, setTasks] = useState<TaskWithProofType[]>([]);
    const { account } = useContext(StateContext);

    const updateTasks = async () => {
        // const newTasks = await getUserTasks(); TODO: use it after backend implementation
        setTasks([
            {
                id: 1,
                name: "Like post on Medium",
                description:
                    // eslint-disable-next-line max-len
                    "Need to like this post: https://medium.com/stableunit/engagement-rates-across-stablecoins-what-can-we-learn-ade855eb5b7b",
                xp: 2,
                deadlineMs: 1656299214523,
                proofs: ["Username"],
            },
            {
                id: 2,
                name: "Comment post on Medium",
                description:
                    // eslint-disable-next-line max-len
                    "Need to Comment this post: https://medium.com/stableunit/engagement-rates-across-stablecoins-what-can-we-learn-ade855eb5b7b",
                xp: 3,
                deadlineMs: 1656299214523,
                proofs: ["Username", "Comment url"],
            },
        ]);
    };
    useEffect(() => {
        if (account) {
            updateTasks();
        }
    }, [account]);

    const handleCompleteTask = (id: number) => async (proofs: Record<string, string>) => {
        if (account) {
            try {
                await completeTask(account, id, proofs);
                addSuccessNotification("Success", "Task has been sent for review");
                await updateTasks();
            } catch (e) {
                addErrorNotification("Error", "Task has not been sent for review");
            }
        }
    };

    return (
        <div className="myTasks">
            <div className="title">My tasks</div>
            {account ? (
                <div className="myTasks__content">
                    {tasks.map((task) => (
                        <TaskComplete key={task.id} task={task} onClick={handleCompleteTask(task.id)} />
                    ))}
                </div>
            ) : (
                <div className="myTasks__error">To see your tasks, you need to connect a wallet</div>
            )}
        </div>
    );
};

export default MyTasksPage;
