$(document).ready(function() {
    function displaySearchResults(results) {
        // Get query param
        var url = $(location).attr('href');
        var parts = url.split("/");
        var query = parts[parts.length-1]

        $("#query").html(query);

        if(!results || results.length == 0) {
            return;
        }

        let index = 0;

        if(!results.playlists || Object.keys(results.playlists).length == 0) {
            $('#playlists-count').html(" - No playlists found");
        } else {
            $.each(results.playlists, function (key, value) {
                index += 1;
                $("#playlists").append(
                    '<tr> \
                        <th>' + index + '</th> \
                        <td class="td-thumbnail"><img src="' + value.image + '" class="thumbnail rounded" alt-text="' + value.name + '"></td> \
                        <td class="td-description"> \
                            <h7 class="song-title">' + value.name + '</h7> \
                            <p class="song-subtitle">' + value.description + '</p> \
                        </td> \
                        <td> \
                            <p class="song-subtitle">' + value.createdBy + '</p> \
                        </td> \
                        <td><a class="btn rounded edit" data-id="' + value.id + '" href="/view/' + value.id + '"> \
                            <i class="bi-box-arrow-right"></i></a></td> \
                    </tr>'
                );
            });

            $('#playlists-count').html("- " + index + " result(s)");
        }

        if(!results.songs || results.songs.length == 0) {
            $('#songs-count').html(" - No songs found");
        } else {
            index = 0;
            $.each(results.songs, function (key, value) {
                index += 1;
                $("#songs").append(
                    '<tr> \
                        <th>' + index + '</th> \
                        <td class="td-thumbnail"><img src="' + value.image + '" class="thumbnail rounded" alt-text="' + value.name + '"></td> \
                        <td> \
                            <p class="song-title">' + value.name + '</p> \
                            <p class="song-subtitle">' + value.artists[0].name + '</p> \
                        </td> \
                        <td> \
                            <p class="song-subtitle">' + value.description + '</p> \
                        </td> \
                        <td><button class="btn add rounded playBtn" data-name="' + value.name + '"\
                            data-artist="' + value.artists[0].name + '" \
                            data-video="' + value.youtube + '" \
                            data-songid="' + value.id + '"> \
                            <i class="bi-play-fill"></i></button></td> \
                    </tr>'
                );
            });
    
            $('#songs-count').html("- " + index + " result(s)");
        }

    }

    displaySearchResults(results);
})