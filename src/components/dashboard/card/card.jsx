import "./card.css";
import Link from "next/link";

function card({ item }) {
  return (
    <Link href={`/admin/${item.jump}`} className="carda">
      <div className="card">
        <div className="ctexts">
          <span className="ctitle">{item.title}</span>
          <span className="cnumbr">{item.number}</span>
        </div>
      </div>
    </Link>
  );
}

export default card;
