$(document).ready(function() {
    $('.hero-slider').slick({
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        fade: true
    });

    if ($('#tabs').length) {
        $('#tabs').tabs();
    }

    // Fetch news
    $.ajax({
        url: 'data/news.json',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            data.forEach(function(item) {
                $('#news-feed').append('<p><strong>' + item.title + '</strong>: ' + item.description + '</p>');
            });
        },
        error: function() {
            $('#news-feed').append('<p>Failed to load news.</p>');
        }
    });
});