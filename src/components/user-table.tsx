import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

import { getUsers } from '@/utils/firestore';

export default function UserTable({ users, page, rowsPerPage, handleOpenModal }: { users: any, page: number, rowsPerPage: number, handleOpenModal: Function }) {

    return (
    
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{background: "#161b33"}}>
                <TableRow style={{background: "#161b33", color: "#fff"}}>
                    <TableCell align="left" style={{color: "#fff"}}>First name</TableCell>
                    <TableCell align="left" style={{color: "#fff"}}>Last name</TableCell>
                    <TableCell align="left" style={{color: "#fff"}}>Email</TableCell>
                    <TableCell align="left" style={{color: "#fff"}}>Zip code</TableCell>
                    <TableCell align="left" style={{color: "#fff"}}></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user: any) => (
                        <TableRow
                            key={user.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align="left">
                                {user.firstName}
                            </TableCell>
                            <TableCell align="left">{user.lastName}</TableCell>
                            <TableCell align="left">{user.email}</TableCell>
                            <TableCell align="left">{user.zipCode}</TableCell>
                            <TableCell align="right">
                                <Button onClick={() => handleOpenModal(user)}>Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>

    );
}
