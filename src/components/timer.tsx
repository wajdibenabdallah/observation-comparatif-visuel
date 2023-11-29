import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { CircularProgressWithLabel } from "./CircularProgressWithLabel";

export function Timer({ progress }: any) {
  return (
    <Grid container justifyContent="center" p={1}>
      <Grid item>
        <CircularProgressWithLabel value={progress} />
      </Grid>
    </Grid>
  );
}
