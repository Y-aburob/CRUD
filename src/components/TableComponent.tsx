import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

type User = {
  id: string;
  name: string;
  email: string;
  number: string;
  image: string;
};

type UserTableProps = {
  users: User[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 2, width: '100%', minWidth: '600px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '25%' }}>Name</TableCell>
            <TableCell sx={{ width: '25%' }}>Email</TableCell>
            <TableCell sx={{ width: '25%' }}>Phone Number</TableCell>
            <TableCell sx={{ width: '25%' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id} sx={{ borderBottom: '2px solid rgba(0, 0, 0, 0.1)' }}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.number}</TableCell>
              <TableCell>
                <Button size="small" onClick={() => onEdit(user.id)} variant="contained">Edit</Button>
                <Button size="small" onClick={() => onDelete(user.id)} color="error" sx={{ marginLeft: 1 }}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
