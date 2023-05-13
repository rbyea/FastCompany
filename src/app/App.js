import React from "react";
import Navbar from "./components/ui/navbar";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import MainUsers from "./layouts/mainUsers";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProffesion";
import { QualitieProvider } from "./hooks/useQualitie";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./hooks/useAuth";

function App() {
    return (
        <>
            <AuthProvider>
            <Navbar />
            <QualitieProvider>
                <ProfessionProvider>
                    <div className="section section_default">
                        <div className="wrapper wrapper_large">
                            <Switch>
                                <Route exact path="/" component={Main} />
                                <Route path="/login/:type?" component={Login} />
                                <Route
                                    path="/users/:paramsId?/:edit?"
                                    component={MainUsers}
                                />
                            </Switch>
                        </div>
                    </div>
                </ProfessionProvider>
            </QualitieProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    );
}

export default App;
