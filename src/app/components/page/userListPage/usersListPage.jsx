import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../common/form/searchStatus";
import SearchInput from "../../searchInput";
import UsersTable from "../../usersTable";
import _ from "lodash";
import { useSelector } from "react-redux";
import {
    getLoadingProffesionsStatus,
    getProffesionsList
} from "../../../store/proffesions";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const currentUserId = useSelector(getCurrentUserId());
    const isloadingProfessions = useSelector(getLoadingProffesionsStatus());
    const professions = useSelector(getProffesionsList());

    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = React.useState({ path: null, order: "asc" });
    const [searchUser, setSearchUser] = useState("");

    const pageSize = 5;

    const users = useSelector(getUsersList());

    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
        console.log(userId);
    };
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });

        // setUsers();
        console.log(newArray);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSearchUser("");
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const inputSearch = (e) => {
        const { target } = e;
        setSelectedProf("");
        setSearchUser(target.value.toLowerCase());
    };

    if (users) {
        function filterUsers(data) {
            const searchUsers =
                searchUser.length > 0
                    ? data.filter((user) =>
                          user.name.toLowerCase().includes(searchUser)
                      )
                    : selectedProf
                    ? data.filter(
                          (user) =>
                              JSON.stringify(user.profession) ===
                              JSON.stringify(selectedProf)
                      )
                    : data;
            return searchUsers.filter((u) => u._id !== currentUserId);
        }

        const searchUsers = filterUsers(users);

        const count = searchUsers.length;
        const sortedUsers = _.orderBy(
            searchUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <>
                <SearchStatus length={count} />
                {professions && !isloadingProfessions && (
                    <div className="d-flex flex-shrink-0 mt-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn-filter btn btn-secondary"
                            onClick={clearFilter}
                        >
                            {" "}
                            Очистить
                        </button>
                    </div>
                )}

                <SearchInput
                    searchUser={searchUser}
                    inputSearch={inputSearch}
                />

                <div className="d-flex flex-column">
                    {count > 0 && (
                        <UsersTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-flex-start">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </>
        );
    }
};

export default UsersListPage;
