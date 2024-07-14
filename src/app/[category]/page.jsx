"use client";
import { useState } from "react";
import ThreeCat from "../../components/parts/home/threecat/ThreeCat";
import Audioman from "../../components/parts/home/audioman/Audioman";
import productData from "../../data.json";
import "./list.css";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function Category({ params }) {
  const pathname = usePathname();
  const [sorting, setsorting] = useState(" ");
  const cat = params.category;
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
  };
  const [minVal, maxVal] = [1, 5000];
  const [currentMinVal, setcurrentMinVal] = useState(1);
  const [currentMaxVal, setcurrentMaxVal] = useState(5000);
  const onMinSliderChange = (e) => {
    const value = Math.min(Number(e.target.value), currentMaxVal - 1);
    setcurrentMinVal(value);
  };

  const onMaxSliderChange = (e) => {
    const value = Math.max(Number(e.target.value), currentMinVal + 1);
    setcurrentMaxVal(value);
  };
  const apply = () => {
    const filteredProducts = productData.filter(
      (product) =>
        product.category === `${cat}` &&
        product.price >= currentMinVal &&
        product.price <= currentMaxVal
    );

    // Apply sorting if a sort type is selected
    if (sorting === "low") {
      filteredProducts.sort((p1, p2) => p1.price - p2.price);
    } else if (sorting === "high") {
      filteredProducts.sort((p1, p2) => p2.price - p1.price);
    }

    setproducts(filteredProducts);
  };
  return (
    <>
      {pathname === "/" + params.category && (
        <div>
          <div className="cat-header">
            <h1 data-aos="zoom-in-up" data-aos-duration="500">
              {cat}
            </h1>
          </div>

          <div className="cat-content">
            <div className="searchbar mainwrap">
              <span>
                <Select value={sorting} onChange={handleChange}>
                  <MenuItem value=" " disabled>
                    <em>Select Sorting Type</em>
                  </MenuItem>
                  <MenuItem value="low">Price Low to High</MenuItem>
                  <MenuItem value="high">Price High to Low</MenuItem>
                </Select>
              </span>
              <span className="slidervDiv">
                <label htmlFor="a">{currentMinVal}</label>
                <input
                  name="a"
                  min={minVal}
                  max={maxVal}
                  onChange={onMinSliderChange}
                  type="range"
                  value={currentMinVal}
                />
                <input
                  name="b"
                  min={minVal}
                  max={maxVal}
                  className="b"
                  onChange={onMaxSliderChange}
                  type="range"
                  value={currentMaxVal}
                />
                <label className="labelb" htmlFor="b">
                  {currentMaxVal}
                </label>
                <button className="apply" onClick={apply}>
                  Apply
                </button>
              </span>
            </div>
            <div className="product-list">
              {products.map((product) => (
                <div
                  className={`preview id${Number(product.id) % 2} mainwrap`}
                  key={product.id}
                >
                  <div className="productim listcatim">
                    <picture>
                      <source
                        media="(max-width: 768px)"
                        srcSet={product.categoryImage.tablet}
                      />
                      <source
                        media="(max-width: 476px)"
                        srcSet={product.categoryImage.mobile}
                      />
                      <img src={product.categoryImage.desktop} alt="product" />
                    </picture>
                  </div>

                  <div
                    className="info"
                    data-aos={`fade-down-${
                      Number(product.id) % 2 === 0 ? "left" : "right"
                    }`}
                    data-aos-duration="500"
                  >
                    {product.new ? <p className="np">NEW PRODUCT</p> : <></>}
                    <h1 className="title">{product.name}</h1>
                    <p className="pr-desc">{product.description}</p>
                    <p className="price">$ {product.price}</p>

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
