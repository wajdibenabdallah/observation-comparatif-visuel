import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { ImageChoice, PairImages } from "./types/Image";
import { loadImages } from "./services/Image";
import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  padding: theme.spacing(1),
}));

function App() {
  const [pairImages, setPairImages] = React.useState<PairImages>();
  const reload = () => setPairImages(loadImages());
  const refLeft = React.useRef<any>(null);
  const refRigth = React.useRef<any>(null);
  const focus = (image: ImageChoice, leave = false): void => {
    if (image === "LEFT") {
      leave
        ? (refLeft.current.style.backgroundColor = "#fff")
        : (refLeft.current.style.backgroundColor = "#e9e9e9");
    }
    if (image === "RIGTH") {
      leave
        ? (refRigth.current.style.backgroundColor = "#fff")
        : (refRigth.current.style.backgroundColor = "#e9e9e9");
    }
  };
  React.useEffect(() => {
    reload();
  }, []);

  return (
    <Box
      sx={{
        width: "100rem",
        height: "100rem",
        margin: "10rem auto",
      }}
    >
      <Grid container spacing={0.5}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Item>Observation Comparatif Visuel</Item>
        </Grid>
        <Grid item xs={6}>
          <Item ref={refLeft}>
            {pairImages?.left && <img src={pairImages?.left} />}
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item ref={refRigth}>
            {pairImages?.right && <img src={pairImages?.right} />}
          </Item>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          <Button
            onClick={reload}
            onMouseEnter={() => {
              focus("LEFT");
            }}
            onMouseLeave={() => {
              focus("LEFT", true);
            }}
            variant="contained"
            disableElevation
          >
            Image à gauche
          </Button>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={2}>
          <Button
            onClick={reload}
            onMouseEnter={() => {
              focus("RIGTH");
            }}
            onMouseLeave={() => {
              focus("RIGTH", true);
            }}
            variant="contained"
            disableElevation
          >
            Image à droite
          </Button>
        </Grid>
        <Grid item xs={5}></Grid>
        <Grid item>
          <Button onClick={reload} variant="contained" color="warning">
            Je ne sais pas
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={reload} variant="contained" color="secondary">
            Déconnexion
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
