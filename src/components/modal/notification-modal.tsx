import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, TextField, InputLabel, OutlinedInput, Menu, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase-config';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const NotificationModal = ({ notification, open, handleClose, handleUpdateNotification }: { notification: any, open: any, handleClose: any, handleUpdateNotification: (updatedNotification: any) => void }) => {
  // If no notification is passed, do not render the modal
  if (!notification) return null;

  // State for form fields
  const [title, setTitle] = useState(notification.title);
  const [type, setType] = useState(notification.type);
  const [message, setMessage] = useState(notification.message);
  const [detail, setDetail] = useState(notification.detail);
  const [priorityType, setPriorityType] = React.useState<string>();

  // State to track if changes have been made
  const [isModified, setIsModified] = useState(false);
  const priorityOptions = ['Low', 'Medium', 'High'];

  // Functions to handle changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsModified(true);
  };
  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
    setIsModified(true);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    setIsModified(true);
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetail(e.target.value);
    setIsModified(true);
  };

  const handleDropdown = (event: SelectChangeEvent) => {
    setPriorityType(event.target.value as string); // Type assertion needed
    setIsModified(true);
  };

  const handleSaveChanges = async () => {
    // Update Firestore only if changes were made
    if (isModified) {
      const notificationRef = doc(db, 'notifications', notification.id);
      await updateDoc(notificationRef, {
        title,
        type,
        message,
        detail,
        priority: priorityType
      });
      handleUpdateNotification({  // Call the update function
        ...notification,
        title,
        type,
        message,
        detail,
        priority: priorityType
      });
      setIsModified(false); // Reset change tracker
    }
    handleClose();
  };

  // Check for changes on mount 
  useEffect(() => {
    const hasChanges = (
      title !== notification.title ||
      type !== notification.type ||
      message !== notification.message ||
      detail !== notification.detail ||
      priorityType !== notification.priority
    );
    setIsModified(hasChanges);
  }, []);



  return (
    <Modal
      open={open}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"

    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          Edit Notification
        </Typography>
        <TextField
          margin="dense"
          id="title"
          label="Title"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e: any) => handleTitleChange(e)}
          sx={{ mt: 2 }}
        />

        <InputLabel id="demo-select-small-label">Priority</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={priorityType}
          label="Priority"
          onChange={handleDropdown}
          defaultValue={notification.priority}
        >
          {priorityOptions.map((priority) => (
            <MenuItem key={priority} value={priority}>
              {priority}
            </MenuItem>
          ))}
        </Select>
        <TextField
          margin="dense"
          id="type"
          label="Type"
          fullWidth
          variant="outlined"
          value={type}
          onChange={(e: any) => handleTypeChange(e)}
          sx={{ mt: 2 }}
        />
        <TextField
          margin="dense"
          id="message"
          label="Message"
          fullWidth
          variant="outlined"
          value={message}
          onChange={(e: any) => handleMessageChange(e)}
          sx={{ mt: 2 }}
        />
        <TextField
          margin="dense"
          id="detail"
          label="Detail"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={detail}
          onChange={(e: any) => handleDetailChange(e)}
          sx={{ mt: 2 }}
        />
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleClose} style={{ color: '#cf0420' }}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveChanges} style={{ background: '#161b33' }} disabled={!isModified}>Save Changes</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NotificationModal;
