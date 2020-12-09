import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PlugPage from "./containers/PlugPage/PlugPage";
import RegisterLogin from "./containers/RegisterLogin/RegisterLogin";
import Main from "./containers/Main/Main";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
        <Route {...props} /> :
        <Redirect to={redirectTo} />
};

const Routes = ({user}) => {
    return (
        <>
            <Layout>
                <ToastContainer autoClose={4000} />
                <Switch>
                    <Route path='/' exact component={PlugPage} />
                    <ProtectedRoute
                        path="/register"
                        exact
                        component={RegisterLogin}
                        isAllowed={!user}
                        redirectTo='/'
                    />
                    <ProtectedRoute
                        path="/login"
                        exact
                        component={RegisterLogin}
                        isAllowed={!user}
                        redirectTo='/'
                    />
                    <ProtectedRoute
                        path="/calendar"
                        exact
                        component={Main}
                        isAllowed={user}
                        redirectTo='/'
                    />
                </Switch>
            </Layout>
        </>
    );
};

export default Routes;