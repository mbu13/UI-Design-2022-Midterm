const USER = "Matt Bu";
let playlist_songs = [];

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
        $("#playlist-name").val(playlist.name);
        $("#playlist-desc").html(playlist.description);
        $("#playlist-image-url").val(playlist.image);

        let index = 0;
        $.each(playlist.tracks, function (key, value) {
            // If playlist not made by current user then disable edit
            let disabled = value.createdBy != USER ? "disabled" : "enabled";

            index += 1;
            addToPreview(value, index);
        });
    }

    displayPlaylist(playlist);

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
        $('#edit-form').submit(function(e){
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
            type: "PATCH",
            url: "/playlists/" + playlist.id,                
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(new_fields),
            success: function(result){
                window.location.href = '/view/' + playlist.id;
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
            window.location.href = '/view/' + playlist.id;
        });

        $("#alertModal").modal('toggle');
    });
})