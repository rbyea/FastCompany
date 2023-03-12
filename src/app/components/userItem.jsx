import React, { useEffect } from "react";
import PropTypes from "prop-types";

const UserItem = ({ user }) => {
    useEffect(() => {
        console.log(user);
    }, [user]);

    if (user) {
        return (
            <>
                <h1>User</h1>
                {user.name}
                {user._id}
            </>
        );
    }
    return "Загрузка...";
};

UserItem.propTypes = {
    user: PropTypes.object
};

export default UserItem;
