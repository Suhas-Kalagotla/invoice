import {
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { ReactElement } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Assessment, Dashboard, People, Settings } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";

export interface MenuItem {
  title: string;
  url: string;
  icon: ReactElement;
  type?: "group";
  items?: MenuItem[];
}

interface MenuDrawlerProps {
  onClose: () => void;
  open: boolean;
}

function RenderMenu(props: { menu: MenuItem }) {
  const theme = useTheme();

  const menu = props.menu;
  const activeLink = location.pathname == menu.url;

  return (
    <Link
      style={{
        textDecoration: "inherit",
        backgroundColor: "inherit",
        color: "inherit",
      }}
      href={menu.url}
    >
      <ListItemButton
        sx={{
          color: activeLink ? theme.palette.action.active : "inherit",
          background: activeLink ? theme.palette.action.selected : "inherit",
        }}
      >
        <ListItemIcon>{menu.icon}</ListItemIcon>
        <ListItemText primary={menu.title} />
      </ListItemButton>
    </Link>
  );
}

function hasActiveLink(menu: MenuItem): boolean {
  const items = menu.items;
  if (!items) {
    return false;
  }
  return items.some(function (menu) {
    return menu.url == window.location.pathname;
  });
}

function MenuDrawler(props: MenuDrawlerProps) {
  const menus: MenuItem[] = [
    {
      icon: <Dashboard color="info" />,
      title: "Dashboard",
      url: "/u",
    },
    {
      icon: <Assessment color="info" />,
      title: "Reports",
      url: "/u/reports",
    },

    {
      icon: <People color="info" />,
      title: "Clients",
      url: "/u/clients",
    },
    {
      icon: <Settings color="info" />,
      title: "Settings",
      url: "/u/settings",
    },
  ];

  return (
    <Drawer
      className="drawer"
      anchor="left"
      open={props.open}
      onClose={props.onClose}
    >
      <Box
        sx={{
          p: 2,
        }}
      >
        {/* Header */}
        <Stack direction="row" alignItems="flex-end" spacing={1}>
          <Image src={"/logo.png"} width={100} height={100} alt="App Logo" />
          <Stack>
            <Typography
              variant="subtitle1"
              textTransform={"uppercase"}
              fontWeight={"bold"}
            >
              Sures Invoce
            </Typography>
            <Typography variant="subtitle2" textTransform="uppercase">
              Fast and Secure!
            </Typography>
          </Stack>
        </Stack>

        <Divider
          sx={{
            mt: 2,
          }}
        />

        {/* Body */}
        <Box>
          {" "}
          <List>
            {menus.map((menu, index) => {
              return (
                <React.Fragment key={index}>
                  {menu.type == "group" ? (
                    <Accordion
                      disableGutters={true}
                      defaultExpanded={hasActiveLink(menu)}
                      elevation={0}
                      sx={{
                        border: "none",
                        backgroundColor: "inherit",
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        {menu.icon}
                        <Typography ml={2}> {menu.title} </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          pt: 0,
                          pb: 0,
                        }}
                      >
                        {menu.items?.map((menu) => {
                          return <RenderMenu menu={menu} key={menu.url} />;
                        })}
                      </AccordionDetails>
                    </Accordion>
                  ) : (
                    <RenderMenu key={menu.url} menu={menu} />
                  )}
                </React.Fragment>
              );
            })}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}
export default MenuDrawler;
