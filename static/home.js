const USER = "Matt Bu";

$(document).ready(function() {
    function clearPlaylists() {
        $("#recommended").empty();
    }

    function displaySongs(playlists) {
        // First clear the current view
        clearPlaylists();

        $.each( playlists, function( key, value ) {
            $("#recommended").append(
                '<div class="col-3"> \
                    <div class="card card-playlist"> \
                        <div class="img-container"> \
                            <img src="' + value.image + '" class="img-fluid rounded"> \
                            <a class="btn overlay rounded"><i class="bi-play-fill"></i></a> \
                        </div> \
                        <h7 class="song-title">' + value.name + '</h7> \
                        <p class="song-subtitle">' + value.description + '</p> \
                    </div> \
                </div>'
            );
        });
    }

    displaySongs(playlists);
})