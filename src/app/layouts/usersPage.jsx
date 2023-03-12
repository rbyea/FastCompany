import React, { useEffect, useState } from "react";
import api from "../api";
import Users from "../components/users";
import { useParams } from "react-router-dom";
import UserItem from "../components/userItem";

const MainUsers = () => {
    const params = useParams();
    const { paramsId } = params;
    const [userId, setUserId] = useState();

    useEffect(() => {
        api.users.getById(paramsId).then((data) => setUserId(data));
    });

    return (
        <>
            {paramsId ? (
                <UserItem user={userId} />
            ) : (
                <Users />
            )}
        </>
    );
};

export default MainUsers;
