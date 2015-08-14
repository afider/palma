
	$(function() {

		document.getElementById('svg-icons').innerHTML = SVG_ICONS;
 		
 		animatePopupNav (); //-- анимация всплывающего меню
 		customizeRadioCheckbox (); // кастомизация системных радиокнопок и чекбоксов
 		initCustomSelect (); //-- кастомизация дефолтного выпадающего списка
 		initInputFilled (); //-- добавление класса, для полей ввода текста, в которых есть текст
		
	});


	function initInputFilled () {

		var input = $('.input');
		var stateClass = "is-filled";

		input.each( function(){

			var __this = $(this);

			if( __this.val() !== '') __this.addClass(stateClass);
		});

		input.blur(function() {

			var __this = $(this);

			if ( __this.val() === '' ) __this.removeClass(stateClass);
		});

		input.mouseover(function() {

			var __this = $(this);

			if ( __this.val() !== '' ) __this.addClass(stateClass);
		});

		input.keyup(function() {

			var __this = $(this);
			console.log('up');

			if( __this.val() !== '' ) __this.addClass(stateClass);
			else __this.removeClass(stateClass);
		});
	} // initInputFilled ()


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