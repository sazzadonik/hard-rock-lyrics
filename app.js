const searchButton = document.getElementById("searchBtn");
searchButton.addEventListener("click", async ()=>{
        const inputSearch = document.getElementById("inputSearch").value;
        document.getElementById("lyricsDiv").innerHTML = "";
        const url = `https://api.lyrics.ovh/suggest/${inputSearch}`;
        try {
            const res = await fetch(url);
            const songs = await res.json();
            getSongs(songs);
        } catch (error) {
            showError(error)
        }
        document.getElementById("inputSearch").value = "";
    }
);
const getSongs = songs => {
    const allSongs = songs.data;
    const parentDiv = document.getElementById("parentDiv");
    parentDiv.innerHTML = "";
    allSongs.forEach(song =>{
        const songTitle = song.title;
        const artist = song.artist.name;
        const songAlbum = song.album.title;
        const songPlay = song.preview;
        const childDiv = document.createElement("div");
        childDiv.classList.add("single-result", "row", "align-items-center", "my-3", "p-3"); 
        childDiv.innerHTML = `
                        <div class="col-md-9">
                            <h3 class="lyrics-name">${songTitle}</h3>
                            <p class="author lead">Album by <span>${songAlbum}</span></p>
                            <audio controls>
                                <source src="${songPlay}" type="audio/mpeg">
                            </audio>
                        </div>
                        <div class="col-md-3 text-md-right text-center">
                            <button onclick = "getLyrics('${artist}', '${songTitle}')" class="btn btn-success">Get Lyrics</button>
                        </div>
        `;
        parentDiv.appendChild(childDiv);
    });
}

const getLyrics = async (artist, title) =>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try{
        const  res = await fetch(url);
        const song = await res.json();
        setLyrics(song.lyrics);
    }catch(error){
        showError(error);
    }
    
}

const setLyrics = (lyrics) =>{
    const lyricsDiv = document.getElementById("lyricsDiv");
        lyricsDiv.innerText = lyrics;
}

const  showError = error =>{
    const errorDiv = document.getElementById("errorShow");
    error = `Something went wrong (${error.message})`;
    errorDiv.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            ${error}
                        </div>
                        `;
    
}