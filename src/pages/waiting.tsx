import * as React from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";

export default function Waiting({ socket, setToken }: any) {
  const [loadingLabel, setLoadingLabel] = React.useState(
    "Waiting for a token ..."
  );
  const navigate = useNavigate();

  // const auth = (token: string) => {
  //   fetch("http://localhost:4000/user/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ token }),
  //   })
  //     .then((response) => response.json())
  //     .then((auth: boolean) => {
  //       // setIsAuth(auth);
  //       navigate("/compare");
  //     })
  //     .catch((error) => console.error(error));
  // };

  React.useEffect(() => {
    socket.emit("getToken");
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
