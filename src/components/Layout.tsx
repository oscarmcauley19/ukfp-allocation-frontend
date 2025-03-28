import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { AccountCircle, LowPriority, PlayCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styles from "../styles/Layout.module.css"; // Import css modules stylesheet as styles
import React from "react";

const drawerWidth = 240;

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleAccountClicked = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClicked = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            Oriel Preference Selection
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleAccountClicked}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={Boolean(anchorEl)}
            onClose={handleAccountMenuClose}
            sx={
              {
                // display: { xs: 'block', md: 'none' },
              }
            }
          >
            <Link to="/login">
              <MenuItem onClick={handleAccountMenuClose}>Login</MenuItem>
            </Link>
            {/* <MenuItem onClick={handleAccountMenuClose}>My account</MenuItem> */}
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <Link to="/run" className={styles.menuBarLink}>
              <ListItem key="run" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PlayCircle />
                  </ListItemIcon>
                  <ListItemText primary="Run Simulations" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/rankings" className={styles.menuBarLink}>
              <ListItem key="rankings" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LowPriority />
                  </ListItemIcon>
                  <ListItemText primary="Rankings" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
