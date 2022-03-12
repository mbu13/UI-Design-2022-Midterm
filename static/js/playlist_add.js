const USER = "Matt Bu";
let playlist_songs = [];

$(document).ready(function() {

    $('#nav-title').html("Create Playlist");
    $('#nav-add-playlists').addClass('active');

    function clearFields() {
        $("#playlist-name").val("");
        $("#playlist-desc").val("");
        $("#playlist-image-url").val("");
        $("#playlist tr").remove();

        $("#playlist-name").focus();
    }

    function addToPreview(song, index) {

        $("#playlist").append(
            '<tr id="' + index + "-" + song.id + '"> \
                <td class="td-thumbnail"><img src="' + song.image + '" class="thumbnail rounded" alt-text="' + value.name + '"></td> \
                <td class="td-description"> \
                    <h7 class="song-title">' + song.name + '</h7> \
                    <p class="song-subtitle">' + song.artists[0].name + '</p> \
                </td> \
                <td><a class="btn delete rounded delete-song"><i class="bi-x"></i></a></td> \
            </tr>'
        );

        playlist_songs.push(song.id);
    }

    $(document).on('click', "#add-song", function(){ 
        let id = $("#song-select option:selected").val();
        let index = $('#playlist tr').length + 1;

        $.ajax({
            type: "GET",
            url: "/songs/" + id,
            success: function(result){
                addToPreview(result, index);
            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
    });

    $(document).on('click', ".delete-song", function() { 
        let index = $(this).closest('td').parent()[0].sectionRowIndex;
        playlist_songs.splice(index, 1);

        $('#playlist tr:nth-child(' + (index+1) + ')').remove();
    });

    $(document).on('click', "#save-edit", function() { 
        $('#add-form').submit(function(e){
            e.preventDefault();  
        });

        if ($("#playlist-name").val() == "" || $("#playlist-image-url").val() == "") {
            return;
        }

        let new_fields = {}

        new_fields.name = $("#playlist-name").val();
        new_fields.description = $("#playlist-desc").val();
        new_fields.image = $("#playlist-image-url").val();
        new_fields.tracks = playlist_songs;

        console.log(playlist.id)

        $.ajax({
            type: "POST",
            url: "/playlists",                
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(new_fields),
            success: function(result){
                 $("#success-link").attr('href', '/view/' + result.id);
                 $(".success-alert").fadeIn();

                 clearFields();
            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
    });

    $(document).on('click', "#discard-edit", function() { 
        $("#dialog-title").html("Discard changes");
        $("#dialog-body").html("Are you sure you want to discard all changes?");

        $(document).on('click', "#confirm-btn", function() { 
            window.location.href = '/playlists';
        });

        $("#alertModal").modal('toggle');
    });
})