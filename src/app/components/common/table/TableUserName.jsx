import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const TableUserName = ({ user }) => {
    return <Link className="users-link" to={`users/${user._id}`}>{user.name}</Link>;
};

TableUserName.propTypes = {
    user: PropTypes.object.isRequired
};

export default TableUserName;
