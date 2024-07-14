import Link from "next/link";
import "./homepics.css";

function Homepics() {
  return (
    <div className="homepics mainwrap">
      <div className="hdiv1">
        <div className="hdiv1im"></div>
        <div
          className="hdivtext"
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-duration="700"
        >
          <h1>ZX9 SPEAKER</h1>
          <p>
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>
          <div className="seep blb button-container-1">
            <span className="blb mas">See Product</span>
            <Link href="/headphones/xx99-mark-two-headphones">
              <button className="blb">See Product</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="hdiv2">
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-duration="700"
        >
          <h2>ZX7 SPEAKER</h2>

          <div className="seep trb button-container-1">
            <span className="trb mas">See Product</span>
            <Link href="/headphones/zx7-speaker">
              <button className="trb">See Product</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="hdiv3">
        <div className="im"></div>
        <div className="hdiv3d">
          <span
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            data-aos-duration="700"
          >
            <h2>YX1 EARPHONES</h2>

            <div className="seep trb button-container-1">
              <span className="trb mas">See Product</span>
              <Link href="/headphones/yx1-earphones">
                <button className="trb">See Product</button>
              </Link>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Homepics;
