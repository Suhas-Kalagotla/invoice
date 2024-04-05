"use client";

// import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Typography,
  IconButton,
  Stack,
  Container,
  Chip,
  Button,
} from "@mui/material";

import { useSession, signIn, signOut } from "next-auth/react";

// import { useSelector, useDispatch } from "react-redux";

// tHEMEE
import { CloudOffOutlined, DarkMode, LightMode } from "@mui/icons-material";
import MenuDrawler from "./MenuDrawler";
import { useState } from "react";
import Profile from "./profile/Profile";

function ResponsiveAppBar() {
  const { data: session } = useSession();

  // const dispatch = useDispatch();

  // const colorMode = useSelector((state: RootState) => state.app.light_mode);

  const colorMode = "dark";
  const isOnline = true;
  // const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // useEffect(function () {
  //   window.addEventListener("offline", function () {
  //     setIsOnline(false);
  //   });

  //   // Online
  //   window.addEventListener("online", function () {
  //     setIsOnline(true);
  //   });
  // }, []);

  //   Menu drawer controller

  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  return (
    <>
      <AppBar
        color="inherit"
        sx={{ bgcolor: "#3d4c59", color: "#fff" }}
        position="fixed"
      >
        <Container maxWidth="xl">
          <Toolbar variant="dense" disableGutters>
            <Stack
              sx={{ width: "100%" }}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack alignItems={"center"} direction="row">
                <IconButton
                  className="menu"
                  onClick={() => {
                    setShowDrawer(true);
                  }}
                >
                  <MenuIcon fontSize="small" sx={{ color: "#fff" }} />
                </IconButton>
                <Typography
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { md: "flex" },
                    // fontFamily: 'monospace',
                    fontWeight: 700,
                    // letterSpacing: '.3rem',
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Invoice
                </Typography>
                {!isOnline && (
                  <Chip
                    size="small"
                    color="error"
                    icon={<CloudOffOutlined />}
                    label="Offline"
                  />
                )}
              </Stack>
              <Stack direction={"row"} alignItems={"center"}>
                {/* Download Center */}

                {/* Theme Switch */}
                <IconButton
                  onClick={() => {
                    const darkMode = colorMode == "dark";
                    // dispatch(setLightMoode(darkMode ? "light" : "dark"));
                  }}
                >
                  {colorMode == "dark" ? (
                    <LightMode color="warning" fontSize="small" />
                  ) : (
                    <DarkMode fontSize="small" />
                  )}
                </IconButton>
                {/* Profile Info */}
                <Profile />
              </Stack>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <MenuDrawler
        open={showDrawer}
        onClose={() => {
          setShowDrawer(false);
        }}
      />
    </>
  );
}
export default ResponsiveAppBar;
