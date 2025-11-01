// Helpers
function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)] }
function mediaOf(cat){ return (window.__MEDIA && window.__MEDIA[cat]) ? window.__MEDIA[cat] : [] }
function videosOf(cat){ return mediaOf(cat).filter(m => m.type === "video" && !/logo/i.test(m.src)) }
function imagesOf(cat){ return mediaOf(cat).filter(m => m.type === "image" && !/logo/i.test(m.src)) }

var CATS = [
  "Kitchen Designs","Bed Room Designs","Crockery Designs","Living Area Designs",
  "TV Unit Designs","Pooja Room Designs","False Ceiling Designs","Wallpapers","Woodworks"
];

// HERO
(function(){
  var mount = document.getElementById("heroMedia");
  if(!mount) return;
  var chosen = null;
  for (var i=0;i<CATS.length && !chosen;i++){
    var v = videosOf(CATS[i]);
    if (v.length) chosen = pickRandom(v);
  }
  for (var j=0;j<CATS.length && !chosen;j++){
    var im = imagesOf(CATS[j]);
    if (im.length) chosen = pickRandom(im);
  }
  if (!chosen){
    var img = document.createElement("img");
    img.src = "assets/hero.jpg";
    img.alt = "";
    mount.appendChild(img);
    return;
  }
  if (chosen.type === "video"){
    var video = document.createElement("video");
    video.setAttribute("controls","");
    video.src = chosen.src;
    mount.appendChild(video);
  } else {
    var iEl = document.createElement("img");
    iEl.src = chosen.src; iEl.alt = "";
    mount.appendChild(iEl);
  }
})();

// THREE TILES with modal gallery logic
(function(){
  var hold = document.getElementById("threeTiles");
  if(!hold) return;
  var trio = ["Woodworks","False Ceiling Designs","Wallpapers"];
  var frag = document.createDocumentFragment();
  trio.forEach(function(cat){
    var list = mediaOf(cat).filter(m => !/logo/i.test(m.src));
    var card = document.createElement("div");
    card.className = "card";
    card.onclick = function(){ openGallery(cat); };
    var h3 = document.createElement("h3");
    h3.textContent = cat;
    card.appendChild(h3);
    if (!list.length){
      var empty = document.createElement("div");
      empty.className = "tile-media";
      empty.style.display = "grid";
      empty.style.placeItems = "center";
      empty.textContent = "Add media";
      card.appendChild(empty);
    } else {
      var sel = pickRandom(list);
      if (sel.type === "video"){
        var v = document.createElement("video");
        v.className = "tile-media"; v.setAttribute("controls","");
        v.src = sel.src; card.appendChild(v);
      } else {
        var im = document.createElement("img");
        im.className = "tile-media"; im.src = sel.src; im.alt = "";
        card.appendChild(im);
      }
    }
    frag.appendChild(card);
  });
  hold.innerHTML = "";
  hold.appendChild(frag);
})();

// Modal Gallery logic
function openGallery(category) {
  var media = mediaOf(category);
  if(!media.length) return alert('No media yet!');
  var modal = document.createElement('div');
  modal.className = 'gallery-modal';
  document.body.appendChild(modal);
  let idx = 0;
  function render() {
    modal.innerHTML = `
      <div class="gallery-content">
        <button class="gallery-close" onclick="closeGallery()">×</button>
        <button class="gallery-prev" ${idx === 0 ? 'disabled' : ''}>&lt;</button>
        ${media[idx].type === "video"
          ? `<video src="${media[idx].src}" controls autoplay class="gallery-media"></video>`
          : `<img src="${media[idx].src}" alt="" class="gallery-media"/>`
        }
        <button class="gallery-next" ${idx === media.length-1 ? 'disabled' : ''}>&gt;</button>
        <div class="gallery-caption">${category} (${idx+1} of ${media.length})</div>
      </div>
    `;
    modal.querySelector('.gallery-prev')?.addEventListener('click', () => { if (idx>0){idx--;render();} });
    modal.querySelector('.gallery-next')?.addEventListener('click', () => { if (idx<media.length-1){idx++;render();} });
    modal.querySelector('.gallery-close')?.addEventListener('click', closeGallery);
  }
  render();
  window.closeGallery = () => { document.body.removeChild(modal); };
}
