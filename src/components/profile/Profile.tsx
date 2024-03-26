import React, { SyntheticEvent } from "react";
import { IconButton, Paper, Popover, Stack } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import AuthenticatedUser from "./AuthenticatedUser";

function Profile() {
  const [showDrodown, setShowDrodown] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement>();

  const profileButtonRe = React.createRef<HTMLButtonElement>();

  function handleClose() {
    setShowDrodown(false);
  }

  return (
    <>
      <IconButton
        ref={profileButtonRe}
        onClick={(e: SyntheticEvent) => {
          const target = e.target as HTMLButtonElement;
          setAnchorEl(target);
          setShowDrodown(true);
        }}
      >
        <PersonIcon fontSize="small" />
      </IconButton>

      <Popover
        anchorEl={anchorEl}
        open={showDrodown}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Paper
          sx={{
            p: 2,
          }}
        >
          <Stack alignItems="center">
            <PersonIcon fontSize="large" />
            <AuthenticatedUser />
          </Stack>
        </Paper>
      </Popover>
    </>
  );
}

export default Profile;
