import "./App.css";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import Loading from "./components/Loading";

import data from "./assets/data";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Signin from "./components/Signin";

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSignedout, setIsSignedout] = React.useState(false);
  // const [user, setUser] = React.useState(
  //   localStorage.getItem("user")
  //     ? JSON.parse(localStorage.getItem("token"))
  //     : {}
  // );
  const [para, setPara] = React.useState("Loading...");
  // const role = user ? user.role : null;
  const [token, setToken] = React.useState(
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );

  const add = window.location.href;
  var base_url = window.location.origin;

  var host = window.location.host;

  var pathEx = add.replace(base_url, "");
  console.log("address", pathEx);
  const getLink = async () => {
    setIsLoading(true);

    try {
      let config = {
        params: {
          path: pathEx,
        },
      };

      const response = await data.axios.get(
        `${data.BASE_URL}/qrRedirection`,

        config
      );
      const resp = response.data;

      console.log(`info`, resp);
      setPara(resp);
      debugger;
      window.location.replace("https://" + resp);

      setIsLoading(false);

      return resp;
    } catch (errors) {
      setIsLoading(false);
      console.error(errors);
      if (errors.response.status) {
        setPara("");
      } else {
        alert(errors.response.data.message);
      }
    }
  };

  useEffect(() => {
    getLink();
    console.log("Script loaded");
  }, []);

  if (!isLoading) {
    return (
      <div className="App">
        <Navbar />

        <div className="body">
          {" "}
          <div id="editor">
            {para ? <>Please wait...</> : <> 404 Not found</>}
          </div>
          <p></p>
          {/* <div
              onClick={(e) => {
                const editor = document.getElementById("editor");
                Sapling.observe(editor);
              }}
            >
               
            </div> */}
          {/* <button
              onClick={(e) => {
                const editor = document.getElementById("editor");
                Sapling.unobserve(editor);
              }}
            >
             Stop
            </button> */}
        </div>
        {/* <Footer /> */}
      </div>
    );
  } else {
    return (
      <div>
        <Loading />
      </div>
    );
  }
}

export default App;
