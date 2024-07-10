// import { useContext } from "react";
// import { MyContext } from "../../../context/MyContext";
// import { useRouter } from "next/navigation";
import data from "../../../data.json";
import GoBack from "../../../components/parts/product/goBack";
import Singlep from "../../../components/parts/product/singlep/Singlep";
import Features from "../../../components/parts/product/features/Features";
import Gallery from "../../../components/parts/product/gallery/Gallery";
import Others from "../../../components/parts/product/others/Others";
import ThreeCat from "../../../components/parts/home/threecat/ThreeCat";
import "./product.css";
import "../list.css";
import "../../home/Home.css";

function Product({ params }) {
  // const { imageSrcKey } = useContext(MyContext);
  // const { product } = params.product; // es exeba :product-s pathsshi
  // const router = useRouter();

  const p = data.find((el) => el.slug === params.product);

  return (
    <>
      {p && (
        <div className="product cat-content">
          {/* <p onClick={() => router.back()} className="goback preview mainwrap">
            Go Back
          </p> */}
          <GoBack />
          <Singlep p={p} />
          <Features p={p} />
          <Gallery p={p} />
          <Others items={p.others} />
          <ThreeCat />
        </div>
      )}
    </>
  );
}

export default Product;
