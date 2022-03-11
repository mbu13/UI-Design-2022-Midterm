const USER_ID = "mb4753"

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
        let songId = $(this).data('songid');

        $('#playback .title').html(name);
        $('#playback .subtitle').html(artist);
        $('#playback iframe').attr("src", video +'?autoplay=1&controls=0');

        $('#playback').show("slide", { direction: "down" }, 1000);

        // Update recent songs
        request = {"songId" : songId};
        $.ajax({
            type: "PATCH",
            url: "/recents/" + USER_ID,                
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(request),
            success: function(result) {
                console.log("Posted to recents for song ID " + songId);
            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
   });

    if ($("#song-select").length ) {
        $.ajax({
            type: "GET",
            url: "/songs",
            success: function(result){
                // Populate song selection dropdowns

                $.each(result, function (key, value) {
                    $('#song-select').append($('<option>', {
                        value: value.id,
                        text: value.name
                    }));
                });
            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
    }
})