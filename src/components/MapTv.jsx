import { useState } from "react";
import Map from "./Map";
import TvRow from "./TvRow";

function MapTv() {
  const [arr, setArr] = useState([]);

  return (
    <>
      <h1 className="ml-64 mt-5 text-stone-300 text-3xl underline">
        Search TV shows by country
      </h1>
      <div className="flex flex-row pt-10 px-60">
        <Map setArr={setArr} />
        <ul className="w-[500px] ml-16 pr-20">
          {arr.length > 0 &&
            arr.map((tv) => (
              <li key={tv.id} className="border-stone-800 border-1">
                <TvRow tv={tv} />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default MapTv;
