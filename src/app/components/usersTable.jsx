import React from "react";
import PropTypes from "prop-types";
import BookMark from "./common/bookmark";
import Qualities from "./ui/qualities/qualitiesList";
import Table from "./common/table/table";
import TableUserName from "./common/table/TableUserName";
import Profession from "./ui/profession";

const UsersTable = ({
    users,
    onSort,
    onToggleBookMark,
    selectedSort,
    ...rest
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => <TableUserName user={user} />
        },
        qualities: {
            name: "Качество",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        profession: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        }
    };

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default UsersTable;
