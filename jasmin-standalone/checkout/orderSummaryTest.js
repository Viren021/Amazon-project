import { renderOrderSummary } from "../../checkout/orderSummary.js";
import { loadFromStorage } from "../../data/cart.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";

describe('test suite:render order summary', () => {
  // Define variables here so they are accessible in all tests
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  // FIX 1: Move beforeAll here. This ensures products load before ANY test runs.
  beforeAll((done) => {
    loadProductsFetch().then(()=>{
      done();
    });
  });

  // FIX 2: Move beforeEach here. This resets the HTML and spies before EVERY test.
  beforeEach(() => {
    // FIX 3: Corrected spelling from 'locakStorage' to 'localStorage'
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    // Common mock for localStorage (since both tests use the same data)
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2'
        }
      ]);
    });
    
    // Load the mocked cart data
    loadFromStorage();
  });

  it('displays the cart', () => {
    renderOrderSummary();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');
  });

  it('removes a product', () => {
    renderOrderSummary();

    // Click the delete link for the first product
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
  });
});