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

        // инициализация плагина для кастомизации стандартных полос прокрутки
        $('.js-scroller').baron({
            scroller: '.scroller__body',
            bar: '.scroller__bar',
            barOnCls: 'scroller_stt_scroll'
            });

        $('.js-scroller .scroller__body').scroll(function() {
            var scrollSpace = $(this).scrollTop();
            var self = $(this);
            var selfParent = self.parent();
            if (scrollSpace > 0) selfParent.addClass('scroller_stt_scrolled');
            else  selfParent.removeClass('scroller_stt_scrolled');
        });

        // анимация всплывающих меню
        $(".js-popup-nav__ctrl").on('click', function(e) {
            e.preventDefault();
            var self = $(this),
                target = $('.' + self.data('popup'));

            self.toggleClass('is-open');
            target.toggleClass('is-open');
        });

        $(document).click(function(e){
            if ( $(e.target).closest('.main-nav').length === 0 ) {

                $('.main-nav__i_more').removeClass('is-open');
                $('.hint-bottom').removeClass('is-open');
            }
            
        });

        // анимация подменю главного каталога
        var catalogParentItem = $(".catalog__i_parent");
        var catalogParentItemClass = 'catalog__i_parent';

        catalogParentItem.on('click', function(e) {
            e.preventDefault();

            var self = $(this);

            catalogParentItem.removeClass("is-open");
            self.addClass('is-open');
        });

        $(document).on("click", function(e) { 
            if($(e.target).closest('.' + catalogParentItemClass).length === 0) { 
                catalogParentItem.removeClass("is-open"); 
            } 

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


        // подключение плагина для установки интервалов и связанные с ним конструкции
        $(".interval-slider").each(function() {
            var self = $(this);
            var interval = self.parents('.interval');

            var minimum = interval.find('.interval__i_tp_min .interval__val');
            var maximum = interval.find('.interval__i_tp_max .interval__val');

            var minimumVal = minimum.val();
            var maximumVal = maximum.val();

            var boundsMin = self.data('min');
            var boundsMax = self.data('max');

            var defValMin = self.data('valmin');
            var defValMax = self.data('valmax');

            var rangeStep = self.data('step');

            var stateClass = 'is-open';

            self.rangeSlider({
                arrows:false,
                bounds: {min: boundsMin, max: boundsMax},
                defaultValues:{min: defValMin, max: defValMax},
                step: rangeStep,
                //valueLabels: "hide",
            });

            var basicValues = self.rangeSlider("values");

            minimum.val(Math.round(basicValues.min));
            maximum.val(Math.round(basicValues.max));

            // устанавливаем соответствующие значения инпутам при перетаскивании слайдера
            self.bind("valuesChanging", function(e, data){
                minimum.val(Math.round(data.values.min));
                maximum.val(Math.round(data.values.max));
            });


            // устанавливаем класс блоку .interval для появления слайдера при получени фокуса полем ввода
            minimum.on('focusin', function() { interval.addClass(stateClass); });
            minimum.on('focusout', function() { interval.removeClass(stateClass); });

            maximum.on('focusin', function() { interval.addClass(stateClass); });
            maximum.on('focusout', function() { interval.removeClass(stateClass); });

            
            // устанавливаем соответствующие значения минимальному уровню слайдера при изменении min-инпута
             if (minimum.val() !== '') {
                self.rangeSlider("values", minimum.val(), maximum.val());
            }

            minimum.blur(function () {
                if (minimum.val() === '') {
                    self.rangeSlider("values", defValMin, defValMax);
                }
            });

            minimum.keyup(function () {
                if (minimum.val() !== '') {
                    self.rangeSlider("values", minimum.val(), maximum.val());
                }
                
            });

            minimum.mouseover(function () {
                self.rangeSlider("values", minimum.val(), maximum.val());
            });


            // устанавливаем соответствующие значения минимальному уровню слайдера при изменении max-инпута
             if (maximum.val() !== '') {
                self.rangeSlider("values", minimum.val(), maximum.val());
            }

            maximum.blur(function () {
                if (maximum.val() === '') {
                    self.rangeSlider("values", defValMin, defValMax);
                }
            });

            maximum.keyup(function () {
                if (maximum.val() !== '') {
                    self.rangeSlider("values", minimum.val(), maximum.val());
                }
                
            });

            maximum.mouseover(function () {
                self.rangeSlider("values", minimum.val(), maximum.val());
            });
            

        });

        // Подключение плагина всплывающих окон
        // Add it after jquery.magnific-popup.js and before first initialization code
        $.extend(true, $.magnificPopup.defaults, {
          tClose: 'Закрыть (Esc)', // Alt text on close button
          tLoading: 'Идет загрузка...', // Text that is displayed during loading. Can contain %curr% and %total% keys
          gallery: {
            tPrev: 'Предыдущая (или кнопка «влево»)', // Alt text on left arrow
            tNext: 'Следающая (или кнопка «вправо»)', // Alt text on right arrow
            tCounter: '%curr% из %total%' // Markup for "1 of 7" counter
          },
          image: {
            tError: '<a href="%url%">Изображения по такой ссылке</a> нет.' // Error message when image could not be loaded
          },
          ajax: {
            tError: '<a href="%url%">Содержимое</a> не загружается.' // Error message when ajax request failed
          }
        });

        $('.js-popup').magnificPopup({
                type: 'inline',

                fixedContentPos: true,
                fixedBgPos: true,

                overflowY: 'auto',

                closeBtnInside: true,
                preloader: false,
                
                midClick: true,
                removalDelay: 300,
                mainClass: 'my-mfp-slide-bottom'
            });

        // Подключение плагина для увеличения и просмотра изображений
        var zoomClass = 'js-img-zoom';
        $('.'+ zoomClass).magnificPopup({
            gallery:{enabled:true},
            delegate: '.' + zoomClass + '__target', // child items selector, by clicking on it popup will open
            type: 'image',

            image: {
                titleSrc: function(item) {
                    var imgDate = item.el.attr('data-date');
                    var imgTitle = item.el.attr('title');
                    if (imgDate === undefined) {imgDate = '';}
                    if (imgTitle === undefined) {imgTitle = '';}
                    var imgCapture = '<small class="mfp-title__date">' + imgDate + '</small>' + imgTitle;
                    return imgCapture;
                }
            },

            mainClass: 'mfp-with-zoom', // this class is for CSS animation below

              zoom: {
                enabled: false, // By default it's false, so don't forget to enable it

                duration: 300, // duration of the effect, in milliseconds
                easing: 'ease-in-out', // CSS transition easing function 

                // The "opener" function should return the element from which popup will be zoomed in
                // and to which popup will be scaled down
                // By defailt it looks for an image tag:
                opener: function(openerElement) {
                  // openerElement is the element on which popup was initialized, in this case its <a> tag
                  // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                  return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
              }

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


        var selectCity2 = $('#search_city2'),
            selectCityW2 = selectCity2.data('width');

        selectCity2.on({
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
            width: selectCityW2,
            no_results_text: "Может вы ошиблись? Такого не нашлось:",
            max_selected_options: 1
        });
    });
}(this, jQuery));
