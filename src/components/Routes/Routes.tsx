import React from "react";
import { Switch, Route } from "react-router-dom";

import LandingPage from "../../pages/LandingPage";
import AddTaskPage from "../../pages/AddTaskPage";
import JobPage from "../../pages/JobPage";
import TasksInformationPage from "../../pages/TasksInformationPage";
import VerificationPage from "../../pages/VerificationPage";

const Routes = () => (
    <Switch>
        <Route exact path="/">
            <LandingPage />
        </Route>

        <Route exact path="/add-task">
            <AddTaskPage />
        </Route>

        <Route exact path="/job">
            <JobPage />
        </Route>

        <Route exact path="/tasks-information">
            <TasksInformationPage />
        </Route>

        <Route exact path="/verification">
            <VerificationPage />
        </Route>
    </Switch>
);

export default Routes;
