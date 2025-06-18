import formatCurrency from "../scripts/utils/money.js";
import { getProduct,loadProductsFetch } from "./products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}

async function renderOrder(){
    try {
        const ordersGrid = document.querySelector('.orders-grid');
        if (!ordersGrid) {
            throw new Error('Orders grid element not found');
        }
        await loadProductsFetch();
        let ordersHTML = ``
        orders.forEach((order)=>{
            const orderDate = dayjs(order.dateTime).format('MMMM D');
            ordersHTML += `
            <div class="order-container">
            <div class="order-header">
            <div class="order-header-left-section">
                <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderDate}</div>
                </div>
                <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
                </div>
            </div>

            <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
            </div>
            </div>
            <div class="order-details-grid">
                    ${order.products.map(item => {
                        const product = getProduct(item.productId);
                        if (!product) {
                            console.error('Product not found:', item.productId);
                            return ''; 
                        }
                        return `
                        <div class="product-detail-container">
                            <div class="product-image-container">
                                <img src="${product.image}">
                            </div>

                            <div class="product-details">
                                <div class="product-name">
                                ${product.name}
                                </div>
                                <div class="product-delivery-date">
                                Arriving on: ${dayjs(item.estimatedDeliveryTime).format('MMMM D')}
                                </div>
                                <div class="product-quantity">
                                Quantity: ${item.quantity}
                                </div>
                                <button class="buy-again-button button-primary">
                                <img class="buy-again-icon" src="images/icons/buy-again.png">
                                <span class="buy-again-message">Buy it again</span>
                                </button>
                            </div>

                            <div class="product-actions">
                                <a href="tracking.html">
                                <button class="track-package-button button-secondary">
                                    Track package
                                </button>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
        });
    ordersGrid.innerHTML = ordersHTML;
    }catch (error) {
        console.error('Error rendering orders:', error);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    console.log('Orders:', orders);
    renderOrder();
});