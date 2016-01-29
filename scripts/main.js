$(function() {
    


    $('.galleryNav').click(function () {
        var index = $(this).data("target"),
            newViewTarget = $('#galleryView-'+index).slideDown(),
            newContentTarget = $('#galleryContent-'+index).slideDown();
        $(this).addClass("active");
        $('.galleryNav').not(this).removeClass("active");
        $('.galleryView').not(newViewTarget).slideUp();
        $('.galleryContent').not(newContentTarget).slideUp();
    });

    $('.galleryContent').css('display', 'none');
    $('.galleryContent.initial').css('display', 'block');

    $('.galleryView').css('display', 'none');
    $('.galleryView.initial').css('display', 'block');

    // Get an array of all element heights
    var elementHeights = $('.galleryContent').map(function() {
    return $(this).height();
    }).get();

    // Math.max takes a variable number of arguments
    // `apply` is equivalent to passing each height as an argument
    var maxHeight = Math.max.apply(null, elementHeights);

    var elementHeight = $('.galleryContentBlock').outerHeight(true) - $('.galleryContentBlock').innerHeight();
    // Set each height to the max height
    $('.galleryContentBlock').css('min-height',maxHeight + elementHeight + 10);
});