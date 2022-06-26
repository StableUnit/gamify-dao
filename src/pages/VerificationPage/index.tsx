import React, { useContext, useEffect, useState } from "react";

import { confirmTask, getTasksToVerificate } from "../../utils/api";
import { TaskWithVerificationProofType } from "../../utils/types";
import { StateContext } from "../../reducer/constants";
import { addErrorNotification, addSuccessNotification } from "../../utils/notifications";
import TaskVerification from "../../components/TaskVerification";

import "./index.scss";

const VerificationPage = () => {
    const [tasks, setTasks] = useState<TaskWithVerificationProofType[]>([]);
    const { account } = useContext(StateContext);

    const updateTasks = async () => {
        // const newTasks = await getTasksToVerificate(account); TODO: use it after backend implementation
        setTasks([
            {
                id: 1,
                name: "Like post on Medium",
                description:
                    // eslint-disable-next-line max-len
                    "Need to like this post: https://medium.com/stableunit/engagement-rates-across-stablecoins-what-can-we-learn-ade855eb5b7b",
                xp: 2,
                deadlineMs: 1656299214523,
                proofs: {
                    username: "testuser",
                },
            },
            {
                id: 2,
                name: "Comment post on Medium",
                description:
                    // eslint-disable-next-line max-len
                    "Need to Comment this post: https://medium.com/stableunit/engagement-rates-across-stablecoins-what-can-we-learn-ade855eb5b7b",
                xp: 3,
                deadlineMs: 1656299214523,
                proofs: {
                    username: "testuser",
                    commentUrl: "https://www.google.com/",
                },
            },
        ]);
    };
    useEffect(() => {
        if (account) {
            updateTasks();
        }
    }, [account]);

    const handleConfirmTask = (taskId: number, isConfirmed: boolean) => async () => {
        if (account) {
            try {
                await confirmTask(account, taskId, isConfirmed);
                addSuccessNotification("Success", "Task has been verificated");
            } catch (e) {
                addErrorNotification("Error", "Task has not been verificated");
            }
        }
    };

    return (
        <div className="verification">
            <div className="title">Verification</div>
            {account ? (
                <div className="verification__content">
                    {tasks.map((task) => (
                        <TaskVerification
                            key={task.id}
                            task={task}
                            onApprove={handleConfirmTask(task.id, true)}
                            onReject={handleConfirmTask(task.id, false)}
                        />
                    ))}
                </div>
            ) : (
                <div className="verification__error">To verificate tasks, you need to connect a wallet</div>
            )}
        </div>
    );
};

export default VerificationPage;
