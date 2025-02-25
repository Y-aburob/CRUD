import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import './navMenu.css'
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

function NavMenu() {

  const navigate = useNavigate()

  const items: MenuItem[] = [
    { label: 'CRUD with fetch', icon: 'pi pi-home', command: () => navigate("/") },
    { label: 'CRUD with axios', icon: 'pi pi-chart-line', command: () => navigate("/axios") },
    { label: 'CRUD with query', icon: 'pi pi-list', command: () => navigate("/query") },
  ];

  return (
    <Box className="card">
      <TabMenu model={items} className='custom-tabmenu'/>
    </Box>
  );
}

export default NavMenu;
