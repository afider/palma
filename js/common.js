
	$(function() {

		document.getElementById('svg-icons').innerHTML = SVG_ICONS;
 		
 		animatePopupNav (); //-- анимация всплывающего меню
		
	});


	function animatePopupNav() {
		$(".nav-ctrl").on('click', function() {
			event.preventDefault();
			
			$(this).toggleClass('is-active');

		});

	} // animatePopupNav ()