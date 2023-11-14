import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { ImageChoice, PairImages } from "../types/Image";
import { loadImages } from "../services/Image";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Actions from "../components/actions";
import Header from "../components/header/header";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  padding: theme.spacing(1),
}));

const defaultTheme = createTheme();

const imageSize = { width: "40rem", heigth: "40rem" };

export default function Compare() {
  const COUNT = 60;

  const [pairImages, setPairImages] = React.useState<PairImages>();
  const reload = () => {
    setPairImages(loadImages());
    setProgress(COUNT);
  };
  const refLeft = React.useRef<any>(null);
  const refRigth = React.useRef<any>(null);
  const [progress, setProgress] = React.useState(COUNT);

  function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number }
  ) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          {...props}
          value={(props.value / COUNT) * 100}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {props.value}
          </Typography>
        </Box>
      </Box>
    );
  }

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
      <Header />
      <Container maxWidth={false}>
        <Grid container justifyContent="center" p={1}>
          <Grid item>
            <CircularProgressWithLabel value={progress} />
          </Grid>
        </Grid>
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
