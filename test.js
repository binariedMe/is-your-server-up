/**
 * To keep this assignment short and relevant, I opted to not include
 * any testing framework.
 * Instead of simple console as printed here, we can have an expectation library to
 * check for test cases
 * @type {request}
 */


let request = require('request-promise-native');

let applicationUrl = 'http://localhost:3000';

let invalidUrl = 'invalidurl';
let badUrl = 'https://www.randomstringstoformaurl.com';
let workingUrl = 'https://www.google.com';
let allowParallel = true;

/**
 * First test case,
 * checking for an invalid url
 */
console.log('Invalid url should return error as well as status code -1');

request(`${applicationUrl}/?url=${invalidUrl}`).then((response) => {
    console.log(response);
});

/**
 * Second test case,
 * checking for a bad url with sequential retry
 */


console.log('bad url should return status code -1');

request(`${applicationUrl}/?url=${badUrl}`).then((response) => {
    console.log(response);
});

/**
 * Third test case,
 * checking for a bad url with parallel retry
 */


console.log('bad url should return status code -1');

request(`${applicationUrl}/?url=${badUrl}&parallel=${allowParallel}`).then((response) => {
    console.log(response);
});

/**
 * Fourth test case,
 * checking for a working url with sequential retry
 */


console.log('working url should return status code 200');

request(`${applicationUrl}/?url=${workingUrl}`).then((response) => {
    console.log(response);
});

/**
 * Third test case,
 * checking for a working url with parallel retry
 */


console.log('working url should return status code 200');

request(`${applicationUrl}/?url=${invalidUrl}&parallel=${allowParallel}`).then((response) => {
    console.log(response);
});

