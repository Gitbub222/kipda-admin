// pages/notifications.js
import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';


import NotificationModal from '@/components/modal/notification-modal';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import CreateNotificationModal from '@/components/modal/create-notification';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import { colors } from '@/constants';
import RootLayout from '@/layout';
import { fetchNotifications } from '@/utils/firestore';
import { priorities } from '@/types/types';


const highStyle = { background: '#cf0420', color: '#fff', borderRadius: 5, fontWeight: "bold", padding: "5px 23px 5px 23px" };
const mediumStyle = { background: '#fcbb08', color: '#fff', borderRadius: 5, fontWeight: "bold", padding: "5px 10px 5px 10px" };
const lowStyle = { background: '#4d98fa', color: '#fff', borderRadius: 5, fontWeight: "bold", padding: "5px 23px 5px 23px" };

const priorityStyle = (priority: string) => {
    if (priority === priorities.HIGH) {
        return highStyle;
    } else if (priority === priorities.MEDIUM) {
        return mediumStyle;
    } else {
        return lowStyle;
    }
};

export default function HomePage() {
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [notifications, setNotifications] = useState([] as any);
    const [modalOpen, setModalOpen] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [createModalOpen, setCreateModalOpen] = useState(false);

    // Function to handle submission of new notification
    const handleCreateNotification = (notification: any) => {
        console.log(notification);
    };

    const handleOpenModal = (notification: any) => {
        setSelectedNotification(notification);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };


    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            fetchNotifications().then((notifications) => {
                setNotifications(notifications);
            });
        } else if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);


    if (loading || !user) return <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}
    >
        <CircularProgress style={{ color: colors.primary }} />
    </Box>;

    return (
        <RootLayout pageTitle="Notifications" pageDescription="Manage notifications">
            <Container sx={{ margin: 0, minWidth: '70vw' }}>
                <Typography variant="h4" gutterBottom>
                    Notifications
                </Typography>
                <Button variant="contained" style={{ background: colors.primary, marginBottom: "20px", float: 'right' }} onClick={() =>
                    setCreateModalOpen(true)} startIcon={<NotificationAddIcon style={{ color: '#fff' }} />}>
                    Create Notification
                </Button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead style={{ background: colors.primary }}>
                            <TableRow style={{ background: colors.primary, color: colors.white }}>
                                <TableCell align="left" style={{ color: colors.white }}>Title</TableCell>
                                <TableCell align="left" style={{ color: colors.white }}>Message</TableCell>
                                <TableCell align="left" style={{ color: colors.white }}>Type</TableCell>
                                <TableCell align="left" style={{ color: colors.white }}>Priority</TableCell>
                                <TableCell align="left" style={{ color: colors.white }}>Date</TableCell>
                                <TableCell align="left" style={{ color: colors.white }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {notifications.map((notification: any) => (
                                <TableRow key={notification}>
                                    <TableCell component="th" scope="row" align="left">{notification.title}</TableCell>
                                    <TableCell align="left">{notification.message}</TableCell>
                                    <TableCell align="left">{notification.type}</TableCell>
                                    <TableCell align="left" style={{ textAlign: "left" }}>
                                        <span
                                            style={priorityStyle(notification.priority.toLowerCase())}>
                                            {notification.priority}
                                        </span>
                                    </TableCell>
                                    <TableCell align="left">{notification.date}</TableCell>
                                    <TableCell component="th" scope="row" align="left">
                                        <Button onClick={() => {
                                            setSelectedNotification(notification);
                                            handleOpenModal(notification);
                                        }}>Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>

                </TableContainer>
                <NotificationModal
                    notification={selectedNotification}
                    open={modalOpen}
                    handleClose={handleCloseModal}
                />

                <TablePagination
                    component="div"
                    count={notifications.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <CreateNotificationModal open={createModalOpen}
                    handleClose={() => setCreateModalOpen(false)} handleSubmit={handleCreateNotification} />
            </Container>
        </RootLayout>
    );

}

