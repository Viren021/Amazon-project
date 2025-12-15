import {formatCurrency} from '../scripts/utils/money.js';
console.log('Test 1');

if(formatCurrency(2095)==='20.95'){
  console.log('Passed');
}else{
  console.log('Failed');
}


console.log('Test 2');
if(formatCurrency(0)==='0.00'){
  console.log('Passed');
}else{
  console.log('Failed');
}

console.log('Test 3');
if(formatCurrency(2000.5)==='20.01'){
  console.log('Passed');
}else{
  console.log('Failed');
}

if(formatCurrency(2000.4)==='20.00'){
  console.log('Passed');
}else{
  console.log('Failed');
}