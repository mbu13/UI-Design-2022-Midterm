const USER = "Matt Bu";

$(document).ready(function() {

    $('#nav-title').html("Playlists");
    $('#nav-playlists').addClass('active');
    $('#nav-title').attr('href', '/playlists');

    function clearPlaylists() {
        $("#my-playlists").empty();
    }

    function displayPlaylists(playlists) {
        clearPlaylists();

        let index = 0;
        $.each(playlists, function (key, value) {
            // If playlist not made by current user then disable edit
            //let disabled = value.createdBy != USER ? "disabled" : "enabled";

            index += 1;
            $("#my-playlists").append(
                '<tr> \
                    <th>' + index + '</th> \
                    <td class="td-thumbnail"><img src="' + value.image + '" class="thumbnail rounded"></td> \
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
    }

    displayPlaylists(playlists);
})