$(document).ready(function() {

    function search(query) {
        if(query.trim()) {
            window.location.href = '/search/' + query.trim();
        }

        $("#search-query").val("");
        $("#search-query").focus();
    }

    $("#search-form").submit(function(e) {
        e.preventDefault();
        
        console.log("Searching...");
        let query = $("#search-query").val();
        search(query);
    });

    $(document).on('click', '.playBtn', function(){ 
        let name = $(this).data('name');
        let artist = $(this).data('artist');
        let video = $(this).data('video');

        $('#playback .title').html(name);
        $('#playback .subtitle').html(artist);
        $('#playback iframe').attr("src", video +'?autoplay=1&controls=0');

        $('#playback').show("slide", { direction: "down" }, 1000);
   });
})