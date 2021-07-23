// Player
var Player = function() {
    var _this = this,
    $playerAll = $('[data-player]'),
    $playerCurrent = null,
    $displayArtistName = null,
    $displayAlbumName = null,
    $displaySongName = null,
    $controlPrev = $('[data-player-prev]'),
    $controlPlay = $('[data-player-play]'),
    $controlNext = $('[data-player-next]'),
    index = 0,
    path = {
        audio: 'http://lab.islegend.com/challenge/music-player/assets/audio/'
    },
    playing = false,
    playlist = null,
    audio = null;

    _this.methods = {
        init: function() {
            _this.methods.bindUserEvents();
        },
        bindUserEvents: function() {

            $playerAll.on('click', function() {

                if ( !$(this).hasClass('player--open') ) {

                    // pause the current player
                    if (audio !== null) { 
                        audio.pause(); 
                        $playerCurrent.removeClass('player--open player--playing');
                    }

                    // get new player
                    $playerCurrent = $(this);
                    index = $playerCurrent.data('track');

                    // retrieve display elements
                    $displayArtistName = $playerCurrent.find('[data-player-album-artist]');
                    $displayAlbumName = $playerCurrent.find('[data-player-album-name]'),
                    $displaySongName = $playerCurrent.find('[data-player-album-song]');

                    // Audio
                    playlist = playlists[$playerCurrent.data('playlist')];
                    audio = $playerCurrent.find('audio').get(0);
                    audio.addEventListener('ended', function() { 
                        _this.methods.nextTrack();
                    });
                    if (!audio.src) { _this.methods.loadTrack(0); }
                    _this.methods.playTrack();

                    $playerCurrent.toggleClass('player--open');

                }

            });

            $controlPlay.on('click', function() {

                if ($playerCurrent.hasClass('player--playing')) {
                    _this.methods.pauseTrack();
                } else {
                    _this.methods.playTrack();
                }

            }); 

            $controlNext.on('click', function() {
                _this.methods.nextTrack();
            }); 

            $controlPrev.on('click', function() {
                _this.methods.prevTrack();
            }); 

        },
        loadTrack: function() {
            audio.src = path.audio + playlist.slug + '/' + playlist.tracks[index].file;
            $displayArtistName.text(playlist.tracks[index].artist);
            $displayAlbumName.text(playlist.tracks[index].album);
            $displaySongName.text(playlist.tracks[index].song);
            $playerCurrent.data('track', index);
        },
        playTrack: function() {
            $playerCurrent.addClass('player--playing');
            playing = true;
            audio.play();
        },
        pauseTrack: function() {
            $playerCurrent.removeClass('player--playing');
            playing = false;
            audio.pause();
        },
        nextTrack: function() {

            if ((index + 1) < playlist.trackCount) {
                index++;
            } else {
                index = 0;
            }

            _this.methods.loadTrack(index);

            if (playing) {
                audio.play();
            }

        },
        prevTrack: function() {

            if ((index - 1) > -1) {
                index--;
            } else {
                index = (playlist.trackCount - 1);
            }

            _this.methods.loadTrack(index);

            if (playing) {
                audio.play();
            }

        }
    };

    return _this.methods;

};

// Load
$(function() {
    player = new Player();
    player.init();
});

