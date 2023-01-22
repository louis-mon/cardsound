import * as React from "react";

import { Box } from "@mui/system";

import QrReader from "react-qr-reader";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { notifE } from "../state/state-e";

export const Structure = ({
  onScan,
  children,
  top,
}: {
  onScan?: (data: any) => void;
  children: React.ReactNode;
  top?: JSX.Element;
}) => {
  const notif = notifE.use();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      {top}
      {onScan && (
        <QrReader
          onScan={onScan}
          onError={() => {}}
          style={{ width: "90%", border: "white solid 1px" }}
          facingMode={"user"}
        />
      )}
      {children}
      <Snackbar
        open={notif !== null}
        autoHideDuration={6000}
        onClose={() => notifE.set(null)}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        {notif && (
          <Alert severity={notif.severity}>
            <AlertTitle>{notif.text}</AlertTitle>
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
};
