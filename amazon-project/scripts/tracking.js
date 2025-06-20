import { orders } from "../data/orders.js";
import { getProduct,loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

function getQueryParams(){
    const params = new URLSearchParams(window.location.search)
    return{
        orderId: params.get('orderId'),
        productId: params.get('productId')
    };
}
async function renderTracking() {
    await loadProductsFetch();
    let trackingHTML = '';
    const { orderId, productId } = getQueryParams();
    const order = orders.find(o => o.id === orderId);
    if (!order) {
        document.querySelector('.main').innerHTML = '<p>Order not found.</p>';
        return;
    }
    const item = order.products.find(p => p.productId === productId);
    if (!item) {
        document.querySelector('.main').innerHTML = '<p>Product not found in this order.</p>';
        return;
    }
    const deliveryDate = dayjs(item.estimatedDeliveryTime).format('dddd, MMMM D');
    const product = getProduct(productId);
    if (!product) {
        document.querySelector('.main').innerHTML = '<p>Product not found.</p>';
        return;
    }
    trackingHTML += `<div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${deliveryDate}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${item.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>`
    document.querySelector('.main').innerHTML = trackingHTML;
}

document.addEventListener('DOMContentLoaded', renderTracking);