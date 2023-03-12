import React from "react";
import Navbar from "./components/navbar";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import MainUsers from "./layouts/usersPage";

function App() {
    return (
        <>
            <Navbar />
            <div className="section section_default">
                <div className="wrapper wrapper_large">
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route path="/login" component={Login}/>
                        <Route path="/users/:paramsId?" component={MainUsers} />
                    </Switch>
                </div>
            </div>
        </>
    );
}

export default App;
