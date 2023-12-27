// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let title = document.querySelector(".title");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
let track_list = [
{
	name: "صلى عليك مليك السماء",
	artist: "باسم الكربلائي",
	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNXMD6u8D3KiAftIHoiMJujhzZQSH4xRkM8A&usqp=CAU",
	path: "media/3a184968ba9893ed.mp3"
},
{
	name: "شيعاين از نو شد ماه محرم",
	artist: "نزار القطري",
	image: "https://hitsound.ir/wp-content/uploads/2022/09/photo_2022-09-14_03-47-33.jpg",
	path: "media/1f2ff67e62b44e04.mp3"
},
{
	name: "جان اقا",
	artist: "مجيد بني فاطمة",
	image: "https://fafamusic.ir/wp-content/uploads/2019/09/258.jpg",
	path: "media/8cff56045c8f5f81.mp3",
},
{
    name: "ما ميرويم",
    artist: "الشيخ حسين الاكرف وحامد زماني",
    image: "https://i1.sndcdn.com/artworks-000138172725-capb1g-t500x500.jpg",
    path: "media/b5f2831c79f6156e.mp3",
},
{
    name: "تسبيحات هزرة زهراء",
    artist: "حاج مهدي رسولي",
    image: "https://i.scdn.co/image/ab67616d00001e02477959f5ac662cdfc8edfc6a",
    path: "media/73yuh20ksj.mp3",
},
{
    name: "دلم افتاده در دام اباعبدالله",
    artist: "مجيد بنى فاطمة",
    image: "https://musicsweb.ir/wp-content/uploads/2022/12/Majid-Bani-Fateme-Delam-oftade-dar-Dame-Aba-Abdelah-musicsweb.ir_.jpg",
    path: "media/d14da491a67e7905.mp3",
},
{
    name: "الغضب العلوي",
    artist: "السيد علي الموسوي",
    image: "https://shiavoice.com/assets/img/cats/cd_abata.jpg",
    path: "media/5b9ajo20mfcap.mp3",
},
{
    name: "الله اكبر ",
    artist: "تفجير",
    image: "https://shiavoice.com/assets/img/cats/cd_abata.jpg",
    path: "media/god.mp3",
}
];
function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
    
    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    // Update details of the track
    track_art.style.backgroundImage =
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    title.textContent = track_list[track_index].name
    
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
    
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
    
    // Apply a random background color
    random_bg_color();
    }
    
    function random_bg_color() {
    // Get a random number between 64 to 256
    // (for getting lighter colors)
    let red = Math.floor(Math.random() * 100 + 10);
    let green = Math.floor(Math.random() * 100 + 10);
    let blue = Math.floor(Math.random() * 100 + 10);
    
    // Construct a color with the given values
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    
    // Set the background to the new color
    document.body.style.background = bgColor;
    }
    
    // Function to reset all values to their default
    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    }
    function playpauseTrack() {
        // Switch between playing and pausing
        // depending on the current state
        if (!isPlaying) playTrack();
        else pauseTrack();
        }
        
        function playTrack() {
        // Play the loaded track
        curr_track.play();
        isPlaying = true;
        
        // Replace icon with the pause icon
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
        }
        
        function pauseTrack() {
        // Pause the loaded track
        curr_track.pause();
        isPlaying = false;
        
        // Replace icon with the play icon
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
        }
        
        function nextTrack() {
        // Go back to the first track if the
        // current one is the last in the track list
        if (track_index < track_list.length - 1)
            track_index += 1;
        else track_index = 0;
        
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
        }
        
        function prevTrack() {
        // Go back to the last track if the
        // current one is the first in the track list
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length - 1;
        
        // Load and play the new track
        loadTrack(track_index);
        playTrack();
        }
        function seekTo() {
            // Calculate the seek position by the
            // percentage of the seek slider
            // and get the relative duration to the track
            seekto = curr_track.duration * (seek_slider.value / 100);
            
            // Set the current track position to the calculated seek position
            curr_track.currentTime = seekto;
            }
            
            function setVolume() {
            // Set the volume according to the
            // percentage of the volume slider set
            curr_track.volume = volume_slider.value / 100;
            }
            
            function seekUpdate() {
            let seekPosition = 0;
            
            // Check if the current track duration is a legible number
            if (!isNaN(curr_track.duration)) {
                seekPosition = curr_track.currentTime * (100 / curr_track.duration);
                seek_slider.value = seekPosition;
            
                // Calculate the time left and the total duration
                let currentMinutes = Math.floor(curr_track.currentTime / 60);
                let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(curr_track.duration / 60);
                let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
            
                // Add a zero to the single digit time values
                if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
            
                // Display the updated duration
                curr_time.textContent = currentMinutes + ":" + currentSeconds;
                total_duration.textContent = durationMinutes + ":" + durationSeconds;
            }
            }
// Load the first track in the tracklist
loadTrack(track_index);
                        
