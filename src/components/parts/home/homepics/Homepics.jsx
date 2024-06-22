import Link from "next/link";
import "./homepics.css";

function Homepics() {
  return (
    <div className="homepics mainwrap">
      <div className="hdiv1">
        <div className="hdiv1im"></div>
        <div className="hdivtext">
          <h1>ZX9 SPEAKER</h1>
          <p>
            Upgrade to premium speakers that are phenomenally built to deliver
            truly remarkable sound.
          </p>
          {/* <Link href="/headphones/zx9-speaker">
            <button className="seep blb">see product</button>
          </Link> */}
          <div className="seep blb button-container-1">
            <span className="blb mas">See Product</span>
            <Link href="/headphones/xx99-mark-two-headphones">
              <button className="blb">See Product</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="hdiv2">
        <div>
          <h2>ZX7 SPEAKER</h2>
          {/* <Link href="/headphones/zx7-speaker">
            <button className="seep trb">see product</button>
          </Link> */}
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
          <h2>YX1 EARPHONES</h2>
          {/* <Link href="/headphones/yx1-earphones">
            <button className="seep trb">see product</button>
          </Link> */}
          <div className="seep trb button-container-1">
            <span className="trb mas">See Product</span>
            <Link href="/headphones/yx1-earphones">
              <button className="trb">See Product</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepics;
