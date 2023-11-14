import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";

export default function Waiting() {
  const navigate = useNavigate();
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    padding: theme.spacing(1),
  }));

  // TODO mock waiting
  const timeToGetToken = 5000;
  const style = {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "text-align": "center",
    "min-height": "20rem",
    margin: "auto",
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/compare`);
    }, timeToGetToken);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={style}>
      <Stack spacing={2}>
        <Paper elevation={0}>
          <CircularProgress color="inherit" size="15rem" />
        </Paper>
        <Item elevation={0}>Waiting for a token ...</Item>
      </Stack>
    </div>
  );
}
