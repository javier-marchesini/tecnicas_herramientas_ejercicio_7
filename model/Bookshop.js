let Book = require("./Book");

class Bookshop{
    constructor(){
        this.books = [];
        this.purchases = [];
    }
    addPurchase(purchase){
        this.purchases.push(purchase)
    }
    addBook(book){
        this.books.push(book)
    }
    getPurchases(){
        return this.purchases
	}

	getAllPurchasedBooks(){
		let books = this.purchases.reduce((allBooks, purchase) =>
			allBooks.concat(purchase.getCart().getBooks())
			, []);
		return books

	}

	getUniquePurchasedBooks(){
		let uniquePurchasedBooks = this.getAllPurchasedBooks()
			.filter((value, index, self) => self.indexOf(value) === index)
			.reduce(function(booksName, book) {
				booksName[book.name] = book;
				return booksName;
			  }, {});
		return uniquePurchasedBooks;
	}

	extractGreaterValueBookNameFromArray(booksArray){
		return Object.keys(booksArray).reduce((greaterBook, lessBook) => booksArray[greaterBook] > booksArray[lessBook] ? greaterBook : lessBook);
	}


	getBookByName(bookName){
		return this.getUniquePurchasedBooks()[bookName];
	}

    bestSeller(){
		let booksCount = this.getAllPurchasedBooks()
			.reduce((bookCount, book) =>
				(bookCount[book.name] = (bookCount[book.name] || 0) + 1, bookCount),
			 {});

		let bookNameBooksCount = this.extractGreaterValueBookNameFromArray(booksCount);
		return this.getBookByName(bookNameBooksCount);

	}

    topGrossing(){

		let booksSummation = this.getAllPurchasedBooks()
			.reduce((bookSummation, book) =>
				(bookSummation[book.name] = (bookSummation[book.name] || book.getBasePrice()) + book.getBasePrice(), bookSummation),
			{});

		let bookNameTopGrossing = this.extractGreaterValueBookNameFromArray(booksSummation);
		return this.getBookByName(bookNameTopGrossing);

	}

	topPurchase(){
        if (this.purchases.length == 0) throw new Error("There are no purchases");
        return this.purchases.reduce(
            (topPurchase,currentPurchase) =>
                topPurchase.getTotal() > currentPurchase.getTotal() ? topPurchase : currentPurchase)
    }

    getBestRatedBook(){
		let booksReviews = this.getAllPurchasedBooks().reduce((bookReview, book) => {
				bookReview[book.name] = book.getReviewsAverage();
				return bookReview;
		  	}, {});

		let bookNameBestRated = this.extractGreaterValueBookNameFromArray(booksReviews);
		return this.getBookByName(bookNameBestRated);
    }
}

module.exports = Bookshop;


/*

var counts = b.issues.reduce((p, c) => {
	var name = c.fields.status.name;
	if (!p.hasOwnProperty(name)) {
	  p[name] = 0;
	}
	p[name]++;
	return p;
  }, {});*/


	/*let bookNameBestRated = Object.keys(booksReviews).reduce((higherBestRated, lessBestRated) =>
				booksReviews[higherBestRated] > booksReviews[lessBestRated] ? higherBestRated : lessBestRated);*/

		/*let books2 = allPurchasedBooks.filter((value, index, self) => self.indexOf(value) === index)
		.reduce(function(booksName, book) {
			booksName[book.name] = book;
			return booksName;
		  }, {});*/


		  	/*allPurchasedBooks.forEach( book => {
			let bookName = book.name;
			if (!(bookName in books)){
				books[bookName] = book;
				booksReviews[bookName] = book.getReviewsAverage();
			}
        });*/