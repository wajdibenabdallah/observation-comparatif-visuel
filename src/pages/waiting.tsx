import * as React from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";
import { Context, socket } from "../App";

export default function Waiting() {
  const { setToken } = React.useContext<any>(Context);
  const [loadingLabel, setLoadingLabel] = React.useState(
    "Waiting for a token ..."
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    socket.on("token", async (token: string) => {
      setToken(token);
      setLoadingLabel(
        "We got a token from the server, we will redirect you to the page ..."
      );
      navigate("/compare");
    });
    return () => {
      socket.off("token");
    };
  }, []);

  return <Loading loadingLabel={loadingLabel} />;
}
