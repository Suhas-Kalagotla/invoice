"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { AlternateEmail, Devices, Logout } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { signOut, useSession } from "next-auth/react";

function AuthenticatedUser() {
  const { data: session } = useSession();

  const user = useMemo(
    function () {
      if (!session || !session.user) {
        throw new Error("Page not accessible for guests");
      }
      return session?.user;
    },
    [session]
  );

  const [logouting, setLogouting] = useState<boolean>(false);
  return (
    <>
      <Stack spacing={1}>
        <Typography textAlign="center" variant="subtitle1" fontWeight="bold">
          {user.name}
        </Typography>

        <Divider />

        <Stack>
          {/* Email */}
          <Stack direction="row" spacing={1}>
            <AlternateEmail fontSize="small" />
            <Typography variant="subtitle2">{user.email}</Typography>
          </Stack>
        </Stack>

        <Divider />
        <Button
          disabled={logouting}
          onClick={() => {
            setLogouting(true);
            signOut({
              callbackUrl: "/api/auth/signin",
            });
          }}
          endIcon={<Logout />}
          size="small"
          variant="contained"
          color="info"
        >
          Logout
        </Button>
      </Stack>
    </>
  );
}

export default AuthenticatedUser;
