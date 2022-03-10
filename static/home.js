const USER = "Matt Bu";

$(document).ready(function () {
    function clearRecommended() {
        $("#recommended").empty();
    }

    function clearRecents() {
        $("#recently-played").empty();
    }

    function displaySongs(playlists) {
        clearRecommended();

        $.each(playlists, function (key, value) {
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

    function displayRecents(recentlyPlayed) {
        clearRecents();

        let index = 0;
        $.each(recentlyPlayed, function (key, value) {
            index += 1;
            $("#recently-played").append(
                '<tr> \
                    <th>' + index + '</th> \
                    <td><img src="' + value.image + '" class="thumbnail rounded"></td> \
                    <td> \
                        <h7 class="song-title">' + value.name + '</h7> \
                        <p class="song-subtitle">' + value.artists[0].name + '</p> \
                    </td> \
                    <td><button class="btn add rounded playBtn"><i class="bi-youtube"></i></button></td> \
                    <td><a class="btn add rounded"><i class="bi-plus-lg"></i></a></td> \
                </tr>'
            );
        });
    }

    displaySongs(playlists);
    displayRecents(recentlyPlayed);

    $(".playBtn").click(function() {
        console.log("Showing...");
        $('#videoModal').modal();
    });
})