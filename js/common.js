
	$(function() {

		document.getElementById('svg-icons').innerHTML = SVG_ICONS;
 		
 		animatePopupNav (); //-- анимация всплывающего меню
 		customizeRadioCheckbox (); // кастомизация системных радиокнопок и чекбоксов
 		initCustomSelect (); //-- кастомизация дефолтного выпадающего списка
		
	});


	function initCustomSelect () {

		$('.js-select').customSelect();

	} // initCustomSelect ()

	function customizeRadioCheckbox() {
		var cr = $('.js-cr input');
		var classOnState = 'on';

		setOnOff (cr);

		cr.each(function(){

			var el = $(this);
			var elLabel = el.parent('label');
			el.is(':radio') ? elLabel.addClass('is-radio') : elLabel.addClass('is-checkbox');

		});

		cr.on('click', function() { setOnOff (cr); });

		function setOnOff (input) {

			input.each(function(){

				var el = $(this);
				var elLabel = el.parent('label');

				el.is(':checked') ? elLabel.addClass(classOnState) : elLabel.removeClass(classOnState);
			});
		} // setOnOff ();

	} // customizeRadioCheckbox ()


	function animatePopupNav() {
		$(".nav-ctrl").on('click', function(event) {
			event.preventDefault();
			
			$(this).toggleClass('is-open');
			$(".nav").toggleClass('is-open');
		});

	} // animatePopupNav ()