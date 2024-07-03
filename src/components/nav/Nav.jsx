import { useRef, useState, useEffect } from "react";
import logo from "../../../public/assets/shared/desktop/logo.svg";
import cart from "../../../public/assets/shared/desktop/icon-cart.svg";
import menu from "../../../public/assets/shared/tablet/icon-hamburger.svg";
import close from "../../../public/assets/shared/tablet/icon-close.svg";
import Link from "next/link";
// import Cart from "../cart/Cart";
import "./Nav.css";
import { useAuth, UserButton } from "@clerk/nextjs";
function Nav({ role }) {
  const { isSignedIn } = useAuth();

  const menuref = useRef(null);
  // const [showcart, setshowcart] = useState(false);

  function showmenu() {
    menuref.current.classList.remove("hide");
  }

  function hidemenu() {
    menuref.current.classList.add("hide");
  }

  return (
    <div className="nav">
      <div className="inner">
        <div className="menulogo">
          <span className="menu">
            <img src={menu.src} onClick={() => showmenu()} />
          </span>
          <span>
            <img src={logo.src} />
          </span>
        </div>
        <span className="linkwrap hide" ref={menuref}>
          <img src={close.src} className="close" onClick={() => hidemenu()} />
          {role === "user" ? (
            <div className="links">
              <Link className="link" href="/home" onClick={() => hidemenu()}>
                Home
              </Link>
              <Link
                className="link"
                href="/headphones"
                onClick={() => hidemenu()}
              >
                headphones
              </Link>
              <Link
                className="link"
                href="/speakers"
                onClick={() => hidemenu()}
              >
                speakers
              </Link>
              <Link
                className="link"
                href="/earphones"
                onClick={() => hidemenu()}
              >
                earphones
              </Link>
            </div>
          ) : (
            <div className="links">
              <Link
                className="link"
                href="/admin/dashboard"
                onClick={() => hidemenu()}
              >
                Dashboard
              </Link>
              <Link
                className="link"
                href="/admin/users"
                onClick={() => hidemenu()}
              >
                Users
              </Link>
              <Link
                className="link"
                href="/admin/orders"
                onClick={() => hidemenu()}
              >
                Orders
              </Link>
            </div>
          )}
        </span>
        <span>
          {isSignedIn ? (
            <>
              {role !== "admin" ? (
                <>
                  <Link className="link" href="/cart">
                    <img src={cart.src} className="cart" />
                  </Link>
                </>
              ) : (
                <></>
              )}
              <span id="userButton">
                <UserButton afterSignOutUrl="/home" />
              </span>
            </>
          ) : (
            <Link className="link" href="/sign-in" id="signInL">
              Sign-In
            </Link>
          )}

          {/* {isModalOpen && (
            <Cart
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              modalRef={modalRef}
            />
          )} */}
        </span>
      </div>
    </div>
  );
}

export default Nav;
