




var word1 = 'help.',
    word2 = 'HAHA!';
    state = true;

$('h3').html(function(_, html) {
    return '<span>' + html.split('').join('</span><span>') + '</span>';
});

$('h3').on({
    mouseenter: function() {
        $('span', this).each(function(i, item) {
            $(item).delay(i*300).fadeOut(100, function() {
                $(this).text( word1.charAt(i) ).fadeIn(100);
            });
        });
    },
    mouseleave: function() {
        $('span', this).each(function(i, item) {
            $(item).delay(i*300).fadeOut(100, function() {
                $(this).text( word2.charAt(i) ).fadeIn(100);
            });
        });
    }
});
