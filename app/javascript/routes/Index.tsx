import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Buildpack from "../components/buildpack/Buildpack";

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/buildpacks/:ns/:name" exact component={Buildpack} />
        </Switch>
    </Router>
);
