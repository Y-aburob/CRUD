import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import './navMenu.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

function NavMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const items: MenuItem[] = [
    { label: 'Using Fetch', icon: 'pi pi-home', command: () => navigate('/') },
    { label: 'Using Axios', icon: 'pi pi-chart-line', command: () => navigate('/axios') },
    { label: 'Using Query', icon: 'pi pi-list', command: () => navigate('/query') },
  ];

  const activeIndex = items.findIndex(item => item?.command?.toString().includes(location.pathname));

  return (
    <Box className="card">
      <TabMenu model={items} activeIndex={activeIndex} className="custom-tabmenu" />
    </Box>
  );
}

export default NavMenu;

