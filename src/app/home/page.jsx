import Link from "next/link";
import ThreeCat from "../../components/parts/home/threecat/ThreeCat";
import Audioman from "../../components/parts/home/audioman/Audioman";
import Homepics from "../../components/parts/home//homepics/Homepics";
import SwiperC from "../../components/parts/home/swiperc/SwiperC";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="homehead">
        <div className="headdiv">
          <p className="homenewp">NEW PRODUCT</p>
          <h1>XX99 Mark II Headphones</h1>
          <p className="homedesc">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <div className="button-container-1">
            <span className="mas">See Product</span>
            <Link href="/headphones/xx99-mark-two-headphones">
              <button>See Product</button>
            </Link>
          </div>
          {/* <Link href="/headphones/xx99-mark-two-headphones">
            <button>See Product</button>
          </Link> */}
        </div>
      </div>
      <ThreeCat />
      <SwiperC />
      <Homepics />
      <Audioman />
    </div>
  );
}

export default Home;
