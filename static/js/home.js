const USER = "Matt Bu";

$(document).ready(function () {
    $('#nav-title').html("Home");
    $('#nav-home').addClass('active');

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
                    <div class="card card-playlist" data-target="' + value.id + '"> \
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

        console.log(recentlyPlayed);

        let index = Object.keys(recentlyPlayed).length + 1;
        $.each(recentlyPlayed, function (key, value) {
            index -= 1;
            $("#recently-played").prepend(
                '<tr> \
                    <th>' + index + '</th> \
                    <td class="td-thumbnail"><img src="' + value.image + '" class="thumbnail rounded"></td> \
                    <td> \
                        <p class="song-title">' + value.name + '</p> \
                        <p class="song-subtitle">' + value.artists[0].name + '</p> \
                    </td> \
                    <td><button class="btn add rounded playBtn" data-name="' + value.name + '"\
                        data-artist="' + value.artists[0].name + '" \
                        data-video="' + value.youtube + '" \
                        data-songid="' + value.id + '"> \
                        <i class="bi-play-fill"></i></button></td> \
                </tr>'
            );
        });
    }

    displaySongs(playlists);
    displayRecents(recentlyPlayed);

    $(document).on('click', ".card-playlist", function(){ 
        window.location = "/view/" + $(this).data('target');
    });
})