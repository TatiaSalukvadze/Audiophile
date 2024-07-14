import Link from "next/link";
import logo from "../../../public/assets/shared/desktop/logo.svg";
import fb from "../../../public/assets/shared/desktop/icon-facebook.svg";
import twit from "../../../public/assets/shared/desktop/icon-twitter.svg";
import insta from "../../../public/assets/shared/desktop/icon-instagram.svg";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="top">
        <span>
          <img src={logo.src} />
        </span>
        <div className="links1">
          <Link className="link1" href="/home">
            Home
          </Link>
          <Link className="link1" href="/headphones">
            headphones
          </Link>
          <Link className="link1" href="/speakers">
            speakers
          </Link>
          <Link className="link1" href="/earphones">
            earphones
          </Link>
        </div>
      </div>
      <p className="descr">
        Audiophile is an all in one stop to fulfill your audio needs. We’re a
        small team of music lovers and sound specialists who are devoted to
        helping you get the most out of personal audio. Come and visit our demo
        facility - we’re open 7 days a week.
      </p>
      <div className="bottom">
        <p className="copyr">Copyright 2024. All Rights Reserved</p>
        <div className="icons">
          <span>
            <img src={fb.src} alt="icon" className="icon" />
          </span>
          <span>
            <img src={twit.src} alt="icon" className="icon" />
          </span>
          <span>
            <img src={insta.src} alt="icon" className="icon" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
