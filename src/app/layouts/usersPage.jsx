import React from "react";
import UsersListPage from "../components/page/userListPage";
import UserPage from "../components/page/userPage";
import { useParams } from "react-router-dom";
import RefreshUser from "../components/ui/RefreshUser";

const MainUsers = () => {
    const params = useParams();
    const { paramsId, edit } = params;

    return (
        <>
            {paramsId ? (
                edit ? (
                    <RefreshUser paramsId={paramsId}/>
                ) : (
                    <UserPage paramsId={paramsId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default MainUsers;
