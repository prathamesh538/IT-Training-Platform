import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  School,
  Business,
  AdminPanelSettings,
  Person,
  Logout,
} from '@mui/icons-material';
import { useData } from '../context/DataContext';

const Navbar = () => {
  const { isAuthenticated, currentUser, userRole, logout } = useData();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const getDashboardLink = () => {
    switch (userRole) {
      case 'admin':
        return '/admin';
      case 'provider':
        return '/provider';
      case 'student':
        return '/student';
      default:
        return '/';
    }
  };

  const getRoleIcon = () => {
    switch (userRole) {
      case 'admin':
        return <AdminPanelSettings />;
      case 'provider':
        return <Business />;
      case 'student':
        return <School />;
      default:
        return <Person />;
    }
  };

  const getRoleColor = () => {
    switch (userRole) {
      case 'admin':
        return 'error';
      case 'provider':
        return 'primary';
      case 'student':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 700,
          }}
        >
          IT Training Platform
        </Typography>

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ textTransform: 'none' }}
          >
            Home
          </Button>

          {isAuthenticated ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to={getDashboardLink()}
                startIcon={<Dashboard />}
                sx={{ textTransform: 'none' }}
              >
                Dashboard
              </Button>

              {userRole === 'provider' && (
                <Button
                  color="inherit"
                  component={Link}
                  to="/create-event"
                  sx={{ textTransform: 'none' }}
                >
                  Create Event
                </Button>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  icon={getRoleIcon()}
                  label={userRole?.toUpperCase()}
                  color={getRoleColor()}
                  size="small"
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'white' }}
                />
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{ color: 'white' }}
                >
                  <Avatar
                    sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.2)' }}
                  >
                    {currentUser?.name?.charAt(0) || 'U'}
                  </Avatar>
                </IconButton>
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem disabled>
                  <Typography variant="body2" color="text.secondary">
                    {currentUser?.name}
                  </Typography>
                </MenuItem>
                <MenuItem disabled>
                  <Typography variant="body2" color="text.secondary">
                    {currentUser?.email}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                textTransform: 'none',
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 