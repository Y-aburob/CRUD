import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';
import { ButtonComponent } from '../components';
import DialogComponent from '../components/DialogComponent';

type Users = {
  id: string;
  name: string;
  email: string;
  number: string;
  image: string;
};

function Home() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setEditButton('add user');
    setName('');
    setEmail('');
    setNumber('');
    setImage('');
    setEditingUser(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowDeleteMessage(false);
  };

  const [users, setUsers] = useState<Users[]>([]);
  const [editButton, setEditButton] = useState('Add User');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [image, setImage] = useState('');
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [editingUser, setEditingUser] = useState<Users | null>(null);
  const [pickedUserId, setPickedUserId] = useState('');

  const addUser = () => {
    const newUser: Users = {
      id: number,
      name: name,
      email: email,
      number: number,
      image: image,
    };
    setUsers(prevUser => [...prevUser, newUser]);
    handleClose();
  };

  const handleEdit = (userId: string) => {
    setEditButton('edit user');
    const userToEdit = users.find(user => user.id === userId);
    if (userToEdit) {
      setEditingUser(userToEdit);
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setNumber(userToEdit.number);
      setImage(userToEdit.image);
      setOpen(true);
    }
  };

  const saveUser = () => {
    if (editingUser) {
      const updateUser: Users = {
        id: editingUser.id,
        name: name,
        email: email,
        number: number,
        image: image,
      };
      setUsers(prevUsers => prevUsers.map(user => (user.id === updateUser.id ? updateUser : user)));
    } else {
      setEditButton('add user');
      addUser();
    }
    handleClose();
  };

  const handleDeleteUser = () => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== pickedUserId));
    setShowDeleteMessage(false);
  };

  const confirmDeleteUser = (userId: string) => {
    setPickedUserId(userId);
    setShowDeleteMessage(true);
  };

  return (
    <Box>
      <Box marginX={3} marginTop={4}>
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            '& .MuiDialog-paper': {
              width: '400px',
              height: '400px',
              padding: '.5rem',
              maxWidth: 'none',
            },
          }}
        >
          <DialogTitle textAlign={'center'}>Add New User</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2, gap: 3, justifyContent: 'end' }}>
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
            <ButtonComponent
              content="cancel"
              size="medium"
              sx={{ textTransform: 'capitalize' }}
              onClick={handleClose}
              color="error"
            />

            <ButtonComponent
              content={editButton}
              size="medium"
              sx={{ textTransform: 'capitalize' }}
              onClick={saveUser}
              variant="contained"
              color="primary"
            />
          </DialogActions>
        </Dialog>

        <DialogComponent
          open={showDeleteMessage}
          onClose={handleClose}
          title="Are You Sure You Want To Delete This User?"
          actions={{
            cancelText: 'Cancel',
            cancelAction: handleClose,
            confirmText: 'Yes',
            confirmAction: handleDeleteUser,
          }}
        />

        <Box sx={{ marginTop: 10, overflow: 'auto', marginBottom: 1 }}>
          <Box display={'flex'} marginTop={5} alignItems={'center'} justifyContent={'end'} gap={3}>
            <ButtonComponent
              content="Add User"
              variant="contained"
              sx={{ marginTop: 1, textTransform: 'capitalize', height: '32px' }}
              color="primary"
              onClick={handleOpen}
            />
          </Box>
          <TableContainer component={Paper} sx={{ marginTop: 2, width: '100%', minWidth: '600px' }}>
            <Table sx={{ width: '100%' }}>
              <TableHead>
                <TableRow sx={{ width: '100%' }}>
                  <TableCell sx={{ width: '25%' }}>Name</TableCell>
                  <TableCell sx={{ width: '25%' }}>Email</TableCell>
                  <TableCell sx={{ width: '25%' }}>Phone Number</TableCell>
                  <TableCell sx={{ width: '25%' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <TableRow
                    key={user.id}
                    sx={{
                      borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <TableCell sx={{ width: '25%', border: 'none' }}>{user?.name}</TableCell>
                    <TableCell sx={{ width: '25%', border: 'none' }}>{user?.email}</TableCell>
                    <TableCell sx={{ width: '25%', border: 'none' }}>{user?.number}</TableCell>
                    <TableCell sx={{ width: '25%', border: 'none', display: 'flex', flexWrap: 'nowrap' }}>
                      <ButtonComponent
                        content="Edit"
                        id={user.id}
                        onClick={e => handleEdit(e.currentTarget.id)}
                        variant="outlined"
                        sx={{
                          marginRight: 1,
                          minHeight: '32px',
                          px: 3,
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          borderRadius: '8px',
                          textTransform: 'capitalize',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                          },
                        }}
                      />
                      <ButtonComponent
                        content="Delete"
                        id={user.number}
                        onClick={() => confirmDeleteUser(user.id)}
                        variant="outlined"
                        color="error"
                        sx={{
                          minHeight: '32px',
                          px: 3,
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          borderRadius: '8px',
                          textTransform: 'capitalize',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'error.main',
                            color: 'white',
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;