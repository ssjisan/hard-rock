const displayResult = document.getElementById("display");
const search = document.getElementById("search");
const submit = document.getElementById("submit");
const showLyrics = document.getElementById("showLyrics");

submit.addEventListener("click", () =>{
    const searchMp3 = search.value;
    if(!searchMp3){
        alert('Must enter something');
    }
    else{
        getSong(searchMp3);
    }
})

//Search The Required Song 
async function getSong(searchMp3){
    const searchResult = await fetch(`https://api.lyrics.ovh/suggest/${searchMp3}`);
    const data = await searchResult.json();
    getData(data)
}
//Display Search Result in UI
function getData(data){
    display.innerHTML = `   
    <div class="search-result col-md-12 mx-auto py-4">
        ${data.data
        .map(music => 
        `   <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name"><strong>${music.artist.name}</strong></h3>
                    <p class="author lead">Album by <span>${music.album.title}</span></p>
                    <p class="author lead">Song: <span>${music.title}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button class="btn btn-success"><span song-artist="${music.artist.name}" song-title = "${music.title}"> Get Lyrics</span></button>
                </div> 
            </div>    
        `
        ).slice(0, 10)
        .join('')} 
    </div>
    `;
}
//Event listener For Lyrics Button
display.addEventListener("click" , event =>{
    const element = event.target;
    if(element.tagName === 'SPAN'){
        const artist = element.getAttribute('song-artist');
        const title = element.getAttribute('song-title');
        lyricsResult(artist , title);
    }            
})
// Lyrics for the selected MP3
async function lyricsResult(artist, title) {
    const resultData = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    const data = await resultData.json();        
    const lyrics = data.lyrics.replace(/\r?\n/g, '<br/>');

    showLyrics.innerHTML = `
    <div class="single-lyrics text-center" id="lyrics">
        <button class="btn go-back">&lsaquo;</button>
        <pre class="lyric text-white">
            <h2><strong>${artist} - ${title}</strong></h2> 
            <p>${lyrics}</p>
        </pre>
    </div>`        
}