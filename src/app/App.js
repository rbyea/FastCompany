import React from "react";
import Navbar from "./components/ui/navbar";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import MainUsers from "./layouts/mainUsers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProffesionsList } from "./store/proffesions";
import { loadUsersList } from "./store/users";

function App() {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProffesionsList());
        dispatch(loadUsersList());
    }, []);

    return (
        <>
            <AuthProvider>
                <Navbar />
                <div className="section section_default">
                    <div className="wrapper wrapper_large">
                        <Switch>
                            <Route exact path="/" component={Main} />
                            <Route path="/logout" component={LogOut} />
                            <Route path="/login/:type?" component={Login} />
                            <ProtectedRoute
                                path="/users/:paramsId?/:edit?"
                                component={MainUsers}
                            />
                        </Switch>
                    </div>
                </div>
            </AuthProvider>
            <ToastContainer />
        </>
    );
}

export default App;
