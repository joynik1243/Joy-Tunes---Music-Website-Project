console.log("Welcome to Joy Tunes");

// Song Details->
let songs = [
    {songName: "True Love", songPath: "songs\\0.mp3", coverPath: "covers\\0.jpg"},
    {songName: "Legion", songPath: "songs\\1.mp3", coverPath: "covers\\1.jpg"},
    {songName: "Trap", songPath: "songs\\2.mp3", coverPath: "covers\\2.jpg"},
    {songName: "They Mad", songPath: "songs\\3.mp3", coverPath: "covers\\3.jpg"},
    {songName: "Rich The Kid", songPath: "songs\\4.mp3", coverPath: "covers\\4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", songPath: "songs\\5.mp3", coverPath: "covers\\5.jpg"},
    {songName: "Sleeping At Last", songPath: "songs\\6.mp3", coverPath: "covers\\6.jpg"},
    {songName: "Back It Up", songPath: "songs\\7.mp3", coverPath: "covers\\7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", songPath: "songs\\8.mp3", coverPath: "covers\\8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", songPath: "songs\\9.mp3", coverPath: "covers\\9.jpg"},
]


// Initializing the variables
let songIndex=0;
let songLength=Object.keys(songs).length;
let song= new Audio(songs[0].songPath);
let mainButton=document.getElementById("mainPlayButton");
let songProgressBar = document.getElementById("songProgressBar");



// Handle Play/Pause 

mainButton.addEventListener('click', ()=>{
    if(song.paused || song.currentTime<=0){
        mainButton.classList.remove('fa-play-circle');
        mainButton.classList.add("fa-pause-circle");
        let element=document.getElementById(`${songIndex}`);
        element.classList.remove('fa-play-circle');
        element.classList.add('fa-pause-circle');
        song.play();

    }
    else if(song.played){
        mainButton.classList.remove('fa-pause-circle');
        mainButton.classList.add('fa-play-circle');
        song.pause();
    }
})
//  Playing Individual songs
makeAllPlay = ()=>{
    let playButtonAll= document.getElementsByClassName("playButton");
    for(let e of playButtonAll){
        e.classList.remove("fa-pause-circle");
        e.classList.remove("fa-play-circle");
        e.classList.add("fa-play-circle");
    }
    song.pause();
}
playSong=(index)=>{
    makeAllPlay();
    songIndex=index;
    let element=document.getElementById(`${index}`);
    element.classList.remove('fa-play-circle');
    element.classList.add('fa-pause-circle');
    song.src=songs[index].songPath;
    song.play();
    mainButton.classList.remove("fa-play-circle");
    mainButton.classList.add("fa-pause-circle");
    document.getElementById("songImage").src=`${songs[index].coverPath}`;
    document.getElementById("songName").innerText=`${songs[index].songName}`;
}

// Handling forward and backward
let forward=document.getElementById("forward");

forward.addEventListener('click', ()=>{
    songIndex=(songIndex+1)%songLength;
    playSong(songIndex);
})

let backward=document.getElementById("backward");

backward.addEventListener('click', ()=>{
    songIndex=(songLength+songIndex-1)%songLength;
    playSong(songIndex);
})

// timeupdate Event Listener
song.addEventListener('timeupdate', ()=>{
    // Updatin songProgressBar
    let progress=(song.currentTime/song.duration)*100;
    songProgressBar.value=progress;
});

songProgressBar.addEventListener('change', ()=>{
    song.currentTime= song.duration*(songProgressBar.value/100);
})

// Adding Song Items

let items="";
let idx=0;
for(let s of songs){
    let thisSong=new Audio(s.songPath);
    items+=`<div class="songItem">
    <img src=${s.coverPath} alt="">
    <span class="songName">${s.songName}</span>
    <span class="time"><i id="${idx++}" class="playButton fa-regular fa-circle-play"></i></span>
</div>`;
}
document.getElementsByClassName("songItemContainer")[0].innerHTML=items;


// let items="";
// let idx=0;
// for(let s of songs){
//     let thisSong=new Audio(s.songPath);
//     items+=`<div class="songItem">
//     <img src=${s.coverPath} alt="">
//     <span class="songName">${s.songName}</span>
//     <span class="time"><span>${thisSong.duration}</span><i id="${idx++}" class="playButton fa-regular fa-circle-play"></i></span>
// </div>`;
// }
// document.getElementsByClassName("songItemContainer")[0].innerHTML=items;


let playButtonAll= document.getElementsByClassName("playButton");
for(let element of playButtonAll){
    element.addEventListener('click', (e)=>{
        let index= parseInt(e.target.id);
        playSong(index);
    })
}
