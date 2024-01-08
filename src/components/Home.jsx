import MapTv from "./MapTv";
import Slider from "./Slider";

function Home() {
  return (
    <div>
      <Slider>Movies of the week</Slider>
      <Slider>TV series of the week</Slider>
      <MapTv />
    </div>
  );
}

export default Home;
