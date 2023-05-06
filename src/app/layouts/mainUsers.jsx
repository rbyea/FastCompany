import React from "react";
import UsersListPage from "../components/page/userListPage";
import UserPage from "../components/page/userPage";
import { useParams } from "react-router-dom";
import RefreshUser from "../components/ui/RefreshUser";
import UserProvider from "../hooks/useUser";

const MainUsers = () => {
    const params = useParams();
    const { paramsId, edit } = params;

    return (
        <>
            <UserProvider>
                {paramsId ? (
                    edit ? (
                        <RefreshUser paramsId={paramsId} />
                    ) : (
                        <UserPage paramsId={paramsId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default MainUsers;
