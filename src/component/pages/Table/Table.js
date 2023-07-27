import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Navbar from "../../generics/Navbar/Navbar";
import CustomTable from "../../generics/GenericTable/TableComp";
import CustomDialog from "../../generics/GenericTable/DialogComp";
// import CustomFilter from "../../generics/GenericTable/FilterComp";
import CustomFilter from "../../generics/GenericTable/FilterComp";

import styles from './Table.module.css';
 import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { PDFDownloadLink, PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// import { GetApp as GetAppIcon } from '@mui/icons-material';
import EditDialog from "../../generics/GenericTable/EditdialogComp";
import { GetApp as GetAppIcon, Search as SearchIcon } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  FormControl,
  Input,
  InputAdornment,
} from "@mui/material";


const columns = [
  { id: "id", label: "S.no" },
  { id: "name", label: "Name" },
  { id: "department", label: "Department" },
  { id: "designation", label: "Designation" },
  { id: "number", label: "Number" },
  { id: "type", label: "Type" },
  { id: "edit", label: "Edit" }, // New edit column
];

const initialRows = [
  {
    id: 1,
    name: "Abc",
    department: "developer",
    designation: "Engineer",
    number: 3246516539,
  },
  {
    id: 2,
    name: "brer",
    department: "accounts",
    designation: "Accountant",
    number: 6174698946,
  },
  {
    id: 3,
    name: "hdh",
    department: "finance",
    designation: "Manager",
    number: 6558648696,
  },
];

