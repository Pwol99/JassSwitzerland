import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const TableComponent = (props) => {
  return (
    <TableContainer component={Paper} style={{ height: "89vh" }}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Abstract</TableCell>
            <TableCell>Provider</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Metaquality</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.title}</td>
              <td>{row.abstract}</td>
              <td>{row.provider}</td>
              <td>{row.service}</td>
              <td>{row.metaquality}</td>
            </tr>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
