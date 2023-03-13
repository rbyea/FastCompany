import React from "react";
import Users from "../components/users";
import UserItem from "../components/userItem";
import { useParams } from "react-router-dom";

const MainUsers = () => {
    const params = useParams();
    const { paramsId } = params;

    return <>{paramsId ? <UserItem paramsId={paramsId}/> : <Users />}</>;
};

export default MainUsers;
