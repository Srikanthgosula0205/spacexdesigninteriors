// Tile categories for Designs page
var DESIGN_CATS = [
  "Kitchen Designs",
  "Bed Room Designs",
  "Crockery Designs",
  "Living Area Designs",
  "TV Unit Designs",
  "Pooja Room Designs",
  "False Ceiling Designs"
];

function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)] }
function mediaOf(cat){ return (window.__MEDIA && window.__MEDIA[cat]) ? window.__MEDIA[cat] : [] }
function videosOf(cat){ return mediaOf(cat).filter(m => m.type === "video" && !/logo/i.test(m.src)) }
function imagesOf(cat){ return mediaOf(cat).filter(m => m.type === "image" && !/logo/i.test(m.src)) }

// Render all design tiles
(function(){
  var hold = document.getElementById("designTiles");
  if(!hold) return;
  var frag = document.createDocumentFragment();
  DESIGN_CATS.forEach(function(cat){
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

// Contact-Us button toggle for Designs page
document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('.contact-link').addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById('contactFooter').style.display = 'block';
    document.getElementById('contactFooter').scrollIntoView({ behavior: 'smooth' });
  });
});
