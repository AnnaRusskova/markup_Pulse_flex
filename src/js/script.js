$(document).ready(function() {
    $('.carousel__inner').slick({
        speed: 1200,
        // adaptiveHeight: true,
        fade: true,
        cssEase: 'linear',
        prevArrow: '<button type="button" class="slick-prev"><img src=img/icons/arrow_left.png></button>',
        nextArrow: '<button type="button" class="slick-next"><img src=img/icons/arrow_right.png></button>',
        responsive: [
            {
                breakpoint: 992, /* действует от 0 до 1024, что выше - по обычному правилу сверху */
                settings: {
                dots: true,
                arrows: false,/* выключили стрелки */
                }
            }
        ]
      });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    // $('.catalog-item__link').each(function(i) {
    //     $(this).on('click', function(e) {
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    // });
    // $('.catalog-item__back').each(function(i) {
    //     $(this).on('click', function(e) {
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    // });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        }); 
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('fast');
    });
    // $('.button_mini').on('click', function() {
    //     $('.overlay, #order').fadeIn('slow');
    // });
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    // $('.feed-form').validate();
    // $('#consultation-form form').validate();
    // $('#consultation form').validate({
    //     rules: {
    //         name: {
    //             required: true,
    //             minlength: 2
    //           },
    //         phone: "required",
    //         email: {
    //             required: true,
    //             email: true
    //         }
    //     },
    //     messages: {
    //             name: {
    //               required: "Пожалуйста, введите свое имя",
    //               minlength: jQuery.validator.format("Введите минимум {0} символа!")
    //         },
    //         phone: "Пожалуйста, введите свой номер телефона",
    //         email: {
    //           required: "Пожалуйста, введите свою почту",
    //           email: "Неправильно введен адрес почты"
    //         }
    //       }
    // });
    // $('#order form').validate();
    
    function validateForms (form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                  },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                    name: {
                      required: "Пожалуйста, введите свое имя",
                      minlength: jQuery.validator.format("Введите минимум {0} символа!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
              }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+38 (999) 999-99-99");

    // Отправка инфо из форм
    $('form').submit(function(e) {
        e.preventDefault(); /* отмена автоматической перезагрузки страницы по умолчанию */
        $.ajax({ /* отправка данных на сервер */
            type: "POST", /* отправка, не получение */
            url: "mailer/smart.php", /* куда отправляем */
            data: $(this).serialize() /* данные для отправки в формате для сервера */
        }).done(function() { /* мы выполнили операцию и теперь : */
            $(this).find("input").val(""); /* после отправки формы - находим инпуты и их форма обнуляется */
            $('#consultation, #order').fadeOut(); /* окошко для заполнения форм закрывается */
            $('.overlay, #thanks').fadeIn('slow'); /* появляется окно благодарности */

            $('form').trigger('reset'); /* говорим, что все формы должны очиститься */
        });
        return false;
    });

    // Smooth scroll and pageup

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    // плавный скролл
    $(function(){
        $("a[href^='#up']").click(function(){
                const _href = $(this).attr("href");
                $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
                return false;
        });
    });

    new WOW().init();/*  подключили WOW-библиотеку */

});