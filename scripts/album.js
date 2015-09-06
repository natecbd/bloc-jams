var createSongRow = function (songNumber, songName, songLength) {
    
    var template = 
          '<tr class="album-view-song-item">' 
        + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
        + '  <td class="song-item-title">' + songName + '</td>' 
        + '  <td class="song-item-duration">' + songLength + '</td>' 
        + '</tr>'
        ;
    
    var $row = $(template);
    
    var clickHandler = function () {
        
        var songNumber = parseInt($(this).attr('data-song-number'));
        
        if (currentlyPlayingSongNumber !== null) {
            var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        if (currentlyPlayingSongNumber !== songNumber) {
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSongNumber = songNumber;
            currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
            updatePlayerBarSong();
        } else if (currentlyPlayingSongNumber === songNumber) {
            $(this).html(playButtonTemplate);
            $('.left-controls .play-pause').html(playerBarPlayButton);
            currentlyPlayingSongNumber = null;
            currentSongFromAlbum = null;
        }
    };
    
    var onHover = function (event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        
        if (currentlyPlayingSongNumber !== songNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };
    
    var offHover = function (event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
    };
    
    $row.find('.song-item-number').click(clickHandler);
    
    $row.hover(onHover, offHover);
    
    return $row;
    
};

var setCurrentAlbum = function (album) {
    
    currentAlbum = album;
    // #1
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
 
    // #2
    $albumTitle.text(album.name);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
 
    // #3
    $albumSongList.empty();
    // #4
    
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
        $albumSongList.append($newRow);
    }
 
};

var trackIndex = function (album, song) {
    return album.songs.indexOf(song);
};

var getSongNumberCell = function(target) {
    return $('.song-item-number[data-song-number="' + target + '"]');
}

var nextSong = function (event) {
    
    var previousSongFromAlbum = currentlyPlayingSongNumber;

    indexOfNextSong = trackIndex(currentAlbum, currentSongFromAlbum) + 1;
    
    if (indexOfNextSong >= currentAlbum.songs.length) {
        indexOfNextSong = 0;
    }
    
    currentSongFromAlbum = currentAlbum.songs[indexOfNextSong];
    currentlyPlayingSongNumber = indexOfNextSong + 1;
    
    updatePlayerBarSong();

    var lastSongNumber = previousSongFromAlbum;
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
}

var previousSong = function (event) {
    
    var nextSongFromAlbum = currentlyPlayingSongNumber;

    indexOfPreviousSong = trackIndex(currentAlbum, currentSongFromAlbum) - 1;
    if (indexOfPreviousSong === -1) {
        indexOfPreviousSong = currentAlbum.songs.length - 1;
    }
    
    currentSongFromAlbum = currentAlbum.songs[indexOfPreviousSong];
    currentlyPlayingSongNumber = indexOfPreviousSong + 1;
    
    updatePlayerBarSong();

    var lastSongNumber = nextSongFromAlbum;
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
}

var updatePlayerBarSong = function () {
    
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + ' - ' + currentAlbum.artist);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    
    $('.left-controls .play-pause').html(playerBarPauseButton);
    
};


var albumList = [albumPicasso, albumMarconi, albumHomework]
var albumListCounter = 0;

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

// Player bar element selectors
var $previousButton = $('.left-controls .previous');
var $nextButton = $('.left-controls .next');

$(document).ready(function() {
   
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    
    document.getElementsByClassName('album-cover-art')[0].addEventListener('click', function(){
        albumListCounter++;
        if (albumListCounter >= albumList.length) {
            albumListCounter = 0;
        };
        setCurrentAlbum(albumList[albumListCounter]);
    });

     
});