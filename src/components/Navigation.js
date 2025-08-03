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
    { label: "홈", path: "/" },
    { label: "행사 목록", path: "/events" },
    { label: "신청 현황", path: "/applications" },
  ];

  const eventManagementItems = [{ label: "내 행사 관리", path: "/my-events" }];

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

          {/* 행사 관리 메뉴 */}
          {isLoggedIn() && (
            <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
              {eventManagementItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  sx={{
                    mx: 0.5,
                    color: isActive(item.path) ? "#1976d2" : "text.primary",
                    borderBottom: isActive(item.path)
                      ? "2px solid #1976d2"
                      : "none",
                    borderRadius: 0,
                    fontSize: "0.875rem",
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
          )}
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
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/profile");
                  }}
                >
                  <AccountCircleIcon sx={{ mr: 1 }} />
                  프로필
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/applications");
                  }}
                >
                  <CheckCircleIcon sx={{ mr: 1 }} />
                  신청 현황
                </MenuItem>
                <Divider />
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

            {/* 행사 관리 메뉴 */}
            {isLoggedIn() && (
              <>
                <Divider />
                <MenuItem
                  disabled
                  sx={{ color: "text.secondary", fontSize: "0.875rem" }}
                >
                  행사 관리
                </MenuItem>
                {eventManagementItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      handleMenuClose();
                    }}
                    sx={{
                      color: isActive(item.path) ? "#1976d2" : "text.primary",
                      fontWeight: isActive(item.path) ? "bold" : "normal",
                      pl: 3,
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </>
            )}
            <Divider />
            {isLoggedIn() ? (
              <>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/profile");
                  }}
                >
                  <AccountCircleIcon sx={{ mr: 1 }} />
                  프로필
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/applications");
                  }}
                >
                  <CheckCircleIcon sx={{ mr: 1 }} />
                  신청 현황
                </MenuItem>
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
