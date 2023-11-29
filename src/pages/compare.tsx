import * as React from "react";
import {
  ThemeProvider,
  createTheme,
  styled,
  duration,
} from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { type ImageChoice, type PairImages } from "../types/Image";
import { loadImages } from "../services/Image";

import Actions from "../components/actions";
import Header from "../components/header";
import { Context } from "../App";
import { COUNT, imageSize } from "../utils/constants";
import { Copyright } from "../components/copyright";
import { Timer } from "../components/timer";

export default function Compare() {
  const { setToken } = React.useContext<any>(Context);
  const defaultTheme = createTheme();
  const [pairImages, setPairImages] = React.useState<PairImages>();
  const reload = () => {
    setPairImages(loadImages());
    setProgress(COUNT);
  };
  const refLeft = React.useRef<any>(null);
  const refRigth = React.useRef<any>(null);
  const [progress, setProgress] = React.useState(COUNT);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    padding: theme.spacing(1),
  }));

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
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          reload();
          prevProgress = COUNT;
        } else {
          --prevProgress;
        }
        return prevProgress;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <Header setToken={setToken} />
      <Container maxWidth={false}>
        <Timer progress={progress} />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Item ref={refLeft}>
              {pairImages?.left && (
                <img src={pairImages?.left} style={imageSize} />
              )}
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item ref={refRigth}>
              {pairImages?.right && (
                <img src={pairImages?.right} style={imageSize} />
              )}
            </Item>
          </Grid>
          <Actions reload={reload} focus={focus} />
        </Grid>
      </Container>
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 4,
        }}
      >
        <Copyright sx={{ mt: 1 }} />
      </Container>
    </ThemeProvider>
  );
}
