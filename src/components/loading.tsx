import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import * as React from "react";
import Stack from "@mui/material/Stack";
export default function Loading({ loadingLabel }: any) {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    padding: theme.spacing(1),
  }));

  const style: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    minHeight: "20rem",
    margin: "auto",
  };

  return (
    <div style={style}>
      <Stack spacing={2}>
        <Paper elevation={0}>
          <CircularProgress color="inherit" size="15rem" />
        </Paper>
        <Item elevation={0}>{loadingLabel}</Item>
      </Stack>
    </div>
  );
}
