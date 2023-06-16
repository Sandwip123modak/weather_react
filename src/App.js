import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const apiKey = "db9044351f82e8509ed7d58cdfd6d210";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});
  const [backgroundImage, setBackgroundImage] = useState("");

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleChangeInput = (e) => {
    console.log("value", e.target.value);
    setInputCity(e.target.value);
  };
  const handleKeyDown = (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };

  useEffect(() => {
    getWeatherDetails("kolkata");
  }, []);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) {
      setBackgroundImage(
        "https://th.bing.com/th/id/OIP.SSQrVnAdYq2vO3L-82g9mwHaEo?w=289&h=181&c=7&r=0&o=5&pid=1.7s"
      );
    } else {
      setBackgroundImage(
        "https://th.bing.com/th/id/OIP.lGOyWiAkqILtSZuWkrjj3gHaEo?w=279&h=180&c=7&r=0&o=5&pid=1.7"
      );
    }
  }, []);

  return (
    <div className="col-md-12">
      <div
        className="wetherBg"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h1 className="heading">Weather App</h1>

        <div className="d-grid col-4 mt-4 gap-3 ">
          <input
            type="text"
            className="form-control"
            value={inputCity}
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {Object.keys(data).length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
          className="col-md-12"
        >
          <div className=" text-center mt-5 ">
            <div className="shadow rounded wetherResultBox">
              <img
                className="weatherIcon"
                src="https://th.bing.com/th/id/OIP._gpbcGCpZQKOdvxxwcGtCwHaIW?w=171&h=193&c=7&r=0&o=5&pid=1.7"
                alt="not found"
              />
              <p className="weathorCity">
                Humidity: {data?.clouds?.all}&nbsp;%
              </p>
              <h5 className="weathorCity" style={{ margin: "0" }}>
                {data?.weather[0]?.main}
              </h5>

              <p className="weathorCity">Wind: {data?.wind?.speed}&nbsp;KMPH</p>
            </div>
          </div>
          <div className=" text-center mt-5">
            <div className="shadow rounded wetherResultBox">
              <img
                className="weatherIcon"
                src="https://th.bing.com/th?id=OIP.2Xzs3zbmCwcfUBiu9hBqcQAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                alt="not found"
              />
              <h5
                className="weathorCity"
                style={{
                  fontSize: "3.5rem",
                  fontFamily: "arial",
                  fontWeight: "bold",
                }}
              >
                {data?.name}
              </h5>
              <h6 className="weathorTemp">
                {(data?.main?.temp - 273.15).toFixed(2)}°C
              </h6>
            </div>
          </div>
          <div className=" text-center mt-5">
            <div className="shadow rounded wetherResultBox">
              <img
                className="weatherIcon"
                src="https://th.bing.com/th/id/OIP.neGJ6gu3j0RzWPPOz69kmwHaGV?w=228&h=196&c=7&r=0&o=5&pid=1.7"
                alt="not found"
              />
              <p
                className="weathorTemp"
                style={{ fontSize: "2rem", padding: "1rem" }}
              >
                MinTemp. {(data?.main?.temp_min - 275.15).toFixed(2)}°C
              </p>
              <p className="weathorTemp" style={{ fontSize: "2rem" }}>
                MaxTemp. {(data?.main?.temp_max - 272.15).toFixed(2)}°C
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
