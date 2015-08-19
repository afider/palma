
	$(function() {

		document.getElementById('svg-icons').innerHTML = SVG_ICONS;
 		
 		animatePopup (); //-- анимация всплывающих меню
 		customizeRadioCheckbox (); // кастомизация системных радиокнопок и чекбоксов
 		initCustomSelect (); //-- кастомизация дефолтного выпадающего списка
 		initInputFilled (); //-- добавление класса, для полей ввода текста, в которых есть текст
 		setAllChecked (); //-- установка всем чекбоксам при модерации checked
 		initSmartSelect (); //-- кастомизация дефолтного выпадающего списка в список с возможностью поиска
		
	});


	function initSmartSelect () {

		$('.js-smart-select').each(function() {
			 var el = $(this);
			 var selectW = el.data('width');

			 el.chosen({
				disable_search_threshold: 10,
				width: selectW,
				no_results_text: "Может вы ошиблись? Такого не нашлось:",
			});

		});

		var selectCity = $('#search_city');
		var selectCityW = selectCity.data('width');

		selectCity.chosen({
			disable_search_threshold: 10,
			width: selectCityW,
			no_results_text: "Может вы ошиблись? Такого не нашлось:",
			max_selected_options: 1
		});
	} // initSmartSelect ()


	function setAllChecked () {

		$('.m-header__ctrl').on('click', function() {
			
			var el = $(this);
			var checkbox = el.find('input');

			if ( checkbox.is(':checked') ) {

				$('.m-teasers__checkbox input').prop('checked', true);
				customizeRadioCheckbox ();
			}
			else {

				$('.m-teasers__checkbox input').prop('checked', false);
				customizeRadioCheckbox ();
			}

			
		});
	} // setAllChecked ()

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


	function animatePopup() {
		$(".js-popup-nav__ctrl").on('click', function(event) {
			event.preventDefault();

			var el = $(this);
			var elTargetClass = el.data('popup');
			var elTarget = $('.' + elTargetClass);
			console.log(elTarget);
			
			el.toggleClass('is-open');
			elTarget.toggleClass('is-open');
		});

	} // animatePopupNav ()