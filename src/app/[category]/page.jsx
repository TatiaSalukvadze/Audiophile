"use client";
import { useContext } from "react";
import { MyContext } from "../../context/MyContext";
//import { Outlet, useOutletContext, NavLink } from "react-router-dom";
import ThreeCat from "../../components/parts/home/threecat/ThreeCat";
import Audioman from "../../components/parts/home/audioman/Audioman";
import productData from "../../data.json";
import "./list.css";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Category({ params }) {
  const pathname = usePathname(); //window.location.pathname;

  const cat = params.category;
  const { imageSrcKey } = useContext(MyContext);

  const products = productData
    .filter((product) => product.category === `${cat}`)
    .reverse();

  return (
    <>
      {pathname === "/" + params.category && (
        <div>
          <div className="cat-header">
            <h1>{cat}</h1>
          </div>

          <div className="cat-content">
            <div className="product-list">
              {products.map((product) => (
                <div
                  className={`preview id${Number(product.id) % 2} mainwrap`}
                  key={product.id}
                >
                  <img
                    src={product.categoryImage[imageSrcKey]}
                    alt=""
                    className="listcatim"
                  />
                  <div className="info">
                    {product.new ? <p className="np">NEW PRODUCT</p> : <></>}
                    <h1 className="title">{product.name}</h1>
                    <p className="pr-desc">{product.description}</p>
                    <Link href={`/${params.category}/${product.slug}`}>
                      <button>See Product</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ThreeCat />
          <Audioman />
        </div>
      )}
    </>
  );
}

export default Category;