// Data
var playlists = {
    billionaires2014Compilation: {
        slug: "billionaires-2014-compilation",
        trackCount: 17,
        tracks: [
            {
                "track": 1,
                "artist": "Another Monster",
                "album": "Press Play EP",
                "song": "Drop It Low",
                "file": "another-monster-drop-it-low.mp3"
            }, {
                "track": 2,
                "artist": "George Antonios",
                "album": "Billionaires 2014 Compilation",
                "song": "Signals In The Dark",
                "file": "george-antonios-signals-in-the-dark.mp3"
            }, {
                "track": 3,
                "artist": "Hypercube",
                "album": "Billionaires 2014 Compilation",
                "song": "Analog Circuits",
                "file": "hypercube-analog-circuits.mp3"
            }, {
                "track": 4,
                "artist": "Klarity",
                "album": "Truth & Lies EP",
                "song": "Second Nature",
                "file": "klarity-second-nature.mp3"
            }, {
                "track": 5,
                "artist": "Clerks",
                "album": "Zone 6 Wizard EP",
                "song": "Drama",
                "file": "clerks-drama.mp3"
            }, {
                "track": 6,
                "artist": "M00DY",
                "album": "Super Squad EP",
                "song": "Voyage",
                "file": "m00dy-voyage.mp3"
            }, {
                "track": 7,
                "artist": "Shuhandz",
                "album": "Get Weird Remix EP",
                "song": "Get Weird",
                "file": "shuhandz-get-weird.mp3"
            }, {
                "track": 8,
                "artist": "Bad Catholics",
                "album": "Super Squad EP",
                "song": "Astapor",
                "file": "bad-catholics-astapor.mp3"
            }, {
                "track": 9,
                "artist": "Aaron Sigmon",
                "album": "Pop Dat Booty EP",
                "song": "Booty Bump (Trap Mix)",
                "file": "aaron-sigmon-booty-bump.mp3"
            }, {
                "track": 10,
                "artist": "Dope Arcade",
                "album": "Dead Wrong EP",
                "song": "HAL 9k",
                "file": "dope-arcade-hal-9k.mp3"
            }, {
                "track": 11,
                "artist": "Jason Wiggz",
                "album": "Super Squad EP",
                "song": "MegaTons",
                "file": "jason-wiggz-megatons.mp3"
            }, {
                "track": 12,
                "artist": "Kit Walters & Boy Beats World",
                "album": "Super Squad EP",
                "song": "New Mutiny",
                "file": "kit-walters-and-boy-beats-world-new-mutiny.mp3"
            }, {
                "track": 13,
                "artist": "Two Face",
                "album": "Super Squad EP",
                "song": "Diavolo",
                "file": "two-face-diavolo.mp3"
            }, {
                "track": 14,
                "artist": "Kyle Biddy",
                "album": "Super Squad EP",
                "song": "T2",
                "file": "kyle-biddy-t2.mp3"
            }, {
                "track": 15,
                "artist": "Vorheez",
                "album": "Spooked Out EP",
                "song": "Showtime",
                "file": "vorheez-showtime.mp3"
            }, {
                "track": 16,
                "artist": "Vorheez",
                "album": "Spooked Out EP",
                "song": "Spooked Out",
                "file": "vorheez-spooked-out.mp3"
            }, {
                "track": 17,
                "artist": "Patrick Bandy",
                "album": "A Day in the Life EP",
                "song": "Sakura (Samurai Sword)",
                "file": "patrick-bandy-sakura-samurai-sword.mp3"
            }
            
        ]
    },
    projectMayhem:  {
        slug: "project-mayhem",
        trackCount: 2,
        tracks: [
            {
                "track": 1,
                "artist": "Kyle Thatcher",
                "album": "Project: Mayhem",
                "song": "Commence",
                "file": "commence.mp3"
            }, {
                "track": 2,
                "artist": "Kyle Thatcher",
                "album": "Project: Mayhem",
                "song": "Bouncy Green Slime",
                "file": "bouncy-green-slime.mp3"
            }
        ]
    },
    boxer:  {
        slug: 'boxer',
        trackCount: 2,
        tracks: [
            {
                "track": 1,
                "artist": "The National",
                "album": "Boxer",
                "song": "Fake Empire",
                "file": "fake-empire.mp3"
            }, {
                "track": 1,
                "artist": "The National",
                "album": "Boxer",
                "song": "Mistaken For Strangers",
                "file": "mistaken-for-strangers.mp3"
            }
        ]
    }
}