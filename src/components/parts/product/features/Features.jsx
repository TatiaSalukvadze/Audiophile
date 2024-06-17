import "./features.css";

function Features({ p }) {
  return (
    <div className="features-box mainwrap">
      <div className="features">
        <h2>features</h2>
        <p id="fp">{p.features}</p>
      </div>
      <div className="inbox">
        <h2>in the box</h2>
        <ul>
          {p.includes.map((item) => (
            <li key={item.item}>
              <span className="quantity">{item.quantity}x</span>
              <span className="item">{item.item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Features;
