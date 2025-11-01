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

// Get all media for a category
function mediaOf(cat){
  // Use correct variable for manifest: __DESIGNS_MEDIA (not __MEDIA)
  return (window.__DESIGNS_MEDIA && window.__DESIGNS_MEDIA[cat]) ? window.__DESIGNS_MEDIA[cat].filter(m => !/logo/i.test(m.src)) : [];
}

// Select random media
function pickRandom(arr){ return arr.length ? arr[Math.floor(Math.random()*arr.length)] : null }

// Render all design tiles
(function(){
  var hold = document.getElementById("designTiles");
  if(!hold) return;
  var frag = document.createDocumentFragment();
  DESIGN_CATS.forEach(function(cat){
    var list = mediaOf(cat);
    var card = document.createElement("div");
    card.className = "card";
    card.onclick = function(){ openGallery(cat); };
    var h3 = document.createElement("h3");
    h3.textContent = cat;
    card.appendChild(h3);

    var mediaWrap = document.createElement("div");
    mediaWrap.className = "tile-media";
    if (!list.length){
      mediaWrap.style.display = "grid";
      mediaWrap.style.placeItems = "center";
      mediaWrap.textContent = "Add media";
      card.appendChild(mediaWrap);
    } else {
      var sel = pickRandom(list);
      if (sel.type === "video"){
        var v = document.createElement("video");
        v.setAttribute("controls","");
        v.src = sel.src;
        mediaWrap.appendChild(v);
      } else {
        var im = document.createElement("img");
        im.src = sel.src;
        im.alt = "";
        mediaWrap.appendChild(im);
      }
      card.appendChild(mediaWrap);
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
        <button class="gallery-close" type="button">×</button>
        <button class="gallery-prev" type="button" ${idx === 0 ? 'disabled' : ''}>&lt;</button>
        ${media[idx].type === "video"
          ? `<video src="${media[idx].src}" controls autoplay class="gallery-media"></video>`
          : `<img src="${media[idx].src}" alt="" class="gallery-media"/>`
        }
        <button class="gallery-next" type="button" ${idx === media.length-1 ? 'disabled' : ''}>&gt;</button>
        <div class="gallery-caption">${category} (${idx+1} of ${media.length})</div>
      </div>
    `;
    modal.querySelector('.gallery-prev')?.addEventListener('click', () => { if (idx>0){idx--;render();} });
    modal.querySelector('.gallery-next')?.addEventListener('click', () => { if (idx<media.length-1){idx++;render();} });
    modal.querySelector('.gallery-close')?.addEventListener('click', closeGallery);
    modal.onclick = function(ev){ if(ev.target === modal){ closeGallery(); } };
  }
  render();
  function closeGallery() {
    if(modal && modal.parentNode) modal.parentNode.removeChild(modal);
  }
}

// Contact-Us button toggle for Designs page
document.addEventListener("DOMContentLoaded", function() {
  var contactBtn = document.querySelector('.contact-link');
  if(contactBtn){
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
