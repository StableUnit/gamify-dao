import React, { useContext, useState } from "react";
import { TextField } from "@mui/material";

import { TaskWithProofType } from "../../utils/types";
import ButtonGradient from "../../ui-kit/components/ButtonGradient/ButtonGradient";
import GradientBorder from "../../ui-kit/components/GradientBorder/GradientBorder";
import GradientHref from "../../ui-kit/components/GradientHref/GradientHref";
import { StateContext } from "../../reducer/constants";

import "./index.scss";

type Props = {
    task: TaskWithProofType;
    onClick: (proofs: Record<string, string>) => void;
};

const TaskComplete = ({ task, onClick }: Props) => {
    const { account } = useContext(StateContext);
    const [proofData, setProofData] = useState<Record<string, string>>({});

    const handleProofChange = (proof: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setProofData((oldProofs) => ({
            ...oldProofs,
            [proof]: event.target.value,
        }));
    };

    const handleComplete = () => {
        onClick(proofData);
    };

    const hasAllProofs = Object.keys(proofData).filter((v) => v?.length > 0).length === task.proofs.length;

    return (
        <GradientBorder className="taskComplete-wrapper" borderRadius={16}>
            <div className="taskComplete">
                <div className="taskComplete__info">
                    <div className="taskComplete__info__title">
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
                    <div className="taskComplete__info__tasks">
                        <GradientHref>Proofs:</GradientHref>
                        {task.proofs.map((proof, i) => (
                            <TextField
                                className="taskComplete__info__proof"
                                id={`task-${task.ident}-proof-${i}`}
                                key={`task-${task.ident}-proof-${proof}`}
                                label={proof}
                                variant="outlined"
                                value={proofData[proof]}
                                onChange={handleProofChange(proof)}
                            />
                        ))}
                    </div>
                </div>
                <div className="taskComplete__button">
                    <ButtonGradient disabled={!account || !hasAllProofs} width={250} onClick={handleComplete}>
                        Complete Task
                    </ButtonGradient>
                </div>
            </div>
        </GradientBorder>
    );
};

export default TaskComplete;
