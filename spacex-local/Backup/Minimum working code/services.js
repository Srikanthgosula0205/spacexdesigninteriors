const SERVICE_CATS = [
  {
    name: "Planning",
    img: "assets/service_planning.jpg", // Change to your relevant image file
    desc: `We plan interiors that balance style, comfort, and functionality. Our process begins with understanding your lifestyle and space requirements. We create clear layouts, design concepts, material suggestions, and 3D visuals — so you can see your space before the work starts. From colour themes to lighting and furniture placement, we ensure every detail is thoughtfully planned to make your home or office look beautiful, modern, and practical.`
  },
  {
    name: "Designing",
    img: "assets/service_designing.jpg",
    desc: `We create modern, elegant, and customized interior designs that match your style. Our design concepts include colours, textures, furniture ideas, décor themes, modular layouts, and lighting combinations. Every design is prepared to enhance space, comfort, and visual appeal. We convert ideas into realistic 2D/3D designs so you can visualize the final look before execution. Our aim is to deliver designs that feel fresh, stylish, and perfectly suited to your lifestyle.`
  },
  {
    name: "Execution",
    img: "assets/service_execution.jpg",
    desc: `We bring the design to life with precise execution. Our team coordinates materials, carpentry, modular work, painting, electrical, plumbing, and décor installation — everything required to convert the final design into a finished space. Quality control, timeline tracking, and site supervision ensure clean work and professional finishing. We use reliable materials and skilled workmanship so every detail is delivered exactly as planned.`
  },
  {
    name: "Plumbing",
    img: "assets/service_plumbing.jpg",
    desc: `We handle all types of plumbing needs with proper planning and neat workmanship. From fresh pipeline installation to repairing existing lines, we ensure correct water flow, leak-proof joints, durable fittings, and clean finishing. Our plumbing execution covers bathrooms, kitchens, utility areas, wash basins, concealed piping, mixers, drainage lines, and filtration setups. We use quality materials and follow the right installation methods to avoid future issues and give long-term reliability.`
  },
  {
    name: "Painting & Polishing",
    img: "assets/service_painting.jpg",
    desc: `We enhance walls, wood surfaces, and interiors with premium painting and polishing finishes. Our process starts with surface preparation, putty work, primer, and smooth application to ensure long-lasting colour and clean results. We handle texture paints, enamel, emulsion, wood polish, PU finishes, stain & varnish, matte/gloss coats and feature wall highlights. With proper colour selection, neat masking, and material quality control — we deliver a fresh, rich and professional finish that elevates the overall look of your space.`
  },
  {
    name: "False Ceiling",
    img: "assets/service_ceiling.jpg",
    desc: `We design and install false ceilings that add style, depth, and better lighting effects to your space. From gypsum and POP ceilings to modern grid and panel systems, we plan layouts based on room size, lighting concept, and interior theme. Our execution includes neat joint finishing, accurate level alignment, proper framing, wiring provision for lights/fans/AC, and quality materials to ensure durability. The result is a clean, elegant ceiling that enhances the look and improves acoustic and lighting performance.`
  },
  {
    name: "Electrical Wiring",
    img: "assets/service_electrical.jpg",
    desc: `We manage all electrical tasks with safety-first planning and tidy execution. From complete wiring to load distribution, we ensure proper connections, quality materials, and secure installation. Our scope includes concealed wiring, switches, sockets, lighting points, panel boards, DB works, fans, LED fittings, TV/data points and home automation support. Every electrical job is tested for performance and safety, ensuring stable power flow and zero-compromise finishing.`
  },
  {
    name: "Wallpapers",
    img: "assets/service_wallpapers.jpg",
    desc: `We provide stylish wallpaper solutions that instantly upgrade the look and feel of your interiors. From subtle textures to premium designer patterns, we help you choose the right wallpaper based on your theme, colour palette, and lighting. Our installation includes accurate measurements, surface preparation, perfect alignment of patterns, clean joints, and bubble-free finishing. With quality materials and skilled fixing, we deliver a neat, elegant, and durable result that adds character to your walls.`
  }
];

// Render service tiles
(function(){
  var hold = document.getElementById("serviceTiles");
  if(!hold) return;
  var frag = document.createDocumentFragment();
  SERVICE_CATS.forEach(function(service){
    var card = document.createElement("div");
    card.className = "card";
    card.onclick = function(){ openServiceModal(service); };
    var h3 = document.createElement("h3");
    h3.textContent = service.name;
    card.appendChild(h3);
    var im = document.createElement("img");
    im.className = "tile-media";
    im.src = service.img;
    im.alt = service.name;
    card.appendChild(im);
    frag.appendChild(card);
  });
  hold.innerHTML = "";
  hold.appendChild(frag);
})();

// Modal logic (show big image + service description)
function openServiceModal(service) {
  var modal = document.createElement('div');
  modal.className = 'gallery-modal';
  document.body.appendChild(modal);
  modal.innerHTML = `
    <div class="gallery-content">
      <button class="gallery-close" onclick="closeGallery()">×</button>
      <img src="${service.img}" alt="${service.name}" class="gallery-media"/>
      <h3 style="color:var(--gold);font-family:'Playfair Display',serif;margin-top:15px;margin-bottom:10px;">${service.name}</h3>
      <div class="gallery-caption" style="color:var(--silver);text-align:left;font-size:1.07rem;">${service.desc}</div>
    </div>
  `;
  window.closeGallery = () => { document.body.removeChild(modal); };
}

// Contact-Us button toggle for Services page
document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('.contact-link').addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById('contactFooter').style.display = 'block';
    document.getElementById('contactFooter').scrollIntoView({ behavior: 'smooth' });
  });
});
