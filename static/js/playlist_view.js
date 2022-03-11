const USER = "Matt Bu";

$(document).ready(function() {

    $('#nav-title').html("Playlists > " + playlist.name);
    $('#nav-playlists').addClass('active');
    //$('#nav-title').attr('href', '/playlists/');

    function epochToDate(epoch) {
        if (epoch < 10000000000)
            epoch *= 1000; 
        var epoch = epoch + (new Date().getTimezoneOffset() * -1);       
        return new Date(epoch);
    }

    function formatDate(date) {
        var year = date.getFullYear();
      
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return month + '/' + day + '/' + year;
    }

    function clearPlaylist() {
        $("#playlist").empty();
    }

    function displayPlaylist(playlist) {
        clearPlaylist();

        $("#playlist-img").attr("src", playlist.image);
        $("#owner").html(playlist.createdBy);
        $("#date-created").html(formatDate(epochToDate(playlist.dateCreated)));
        $("#playlist-title").html(playlist.name);
        $("#playlist-desc").html(playlist.description);
        $("#edit-playlist").attr("href", "/edit/" + playlist.id);

        let index = 0;
        $.each(playlist.tracks, function (key, value) {
            // If playlist not made by current user then disable edit
            let disabled = value.createdBy != USER ? "disabled" : "enabled";

            index += 1;
            $("#playlist").append(
                '<tr> \
                    <th>' + index + '</th> \
                    <td class="td-thumbnail"><img src="' + value.image + '" class="thumbnail rounded"></td> \
                    <td class="td-description"> \
                        <h7 class="song-title">' + value.name + '</h7> \
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

    displayPlaylist(playlist);
})