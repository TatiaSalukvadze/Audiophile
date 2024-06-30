// import { MdSupervisedUserCircle } from "react-icons/md";
import "./card.css";

function card({ item }) {
  return (
    <a href={`#${item.jump}`} className="carda">
      <div className="card">
        {/* <MdSupervisedUserCircle size={24} /> */}
        <div className="ctexts">
          <span className="ctitle">{item.title}</span>
          <span className="cnumbr">{item.number}</span>
          {/* <span className={styles.detail}>
          <span className={item.change > 0 ? styles.positive : styles.negative}>
            {item.change}%
          </span>{" "}
          {item.change > 0 ? "more" : "less"} than previous week
        </span> */}
        </div>
      </div>
    </a>
  );
}

export default card;
