function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)] }
function mediaOf(cat){
  return window.__MEDIA && window.__MEDIA[cat] ? window.__MEDIA[cat].filter(m => !/logo/i.test(m.src)) : [];
}
var HOME_TILE_CATS = [
  "Woodworks",
  "False Ceiling Designs",
  "Wallpapers"
];
(function(){
  var hold = document.getElementById("threeTiles");
  if(!hold) return;
  var frag = document.createDocumentFragment();
  HOME_TILE_CATS.forEach(function(cat){
    var list = mediaOf(cat);
    var card = document.createElement("div");
    card.className = "card";
    card.onclick = function(e){
      e.stopPropagation();
      openGallery(cat);
    };
    var h3 = document.createElement("h3");
    h3.textContent = cat;
    card.appendChild(h3);
    var mediaWrap = document.createElement("div");
    mediaWrap.className = "tile-media";
    if(!list.length){
      mediaWrap.style.display = "grid";
      mediaWrap.style.placeItems = "center";
      mediaWrap.textContent = "Add media";
      card.appendChild(mediaWrap);
    } else {
      var sel = pickRandom(list);
      if(sel.type === "video"){
        var vid = document.createElement("video");
        vid.setAttribute("controls","");
        vid.src = sel.src;
        mediaWrap.appendChild(vid);
      } else {
        var img = document.createElement("img");
        img.src = sel.src;
        img.alt = "";
        mediaWrap.appendChild(img);
      }
      card.appendChild(mediaWrap);
    }
    frag.appendChild(card);
  });
  hold.innerHTML = "";
  hold.appendChild(frag);
})();
// Modal Gallery logic for tiles
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
        <button type="button" class="gallery-close">×</button>
        <button type="button" class="gallery-prev" ${idx===0?'disabled':''}>&lt;</button>
        ${media[idx].type==="video"
          ? `<video src="${media[idx].src}" controls autoplay class="gallery-media"></video>`
          : `<img src="${media[idx].src}" alt="" class="gallery-media"/>`
        }
        <button type="button" class="gallery-next" ${idx===media.length-1?'disabled':''}>&gt;</button>
        <div class="gallery-caption">${category} (${idx+1} of ${media.length})</div>
      </div>
    `;
    modal.querySelector('.gallery-prev')?.addEventListener('click', function(ev){ ev.stopPropagation(); if(idx!==0){idx--;render();} });
    modal.querySelector('.gallery-next')?.addEventListener('click', function(ev){ ev.stopPropagation(); if(idx!==media.length-1){idx++;render();} });
    modal.querySelector('.gallery-close')?.addEventListener('click', function(ev){
      ev.stopPropagation();
      if(modal && modal.parentNode) modal.parentNode.removeChild(modal);
    });
    modal.onclick = function(ev){
      if(ev.target===modal){
        if(modal && modal.parentNode) modal.parentNode.removeChild(modal);
      }
    };
  }
  render();
}
// Tile, gallery and modal code as in previous message...

// Always working Contact-Us button logic
document.addEventListener("DOMContentLoaded", function() {
  var contactBtn = document.querySelector('.contact-link');
  if(contactBtn) {
    contactBtn.addEventListener('click', function(e){
      e.preventDefault();
      var footer = document.getElementById('contactFooter');
      if (footer) {
        footer.style.display = 'block';
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

