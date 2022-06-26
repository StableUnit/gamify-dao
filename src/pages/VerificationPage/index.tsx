import React, { useContext, useEffect, useState } from "react";

import { confirmTask, getTasksToVerificate } from "../../utils/api";
import { TaskWithVerificationProofType } from "../../utils/types";
import { StateContext } from "../../reducer/constants";
import { addErrorNotification, addSuccessNotification, sleep } from "../../utils/notifications";
import TaskVerification from "../../components/TaskVerification";

import "./index.scss";

const VerificationPage = () => {
    const [tasks, setTasks] = useState<TaskWithVerificationProofType[]>([]);
    const { account } = useContext(StateContext);

    const updateTasks = async () => {
        // const newTasks = await getTasksToVerificate(account); TODO: use it after backend implementation
        setTasks([
            {
                ident: 1,
                name: "Like",
                description:
                    // eslint-disable-next-line max-len
                    "https://medium.com/stableunit/engagement-rates-across-stablecoins-what-can-we-learn-ade855eb5b7b",
                xp: 2,
                deadlineMs: 1656299214523,
                proofs: {
                    username: "testuser",
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
                await sleep(250);
                addSuccessNotification("Success", "Task has been verificated");
                setTasks([]);
                // addErrorNotification("Error", "Task has not been verificated");
            }
        }
    };

    console.log(account);
    if ((account && account.toLowerCase() !== "0xb79ebaa162f92a3e5b8e0ce3446e8b4a4e5c0a4b") || tasks.length === 0) {
        return (
            <div className="verification">
                <div className="title">Verification</div>
                <div className="verification__error">No tasks to verificate</div>
            </div>
        );
    }

    return (
        <div className="verification">
            <div className="title">Verification</div>
            {account ? (
                <div className="verification__content">
                    {tasks.map((task) => (
                        <TaskVerification
                            key={task.ident}
                            task={task}
                            onApprove={handleConfirmTask(task.ident, true)}
                            onReject={handleConfirmTask(task.ident, false)}
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
