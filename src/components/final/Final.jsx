import Link from "next/link";
import confirm from "../../../public/assets/checkout/icon-order-confirmation.svg";
import "./final.css";

function Final({ gt, cartList }) {
  return (
    <div className="final">
      <div className="thnk">
        <img src={confirm.src} alt="confirm" />
        <h1 id="h1">
          thank you <br /> for your order
        </h1>
        <p id="fp">You will receive an email confirmation shortly.</p>

        <div className="grand-ttl">
          <div id="items">
            <div className="cart-item" key={cartList[0].name}>
              <img src={cartList[0].image} alt="cref" id="gt-img" />
              <div className="dp">
                <span className="dp-t">{cartList[0].shortName}</span>
                <span className="dp-p">${cartList[0].price}</span>
              </div>
              <span id="count">x{cartList[0].count}</span>
            </div>
            <hr />
            <p id="and">and {cartList.length - 1} other item(s)</p>
          </div>
          <div id="grand">
            <div>
              <span className="ttl-text" style={{ color: "#FFF" }}>
                Grand total
              </span>
              <span className="total-price" style={{ color: "#FFF" }}>
                $ {gt}
              </span>
            </div>
          </div>
        </div>

        <Link href="/home">
          <button className="back-home">Back to home</button>
        </Link>
      </div>
    </div>
  );
}

export default Final;
