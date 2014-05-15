$(function(){

    var hotSwap = function(page, highlight, pushSate){
        if (pushSate) history.pushState(null, null, '/' + page);
        $('.pure-menu-selected').removeClass('pure-menu-selected');
        $('a[id^="menu_' + highlight + '"]').parent().addClass('pure-menu-selected');
        $.get("/get_page", {id: page}, function(data){
            $('main').html(data);
        }, 'html')
    };

    $('.hot-swapper').click(function(event){
        if (event.which !== 1) return;
        var pageId = $(this).attr('href').slice(1);
        var higlight = $(this).attr('data-highlight');
        if (higlight == null) higlight = pageId;
        hotSwap(pageId, higlight, true);
        event.preventDefault();
        return false;
    });

    window.addEventListener('load', function() {
        setTimeout(function() {
            window.addEventListener("popstate", function(e) {
                hotSwap(location.pathname.slice(1));
            });
        }, 0);
    });

    window.statsSource = new EventSource("/api/live_stats");

});
