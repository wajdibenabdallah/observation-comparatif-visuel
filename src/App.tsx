import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Image1 from "./store/algo_1/00_0000.png";
import Image2 from "./store/algo_2/00_0000.png";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  padding: theme.spacing(1),
}));

function App() {
  return (
    <Box
      sx={{
        width: "100rem",
        height: "100rem",
        margin: "10rem auto",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>
            <img src={Image1} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <img src={Image2} />
          </Item>{" "}
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
