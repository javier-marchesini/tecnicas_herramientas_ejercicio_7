

const assert = require('assert');
const { Given, When, Then } = require('cucumber');

let Purchase = require("../../model/Purchase");
let Book = require("../../model/Book");
let ShoppingCart = require("../../model/ShoppingCart");



Given('New purchase with default shipping cost', function () {
	this.cart = new ShoppingCart();
	this.purchase = new Purchase(this.cart);
  });

Then('total should be equals shipping cost', function () {
assert.equal(this.purchase.getTotal(), this.purchase.getShippingCost());
});




Given('New purchase', function () {
	this.cart = new ShoppingCart();
	this.purchase = new Purchase(this.cart);
  });


When('add book {string} with price equals {int} to purchase', function (string, int) {
	// When('add book {string} with price equals {float} to purchase', function (string, float) {
	// Write code here that turns the phrase above into concrete actions
	this.hobbit = new Book(string, int);
	this.cart.addBook(this.hobbit);
});


Then('total should be include books prices and shipping cost', function () {
	assert.equal(this.purchase.getTotal(), this.purchase.getShippingCost()+this.hobbit.getFullPrice());
});

