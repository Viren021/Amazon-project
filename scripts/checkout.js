import { renderOrderSummary } from "../checkout/orderSummary.js";
import { renderPaymentSummary } from "../checkout/paymentSummary.js";
import { loadCart } from "../data/cart.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
// import "../data/cart-class.js";
// import '../data/backend-practice.js';


async function loadPage(){
  try{
    // throw 'err1';
    await loadProductsFetch();
    const value=await new Promise((resolve,reject)=>{
      // throw 'err2';
      loadCart(()=>{
        // reject('err3');
        resolve('value3');
      });
    });
  } catch(error){
    console.log('error in loading page');
  }

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();



// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve)=>{
//     loadCart(()=>{
//       resolve();
//     });
//   })
// ]).then((values)=>{
//   console.log(values);
//   renderOrderSummary();
//   renderPaymentSummary();
// });
// 
// new Promise((resolve)=>{
//   loadProducts(()=>{    
//     resolve('value1');
//   });
// }).then((value)=>{
//   console.log(value);
//   return new Promise((resolve)=>{
//     loadCart(()=>{
//       resolve();
//     });
//   });
// }).then(()=>{
//   renderOrderSummary();
//   renderPaymentSummary();
// })

// loadProducts(() => {
//   loadCart(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// });