import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import  {loadProducts,loadProductsFetch} from "../data/products.js"
import '../data/cart-oop.js';
import { loadCart } from "../data/cart-oop.js";
//import '../data/backend.js';

Promise.all([
    loadProductsFetch(),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })
]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});

new Promise((resolve) => {
    loadProducts(()=>{
        resolve();
});
}).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
})

/*loadProducts(()=>{
    loadCart(()=>{
        renderOrderSummary();
        renderPaymentSummary();
    });
});*/
