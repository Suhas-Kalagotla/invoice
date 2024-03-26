"use client";
import {
  Alert,
  AlertColor,
  AlertTitle,
  Snackbar,
  Typography,
} from "@mui/material";
import { ReactNode, createContext, useState } from "react";

type AlertData = {
  title?: string;
  message: string;
  severity: AlertColor;
};
type AlertContextType = {
  showAlert: (data: AlertData) => void;
};

export const AlertContext = createContext<AlertContextType | null>(null);

export default function AlertProvider(props: { children: ReactNode }) {
  const [data, setData] = useState<AlertData>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const value: AlertContextType = {
    showAlert(data: AlertData) {
      setData(data);
      setShowAlert(true);
    },
  };
  return (
    <AlertContext.Provider value={value}>
      {props.children}
      <SnackbarAlert
        open={showAlert}
        data={data}
        onClose={() => {
          setShowAlert(false);
        }}
      />
    </AlertContext.Provider>
  );
}

function SnackbarAlert(props: {
  data: AlertData | undefined;
  open: boolean;
  onClose: () => void;
}) {
  const { data, open } = props;

  return (
    <>
      {data && (
        <Snackbar onClose={props.onClose} autoHideDuration={2000} open={open}>
          <Alert
            onClose={() => {
              props.onClose();
            }}
            severity={data.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {data.title && (
              <AlertTitle>
                <Typography fontWeight="bold" variant="subtitle1">
                  {data.title}
                </Typography>
              </AlertTitle>
            )}
            {data.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export function useAlert() {
  const [data, setData] = useState<AlertData>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  return {
    setAlert(data: AlertData) {
      setData(data);
      setShowAlert(true);
    },
    data: data,
    showAlert,
    setShow(show: boolean) {
      setShowAlert(show);
    },
  };
}
