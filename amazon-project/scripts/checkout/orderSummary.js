import { cart,removeFromCart,removeProduct,updateDeliveryOption } from "../../data/cart.js"
import { products,getProduct } from "../../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { deliveryOptions,getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary(){
    let cartSummaryHTML = ''
    let totalQuantity = 0;
    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
        const productId = cartItem.productId;
        let matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        cartSummaryHTML += 
        `<div class="cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>
            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct,cartItem)}
                </div>
                </div>
            </div>
            </div>`;
    })

    function deliveryOptionsHTML(matchingProduct,cartItem){
        let html = '';

        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
            const dateString = deliveryDate.format('dddd, MMMM D');
            const priceString = deliveryOption.priceCents === 0
                ? 'FREE'
                : `${(deliveryOption.priceCents/100).toFixed(2)} -`;
            
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
                
            html +=
                `<div class="delivery-option" data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" ${isChecked ? 'checked' : ''} 
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                </div>
            </div>`
        });
        return html;
    }

    document.querySelector('.order-summary').innerHTML = cartSummaryHTML;
    document.querySelectorAll('.delete-quantity-link').forEach((link)=>{
        link.addEventListener('click', () => {
            const productId =link.dataset.productId
            removeFromCart(productId);
            const container =document.querySelector(`.cart-item-container-${productId}`);
            container.remove();
            renderPaymentSummary();
            let updatedTotalQuantity = 0;
            cart.forEach((item) => {
                updatedTotalQuantity += item.quantity;
            });
            document.querySelector('.return-to-home-link').innerHTML = `${updatedTotalQuantity} items`; 
        });
    })

    document.querySelectorAll('.delivery-option').forEach((element) => {
        element.addEventListener('click',() => {
            const {productId,deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId,deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
    document.querySelector('.return-to-home-link').innerHTML = `${totalQuantity} items`
}

