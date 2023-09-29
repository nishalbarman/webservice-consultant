import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Component/navbar/Navbar";
import AllRoutes from "./Routes/AllRoutes";
import { useLocation } from "react-router-dom";

function App() {
  // const [services, setServices] = useState([]);

  // const arrayBufferToBase64 = (buffer) => {
  //   var binary = "";
  //   var bytes = [].slice.call(new Uint8Array(buffer));
  //   bytes.forEach((b) => (binary += String.fromCharCode(b)));
  //   return window.btoa(binary);
  // };

  // const makeRequest = async () => {
  //   const res = await fetch("http://localhost:8000/services");
  //   const data = await res.json();
  //   setServices(data.services);
  //   console.log(data);
  // };

  // useEffect(() => {
  //   makeRequest();
  // }, []);

  const location = useLocation();
  const isWhite = location.pathname !== "/" ? true : false;

  return (
    <>
      <div className="App">
        {location.pathname !== "/login" && location.pathname !== "/signup" && (
          <Navbar isWhiteBackground={isWhite} isOfferVisible={!true} /> //isWhite
        )}
        <AllRoutes />
        {/* <img
        src={`data:${services[0]?.image?.mimetype};base64,${arrayBufferToBase64(
          services[0]?.image?.data.data
        )}`}
      /> */}
      </div>
    </>
  );
}

export default App;
