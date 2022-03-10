$(document).ready(function() {
    function displaySearchResults(results) {
        // Get query param
        var url = $(location).attr('href');
        var parts = url.split("/");
        var query = parts[parts.length-1]

        $("#query").html(query);

        if(!results || results.length == 0) {
            $("#search-body").html("No results found");
            return;
        }

        $.each(results, function( index, song ) {
            $("#search-results").append(
                '<li class="list-group-item">' + 
                '<img src="' + song.image + '" class="song-img rounded float-left"></img>' +
                '</p><a href="/view/' + song.id + '">' + song.name + '</a>' + 
                '</li>'
            );
        });
    }

    displaySearchResults(results);
})