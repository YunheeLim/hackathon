import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventIcon from "@mui/icons-material/Event";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAuth } from "../contexts/AuthContext";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const { user, isLoggedIn, logout } = useAuth();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { label: "신청 현황", path: "/applications" },
    { label: "내 행사 관리", path: "/my-events" },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "white", color: "text.primary" }}
    >
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 0,
            mr: 4,
            cursor: "pointer",
            fontWeight: "bold",
            color: "#1976d2",
          }}
          onClick={() => navigate("/")}
        >
          행사신청 플랫폼
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {menuItems.map((item) => (
            <Button
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                mx: 1,
                color: isActive(item.path) ? "#1976d2" : "text.primary",
                borderBottom: isActive(item.path)
                  ? "2px solid #1976d2"
                  : "none",
                borderRadius: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#1976d2",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Desktop User Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          {isLoggedIn() ? (
            <>
              <Button
                onClick={handleProfileMenuOpen}
                sx={{ color: "text.primary", textTransform: "none" }}
              >
                <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                  {user.name.charAt(0)}
                </Avatar>
                {user.name}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
              </Menu>
            </>
          ) : (
            <Button variant="contained" onClick={handleLogin} sx={{ ml: 2 }}>
              로그인
            </Button>
          )}
        </Box>

        {/* Mobile Menu Button */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {menuItems.map((item) => (
              <MenuItem
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  handleMenuClose();
                }}
                sx={{
                  color: isActive(item.path) ? "#1976d2" : "text.primary",
                  fontWeight: isActive(item.path) ? "bold" : "normal",
                }}
              >
                {item.label}
              </MenuItem>
            ))}

            <Divider />
            {isLoggedIn() ? (
              <>
                <Divider />
                <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
              </>
            ) : (
              <MenuItem
                onClick={() => {
                  handleLogin();
                  handleMenuClose();
                }}
              >
                로그인
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
