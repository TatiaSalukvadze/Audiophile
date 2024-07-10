import "./features.css";

function Features({ p }) {
  return (
    <div className="features-box mainwrap">
      <div className="features">
        <h2>features</h2>
        <p
          id="fp"
          data-aos="fade-right"
          data-aos-easing="ease-in-sine"
          data-aos-duration="500"
        >
          {p.features}
        </p>
      </div>
      <div className="inbox">
        <h2>in the box</h2>
        <ul>
          {p.includes.map((item, i) => (
            <li
              key={item.item}
              data-aos="fade-left"
              data-aos-easing="ease-in-sine"
              data-aos-duration={`${i + 5}00`}
            >
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
