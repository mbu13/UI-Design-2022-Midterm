const USER = "Matt Bu";

$(document).ready(function() {

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

    function displaySongData(song) {
        $("#title").html(song.name);
        $("#ytframe").attr("src", song.youtube);

        let artists = [];
        $.each(song.artists, function( index, value ) {
            artists.push(value.name)
        });

        $("#artists").html(artists.join(", "));
        $("#date").html(formatDate(epochToDate(song.dateReleased)));

        $("#song-img").attr("src", song.image);
        $("#song-title").html(song.name);
    }

    displaySongData(song);
})