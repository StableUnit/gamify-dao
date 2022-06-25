import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import { ReactNotifications } from "react-notifications-component";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App/App";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { initialState, StateContext, DispatchContext } from "./reducer/constants";
import reducer from "./reducer";

import "react-notifications-component/dist/theme.css";
import "./index.scss";

const AppContainer = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {/* @ts-ignore */}
                <ErrorBoundary>
                    <BrowserRouter>
                        <ReactNotifications />
                        <App />
                    </BrowserRouter>
                </ErrorBoundary>
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <AppContainer />
    </React.StrictMode>,
    document.getElementById("root")
);
