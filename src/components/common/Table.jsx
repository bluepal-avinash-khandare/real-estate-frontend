import React from 'react';
import { Table as MUITable, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const Table = ({ headers, rows }) => (
  <MUITable>
    <TableHead>
      <TableRow>
        {headers.map((header) => <TableCell key={header}>{header}</TableCell>)}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row, index) => (
        <TableRow key={index}>
          {Object.values(row).map((value, i) => <TableCell key={i}>{value}</TableCell>)}
        </TableRow>
      ))}
    </TableBody>
  </MUITable>
);

export default Table;