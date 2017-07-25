(function () {
    setMainCarousel();
    setNavigationScroll();
    setheaderFill();
    setCarousels();
    progressBar();
    counter();

    setContactUs();
    setMap();

    animated();
})();

var attemps = 2;

function setContactUs() {
    $('#form').submit(function (e) {
        e.preventDefault();

        sendMessage();
        return false;
    })
}

function sendMessage() {
    if ($('#acceptInformation').is(":checked")) {
        attemps = --attemps;
        $('.send-button').text('Enviando...');
        var data = {
            Text: '' + $('#descriptionInput').val(),
            From: '' + $('#emailInput').val(),
            To: 'Akeog <info@akeog.com>',
            CC: 'Sales <sales@akeog.com>',
            Subject: $('#subjectInput').val(),
            ComposedTitle: '' + $('#nameInput').val() + ' dice: ' + $('#subjectInput').val(),
            ComposedBody: '<b>Nombre:</b>' + $('#nameInput').val() +
            '<br /><b>Empresa:</b>' + $('#enterpriseInput').val() +
            '<br /><b>Email:</b>' + $('#emailInput').val() +
            '<br /><b>Teléfono:</b>' + $('#telInput').val() +
			'<br /><b>Decripción:</b>' + $('#descriptionInput').val() +
            '<br /><b>¿Desea recibir brochure?:</b>' + ($('#isInformation').is(":checked") == true ? 'Si' : 'No'),
        };
        console.log(JSON.stringify(data));

        $.ajax({
            url: "http://webakeogbackend.azurewebsites.net/api/Mail/SenComposed/",
            type: "POST",
            data: data,
            dataType: "json",
            success: function (response) {
                console.log(response)
                if (response !== undefined) {
                    alert('Gracias, en breve nos contactaremos.');
                    $('.send-button').text('Enviar otra solicitud');

                    $('#descriptionInput').val('');
                    $('#emailInput').val('');
                    $('#subjectInput').val('');
                    $('#nameInput').val('');
                    $('#subjectInput').val('');
                    $('#enterpriseInput').val('');

                    $('#telInput').val('');
                }
            },
            error: function (xhr, status, error) {
                if (attemps > 0) {
                    sendMessage()
                }
                else {
                    alert('Por favor intente de nuevo');
                    $('.send-button').text('Enviar solicitud')
                    attemps = 2;
                }

                debugger;
                console.log(error);
                //$submit.disabled = false;
            }
        });
    }
    else {
        alert('Debe aceptar el uso de tratamiento de información');
    }
}

function setMap() {
    // GOOGLE MAP - GREYSCALE
    google.maps.event.addDomListener(window, 'load', init);

    function init() {
        var mapOptions = {
            zoom: 17,

            center: new google.maps.LatLng(4.6542524, -74.0561286), // Torremolinos

            styles: [{
                "featureType": "landscape",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 65
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 51
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.highway",
                "stylers": [{
                    "saturation": -100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.arterial",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": -15
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "road.local",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": -10
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "transit",
                "stylers": [{
                    "saturation": -100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "administrative.province",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "lightness": -25
                }, {
                    "saturation": -100
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#ffff00"
                }, {
                    "lightness": -25
                }, {
                    "saturation": -97
                }]
            }]
        };

        var mapElement = document.getElementById('map-greyscale');

        var map = new google.maps.Map(mapElement, mapOptions);

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(4.6542524, -74.0561286),
            map: map,
            title: 'Akeog oficina'
        });
    }

}

function setNavigationScroll() {
    $('.navbar-items>li>a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                console.log(target.offset())
                console.log(target.offset().top)
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
}

function counter() {
    if ($(".timer").length) {
        $(".timer").appear(function () {
            $(this).countTo();
        }, {
                accY: -150
            });
    }
}

function progressBar() {
    if ($('.is-bars').length) {
        $('.is-bars').appear(function () {

            var $elm = $(this),
                $w = $elm.data('width'),
                $h = $elm.data('height');

            $elm.animate({
                'width': $w + '%',
                'height': $h + '%',
            }, 1500);

        }, {
                accY: -150
            });
    }
}

function setCarousels() {
    $('#carousel-team').carousel({
        interval: 5000
    })
    $('#carousel-clients').carousel({
        interval: 8000
    })
    $('#carousel-partners').carousel({
        interval: 8000
    })

    $('.owl-carousel').owlCarousel({
        margin: 10,
        loop: true,
        autoplay: true,
        autoPlaySpeed: 5000,
        itemsDesktop: [1199, 1], itemsDesktopSmall: [979, 1], itemsTablet: [768, 1], itemsMobile: [520, 1],
        items: 1,
    })
}

function setheaderFill() {
    $(window).on('scroll', function (e) {

        var distanceY = $(window).pageYOffset || $(document).scrollTop(),
            navWrap = $('.navbar-ex1-collapse'),
            navHeight = $('nav').outerHeight();

        if (distanceY > navHeight && navWrap.data("is-fill") === true) {
            navWrap.addClass('is-fill');
        } else {
            navWrap.removeClass('is-fill');
        }

    });

}

function animated() {

    if ($('.animated').length) {
        $('.animated').appear(function () {

            var elem = $(this);
            var animation = elem.data('animation');
            var animationPercent = elem.data('percent');
            var animationDelay = elem.data('animation-delay');

            if (!elem.hasClass('visible')) {
                elem.css({
                    'width': animationPercent + '%',
                });
                if (animationDelay) {
                    setTimeout(function () {
                        elem.addClass(animation + ' visible');
                    }, animationDelay);
                } else {
                    elem.addClass(animation + ' visible');
                }
            }
        }, {
                accY: -150
            });
    } else {
        $('.animated').css('visibility', 'visible');
    }


}

function setMainCarousel() {
    var Page = (function () {

        var $nav = $('#nav-dots > span'),
            slitslider = $('#slider').slitslider({
                onBeforeChange: function (slide, pos) {

                    $nav.removeClass('nav-dot-current');
                    $nav.eq(pos).addClass('nav-dot-current');

                }
            }),

            init = function () {

                initEvents();

            },
            initEvents = function () {

                $nav.each(function (i) {

                    $(this).on('click', function (event) {

                        var $dot = $(this);

                        if (!slitslider.isActive()) {

                            $nav.removeClass('nav-dot-current');
                            $dot.addClass('nav-dot-current');

                        }

                        slitslider.jump(i + 1);
                        return false;

                    });

                });

            };

        return { init: init };

    })();

    Page.init();
}
