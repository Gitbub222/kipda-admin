import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/utils/firebase-config';
import { NotificationFirebaseType } from '@/types/types';

const CreateNotificationModal = ({ open, handleClose }: any) => {
    const [newNotification, setNewNotification] = useState<NotificationFirebaseType>({
        title: '',
        message: '',
        priority: '',
        detail: '',
        type: '',
        date: serverTimestamp(), // Use Firebase server timestamp
    });

    const priorityOptions = ['Low', 'Medium', 'High'];
    const [priorityType, setPriorityType] = React.useState<string>('Low');

    const handleDropdown = (event: SelectChangeEvent) => {
        setPriorityType(event.target.value);
        setNewNotification({ ...newNotification, priority: event.target.value });
    };

    const handleChange = (e: any) => {
        setNewNotification({ ...newNotification, [e.target.name]: e.target.value });
    };

    const submitForm = async () => {
        try {
            await addDoc(collection(db, "notifications"), {
                ...newNotification,
                priority: priorityType, // Ensure priority is set from dropdown
            });
            console.log("Document successfully written!");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        handleClose();
    };


    return (
        <Dialog open={open}>
            <DialogTitle>Create New Notification</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="title"
                    label="title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={newNotification.title}
                    onChange={handleChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="type"
                    label="type"
                    type="type"
                    fullWidth
                    variant="outlined"
                    value={newNotification.type}
                    onChange={handleChange}
                />
                <InputLabel id="demo-select-small-label">Priority</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={priorityType}
                    label="Priority"
                    onChange={handleDropdown}
                    defaultValue={"Low"}
                    style={{ width: '100%' }}
                >
                    {priorityOptions.map((priority) => (
                        <MenuItem key={priority} value={priority}>
                            {priority}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    margin="dense"
                    name="message"
                    label="message"
                    type="text"
                    fullWidth
                    multiline
                    rows={2}
                    variant="outlined"
                    value={newNotification.message}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="detail"
                    label="detail"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={newNotification.detail}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style={{ background: '#cf0420', color: '#fff', margin: '10px' }}>Cancel</Button>
                <Button onClick={submitForm} style={{ background: '#161b33', color: '#fff', margin: '10px' }}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateNotificationModal;
