import React, { useContext, useEffect, useState } from "react";

import "./index.scss";
import { getTasks, takeTask } from "../../utils/api";
import { TaskType } from "../../utils/types";
import ButtonGradient from "../../ui-kit/components/ButtonGradient/ButtonGradient";
import GradientBorder from "../../ui-kit/components/GradientBorder/GradientBorder";
import GradientHref from "../../ui-kit/components/GradientHref/GradientHref";
import { StateContext } from "../../reducer/constants";
import { addErrorNotification, addSuccessNotification } from "../../utils/notifications";

const AllTasksPage = () => {
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

    const handleTakeTask = (id: number) => async () => {
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
                    <GradientBorder className="allTasks__task-wrapper" borderRadius={16}>
                        <div className="allTasks__task">
                            <div className="allTasks__task__info">
                                <div className="allTasks__task__info__title">
                                    <GradientHref>
                                        Task №{task.id}: {task.name}
                                    </GradientHref>
                                </div>
                                <div>
                                    <GradientHref>Description:</GradientHref> {task.description}
                                </div>
                                <div>
                                    <GradientHref>Reward:</GradientHref> {task.xp} XP
                                </div>
                                <div>
                                    <GradientHref>Deadline:</GradientHref>{" "}
                                    {new Date(task.deadlineMs).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="allTasks__task__button">
                                <ButtonGradient disabled={!account} width={250} onClick={handleTakeTask(task.id)}>
                                    Take Task
                                </ButtonGradient>
                            </div>
                        </div>
                    </GradientBorder>
                ))}
            </div>
        </div>
    );
};

export default AllTasksPage;
