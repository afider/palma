(function ($) {
    var uid = 1;
    $.fn.customCheckbox = function () {
        return this.each(function () {
            var self = $(this),
                input = self.find('input'),
                type = input.attr('type'),
                name = (input.attr('name') || 'custom_' + type + '_' + uid++).replace(/[^a-zA-Z0-9_\-]/g, '_');

            self.addClass('is-' + type).addClass(name);

            input.change(function () {
                if (type === 'radio') {
                    $('.' + name).removeClass('on');
                }
                self[ $(this).is(':checked') ? 'addClass' : 'removeClass' ]('on');
            });

            self[ input.is(':checked') ? 'addClass' : 'removeClass' ]('on');
        });
    };
}(jQuery));

(function ($) {
    var stateClass = "is-filled";
    $.fn.customInput = function () {
        return this.each(function () {
            var self = $(this);

            if (self.val() !== '') {
                self.addClass(stateClass);
            }

            self.blur(function () {
                if (self.val() === '') {
                    self.removeClass(stateClass);
                }
            });
            self.keyup(function () {
                self[ self.val() !== '' ? 'addClass' : 'removeClass' ](stateClass);
            });
            self.mouseover(function () {
                self[ self.val() !== '' ? 'addClass' : 'removeClass' ](stateClass);
            });
        });
    };
}(jQuery));

(function (exports, $) {
    "use strict";

    $(function () {
        // вставляем иконки
        $('#svg-icons').html(exports.SVG_ICONS);

        // кастомные селекты
        $('.js-select').customSelect();

        // кастомные чекбоксы/радио кнопки
        $('.js-cr').customCheckbox();

        // добавление класса, для полей ввода текста, в которых есть текст
        $('.input').customInput();

        // анимация всплывающих меню
        $(".js-popup-nav__ctrl").on('click', function(e) {
            e.preventDefault();
            var self = $(this),
                target = $('.' + self.data('popup'));

            self.toggleClass('is-open');
            target.toggleClass('is-open');
        });

        // кастомизация дефолтного выпадающего списка в список с возможностью поиска
        $('.js-smart-select').each(function() {
            var self = $(this);

            self.chosen({
                disable_search_threshold: 10,
                width: self.data('width'),
                no_results_text: "Может вы ошиблись? Такого не нашлось:"
            });
        });

        // кастомизация выбор города
        var selectCity = $('#search_city'),
            selectCityW = selectCity.data('width');

        selectCity.on({
            'chosen:ready': function (event, params) {
                var select = $(params.chosen.form_field);

                if (!!select.val()) {
                    params.chosen.search_container.hide();
                }
            },
            'change': function (event, params) {
                if (!params.chosen) {
                    return this;
                }

                if (!!params.selected) {
                    params.chosen.search_container.hide();
                }
                if (!!params.deselected) {
                    params.chosen.search_container.show();
                    params.chosen.choices_click(event);
                }
            }
        }).chosen({
            disable_search_threshold: 10,
            width: selectCityW,
            no_results_text: "Может вы ошиблись? Такого не нашлось:",
            max_selected_options: 1
        });
    });
}(this, jQuery));
