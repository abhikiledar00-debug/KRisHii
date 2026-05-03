import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

export function WeatherCard() {

  const [
    weather,
    setWeather
  ] = useState<any>(null);

  const [
    city,
    setCity
  ] = useState("Bangalore");

  // FETCH WEATHER
  const fetchWeather =
    async () => {

      try {

        const res =
          await axios.get(

            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=41753071647763440691e3fb82752942&units=metric`

          );

        setWeather(
          res.data
        );

      } catch (err) {

        console.log(err);

        alert(
          "Failed to fetch weather"
        );
      }
    };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 mt-6">

      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Weather Forecast 🌦️
      </h2>

      {/* SEARCH */}
      <div className="flex gap-3 mb-4">

        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) =>
            setCity(
              e.target.value
            )
          }
          className="flex-1 border px-4 py-3 rounded-xl"
        />

        <button
          onClick={fetchWeather}
          className="bg-blue-600 text-white px-5 rounded-xl"
        >
          Search
        </button>

      </div>

      {/* WEATHER DATA */}
      {weather && (

        <div className="bg-blue-100 rounded-xl p-5">

          <h3 className="text-2xl font-bold mb-3">
            {weather.name}
          </h3>

          <div className="space-y-2 text-lg">

            <p>
              🌡 Temperature:
              {" "}
              {weather.main.temp}
              °C
            </p>

            <p>
              💧 Humidity:
              {" "}
              {weather.main.humidity}%
            </p>

            <p>
              🌥 Condition:
              {" "}
              {
                weather.weather[0]
                  .main
              }
            </p>

            <p>
              🌬 Wind:
              {" "}
              {weather.wind.speed}
              {" "}
              km/h
            </p>

          </div>

        </div>

      )}

    </div>
  );
}