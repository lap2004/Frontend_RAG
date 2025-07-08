"use client";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from "@mui/icons-material/Menu";
import { alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { isLogin } from '../lib/helper';
import { removeAuthCookies } from '../lib/helper/token';
import { useProtectedProtected } from '../services/hooks/hookAuth';

const Header = () => {
  const box: React.CSSProperties = {
    width: 200,
    height: 100,
    backgroundColor: "white",
    borderRadius: "10px",
    position: "absolute",
    top: "90%",
    right: "15%",
    boxShadow: "0px 0px 20px grey",
    overflow: "hidden",
  };

  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<any | undefined>(undefined);
  const { postProtectedProtected } = useProtectedProtected();

  const [scrolled, setScrolled] = useState(false);

  const handleLogout = async () => {
    try {
      removeAuthCookies()
      setUser(null);
      router.push("/login");

    } catch (err) {
      console.error("Logout error:", err);
    }
  };


  const fetchUser = React.useCallback(async () => {
    try {
      const res = await postProtectedProtected({});
      setUser(res.data);
    } catch {
      setUser(null);
    }
  }, [postProtectedProtected]);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      fetchUser();
    } else {
      setUser(null);
    }
    setLoggedIn(isLogin());

    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled, fetchUser]);

  const menuItems = [
    { label: "Trang Chủ", href: user?.role === "admin" ? "/admin/dashboard" : "/user/home" },
    { label: "Liên Hệ", href: "#" },

    loggedIn //thay doi duong dan
      ? { label: "Tư Vấn", href: "/tu-van" }  
      : { label: "Tuyển Sinh", href: "/tu-van" }, 
  ];

  return (
    <>
      <AppBar position="fixed" sx={{
        zIndex: 1,
        bgcolor: (theme) =>
          scrolled
            ? alpha(theme.palette.grey[700], 0.75)
            : "transparent",
        color: scrolled ? 'white' : 'black',
        backdropFilter: scrolled ? "blur(8px)" : "none",
        boxShadow: scrolled ? 3 : "none",
        transition: "background-color .3s ease",
      }}>
        <Box sx={{ width: "100%", maxWidth: 1440, mx: "auto" }}>
          <Toolbar
            sx={{
              justifyContent: { xs: "space-between", md: "space-between" },
            }}
          >
            
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Image width={1000} height={1000} src="/logoVl.png" className="w-36" alt="logo" />
            </Link>

            {/* —— DESKTOP MENU —— */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              {menuItems.map((item, idx) => (
                <motion.div key={idx} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    color="inherit"
                    sx={{
                      p: "10px 20px",
                      fontWeight: "light",
                      ":hover": { bgcolor: "#d62134", color: "white" },
                    }}
                  >
                    <Link href={item.href} style={{ textDecoration: "none", color: "white" }}>
                      {item.label}
                    </Link>
                  </Button>
                </motion.div>
              ))}

              {/* Đăng Nhập / Đăng Xuất */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                {!user && (
                  <Button
                    sx={{
                      bgcolor: loggedIn ? "#d32f2f" : "#1565c0",
                      color: "white",
                      fontWeight: "light",
                      ":hover": { bgcolor: loggedIn ? "#b71c1c" : "#0d47a1" },
                    }}
                    onClick={() => {
                      if (loggedIn) {
                        handleLogout();
                      } else {
                        router.push("/login");
                      }
                    }}
                  >
                    {loggedIn ? "Đăng Xuất" : "Đăng Nhập"}
                  </Button>
                )}
              </motion.div>

              {/* Avatar + popup info */}
              {user && (
                <div style={{ position: "relative" }}>
                  <motion.button onClick={() => setIsVisible(!isVisible)} whileTap={{ y: 1 }}>
                    <AccountCircleIcon className="text-[#1F2251]" sx={{ fontSize: 40 }} />
                  </motion.button>

                  <AnimatePresence initial={false}>
                    {isVisible && (
                      <motion.div
                        key="box"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        style={box}
                      >
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <span className="text-sm">
                            👋 Xin chào, {user.full_name || user.userName}
                          </span>
                          <span className="text-sm">{user.email}</span>
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </Box>

            {/* —— MOBILE: nút menu —— */}
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuIcon sx={{color:"white"}} />
            </IconButton>
          </Toolbar>
        </Box>
      </AppBar>

      {/* —— DRAWER cho mobile —— */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <List sx={{ width: 250 }}>
          {menuItems.map((item, idx) => (
            <ListItem key={idx} disablePadding onClick={() => setDrawerOpen(false)}>
              <ListItemButton component={Link} href={item.href}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding>
            {user ? (
              <ListItemButton
                onClick={() => {
                  handleLogout();
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary="Đăng Xuất" />
              </ListItemButton>
            ) : (
              <ListItemButton component={Link} href="/login" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="Đăng Nhập" />
              </ListItemButton>
            )}
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Header;
