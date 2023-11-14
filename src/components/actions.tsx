import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import NorthTwoToneIcon from "@mui/icons-material/NorthTwoTone";
import { ImageChoice } from "../types/Image";

interface ActionProps {
  focus: (image: ImageChoice, leave?: boolean) => void;
  reload: () => void;
}

export default function Actions({ reload, focus }: ActionProps) {
  return (
    <>
      <Grid container item spacing={1}>
        <Grid item xs={4} textAlign="center">
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
            <NorthTwoToneIcon /> Image à gauche
          </Button>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <Button onClick={reload} variant="contained" color="warning">
            Je ne sais pas
          </Button>
        </Grid>
        <Grid item xs={4} textAlign="center">
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
            <NorthTwoToneIcon />
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
