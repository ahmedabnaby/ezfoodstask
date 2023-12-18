import React, { useState } from "react";
import "../App.css";
import { Button, Input } from "antd";
import Parse from "parse";
import { Product } from "./Product";

export const ProductSetup = () => {
  // State variables holding input values and results
  const [productNameInput, setProductNameInput] = useState("");
  const [productPriceInput, setProductPriceInput] = useState("");
  const [productId, setProductId] = useState(null);

  // Create or retrieve Product objects and start Product component
  const createProduct = async () => {
    const productName = productNameInput;
    const productPrice = productPriceInput;

    // Check if both name and price are not empty
    if (productName === null || productPrice === null) {
      alert("Please input both name and price for the product!");
      return false;
    }

    // Check if product name already exists, if not create new parse object
    let productObject = null;
    try {
      const productParseQuery = new Parse.Query("Product");
      productParseQuery.equalTo("name", productName);
      const productParseQueryResult = await productParseQuery.first();
      if (
        productParseQueryResult !== undefined &&
        productParseQueryResult !== null
      ) {
        productObject = productParseQueryResult;
      } else {
        productObject = new Parse.Object("Product");
        productObject.set("name", productName);
        productObject.set("price", parseInt(productPrice));
        productObject = await productObject.save();
      }
    } catch (error) {
      alert(error);
      return false;
    }

    setProductId(productObject.id);
    return true;
  };

  return (
    <div>
      <div className="header">
        <img
          className="header_logo"
          alt="Back4App Logo"
          src={
            "https://blog.back4app.com/wp-content/uploads/2019/05/back4app-white-logo-500px.png"
          }
        />
        <p className="header_text_bold">{"React on Back4App"}</p>
        <p className="header_text">{"Live query products app"}</p>
      </div>
      <div className="container">
        {productId === null && (
          <div>
            <Input
              className="form_input"
              value={productNameInput}
              onChange={(event) => setProductNameInput(event.target.value)}
              placeholder={"Name (Your) Product"}
              size="large"
            />
            <Input
              className="form_input"
              type="number"
              value={productPriceInput}
              onChange={(event) => setProductPriceInput(event.target.value)}
              placeholder={"Price (Your) Product"}
              size="large"
            />
            <Button
              type="primary"
              className="form_button"
              color={"#208AEC"}
              size={"large"}
              onClick={createProduct}
            >
              Add product
            </Button>
          </div>
        )}
        {productId !== null && (
          <Product
            productName={productNameInput}
            productId={productId}
            productPrice={productPriceInput}
          />
        )}
      </div>
    </div>
  );
};