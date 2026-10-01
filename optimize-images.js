const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public');
const images = ['rasheed-clothing.png', 'learnhub.png', 'medifind.png', 'webify-new.png', 'logo.png', 'webifypro-new.png', 'tradematch.png', 'tradematch-mobile-1.PNG', 'tradematch-mobile-2.PNG', 'musab.jpg'];

async function optimizeImages() {
  for (const img of images) {
    const imgPath = path.join(dir, img);
    if (!fs.existsSync(imgPath)) continue;
    
    console.log(`Optimizing ${img}...`);
    const tempPath = path.join(dir, 'temp_' + img);
    
    // resize large images and compress to webp, but keep the original extension so we don't have to update all code references
    let pipeline = sharp(imgPath);
    
    if (img === 'logo.png') {
        pipeline = pipeline.resize({ width: 300 }).webp({ quality: 80 });
    } else {
        pipeline = pipeline.resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 80 });
    }

    await pipeline.toFile(tempPath);
    
    fs.renameSync(tempPath, imgPath);
    console.log(`Optimized ${img}`);
  }
}

optimizeImages().catch(console.error);
