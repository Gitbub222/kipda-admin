import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';

import UserTable from '@/components/user-table';
import UserModal from '@/components/modal/edit-user';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import { getUsers } from '@/utils/firestore';
import { CircularProgress, Container } from '@mui/material';
import RootLayout from '@/layout';

export default function Users() {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        zipCode: '',
    });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenModal = (user: any) => {
        setCurrentUser(user);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleUpdateUserDetails = () => {
        console.log("Updated user details:", currentUser);
        handleCloseModal();
    };

    const handleRemoveUser = () => {
        console.log("Removed user:", currentUser.id);
        handleCloseModal();
    };

    const handleResetPassword = () => {
        console.log("Password reset for user:", currentUser.id);
        handleCloseModal();
    };

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) router.push('/login');
    }, [user, loading, router]);

    const [users, setUsers] = React.useState([]) as any;

    React.useEffect(() => {
        const fetchData = async () => {
            const users = await getUsers();
            setUsers(users);
        };
        fetchData();
    }, []);


    if (loading || !user) return <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', 
        }}
    >
        <CircularProgress style={{ color: "#0483F3" }} />
    </Box>;

    return (
        <RootLayout pageTitle="Users" pageDescription="Manage users">
            <Container sx={{ margin: 0, minWidth: '80vw' }}>
                <TableContainer component={Paper}>
                    <UserTable users={users} page={page} rowsPerPage={rowsPerPage} handleOpenModal={handleOpenModal} />
                    <UserModal
                        open={modalOpen}
                        handleClose={handleCloseModal}
                        currentUser={currentUser}
                        handleChange={handleChange}
                        handleUpdateUserDetails={handleUpdateUserDetails}
                        handleRemoveUser={handleRemoveUser}
                        handleResetPassword={handleResetPassword}
                    />
                </TableContainer>
                <TablePagination
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Container>
        </RootLayout>
    );
}
