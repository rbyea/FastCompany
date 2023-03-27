import React from "react";
import PropTypes from "prop-types";

const SearchInput = ({ searchUser, inputSearch }) => {
    return (
        <div className="input-group mt-3">
            <input
                type="text"
                value={searchUser}
                placeholder="Поиск"
                onChange={inputSearch}
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
            />
        </div>
    );
};

SearchInput.propTypes = {
    searchUser: PropTypes.string,
    inputSearch: PropTypes.func
};

export default SearchInput;
