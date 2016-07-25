function headerDirective (){
	return {
		restrict:"E",
		templateUrl:"./templates/header.html"
	}
};

function cardsDirective (){
	return {
		restrict:"E",
		templateUrl:"./templates/cards.html"
	}
};

function carrouselDirective (){
	return {
		restrict:"E",
		templateUrl:"./templates/carrousel.html"
	}
};

function footerDirective (){
	return {
		restrict: "E",
		templateUrl:"./templates/footer.html"
	}
};

(function (){                              
	angular.module("myApp.directives", [])
	.directive('headerDirective', headerDirective)
	.directive('carrouselDirective', carrouselDirective)
	.directive('cardsDirective', cardsDirective)
	.directive('footerDirective', footerDirective);	
})();