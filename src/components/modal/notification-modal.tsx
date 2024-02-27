import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, InputLabel, OutlinedInput, Menu, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';


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

const NotificationModal = ({ notification, open, handleClose }: { notification: any, open: any, handleClose: any }) => {
  // If no notification is passed, do not render the modal
  if (!notification) return null;

  // State for form fields
  const [title, setTitle] = useState(notification.title);
  const [type, setType] = useState(notification.type);
  const [message, setMessage] = useState(notification.message);
  const [detail, setDetail] = useState(notification.detail);

  // Function to handle saving changes
  const handleSaveChanges = () => {
    handleClose(); // Close modal after save
  };

  const priorityOptions = ['Low', 'Medium', 'High'];

  const [priorityType, setPriorityType] = React.useState<string>();

  const handleDropdown = (event: SelectChangeEvent) => {
    setPriorityType(event.target.value);
  };

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
          onChange={(e) => setTitle(e.target.value)}
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
          onChange={(e) => setType(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          margin="dense"
          id="message"
          label="Message"
          fullWidth
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
          onChange={(e) => setDetail(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleClose} style={{ color: '#cf0420' }}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveChanges} style={{ background: '#161b33' }}>Save Changes</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NotificationModal;
