(function () {
	'use strict';

	describe('Directive: skySwipe', function() {
		var $compile,
			$rootScope,
			scope,
			element,
			html,
			$timeout;


		beforeEach(module('skySwipe'));

		beforeEach(inject(function(_$rootScope_,_$compile_,_$timeout_){
			$rootScope = _$rootScope_;
			$compile = _$compile_;
			$timeout = _$timeout_;
		}));

		beforeEach(function() {
			element = angular.element('<sky-swipe> <div><img src="http://lorempixel.com/500/280/sports/1/" alt="" /></div>	<div><img src="http://lorempixel.com/500/280/sports/2/" alt="" /></div>	<div><img src="http://lorempixel.com/500/280/sports/3/" alt="" /></div>	</sky-swipe>');

			$compile(element)($rootScope);
			scope = element.scope();

			$rootScope.$digest();
			html = element.html();
		});

		it('should show 3 bullets', function() {
			var bullets = element[0].querySelectorAll('.bullets li');

			expect(bullets.length).toBe(3);
		});

		it('should activate the first image', function() {

			var bullets = element[0].querySelectorAll('.bullets li');
			var counter = element[0].querySelector('ul:not(.bullets) li:nth-child(2) span');

			expect(bullets[0].classList.contains('act')).toBe(true);
			expect(bullets[1].classList.contains('act')).toBe(false);
			expect(bullets[2].classList.contains('act')).toBe(false);

			expect(counter.innerHTML).toBe('1/3');

			expect(scope.current).toBe(1);
		});

		it('should go to specific image when clicking bullet', function() {
			var bullets = element[0].querySelectorAll('.bullets li');

			angular.element(bullets[2]).triggerHandler('click');

			/* because sometimes needs applying this call is wrapped in $timeout - we need to flush */
			$timeout.flush();
			$rootScope.$digest();

			bullets = element[0].querySelectorAll('.bullets li');
			var counter = element[0].querySelector('ul:not(.bullets) li:nth-child(2) span');

			expect(bullets[0].classList.contains('act')).toBe(false);
			expect(bullets[1].classList.contains('act')).toBe(false);
			expect(bullets[2].classList.contains('act')).toBe(true);

			expect(counter.innerHTML).toBe('3/3');

			expect(scope.current).toBe(3);
		});

		it('should navigate right and left', function() {
			var next = element[0].querySelector('button[ng-click="next()"]');
			var prev = element[0].querySelector('button[ng-click="prev()"]');

			expect(scope.current).toBe(1);

			/* go right */
			angular.element(angular.element(next)).triggerHandler('click');
			$timeout.flush();
			$rootScope.$digest();

			expect(scope.current).toBe(2);

			/* go left */
			angular.element(angular.element(prev)).triggerHandler('click');
			$timeout.flush();
			$rootScope.$digest();

			expect(scope.current).toBe(1);
		});

	});
})();
