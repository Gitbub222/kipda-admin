import React, { useState, useEffect, useRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, TextField, Chip, OutlinedInput, SelectChangeEvent } from '@mui/material';
import { collection, addDoc, serverTimestamp, FieldValue } from 'firebase/firestore';
import { db } from '@/utils/firebase-config';

interface NotificationType {
    title: string;
    message: string;
    priority: string;
    detail: string;
    type: string;
    date: FieldValue | null;
    selectedCounties: string[];
}

const countyOptions = ['Jefferson', 'Bullitt', 'Shelby', 'Spencer', 'Oldham', 'Henry', 'Trimble'];
const typeOptions = ['Weather', 'Service announcement', 'Closure', 'Event', 'Health'];
const priorityOptions = ['Low', 'Medium', 'High'];

interface Props {
    open: boolean;
    handleClose: () => void; // Assuming handleClose is a function that takes no arguments and returns void
}

const CreateNotificationModal: React.FC<Props> = ({ open, handleClose }) => {
    const titleInputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (open) {
    titleInputRef.current?.focus();
  }
}, [open]);

    const [newNotification, setNewNotification] = useState<NotificationType>({
        title: '',
        message: '',
        priority: 'Low', // Default priority
        detail: '',
        type: 'Weather', // Default type
        date: null, // Adjusted to null for initial state
        selectedCounties: [],
    });

    const handleTypeChange = (event: SelectChangeEvent) => {
        setNewNotification({ ...newNotification, type: event.target.value });
    };

    const handlePriorityChange = (event: SelectChangeEvent) => {
        setNewNotification({ ...newNotification, priority: event.target.value });
    };

    const handleCountyChange = (event: SelectChangeEvent<typeof newNotification.selectedCounties>) => {
        const value = event.target.value;
        // On TypeScript, casting might be necessary here due to the multi-select returning a read-only array
        setNewNotification({ ...newNotification, selectedCounties: typeof value === 'string' ? value.split(',') : value });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewNotification({ ...newNotification, [event.target.name]: event.target.value });
    };

    const submitForm = async () => {
        try {
            await addDoc(collection(db, "notifications"), {
                ...newNotification,
                date: serverTimestamp(), // Assign timestamp at submission time
            });
            console.log("Document successfully written!");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Send Notification</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={newNotification.title}
                    onChange={handleChange}
                    inputRef={titleInputRef}
                />
                <InputLabel id="type-select-label">Type</InputLabel>
                <Select
                    labelId="type-select-label"
                    id="type-select"
                    value={newNotification.type}
                    onChange={handleTypeChange}
                    fullWidth
                >
                    {typeOptions.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </Select>
                <InputLabel id="priority-select-label">Priority</InputLabel>
                <Select
                    labelId="priority-select-label"
                    id="priority-select"
                    value={newNotification.priority}
                    onChange={handlePriorityChange}
                    fullWidth
                >
                    {priorityOptions.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </Select>
                <TextField
                    margin="dense"
                    name="message"
                    label="Message Preview"
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
                    label="Detailed Message"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={newNotification.detail}
                    onChange={handleChange}
                />
                <InputLabel id="county-select-label">Select Counties</InputLabel>
                <Select
                    labelId="county-select-label"
                    id="county-select"
                    multiple
                    value={newNotification.selectedCounties}
                    onChange={handleCountyChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <div>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </div>
                    )}
                    fullWidth
                >
                    {countyOptions.map(name => (
                        <MenuItem key={name} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={submitForm}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateNotificationModal;
