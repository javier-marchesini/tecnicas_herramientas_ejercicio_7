Feature: Purchase

	On create new purchase

	Scenario: Total of new purchase should be equals to shipping cost
		Given New purchase with default shipping cost
		Then total should be equals shipping cost


	Scenario: Total of new purchase after add book should be equals book price and shipping cost. 
		Given  New purchase 
		When   add book "El Hobbit" with price equals 400 to purchase
		Then   total should be include books prices and shipping cost

