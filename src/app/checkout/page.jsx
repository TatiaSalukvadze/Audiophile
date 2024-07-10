"use client";
import { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "../../context/MyContext";
import { useForm, Controller } from "react-hook-form";
import Final from "../../components/final/Final";
import "./checkout.css";
import { deleteCartItem, createOrder } from "../../db/queries";
import { sendOrderConfirmation } from "./handleOrder";

function Checkout() {
  const { cartList, setcartList } = useContext(MyContext);
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [selectedPayment, setSelectedPayment] = useState("e-money");
  const [summ, setsumm] = useState([0, 0, 0, 0]);
  const [showFinal, setShowFinal] = useState(false);
  const email = useRef(null);
  const [disabledB, setdisabledB] = useState(false);

  useEffect(() => {
    let t = cartList.reduce((tot, c) => tot + c.price * c.count, 0);
    const vat = Math.round((t * 15) / 100);
    t += vat;
    const sh = Math.round(t / 100);
    setsumm([t, sh, vat, t + sh]);
  }, [cartList]);

  const onSubmit = async () => {
    try {
      setdisabledB(true);
      await Promise.all(
        cartList.map(async (or) => {
          await deleteCartItem(or.id);
          await createOrder({
            userId: or.userId,
            productId: or.productId,
            count: or.count,
          });
        })
      );
      // after operations complete successfully, proceed with sending email
      const messageId = await sendOrderConfirmation(
        email.current.value,
        cartList,
        summ[3]
      );
      console.log("Order confirmation email sent with ID:", messageId);
      setShowFinal(!showFinal); // Optionally update UI state
    } catch (error) {
      console.error("Error processing order:", error);
      // Handle error scenario appropriately (e.g., show error message to user)
    }
  };

  return (
    <div className="Checkout">
      {showFinal ? (
        <div id="bg">
          <Final gt={summ[3]} cartList={cartList} />
        </div>
      ) : (
        <>
          <div className="check">
            <h1 id="h1">Checkout</h1>

            <form id="my-form" className="form">
              <h3>Billing Details</h3>
              <div className="billing">
                <div className="err">
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <label>
                        Name
                        <input type="text" placeholder="Your Name" {...field} />
                      </label>
                    )}
                    rules={{ required: "Can't be empty" }}
                  />
                  {errors.name && (
                    <p className="errors">{errors.name.message}</p>
                  )}
                </div>

                <div className="err">
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <label>
                        Email Address
                        <input
                          type="email"
                          placeholder="alexei@gmail.com"
                          {...field}
                          ref={email}
                        />
                      </label>
                    )}
                    rules={{
                      required: "Can't be empty",
                      pattern: /^\S+@\S+$/i,
                    }}
                  />
                  {errors.email && (
                    <p className="errors">{errors.email.message}</p>
                  )}
                </div>

                <div className="err">
                  <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <label>
                        Phone Number
                        <input
                          type="phone"
                          placeholder="+1 202-555-0136"
                          {...field}
                        />
                      </label>
                    )}
                    rules={{ required: "Can't be empty" }}
                  />
                  {errors.phone && (
                    <p className="errors">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <h3>Shipping Information</h3>
              <div className="shipping">
                <div className="err address">
                  <Controller
                    name="shippingAddress"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <label className="address">
                        Address
                        <input
                          type="text"
                          placeholder="Ex: 1137 Williams Avenue"
                          {...field}
                        />
                      </label>
                    )}
                    rules={{ required: "Can't be empty" }}
                  />
                  {errors.shippingAddress && (
                    <p className="errors">{errors.shippingAddress.message}</p>
                  )}
                </div>

                <div className="err">
                  <Controller
                    name="zipCode"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <label>
                        ZIP Code
                        <input
                          type="text"
                          placeholder="Zip"
                          {...field}
                          maxLength={5}
                        />
                      </label>
                    )}
                    rules={{ required: "Can't be empty" }}
                  />
                  {errors.zipCode && (
                    <p className="errors">{errors.zipCode.message}</p>
                  )}
                </div>

                <div className="err">
                  <Controller
                    name="city"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <label>
                        City
                        <input type="text" placeholder="City" {...field} />
                      </label>
                    )}
                    rules={{ required: "Can't be empty" }}
                  />
                  {errors.city && (
                    <p className="errors">{errors.city.message}</p>
                  )}
                </div>
                <div className="err">
                  <Controller
                    name="country"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <label>
                        Country
                        <input type="text" placeholder="Country" {...field} />
                      </label>
                    )}
                    rules={{ required: "Can't be empty" }}
                  />
                  {errors.country && (
                    <p className="errors">{errors.country.message}</p>
                  )}
                </div>
              </div>

              <h3>Payment Details</h3>
              <div className="details">
                <h4>Payment Method</h4>
                <Controller
                  name="payment"
                  control={control}
                  defaultValue="e-money"
                  render={({ field }) => {
                    const isEMoneyChecked = field.value === "e-money";
                    return (
                      <div className="options">
                        <div className="opt">
                          <input
                            type="radio"
                            value="e-money"
                            placeholder="E-Money"
                            {...field}
                            checked={isEMoneyChecked}
                            onChange={() => {
                              field.onChange("e-money");
                              setSelectedPayment("e-money");
                            }}
                          />
                          <label>e-Money</label>
                        </div>
                        <div className="opt">
                          <input
                            type="radio"
                            value="cash-on-delivery"
                            placeholder="Cash on Delivery"
                            {...field}
                            checked={!isEMoneyChecked}
                            onChange={() => {
                              field.onChange("cash-on-delivery");
                              setSelectedPayment("cash-on-delivery");
                            }}
                          />
                          <label>Cash on Delivery</label>
                        </div>
                      </div>
                    );
                  }}
                  rules={{ required: "Payment Method is required" }}
                />
                {errors.payment && (
                  <p className="errors">{errors.payment.message}</p>
                )}
              </div>

              {selectedPayment === "e-money" && (
                <div className="e-money">
                  <div className="err">
                    <Controller
                      name="emoneyNumber"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <label>
                          e-Money Number
                          <input
                            type="text"
                            placeholder="238521993"
                            {...field}
                            maxLength={9}
                          />
                        </label>
                      )}
                      rules={{ required: "Can't be empty" }}
                    />
                    {errors.emoneyNumber && (
                      <p className="errors">{errors.emoneyNumber.message}</p>
                    )}
                  </div>
                  <div className="err">
                    <Controller
                      name="emoneyPin"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <label>
                          e-Money PIN
                          <input
                            type="text"
                            placeholder="6891"
                            {...field}
                            maxLength={4}
                          />
                        </label>
                      )}
                      rules={{ required: "Can't be empty" }}
                    />
                    {errors.emoneyPin && (
                      <p className="errors">{errors.emoneyPin.message}</p>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="summary">
            <h3>summary</h3>

            <div className="cart-list">
              {cartList.map((el) => (
                <div className="cart-item" key={el.name}>
                  <img src={el.image} alt="cref" />
                  <div className="dp">
                    <span className="dp-t">{el.shortName}</span>
                    <span className="dp-p">${el.price}</span>
                  </div>
                  <span id="count">x{el.count}</span>
                </div>
              ))}
            </div>

            <div id="prices">
              <div className="total">
                <span className="ttl-text">total</span>
                <span className="total-price">${summ[0]}</span>
              </div>
              <div className="total">
                <span className="ttl-text">Shipping</span>
                <span className="total-price">${summ[1]}</span>
              </div>
              <div className="total">
                <span className="ttl-text">Vat(included)</span>
                <span className="total-price">${summ[2]}</span>
              </div>
            </div>

            <div className="total" id="ttl">
              <span className="ttl-text">Grand total</span>
              <span className="total-price" id="tp">
                ${summ[3]}
              </span>
            </div>

            {/* <button
              form="my-form"
              className="pay"
              onClick={handleSubmit(onSubmit)}
            >
              Continue & pay
            </button> */}
            <div className="payb button-container-1">
              <span className="payb mas">Continue & pay</span>
              <button
                form="my-form"
                className="pay"
                onClick={handleSubmit(onSubmit)}
                disabled={disabledB}
              >
                Continue & pay
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;
