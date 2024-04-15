import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase-config'; // Assuming you have your Firebase config setup


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function UserModal({ open, handleClose, currentUser, setCurrentUser }: {
  open: boolean;
  handleClose: () => void;
  currentUser: any;
  setCurrentUser: any;
  handleUpdateUserDetails: () => void;
  handleRemoveUser: () => void;
  handleResetPassword: () => void;

}) {
  const [isModified, setIsModified] = React.useState(false); // State for change tracking
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;

    // Create a new object with updated property:
    const updatedCurrentUser = {
      ...currentUser,
      [name]: value
    };

    // Update the currentUser state 
    setCurrentUser(updatedCurrentUser);

    setIsModified(true);
  };

  const handleUpdateUserDetails = async () => {
    if (isModified) {
      const userRef = doc(db, 'users', currentUser.id);
      try {
        await updateDoc(userRef, {
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
          zipCode: currentUser.zipCode
        });
        console.log('User updated successfully!');
        setIsModified(false); // Reset change flag

        // Add logic to update the users table (more on this later)

      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle} style={{ outline: 'none', border: 'none' }}>
        <Typography id="modal-modal-title" variant="h5" component="h2" style={{ marginBottom: "30px,", textAlign: "center" }}>
          Edit User
        </Typography>
        <TextField
          label="First Name"
          variant="outlined"
          name="firstName"
          value={currentUser.firstName}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          name="lastName"
          value={currentUser.lastName}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={currentUser.email}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Zip Code"
          variant="outlined"
          name="zipCode"
          value={currentUser.zipCode}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <Button style={{ background: '#141829' }} variant="contained" onClick={handleUpdateUserDetails}>
            Update Details
          </Button>
          <Button style={{ background: '#cf0420', color: 'white', outline: 'none', border: 'none' }} variant="outlined" onClick={() => { }}>
            Remove User
          </Button>
          <Button style={{ background: '#141841' }} variant="contained" onClick={() => { }}>
            Reset Password
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
