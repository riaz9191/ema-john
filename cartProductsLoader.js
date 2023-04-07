import { getShoppingCart } from "./src/utilities/fakedb";

const CarrtProfuctsLoader = async() => {
    const loadedProducts = await(fetch('products.json'))
    const products = await loadedProducts.json();

    //if cart data is in database ,you should use async await
    const storedCart = getShoppingCart();

    const savedCart= []

    console.log(storedCart)
    for(const id in storedCart){
        const addedProduct = products.find(pd=>pd.id===id);
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity= quantity;
            savedCart.push(addedProduct);
        }
    }
    console.log(products)
    // if you need to send two things
    // return [products,savedCart]
    //another option
    // return{products,cart: savedCart}


    return savedCart;
}



export default CarrtProfuctsLoader;