// build-designs-manifest.js
const fs = require('fs');
const categories = {
  "Kitchen Designs": "assets/kitchen",
  "Bed Room Designs": "assets/bedroom",
  "Crockery Designs": "assets/crockery",
  "Living Area Designs": "assets/living",
  "TV Unit Designs": "assets/tvunit",
  "Pooja Room Designs": "assets/pooja",
  "False Ceiling Designs": "assets/falseceiling"
};
const isImage = fname => /\.(jpe?g|png|gif|bmp|webp)$/i.test(fname);
const isVideo = fname => /\.(mp4|webm|ogg|mov)$/i.test(fname);
let manifest = {};
for (const cat in categories) {
  let dir = categories[cat];
  let files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  manifest[cat] = files.map(file => ({
    type: isImage(file) ? "image" : "video",
    src: `${dir}/${file}`
  })).filter(f => f.type === "image" || f.type === "video");
}
let output = "window.__DESIGNS_MEDIA = " + JSON.stringify(manifest, null, 2) + ";";
fs.writeFileSync("designs-manifest.js", output);
console.log("Manifest built!");
