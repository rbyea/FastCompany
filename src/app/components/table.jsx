import React from "react";
import PropTypes from "prop-types";
import Thead from "./thead";
import TableBody from "./tableBody";

const Table = ({ onSort, selectedSort, data, columns, children }) => {
  return (
    <table className="table table-dark table-striped mt-3">
      {
        children || (
          <>
            <Thead {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data }}/>
          </>
        )
      }
    </table>
  );
};

Table.propTypes = {
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  data: PropTypes.array,
  columns: PropTypes.object,
  children: PropTypes.array
};

export default Table;
