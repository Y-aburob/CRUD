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
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ButtonComponent } from '../components';
import DialogComponent from '../components/DialogComponent';
import { createUser, getUsers } from '../api';
import { deleteUser } from '../api/fetchMethod/deleteUser';
import { editUser } from '../api/fetchMethod/editUser';

type Users = {
  name: string;
  email: string;
  number: string;
  image: string;
  id?: string;
};

function Home() {
  const [open, setOpen] = useState(false);
  const endPoint = 'https://67bd8287321b883e790cc170.mockapi.io/users';
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);
  const [_editButton, setEditButton] = useState('Add User');

  const [useForm, setUserForm] = useState({
    name: '',
    email: '',
    number: '',
    image: '',
  });

  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [editingUser, setEditingUser] = useState<Users | null>(null);
  const [pickedUserId, setPickedUserId] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers(endPoint);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleOpen = () => {
    setEditButton('add user');

    setUserForm({
      name: '',
      email: '',
      number: '',
      image: '',
    });
    setEditingUser(null);
    setOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm(prev => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setOpen(false);
    setShowDeleteMessage(false);
  };

  const handleCreateUser = async () => {
    const newUser = await createUser(endPoint, {
      name: useForm.name,
      email: useForm.email,
      number: useForm.number,
      image: useForm.image,
    });
    if (newUser) {
      setUsers(prevUsers => [...prevUsers, newUser]);
      handleClose();
    }
  };

  const handleEdit = (userId: string) => {
    setEditButton('edit user');
    const userToEdit = users.find(user => user?.id === userId);
    if (userToEdit) {
      setEditingUser(userToEdit);
      setUserForm({
        name: userToEdit.name,
        email: userToEdit.email,
        number: userToEdit.number,
        image: userToEdit.image,
      });
      setOpen(true);
    }
  };

  const saveUser = async () => {
    if (editingUser) {
      const updatedUser = await editUser(endPoint, editingUser.id ?? '', {
        userName: useForm.name,
        userEmail: useForm.email,
        userNumber: useForm.number,
        usermage: useForm.image,
      });

      if (updatedUser) {
        setUsers(prevUsers => prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      }
    } else {
      setEditButton('add user');
      handleCreateUser();
    }
    handleClose();
  };

  const handleDeleteUser = async () => {
    const usersAfterDelete = await deleteUser(endPoint, users, pickedUserId);

    if (usersAfterDelete) {
      setUsers(usersAfterDelete);
      setShowDeleteMessage(false);
    }
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
              height: '430px',
              padding: '.5rem',
              maxWidth: 'none',
            },
          }}
        >
          <DialogTitle textAlign={'center'}>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>

          <form
            onSubmit={e => {
              e.preventDefault();
              saveUser();
            }}
          >
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2, gap: 3, justifyContent: 'end' }}>
                <TextField
                  value={useForm.name}
                  name="name"
                  onChange={handleInputChange}
                  label="Name"
                  variant="outlined"
                  size="small"
                  required
                />
                <TextField
                  value={useForm.email}
                  onChange={handleInputChange}
                  label="Email"
                  name="email"
                  variant="outlined"
                  size="small"
                  type="email"
                  required
                />
                <TextField
                  value={useForm.number}
                  onChange={handleInputChange}
                  label="Number"
                  name="number"
                  variant="outlined"
                  size="small"
                  required
                />
                <TextField
                  value={useForm.image}
                  onChange={handleInputChange}
                  label="Image"
                  name="image"
                  variant="outlined"
                  size="small"
                />
              </Box>
            </DialogContent>

            <DialogActions sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <ButtonComponent
                content="Cancel"
                sx={{ textTransform: 'capitalize' }}
                onClick={handleClose}
                color="error"
              />

              <ButtonComponent
                type="submit"
                content={editingUser ? 'Save Changes' : 'Add User'}
                size="medium"
                sx={{ textTransform: 'capitalize' }}
                variant="contained"
                color="primary"
              />
            </DialogActions>
          </form>
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
          <Typography
            maxWidth={'400px'}
            variant="h4"
            fontSize={'28px'}
            color="#1E88E5"
            sx={{ margin: { xs: 'auto', md: '0' }, textAlign: { xs: 'center', md: 'left' } }}
          >
            A CRUD System using fetch method
          </Typography>
          <Box
            display={'flex'}
            marginTop={5}
            alignItems={'center'}
            sx={{ justifyContent: { xs: 'center', md: 'end' } }}
            gap={3}
          >
            <ButtonComponent
              size="medium"
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
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map(user => (
                    <TableRow
                      key={user?.id}
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
                          id={user?.id}
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
                          id={user?.number}
                          onClick={() => confirmDeleteUser(user?.id ?? '')}
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
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
