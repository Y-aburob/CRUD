import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Button, TextField } from '@mui/material';

type UserFormDialogProps = {
  open: boolean;
  handleClose: () => void;
  handleSave: () => void;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  number: string;
  setNumber: (value: string) => void;
  image: string;
  setImage: (value: string) => void;
  editMode: boolean;
};

export default function UserFormDialog({
  open,
  handleClose,
  handleSave,
  name,
  setName,
  email,
  setEmail,
  number,
  setNumber,
  image,
  setImage,
  editMode,
}: UserFormDialogProps) {
  return (
    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { width: '400px', padding: '.5rem' } }}>
      <DialogTitle>{editMode ? 'Edit User' : 'Add New User'}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2, gap: 3 }}>
          <TextField
            value={name}
            onChange={e => setName(e.target.value)}
            label="Name"
            variant="outlined"
            size="small"
          />
          <TextField
            value={email}
            onChange={e => setEmail(e.target.value)}
            label="Email"
            variant="outlined"
            size="small"
          />
          <TextField
            value={number}
            onChange={e => setNumber(e.target.value)}
            label="Number"
            variant="outlined"
            size="small"
          />
          <TextField
            value={image}
            onChange={e => setImage(e.target.value)}
            label="Image"
            variant="outlined"
            size="small"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
        <Button size="medium" sx={{ textTransform: 'capitalize' }} onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button
          size="medium"
          sx={{ textTransform: 'capitalize' }}
          onClick={handleSave}
          variant="contained"
          color="primary"
        >
          {editMode ? 'Edit User' : 'Add User'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
