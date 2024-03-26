import React, { Suspense } from "react";

export const metadata = {
  title: "Invoice",
  description: "Invoice Generator",
};

import ResponsiveAppbar from "../../components/ResponsiveAppBar";
import { Box, LinearProgress } from "@mui/material";

import SessionWrapper from "../../components/SessionWrapper";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  console.log(session);
  if (!session) {
    redirect(`/api/auth/signin`); // Navigate to the new post page
  }

  return (
    <React.StrictMode>
      {/* <Provider store={store}> */}
      {/* <ThemeProvider theme={darkTheme}> */}
      {/* <CssBaseline /> */}

      {/* <IntlProvider
              // messages={messagesInFrench}
              locale="fr"
              defaultLocale="en"
            > */}
      {/* <AlertProvider> */}
      <ResponsiveAppbar />
      <Box sx={{ mt: 8 }}>{children}</Box>
      {/* </AlertProvider> */}
      {/* </IntlProvider> */}
      {/* </ThemeProvider> */}

      {/* <App /> */}
      {/* </Provider> */}
    </React.StrictMode>
  );
}
