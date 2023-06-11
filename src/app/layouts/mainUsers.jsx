import React from "react";
import UsersListPage from "../components/page/userListPage";
import UserPage from "../components/page/userPage";
import { Redirect, useParams } from "react-router-dom";
import RefreshUser from "../components/page/RefreshUser";
import UsersLoader from "../components/ui/hoc/usersLoader";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";

const MainUsers = () => {
    const params = useParams();
    const { paramsId, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());

    return (
        <UsersLoader>
            {paramsId ? (
                edit ? (
                    paramsId === currentUserId ? (
                        <RefreshUser paramsId={paramsId} />
                    ) : (
                        <Redirect to={`/users/${currentUserId}`} />
                    )
                ) : (
                    <UserPage paramsId={paramsId} />
                )
            ) : (
                <UsersListPage />
            )}
        </UsersLoader>
    );
};

export default MainUsers;
