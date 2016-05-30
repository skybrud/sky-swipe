declare var Swipe: any;

/* global angular */
(function () {
	'use strict';

	/**
	 * Directive: skySwipeGallery
	 * Directive for our integration of the `swipe.js` gallery
	 * (which is a manual dependency)
	 *
	 *
	 * This gallery relies on styling from swipe.scss
	 *
	 **/

	angular.module('skySwipe').directive('skySwipe',skySwipe);

	skySwipe.$inject = ['$timeout', '$compile'];

	function skySwipe($timeout, $compile) {
		var directive = {
			restrict:'E',
			transclude:true,
			scope:true,
			templateUrl:'/sky-swipe/sky-swipe.template.html',
			link:link
		};
		function link(scope,element,attributes) {
			var intervalTimer = 0;
			var canPlay = true;

			scope.images=[];
			scope.touch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
			scope.autoplay = (attributes.hasOwnProperty('auto') && attributes.auto > 0 && !scope.touch);
				
			/* Build scope.images from the used elements */
			angular.forEach(element.find('div'),function(element,key) {
				scope.images.push({
					active:false
				});
			});

			/* Updating scope-values to startout at the first one. */
			scope.images[0].active=true;
			scope.current=1;

			element.addClass('swipe-gallery');

			/* Defining the gallery, and the callback method that runs on each swipe */
			var gallery = new Swipe(element[0], {
				continuous: attributes.hasOwnProperty('continuous') || scope.autoplay,
				callback: function(which) {
					/**
					 * Whenever the image is changed (swiped or via controls), update
					 * `scope.current`, and set the `active` property on the specific
					 * image.
					 *
					 * Wrapped in $timeout to deal with possible running $apply
					 *
					 **/
					$timeout(function() {
						// In case of 2 slides (the first and last will be duplicated)
						scope.current = scope.images.length < 3 ? (which + 1) % 2 : which + 1;
						
						angular.forEach(scope.images, function(item,key) {
							if (scope.current == key) {
								scope.images[key] = {
									active:true
								};
							} else {
								scope.images[key] = {
									active:false
								};
							}
						});

					}, 0);
				}
			});

			/* setting up custom autoplay with pause on mouse hover, touch etc. */
			if (scope.autoplay) {
				element[0].addEventListener('mouseenter', userActive);
				element[0].addEventListener('mouseleave', userInactive);
				element[0].addEventListener('touchstart', userActive);
				element[0].addEventListener('touchend', userInactive);

				setTimeout(() => {
					playInterval();
				}, attributes.delay || 0);
			}


			/* Assigning swipe.js' slide-, next- and prevmethods to the scope */
			scope.slide=function(which) {
				gallery.slide(which);
				resetInterval();
			};
			scope.next=function() {
				gallery.next();
				resetInterval();
			};
			scope.prev=function() {
				gallery.prev();
				resetInterval();
			};


			/* Autoplay methods */
			function playInterval() {
				if (canPlay && scope.autoplay) {
					intervalTimer = setInterval(gallery.next, attributes.auto);
				}
			}

			function pauseInterval() {
					clearInterval(intervalTimer);
			}

			function resetInterval() {
				pauseInterval();
				playInterval();
			}

			function userActive() {
				canPlay = false;
				pauseInterval();
			}

			function userInactive() {
				canPlay = true;
				playInterval();
			}
			
			/**
			 * Compile duplicated slides - this will be the case when
			 * only 2 slides are present
			 * 
			 * @see https://github.com/thebird/Swipe/blob/master/swipe.js#L47
			 */
			$compile(element.find('figure').contents())(scope);
		}

		return directive;

	}

})();
