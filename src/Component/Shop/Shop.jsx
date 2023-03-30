import React, { useEffect, useState } from "react";
import Cart from "../../Cart/Cart";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Product from "../Product/Product";
import "./Shop.css";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  useEffect(()=>{
    const storedCart = getShoppingCart();
    const savedCart = [];
    // console.log(storedCart)
    //s1: get id
    for(const id in storedCart){
      // console.log(id)
      //s2 : get product from product state using id
      const addedProduct = products.find(product=> product.id ===id);
      // console.log(addedProduct)
      if(addedProduct){
        //s3: get quantity pf the product || add quantity
      const quantity = storedCart[id];
      addedProduct.quantity=quantity
      //s4: add the added product to saved cart
      savedCart.push(addedProduct)
      }
    }
    //s5: set the cart
    setCart(savedCart)
  },[products])
  const handleAddToCart = (product) => {
    let newCart = [];
    // const newCart = [...cart,product];
    //if product doesn't exist in the cart,then set quantity = 1;
    //if exist update quantity by 1
    const exists = cart.find(pd=>pd.id===product.id);
    if(!exists){
      product.quantity = 1;
      newCart= [...cart,product]
    }else{
      exists.quantity = exists.quantity +1;
      const remaining = cart.filter(pd=> pd.id!==product.id);
      newCart = [...remaining,exists]
    }

    setCart(newCart);
    addToDb(product.id)
  };
  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
