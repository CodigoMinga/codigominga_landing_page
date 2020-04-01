/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});

})(jQuery);

var sliderTeam = (function(document, $) {
  
	'use strict';
	
	var $sliderTeams = $('.slider--teams'),
		$list = $('#list'),
		$listItems = $('#list li'),
		$nItems = $listItems.length,
		$nView = 3,
		autoSlider,
		$current = 0,
		$isAuto = true,
		$acAuto = 2500,
		
		_init = function() {
		  _initWidth();
		  _eventInit();
		},
		
		_initWidth = function() {
		  $list.css({
			'margin-left': ~~(100 / $nView) + '%',
			'width': ~~(100 * ($nItems / $nView)) + '%'
		  });
		  $listItems.css('width', 100 / $nItems + '%');
		  $sliderTeams.velocity({ opacity: 1 }, { display: "block" }, { delay:1000 });
		},
		
		_eventInit = function() {
		  
		  window.requestAnimFrame = (function() {
			return  window.requestAnimationFrame       || 
				window.webkitRequestAnimationFrame || 
				window.mozRequestAnimationFrame    || 
				window.oRequestAnimationFrame      || 
				window.msRequestAnimationFrame     || 
				function(callback, element){
				  window.setTimeout(callback, 1000 / 60);
				};
		  })();
  
		  window.requestInterval = function(fn, delay) {
			  if( !window.requestAnimationFrame       && 
				  !window.webkitRequestAnimationFrame && 
				  !window.mozRequestAnimationFrame    && 
				  !window.oRequestAnimationFrame      && 
				  !window.msRequestAnimationFrame)
					  return window.setInterval(fn, delay);
			  var start = new Date().getTime(),
			  handle = new Object();
  
			  function loop() {
				  var current = new Date().getTime(),
				  delta = current - start;
				  if(delta >= delay) {
					  fn.call();
					  start = new Date().getTime();
				  }
				  handle.value = requestAnimFrame(loop);
			  };
			  handle.value = requestAnimFrame(loop);
			  return handle;
		  }
  
		  window.clearRequestInterval = function(handle) {
			  window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
			  window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value)   :
			  window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
			  window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
			  window.msCancelRequestAnimationFrame ? msCancelRequestAnimationFrame(handle.value) :
			  clearInterval(handle);
		  };
		  
		  $.each($listItems, function(i) {
			var $this = $(this);
			$this.on('touchstart click', function(e) {
			  e.preventDefault();
			  _stopMove(i);
			  _moveIt($this, i);
			});
		  });
		  
		  autoSlider = requestInterval(_autoMove, $acAuto);
		},
		
		_moveIt = function(obj, x) {
		  
		  var n = x;
		  
		  obj.find('figure').addClass('active');        
		  $listItems.not(obj).find('figure').removeClass('active');
		  
		  $list.velocity({
			translateX: ~~((-(100 / $nItems)) * n) + '%',
			translateZ: 0
		  }, {
			duration: 1000,
			easing: [400, 26],
			queue: false
		  });
		  
		},
		
		_autoMove = function(currentSlide) {
		  if ($isAuto) { 
			$current = ~~(($current + 1) % $nItems);
		  } else {
			$current = currentSlide;
		  }
		  console.log($current);
		  _moveIt($listItems.eq($current), $current);
		},
		
		_stopMove = function(x) {
		  clearRequestInterval(autoSlider);
		  $isAuto = false;
		  _autoMove(x);
		};
	
	return {
	  init: _init
	};
  
  })(document, jQuery);
  
  $(window).load(function(){
	'use strict';
	sliderTeam.init();
  });