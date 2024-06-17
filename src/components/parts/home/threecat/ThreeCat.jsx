import Link from "next/link";
import p1 from "../../../../../public/assets/shared/desktop/image-category-thumbnail-headphones.png";
import p3 from "../../../../../public/assets/shared/desktop/image-category-thumbnail-earphones.png";
import p2 from "../../../../../public/assets/shared/desktop/image-category-thumbnail-speakers.png";
import arr from "../../../../../public/assets/shared/desktop/icon-arrow-right.svg";
import "./threecat.css";

function ThreeCat() {
  return (
    <div className="threecat mainwrap">
      <div className="p p1">
        <img src={p1.src} className="pimg" />
        <span className="alink">
          <h3>headphones</h3>
          <Link href="/headphones">
            shop&#160; &#160;
            <span>
              <img src={arr.src} />
            </span>
          </Link>
        </span>
      </div>

      <div className="p p2">
        <img src={p2.src} className="pimg" />

        <span className="alink">
          <h3>speakers</h3>
          <Link href="/speakers">
            shop &#160; &#160;
            <img src={arr.src} />
          </Link>
        </span>
      </div>

      <div className="p p3">
        <img src={p3.src} className="pimg" />
        <span className="alink">
          <h3>earphones</h3>
          <Link href="/earphones">
            shop &#160; &#160;
            <img src={arr.src} />
          </Link>
        </span>
      </div>
    </div>
  );
}

export default ThreeCat;
