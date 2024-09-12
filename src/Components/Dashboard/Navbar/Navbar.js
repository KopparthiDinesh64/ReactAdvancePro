import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Container, Menu, MenuItem, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
  '&.active': {
    fontWeight: 'bold',
  },
}));

const themes = {
  light: {
    background: 'white',
    color: '#000',
  },
  blue: {
    background: '#5b89f5',
    color: '#fff',
  },
  dark: {
    background: '#424242',
    color: '#fff',
  },
};

const Navbar = ({ theme, setTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)'); // Detect screen size

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleThemeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleThemeClose = (themeKey) => {
    setTheme(themes[themeKey]);
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ background: theme.background, color: theme.color }}>
        <Toolbar>
          <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            
            {/* Logo */}
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontFamily: "lobster",
                cursor: "pointer"
              }}
              onClick={toggleSidebar}
            >
              <img src='https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1726040446/logo_lihfpp.png' style={{ width: "100px", height: "70px" }} alt="Logo" />
            </Typography>

            {/* Conditional Navigation Links (based on screen size) */}
            {!isMobile ? (
              <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                <StyledNavLink to="/DashboardPage" end>
                  <Button sx={{ color: theme.color }}>Home</Button>
                </StyledNavLink>
                <StyledNavLink to="/about">
                  <Button sx={{ color: theme.color }}>About</Button>
                </StyledNavLink>
                <StyledNavLink to="/contact">
                  <Button sx={{ color: theme.color }}>Explore</Button>
                </StyledNavLink>
                <Button sx={{ color: theme.color }} onClick={handleThemeClick}>Theme</Button>
              </Box>
            ) : (
              <IconButton edge="end" color="inherit" onClick={toggleSidebar}>
                <MenuIcon />
              </IconButton>
            )}

            {/* Theme Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleThemeClose('light')}>Light</MenuItem>
              <MenuItem onClick={() => handleThemeClose('blue')}>Blue</MenuItem>
              <MenuItem onClick={() => handleThemeClose('dark')}>Dark</MenuItem>
            </Menu>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer for Mobile */}
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        <List sx={{ width: 250, background: theme.background, height: '100%', color: theme.color }}>
          <ListItem button>
          <StyledNavLink to="/DashboardPage" end>
                  <Button sx={{ color: theme.color }}>Home</Button>
                </StyledNavLink>
          </ListItem>
          <ListItem button>
          <StyledNavLink to="/about">
                  <Button sx={{ color: theme.color }}>About</Button>
                </StyledNavLink>
          </ListItem>
          <ListItem button>
          <StyledNavLink to="/contact">
                  <Button sx={{ color: theme.color }}>Explore</Button>
                </StyledNavLink>
          </ListItem>
          <ListItem>
          <Button sx={{ color: theme.color }} onClick={handleThemeClick}>Theme</Button>
          <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleThemeClose('light')}>Light</MenuItem>
              <MenuItem onClick={() => handleThemeClose('blue')}>Blue</MenuItem>
              <MenuItem onClick={() => handleThemeClose('dark')}>Dark</MenuItem>
            </Menu>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
