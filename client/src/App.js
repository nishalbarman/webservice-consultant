import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [services, setServices] = useState([]);

  const arrayBufferToBase64 = (buffer) => {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  const makeRequest = async () => {
    const res = await fetch("http://localhost:8000/services");
    const data = await res.json();
    setServices(data.services);
    console.log(data);
  };

  useEffect(() => {
    makeRequest();
  }, []);
  return (
    <div className="App">
      <img
        src={`data:${services[0]?.image?.mimetype};base64,${arrayBufferToBase64(
          services[0]?.image?.data.data
        )}`}
      />
    </div>
  );
}

export default App;
