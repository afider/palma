/*
 * This is based on ideas from a technique described by Alen Grakalic in
 * http://cssglobe.com/post/8802/custom-styling-of-the-select-elements
 */
(function($) {
	$.fn.customSelect = function(settings) {
		var config = {
			replacedClass: 'select__select', // Class name added to replaced selects
			customSelectClass: 'select__item', // Class name of the (outer) inserted span element
			activeClass: 'active', // Class name assigned to the fake select when the real select is in hover/focus state
			wrapperElement: '<div class="select" />' // Element that wraps the select to enable positioning
		};
		if (settings) {
			$.extend(config, settings);
		}
		this.each(function() {
			var selected = 'is-selected';
			var select = $(this);

			var selectClasses = select.attr('class');
			select.removeAttr('class');
			select.addClass(config.replacedClass);
			select.wrap(config.wrapperElement);

			var selectWrap = select.parent();
			selectWrap.addClass(selectClasses);
			var selectWidth = select.width();
			select.css('width', selectWidth);
			var update = function() {
				var val = $('option:selected', this).text();
				span.find('span span').text(val);
				var selOption = $('option:selected', this).index();
				
				if (!selectWrap.hasClass('select_stl_no-selected')) {
					if (selOption === 0) { selectWrap.removeClass(selected); } 
					else { selectWrap.addClass(selected); }
				}

				

			};
			// Update the fake select when the real selectвЂ™s value changes
			select.change(update);
			/* Gecko browsers don't trigger onchange until the select closes, so
			 * changes made by using the arrow keys aren't reflected in the fake select.
			 * See https://bugzilla.mozilla.org/show_bug.cgi?id=126379.
			 * IE normally triggers onchange when you use the arrow keys to change the selected
			 * option of a closed select menu. Unfortunately jQuery doesnвЂ™t seem able to bind to this.
			 * As a workaround the text is also updated when any key is pressed and then released
			 * in all browsers, not just in Firefox.
			 */
			select.keyup(update);
			/* Create and insert the spans that will be styled as the fake select
			 * To prevent (modern) screen readers from announcing the fake select in addition to the real one,
			 * aria-hidden is used to hide it.
			 */
			// // Three nested spans? The only way I could get text-overflow:ellipsis to work in IE7.
			// var selectStyle2 = '';
			// if (select.hasClass('select_style_2')) {
			// 	selectStyle2 = ' select__item_style_2';
			// }


			var span = $('<span class="' + config.customSelectClass + '" aria-hidden="true"><span class="select__bg"><span>' + $('option:selected', this).text() + '</span></span><span class="select__arrow"></span></span>');
			select.after(span);
			// Change class names to enable styling of hover/focus states
			select.bind({
				mouseenter: function() {
					span.addClass(config.activeClass);
				},
				mouseleave: function() {
					span.removeClass(config.activeClass);
				},
				focus: function() {
					span.addClass(config.activeClass);
				},
				blur: function() {
					span.removeClass(config.activeClass);
				}
			});
		});
	};
})(jQuery);