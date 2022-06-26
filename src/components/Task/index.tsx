import React, { useContext } from "react";

import { TaskType } from "../../utils/types";
import ButtonGradient from "../../ui-kit/components/ButtonGradient/ButtonGradient";
import GradientBorder from "../../ui-kit/components/GradientBorder/GradientBorder";
import GradientHref from "../../ui-kit/components/GradientHref/GradientHref";
import { StateContext } from "../../reducer/constants";

import "./index.scss";

type Props = {
    task: TaskType;
    onClick: () => void;
};

const Task = ({ task, onClick }: Props) => {
    const { account } = useContext(StateContext);

    return (
        <GradientBorder className="task-wrapper" borderRadius={16}>
            <div className="task">
                <div className="task__info">
                    <div className="task__info__title">
                        <GradientHref>
                            Task №{task.ident}: {task.name}
                        </GradientHref>
                    </div>
                    <div>
                        <GradientHref>Description:</GradientHref> {task.description}
                    </div>
                    <div>
                        <GradientHref>Reward:</GradientHref> {task.xp} XP
                    </div>
                    <div>
                        <GradientHref>Deadline:</GradientHref> {new Date(task.deadlineMs).toLocaleDateString()}
                    </div>
                </div>
                <div className="task__button">
                    <ButtonGradient disabled={!account} width={250} onClick={onClick}>
                        Take Task
                    </ButtonGradient>
                </div>
            </div>
        </GradientBorder>
    );
};

export default Task;
