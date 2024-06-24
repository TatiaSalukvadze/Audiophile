"use client";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../context/MyContext";
//import { Outlet, useOutletContext, NavLink } from "react-router-dom";
import ThreeCat from "../../components/parts/home/threecat/ThreeCat";
import Audioman from "../../components/parts/home/audioman/Audioman";
import productData from "../../data.json";
import "./list.css";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

function Category({ params }) {
  const pathname = usePathname(); //window.location.pathname;
  const [sorting, setsorting] = useState(" ");
  const cat = params.category;
  const { imageSrcKey } = useContext(MyContext);
  const [products, setproducts] = useState(
    productData.filter((product) => product.category === `${cat}`).reverse()
  );

  const handleChange = (e) => {
    const type = e.target.value;
    setsorting(type);
    const temp = products;
    if (type === "low") {
      setproducts(temp.sort((p1, p2) => p1.price - p2.price));
    } else if (type === "high") {
      setproducts(temp.sort((p1, p2) => p2.price - p1.price));
    }
    console.log(products);
  };
  return (
    <>
      {pathname === "/" + params.category && (
        <div>
          <div className="cat-header">
            <h1>{cat}</h1>
          </div>

          <div className="cat-content">
            <span id="sortb" className="mainwrap">
              <Select value={sorting} onChange={handleChange}>
                <MenuItem value=" " disabled>
                  <em>Select Sorting Type</em>
                </MenuItem>
                <MenuItem value="low">Price Low to High</MenuItem>
                <MenuItem value="high">Price High to Low</MenuItem>
              </Select>
            </span>
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
                    <p className="price">$ {product.price}</p>
                    {/* <Link href={`/${params.category}/${product.slug}`}>
                      <button>See Product</button>
                    </Link> */}
                    <div className="button-container-1">
                      <span className="mas">See Product</span>
                      <Link href={`/${params.category}/${product.slug}`}>
                        <button>See Product</button>
                      </Link>
                    </div>
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
