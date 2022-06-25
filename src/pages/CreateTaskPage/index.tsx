import React, { useState } from "react";
import { InputLabel, TextField } from "@mui/material";
import DatePicker from "react-datepicker";

import ButtonGradient from "../../ui-kit/components/ButtonGradient/ButtonGradient";
import GradientBorder from "../../ui-kit/components/GradientBorder/GradientBorder";
import { createTask } from "../../utils/api";

import "./index.scss";

const CreateTaskPage = () => {
    const [name, setName] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string | undefined>(undefined);
    const [xp, setXP] = useState(0);
    const [date, setDate] = React.useState(new Date());

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleXPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === undefined) {
            setXP(0);
        } else if (!Number.isNaN(+e.target.value)) {
            setXP(+e.target.value);
        }
    };

    const handleDateChange = (newValue: Date) => {
        setDate(newValue);
    };

    const hasAllData = !!(name && description && xp > 0 && date);

    const handleCreate = async () => {
        if (hasAllData) {
            await createTask({
                name,
                description,
                xp,
                date: date.getTime(),
            });
        }
    };

    return (
        <GradientBorder borderRadius={16}>
            <div className="createTask">
                <div className="title">Create task</div>
                <div className="createTask__content">
                    <TextField
                        className="createTask__content__field"
                        color="info"
                        id="name"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={handleNameChange}
                    />
                    <TextField
                        className="createTask__content__field"
                        id="description"
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={2}
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                    <TextField
                        className="createTask__content__field"
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        id="xp"
                        label="XP for task"
                        variant="outlined"
                        fullWidth
                        value={xp}
                        onChange={handleXPChange}
                    />
                    <div className="createTask__content__date-field">
                        <InputLabel>Deadline</InputLabel>
                        {/* @ts-ignore */}
                        <DatePicker selected={new Date()} onChange={handleDateChange} value={date} />
                    </div>
                </div>
                <ButtonGradient onClick={handleCreate} width={300} disabled={!hasAllData}>
                    Create Task
                </ButtonGradient>
            </div>
        </GradientBorder>
    );
};

export default CreateTaskPage;
