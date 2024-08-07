import "./purchases.css";
import products from "../../../data.json";

const Purchases = ({ orders, users }) => {
  const latest = orders.length <= 5 ? orders : orders.slice(0, 5);

  return (
    <div className="purchases">
      <h2 className="adtitles">
        Latest <span>Purchases</span>
      </h2>
      <div className="tablewrap">
        <table className="trtable">
          <thead>
            <tr>
              <td>Name</td>
              <td>Product</td>
              <td>Date</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            {latest.map((or) => {
              const user = users.find((u) => u.id === or.userId) || users[0];
              const p = products.find((product) => product.id === or.productId);

              const createdAt = new Date(or.createdAt);
              const year = createdAt.getFullYear();
              const month = String(createdAt.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
              const day = String(createdAt.getDate()).padStart(2, "0");

              const date = `${year}-${month}-${day}`;
              return (
                <tr key={or.id + or.userId}>
                  <td>
                    <div className="trUser">
                      <img
                        src={user.imageUrl}
                        alt=""
                        width={40}
                        height={40}
                        className="truserImage"
                      />
                      {user.firstName + " " + user.lastName}
                    </div>
                  </td>
                  <td>
                    <span className="trProduct">{p?.shortName || ""}</span>
                  </td>
                  <td>{date}</td>
                  <td>${p?.price * or.count || 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Purchases;
