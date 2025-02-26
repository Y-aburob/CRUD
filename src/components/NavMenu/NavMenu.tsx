import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import './navMenu.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

function NavMenu() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current URL

  const items: MenuItem[] = [
    { label: 'CRUD with fetch', icon: 'pi pi-home', command: () => navigate('/'), url: '/' },
    { label: 'CRUD with axios', icon: 'pi pi-chart-line', command: () => navigate('/axios'), url: '/axios' },
    { label: 'CRUD with query', icon: 'pi pi-list', command: () => navigate('/query'), url: '/query' },
  ];

  const activeIndex = items.findIndex(item => item.url === location.pathname);

  return (
    <Box className="card">
      <TabMenu model={items} activeIndex={activeIndex} className="custom-tabmenu" />
    </Box>
  );
}

export default NavMenu;
