// Example Album
var albumPicasso = {
    name: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { name: 'Blue', length: '4:26' },
        { name: 'Green', length: '3:14' },
        { name: 'Red', length: '5:01' },
        { name: 'Pink', length: '3:21'},
        { name: 'Magenta', length: '2:15'}
    ]
};

// Another Example Album
var albumMarconi = {
    name: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/05.png',
    songs: [
        { name: 'Blue', length: '4:26' },
        { name: 'Green', length: '3:14' },
        { name: 'Red', length: '5:01' },
        { name: 'Pink', length: '3:21'},
        { name: 'Magenta', length: '2:15'}
    ]
};

var albumHomework = {
    name: 'Homework',
    artist: 'Daft Punk',
    label: 'Virgin',
    year: '1997',
    albumArtUrl: 'assets/images/album_covers/22.jpg',
    songs: [
        { name: "Daftendirekt", length: '2:44' },
        { name:	"WDPK 83.7 FM", length: '0:28' },
        { name: "Revolution 909", length: '5:26' },
        { name: "Da Funk", length: '5:28' },
        { name: "Phœnix", length: '4:55' },
        { name: "Fresh", length: '4:03' },
        { name: "Around the World", length: '7:08' },
        { name: "Rollin' & Scratchin'", length: '7:26' },
        { name: "Teachers", length: '2:52' },
        { name: "High Fidelity", length: '6:00' },
        { name: "Rock'n Roll", length: '7:32' },
        { name: "Oh Yeah", length: '2:00' },
        { name: "Burnin'", length: '6:53' },
        { name:	"Indo Silver Club", length: '4:32'},
        { name: "Alive", length: '5:15'},
        { name: "Funk Ad", length: '0:50'}
    ]
};

var createSongRow = function (songNumber, songName, songLength) {
    
    var template = 
          '<tr class="album-view-song-item">' 
        + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
        + '  <td class="song-item-title">' + songName + '</td>' 
        + '  <td class="song-item-duration">' + songLength + '</td>' 
        + '</tr>'
        ;
    
    return template;
    
};

var setCurrentAlbum = function (album) {
    
    // #1
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 
    // #2
    albumTitle.firstChild.nodeValue = album.name;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);
 
    // #3
    albumSongList.innerHTML = '';
    // #4
    
    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
    }
 
};

var albumList = [albumPicasso, albumMarconi, albumHomework]

var albumListCounter = 0;

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];

var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

window.onload = function () {
   
    setCurrentAlbum(albumPicasso);

    var findParentByClassName = function(element, targetClass) {
        var currentParent = element.parentElement;
        while (currentParent.className != targetClass) {
            currentParent = currentParent.parentElement
        }    
        return currentParent;
    };
    
var getSongItem = function(element) {
    
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }
};
    
    var clickHandler = function(targetElement) {
        var songItem = getSongItem(targetElement);
        if (currentlyPlayingSong === null) {
            songItem.innerHTML = pauseButtonTemplate;
            currentlyPlayingSong = songItem.getAttribute('data-song-number');
        } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
            songItem.innerHTML = playButtonTemplate;
            currentlyPlayingSong = null;
        } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
            var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
            songItem.innerHTML = pauseButtonTemplate;
            currentlyPlayingSong = songItem.getAttribute('data-song-number');
        }
    };
    
    songListContainer.addEventListener('mouseover', function(event) {
        if (event.target.parentElement.className === 'album-view-song-item') {
            if (currentlyPlayingSong !== getSongItem(event.target).getAttribute('data-song-number')) {
                event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
            }
        }
    });
    
    for (i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {
            var leavingSongItem = getSongItem(event.target);
            var leavingSongItemNumber = leavingSongItem.getAttribute('data-song-number');
            
            if(leavingSongItemNumber !== currentlyPlayingSong) {
                leavingSongItem.innerHTML= leavingSongItemNumber;
            }
        });
        songRows[i].addEventListener('click', function(event) {
            clickHandler(event.target);
        });
    }
    
    document.getElementsByClassName('album-cover-art')[0].addEventListener('click', function(){
        albumListCounter++;
        if (albumListCounter >= albumList.length) {
            albumListCounter = 0;
        };
        setCurrentAlbum(albumList[albumListCounter]);
    });

     
};