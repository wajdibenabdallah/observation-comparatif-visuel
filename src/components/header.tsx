import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

export default function Header({ setToken }: any) {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <img
          src="./assets/icons/SCALIAN_RVB_300DPI.png"
          style={{ width: "15rem", height: "4rem" }}
        />
        <nav style={{ position: "absolute", right: 0 }}>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            A propos
          </Link>
          <Link
            variant="button"
            color="text.primary"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setToken(null);
              navigate("/");
            }}
            sx={{ my: 1, mx: 1.5 }}
          >
            Déconnexion
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
}
