import React from "react";
import PropTypes from "prop-types";
import Arrow from "./arrow";

const Thead = ({ onSort, selectedSort, columns }) => {
    const handleSort = (title) => {
        if (selectedSort.path === title) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: title, order: "asc" });
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        scope="col"
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                    >
                        {columns[column].name}
                        {
                            selectedSort.path === columns[column].path
                                ? <Arrow order={selectedSort.order} />
                                : null
                        }
                    </th>
                ))}
            </tr>
        </thead>
    );
};

Thead.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default Thead;
