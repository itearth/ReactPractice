import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CustomFilter from './FilterComp';
import Button from '@mui/material/Button';

const CustomTable = ({
  columns,
  rows,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  showFilters,
  filterValues,
  handleFilterChange,
  handleSort,
  handleEdit,
  sortingConfig, // Receive the sortingConfig from StickyHeadTable
}) => {
  // Sort the rows based on sortingConfig
  const sortedRows = rows.slice().sort((a, b) => {
    const aValue = a[sortingConfig.columnId];
    const bValue = b[sortingConfig.columnId];

    if (sortingConfig.direction === 'asc') {
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      } else {
        return aValue.localeCompare(bValue);
      }
    } else {
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return bValue - aValue;
      } else {
        return bValue.localeCompare(aValue);
      }
    }
  });

  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
                onClick={() => handleSort(column.id)}
              >
                {column.label}
                {column.id !== 'id' && column.id !== 'edit' && showFilters && (
                  <CustomFilter
                    filterValues={filterValues}
                    handleFilterChange={handleFilterChange}
                    columnId={column.id}
                  />
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows
            .filter((row) =>
              Object.entries(filterValues).every(([columnId, filterValue]) =>
                String(row[columnId]).toLowerCase().includes(filterValue.toLowerCase())
              )
            )
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'edit' ? (
                          <Button onClick={() => handleEdit(row.id)}>Edit</Button>
                        ) : (
                          column.format && typeof value === 'number' ? column.format(value) : value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default CustomTable;
