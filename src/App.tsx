import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Theme from './components/theme/theme';
import { withAuthenticator } from '@aws-amplify/ui-react'
import Tasks from './components/containers/tasks';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import Task from './components/containers/task';
import { AppBar, Menu, Container, Toolbar, Typography, Box, IconButton, MenuItem } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';

const StyledMenuItem = styled.div`
  margin-right: 100px;
 `;

function App() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const menuItems = [
    { path: "/", name: "Home" },
    { path: "/tasks", name: "Notas" },
    { path: "/users", name: "Usuarios" },
  ]

  return (
    <Theme>
      <Router>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <AmplifySignOut />
                </Typography>
              {
                menuItems.map((item) => {
                  return (
                    <StyledMenuItem>
                      <Link to={item.path}>
                        <Typography
                          variant="h6"
                          noWrap
                          component="div"
                          sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                          {item.name}
                        </Typography>
                      </Link>
                    </StyledMenuItem>
                  );
                })
              }
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <MenuItem>
                    <AmplifySignOut />
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Routes>
          <Route path="/task/:id" element={<Task />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/users" element={<h1>Users</h1>} />
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </Router>
    </Theme>

  );
}

export default withAuthenticator(App);;
