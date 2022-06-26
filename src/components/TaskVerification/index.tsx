import React from "react";

import { TaskWithVerificationProofType } from "../../utils/types";
import ButtonGradient from "../../ui-kit/components/ButtonGradient/ButtonGradient";
import GradientBorder from "../../ui-kit/components/GradientBorder/GradientBorder";
import GradientHref from "../../ui-kit/components/GradientHref/GradientHref";

import "./index.scss";

type Props = {
    task: TaskWithVerificationProofType;
    onApprove: () => void;
    onReject: () => void;
};

const TaskVerification = ({ task, onApprove, onReject }: Props) => {
    return (
        <GradientBorder className="task-verification-wrapper" borderRadius={16}>
            <div className="task-verification">
                <div className="task-verification__info">
                    <div className="task-verification__info__line task-verification__info__title">
                        <GradientHref>
                            Task №{task.ident}: {task.name}
                        </GradientHref>
                    </div>
                    <div className="task-verification__info__line">
                        <GradientHref>Description:</GradientHref> {task.description}
                    </div>
                    <GradientHref className="task-verification__info__line">Proof:</GradientHref>
                    <GradientBorder borderRadius={4} className="task-verification__info__proofs-wrapper">
                        <div className="task-verification__info__proofs">
                            {Object.entries(task.proofs).map(([key, value]) => (
                                <div>
                                    <GradientHref inline>{key}: </GradientHref>
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>
                    </GradientBorder>
                </div>
                <div className="task-verification__buttons">
                    <ButtonGradient width={150} onClick={onApprove}>
                        Approve
                    </ButtonGradient>
                    <ButtonGradient width={150} onClick={onReject}>
                        Reject
                    </ButtonGradient>
                </div>
            </div>
        </GradientBorder>
    );
};

export default TaskVerification;
