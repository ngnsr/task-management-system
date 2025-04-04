// src/components/layout/AppLayout.tsx
import React, { useState } from 'react';
import { 
  Box, 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  IconButton, 
  Avatar, 
  InputBase, 
  Tooltip, 
  Menu, 
  MenuItem, 
  useTheme, 
  alpha
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Search as SearchIcon,
  Dashboard as DashboardIcon,
  ViewKanban as KanbanIcon,
  Settings as SettingsIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Group as GroupIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useTaskStore } from '../../store/taskStore';

const DRAWER_WIDTH = 240;

interface AppLayoutProps {
  children: React.ReactNode;
  toggleTheme: () => void;
  darkMode: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, toggleTheme, darkMode }) => {
  const theme = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const { setFilterSearchTerm } = useTaskStore();
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterSearchTerm(event.target.value);
  };
  
  const navigationItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Kanban Board', icon: <KanbanIcon />, path: '/board' },
    { text: 'Groups', icon: <GroupIcon />, path: '/groups' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' }
  ];
  
  const drawer = (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        p: 2 
      }}>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
          Task Manager
        </Typography>
      </Box>
      <Divider />
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              component={Link} 
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Recent Groups
        </Typography>
        <List dense>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GroupIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Development Team" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GroupIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Marketing Projects" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: alpha(theme.palette.common.black, 0.05),
            borderRadius: 1,
            px: 1,
            mr: 2,
            flex: { xs: 1, md: 0.3 }
          }}>
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <InputBase
              placeholder="Search…"
              onChange={handleSearch}
              sx={{ flex: 1 }}
            />
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Toggle theme">
              <IconButton 
                color="inherit" 
                onClick={toggleTheme}
                sx={{ mr: 1 }}
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Filters">
              <IconButton color="inherit" sx={{ mr: 1 }}>
                <FilterIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Create new task">
              <IconButton
                color="primary"
                sx={{ 
                  mr: 2, 
                  backgroundColor: theme.palette.primary.main, 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark
                  }
                }}
                component={Link}
                to="/tasks/new"
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
            
            <IconButton
              onClick={handleUserMenuOpen}
              sx={{ p: 0 }}
            >
              <Avatar alt="User" src="/api/placeholder/40/40" />
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={userMenuAnchor}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(userMenuAnchor)}
              onClose={handleUserMenuClose}
            >
              <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleUserMenuClose}>My account</MenuItem>
              <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH 
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 0, 
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }, 
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default
        }}
      >
        <Toolbar /> {/* Spacer for AppBar */}
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;