
	$(function() {

		initPlaceholder (); //--Инициализируем placeholder для браузеров, его не поддерживающих
		
	});


	function initPlaceholder () {

		$('input[placeholder], textarea[placeholder]').placeholder();

	} // initPlaceholder ()