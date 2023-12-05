const apiKey = 'AIzaSyB1utTx7yeue7JE5C3G1KZ7rqHG1VC8jII';  
const videoContainer = document.getElementById('youtube-player');

function loadRandomTravelDestinationVideos() {
  const destinations = ['beach', 'mountain', 'city', 'forest']; // Puedes agregar más destinos según tus necesidades
  const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];

  const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=${randomDestination} travel destination&videoEmbeddable=true&type=video&videoDefinition=high&maxResults=5`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const randomVideo = data.items[Math.floor(Math.random() * data.items.length)];

      if (randomVideo) {
        const videoId = randomVideo.id.videoId;
        initializeYouTubePlayer(videoId);
      }
    })
    .catch(error => console.error('Error al cargar videos:', error));
}

function initializeYouTubePlayer(videoId) {
  new YT.Player(videoContainer, {
    videoId: videoId,
    playerVars: {
      'autoplay': 1,
      'loop': 1,
      'mute': 1,
      'controls': 0,
      'showinfo': 0,
      'rel': 0,
    },
    events: {
      'onReady': onPlayerReady,
    },
  });
}

function onPlayerReady(event) {
  event.target.setPlaybackQuality('hd1080');
}

document.addEventListener('DOMContentLoaded', loadRandomTravelDestinationVideos);
