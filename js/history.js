




var word1 = 'Good4you',
    word2 = 'IamGreat';
    state = true;

$('p').html(function(_, html) {
    return '<span>' + html.split('').join('</span><span>') + '</span>';
});

$('p').on({
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
