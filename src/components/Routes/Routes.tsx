import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import CreateTaskPage from "../../pages/CreateTaskPage";
import MyTasksPage from "../../pages/MyTasksPage";
import AllTasksPage from "../../pages/AllTasksPage";
import VerificationPage from "../../pages/VerificationPage";

const Routes = () => (
    <Switch>
        <Route exact path="/">
            <Redirect to="/all-tasks" />
        </Route>

        <Route exact path="/create-task">
            <CreateTaskPage />
        </Route>

        <Route exact path="/my-tasks">
            <MyTasksPage />
        </Route>

        <Route exact path="/all-tasks">
            <AllTasksPage />
        </Route>

        <Route exact path="/verification">
            <VerificationPage />
        </Route>
    </Switch>
);

export default Routes;