const sortRows = (rows, columnId, direction) => {
  return rows.slice().sort((a, b) => {
    const aValue = a[columnId];
    const bValue = b[columnId];

    if (direction === 'asc') {
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
};


const StickyHeadTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [rows, setRows] = useState(initialRows);
  const [filterValues, setFilterValues] = useState({});
  const [showFilters, setShowFilters] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [sortingConfig, setSortingConfig] = useState({
    columnId: 'id', // Default column to sort by
    direction: 'asc', // Default sorting order
  });
  const sortedRows = sortRows(rows, sortingConfig.columnId, sortingConfig.direction);

  const handleSort = (columnId) => {
    const sortRows = (rows, columnId, direction) => {
      return rows.slice().sort((a, b) => {
        const aValue = a[columnId];
        const bValue = b[columnId];
    
        if (direction === 'asc') {
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
    };
    setSortingConfig((prevConfig) => ({
      columnId: columnId,
      direction: prevConfig.columnId === columnId && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     console.log(formData);
//     if (typeof formData.id === "undefined") {
//       const data = [...rows];
//       const params = {
//         ...formData,
//         id: rows.length + 1,
//       };
//       data.push(params);
//       console.log(data, params);
//       setRows(data);
//       setFormData({});
//       setOpen(false);
//       return;
//     }
//     const updatedRow = {
//       ...formData,
//       number: parseInt(formData.number),
//     };

//     setRows((prevRows) => {
//       // const updatedRows = prevRows.map((row) => {
//     //     if (row.id === updatedRow.id) {
//     //       return updatedRow;
//     //     }
//     //     return row;
//     //   });
//     //   return updatedRows;
//     // });
//     const updatedRows = prevRows.map((row) =>
//     row.id === updatedRow.id ? updatedRow : row
//   );
//   return updatedRows;
// });
//     setFormData({});
//     setOpen(false);
//   };

const handleFormSubmit = (event) => {
  event.preventDefault();
  if (typeof formData.id === "undefined") {
    // Add new row
    const data = [...rows];
    const params = {
      ...formData,
      id: rows.length + 1,
    };
    data.push(params);
    setRows(data);
  } else {
    // Update existing row
    const updatedRow = {
      ...formData,
      number: parseInt(formData.number),
    };

    setRows((prevRows) =>
      prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );
  }

  setFormData({});
  setEditOpen(false); // Close the EditDialog after form submission
};


  const handleEdit = (id) => {
    const row = rows.find((row) => row.id === id);
    if (row) {
      setFormData(row); // Set the form data with the row data 
      setSelectedId(id); // Store the ID of the selected row 
      setEditOpen(true); // Open the edit dialog
    }
  };

  const handleFilterChange = (event, columnId) => {
    const value = event.target.value;
    setFilterValues((prevFilterValues) => ({
      ...prevFilterValues,
      [columnId]: value,
    }));
  };

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  // const handleExportPDF = () => {
  //   // const blob = (<PDFDocument rows={rows} />).toBlob();

  //   // const url = URL.createObjectURL(blob);
  //   // const downloadLink = (
  //   //   <PDFDownloadLink
  //   //     document={<PDFDocument rows={rows} />}
  //   //     fileName="employee_details.pdf"
  //   //   >
  //   //     {({ blob, url, loading, error }) =>
  //   //       loading ? "Loading document..." : "Export to PDF"
  //   //     }
  //   //   </PDFDownloadLink>
  //   // );

  //   // const win = window.open();
  //   // win.document.write(`
  //   //                   <html>
  //   //                   <head>
  //   //                     <title>Download PDF</title>
  //   //                   </head>
  //   //                   <body>
  //   //                     ${downloadLink}
  //   //                     <script>
  //   //                       setTimeout(function() {
  //   //                         window.location.href = "${url}";
  //   //                       }, 100);
  //   //                     </script>
  //   //                   </body>
  //   //                   </html>
  //   //                 `);
  // };

  const renderEditButton = (id) => (
    <Button onClick={() => handleEdit(id)}>Edit</Button>
  );
 

  return (
        <div>
          <Navbar />
    
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Details
          </Button>
          {/* <Button variant="outlined" onClick={handleExportPDF} startIcon={<GetAppIcon />}>
            Export to PDF
          </Button> */}
          
    
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Do you want any update? Click here."}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                If you want to update any employee details, fill out the form and press OK.
              </DialogContentText>
              <br />
              <form className={styles.formContainer} onSubmit={handleFormSubmit}>
                <br />
                <label htmlFor="name" className={styles.formLabel}>
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className={styles.formInput}
                  value={formData.name || ''}
                  onChange={handleFormChange}
                />
    
                <label htmlFor="department" className={styles.formLabel}>
                  Department:
                </label>
                <input
                  type="text"
                  id="department"
                  className={styles.formInput}
                  value={formData.department || ''}
                  onChange={handleFormChange}
                />
    
                <label htmlFor="number" className={styles.formLabel}>
                  Number:
                </label>
                <input
                  type="number"
                  id="number"
                  className={styles.formInput}
                  value={formData.number || ''}
                  onChange={handleFormChange}
                />
    
                <label htmlFor="designation" className={styles.formLabel}>
                  Designation:
                </label>
                <input
                  type="text"
                  id="designation"
                  className={styles.formInput}
                  value={formData.designation || ''}
                  onChange={handleFormChange}
                />
    
                <label htmlFor="type" className={styles.formLabel}>
                  Type:
                </label>
                <input
                  type="text"
                  id="type"
                  className={styles.formInput}
                  value={formData.type || ''}
                  onChange={handleFormChange}
                />
                <Button type="submit" onClick={handleClose} autoFocus>
                  Save
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <Button variant="outlined" onClick={() => setShowFilters((prevShowFilters) => !prevShowFilters)}>
      {showFilters ? 'Hide Filters' : 'Show Filters'}
    </Button>
     <CustomTable 
     columns={columns} 
      //  rows={initialRows.map((row) => ({
      //   ...row,
      //   edit: renderEditButton(row.id), // Render the edit button for each row
      // }))} 
      rows={sortedRows}
      page={page} 
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
       handleChangeRowsPerPage={handleChangeRowsPerPage} 
      showFilters={showFilters}
      filterValues={filterValues}
      handleFilterChange={handleFilterChange}
      handleSort={handleSort} 
      handleEdit={handleEdit} 
      sortingConfig={sortingConfig}
       />
      
      <EditDialog
        open={editOpen}
        handleClose={handleEditClose}
        formData={formData}
        handleFormChange={handleFormChange}
        handleFormSubmit={handleFormSubmit}
      />

          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              {/* <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                        {column.id !== 'id' && column.id !== 'edit' && showFilters && (
                          <FormControl size="small">
                            <Input
                              id={`filter-${column.id}`}
                              value={filterValues[column.id] || ''}
                              onChange={(event) => handleFilterChange(event, column.id)}
                              startAdornment={
                                <InputAdornment position="start">
                                  <SearchIcon />
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
    
                <TableBody>
                  {rows
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
              </Table>  */}
            </TableContainer>
             {/* <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </Paper>
        </div>
      );
    };

export default StickyHeadTable;











// import React, { useState } from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Navbar from '../../generics/Navbar/Navbar';
// import styles from '../../pages/Table/Table.module.css';
// import Input from '@mui/material/Input';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
// import SearchIcon from '@mui/icons-material/Search';
// import { PDFDownloadLink, PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// import { GetApp as GetAppIcon } from '@mui/icons-material';

// const columns = [
//   { id: 'id', label: 'S.no' },
//   { id: 'name', label: 'Name' },
//   { id: 'department', label: 'Department' },
//   { id: 'designation', label: 'Designation' },
//   { id: 'number', label: 'Number' },
//   { id: 'type', label: 'Type' },
//   { id: 'edit', label: 'Edit' } // New edit column
// ];

// const initialRows = [
//   {
//     id: 1,
//     name: 'Abc',
//     department: 'developer',
//     designation: 'Engineer',
//     number: 3246516539
//   },
//   {
//     id: 2,
//     name: 'brer',
//     department: 'accounts',
//     designation: 'Accountant',
//     number: 6174698946
//   },
//   {
//     id: 3,
//     name: 'hdh',
//     department: 'finance',
//     designation: 'Manager',
//     number: 6558648696
//   }
// ];

// const stylesPDF = StyleSheet.create({
//   page: {
//     fontFamily: 'Helvetica',
//     fontSize: 12,
//     padding: 20,
//   },
//   heading: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight: 'bold',
//   },
//   table: {
//     display: 'table',
//     width: 'auto',
//     margin: 'auto',
//     marginBottom: 10,
//   },
//   tableRow: {
//     flexDirection: 'row',
//   },
//   tableCell: {
//     borderWidth: 1,
//     borderColor: '#999',
//     padding: 8,
//   },
// });

// export default function StickyHeadTable() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [rows, setRows] = useState(initialRows);
//   const [filterValues, setFilterValues] = useState({});
//   const [showFilters, setShowFilters] = useState(true);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleFormChange = (event) => {
//     const { id, value } = event.target;
//     setFormData((prevData) => ({ ...prevData, [id]: value }));
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     console.log(formData);
//     if (typeof formData.id === 'undefined') {
//       const data = [...rows];
//       const params = {
//         ...formData,
//         id: rows.length + 1
//       }
//       data.push(params);
//       console.log(data, params);
//       setRows(data);
//       setFormData({});
//       setOpen(false);
//       return;
//     }
//     const updatedRow = {
//       ...formData,
//       number: parseInt(formData.number),
//     };

//     setRows((prevRows) => {
//       const updatedRows = prevRows.map((row) => {
//         if (row.id === updatedRow.id) {
//           return updatedRow;
//         }
//         return row;
//       });
//       return updatedRows;
//     });

//     setFormData({});
//     setOpen(false);
//   };

//   const handleEdit = (id) => {
//     const row = rows.find((row) => row.id === id);
//     if (row) {
//       setFormData(row);
//       setOpen(true);
//     }
//   };

//   const handleFilterChange = (event, columnId) => {
//     const value = event.target.value;
//     setFilterValues((prevFilterValues) => ({
//       ...prevFilterValues,
//       [columnId]: value
//     }));
//   };

//   const handleExportPDF = () => {
//     const blob = (
//       <PDFDocument rows={rows} />
//     ).toBlob();

//     const url = URL.createObjectURL(blob);
//     const downloadLink = (
//       <PDFDownloadLink document={<PDFDocument rows={rows} />} fileName="employee_details.pdf">
//         {({ blob, url, loading, error }) =>
//           loading ? 'Loading document...' : 'Export to PDF'
//         }
//       </PDFDownloadLink>
//     );

//     const win = window.open();
//     win.document.write(`
//       <html>
//       <head>
//         <title>Download PDF</title>
//       </head>
//       <body>
//         ${downloadLink}
//         <script>
//           setTimeout(function() {
//             window.location.href = "${url}";
//           }, 100);
//         </script>
//       </body>
//       </html>
//     `);
//   };

//   return (
//     <div>
//       <Navbar />

//       <Button variant="outlined" onClick={handleClickOpen}>
//         Add Details
//       </Button>
//       <Button variant="outlined" onClick={handleExportPDF} startIcon={<GetAppIcon />}>
//         Export to PDF
//       </Button>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Do you want any update? Click here."}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             If you want to update any employee details, fill out the form and press OK.
//           </DialogContentText>
//           <br />
//           <form className={styles.formContainer} onSubmit={handleFormSubmit}>
//             <br />
//             <label htmlFor="name" className={styles.formLabel}>
//               Name:
//             </label>
//             <input
//               type="text"
//               id="name"
//               className={styles.formInput}
//               value={formData.name || ''}
//               onChange={handleFormChange}
//             />

//             <label htmlFor="department" className={styles.formLabel}>
//               Department:
//             </label>
//             <input
//               type="text"
//               id="department"
//               className={styles.formInput}
//               value={formData.department || ''}
//               onChange={handleFormChange}
//             />

//             <label htmlFor="number" className={styles.formLabel}>
//               Number:
//             </label>
//             <input
//               type="number"
//               id="number"
//               className={styles.formInput}
//               value={formData.number || ''}
//               onChange={handleFormChange}
//             />

//             <label htmlFor="designation" className={styles.formLabel}>
//               Designation:
//             </label>
//             <input
//               type="text"
//               id="designation"
//               className={styles.formInput}
//               value={formData.designation || ''}
//               onChange={handleFormChange}
//             />

//             <label htmlFor="type" className={styles.formLabel}>
//               Type:
//             </label>
//             <input
//               type="text"
//               id="type"
//               className={styles.formInput}
//               value={formData.type || ''}
//               onChange={handleFormChange}
//             />
//             <Button type="submit" onClick={handleClose} autoFocus>
//               Save
//             </Button>
//           </form>
//         </DialogContent>
//       </Dialog>
//       <Button variant="outlined" onClick={() => setShowFilters((prevShowFilters) => !prevShowFilters)}>
//   {showFilters ? 'Hide Filters' : 'Show Filters'}
// </Button>

//       <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//         <TableContainer sx={{ maxHeight: 440 }}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell
//                     key={column.id}
//                     align={column.align}
//                     style={{ minWidth: column.minWidth }}
//                   >
//                     {column.label}
//                     {column.id !== 'id' && column.id !== 'edit' && showFilters && (
//                       <FormControl size="small">
//                         <Input
//                           id={`filter-${column.id}`}
//                           value={filterValues[column.id] || ''}
//                           onChange={(event) => handleFilterChange(event, column.id)}
//                           startAdornment={
//                             <InputAdornment position="start">
//                               <SearchIcon />
//                             </InputAdornment>
//                           }
//                         />
//                       </FormControl>
//                     )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {rows
//                 .filter((row) =>
//                   Object.entries(filterValues).every(([columnId, filterValue]) =>
//                     String(row[columnId]).toLowerCase().includes(filterValue.toLowerCase())
//                   )
//                 )
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row) => {
//                   return (
//                     <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                       {columns.map((column) => {
//                         const value = row[column.id];
//                         return (
//                           <TableCell key={column.id} align={column.align}>
//                             {column.id === 'edit' ? (
//                               <Button onClick={() => handleEdit(row.id)}>Edit</Button>
//                             ) : (
//                               column.format && typeof value === 'number' ? column.format(value) : value
//                             )}
//                           </TableCell>
//                         );
//                       })}
//                     </TableRow>
//                   );
//                 })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </div>
//   );
// }

// const PDFDocument = ({ rows }) => (
//   <Document>
//     <Page size="A4" style={stylesPDF.page}>
//       <View>
//         <Text style={stylesPDF.heading}>Employee Details</Text>
//         <View style={stylesPDF.table}>
//           <View style={[stylesPDF.tableRow, { backgroundColor: '#eaeaea' }]}>
//             {columns.map((column) => (
//               <View style={stylesPDF.tableCell} key={column.id}>
//                 <Text>{column.label}</Text>
//               </View>
//             ))}
//           </View>
//           {rows.map((row, index) => (
//             <View style={stylesPDF.tableRow} key={index}>
//               {columns.map((column) => (
//                 <View style={stylesPDF.tableCell} key={column.id}>
//                   <Text>{row[column.id]}</Text>
//                 </View>
//               ))}
//             </View>
//           ))}
//         </View>
//       </View>
//     </Page>
//   </Document>
// );
