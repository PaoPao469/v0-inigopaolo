import { createWriteStream, mkdirSync, readdirSync, renameSync, rmSync, existsSync } from 'fs';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';
import { exec } from 'child_process';
import { promisify } from 'util';
import { join, basename } from 'path';

const execAsync = promisify(exec);

const ZIP_URLS = [
  { url: 'https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/project%201.zip', slug: 'project-1', section: 'architecture' },
  { url: 'https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/project%202.zip', slug: 'project-2', section: 'architecture' },
  { url: 'https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/rhino%20project.zip', slug: 'rhino-project', section: 'architecture' },
  { url: 'https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/Model%20Photography.zip', slug: 'model-photography', section: 'photography' },
  { url: 'https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/Clothing%20Brand.zip', slug: 'clothing-brand', section: 'clothing' },
];

const PUBLIC_DIR = '/vercel/share/v0-project/public/images';
const TEMP_DIR = '/vercel/share/v0-project/temp-zips';

async function downloadFile(url, destPath) {
  console.log(`Downloading: ${url}`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`);
  
  const fileStream = createWriteStream(destPath);
  await pipeline(Readable.fromWeb(response.body), fileStream);
  console.log(`Downloaded to: ${destPath}`);
}

async function extractZip(zipPath, extractDir) {
  console.log(`Extracting: ${zipPath} to ${extractDir}`);
  mkdirSync(extractDir, { recursive: true });
  await execAsync(`unzip -o "${zipPath}" -d "${extractDir}"`);
  console.log(`Extracted to: ${extractDir}`);
}

function organizeImages(extractDir, targetDir) {
  mkdirSync(targetDir, { recursive: true });
  
  // Find all image files recursively
  const findImages = (dir) => {
    let images = [];
    const entries = readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        // Skip __MACOSX folders
        if (entry.name !== '__MACOSX') {
          images = images.concat(findImages(fullPath));
        }
      } else if (/\.(png|jpg|jpeg|webp)$/i.test(entry.name) && !entry.name.startsWith('.')) {
        images.push(fullPath);
      }
    }
    return images;
  };
  
  const images = findImages(extractDir);
  console.log(`Found ${images.length} images`);
  
  // Sort images naturally (page-1, page-2, ... page-10, page-11)
  images.sort((a, b) => {
    const numA = parseInt(basename(a).match(/\d+/) || '0', 10);
    const numB = parseInt(basename(b).match(/\d+/) || '0', 10);
    return numA - numB;
  });
  
  // Rename and move to target directory
  images.forEach((img, index) => {
    const ext = img.split('.').pop().toLowerCase();
    const newName = `page-${index + 1}.${ext}`;
    const newPath = join(targetDir, newName);
    renameSync(img, newPath);
    console.log(`  ${basename(img)} -> ${newName}`);
  });
  
  return images.length;
}

async function processAllZips() {
  // Create temp directory
  mkdirSync(TEMP_DIR, { recursive: true });
  
  const results = [];
  
  for (const { url, slug, section } of ZIP_URLS) {
    console.log(`\n=== Processing ${slug} ===`);
    
    const zipName = `${slug}.zip`;
    const zipPath = join(TEMP_DIR, zipName);
    const extractDir = join(TEMP_DIR, slug);
    const targetDir = join(PUBLIC_DIR, section, slug);
    
    try {
      // Download ZIP
      await downloadFile(url, zipPath);
      
      // Extract ZIP
      await extractZip(zipPath, extractDir);
      
      // Organize images
      const pageCount = organizeImages(extractDir, targetDir);
      
      results.push({ slug, section, pageCount });
      console.log(`Completed ${slug}: ${pageCount} pages`);
      
    } catch (error) {
      console.error(`Error processing ${slug}:`, error.message);
      results.push({ slug, section, pageCount: 0, error: error.message });
    }
  }
  
  // Cleanup temp directory
  if (existsSync(TEMP_DIR)) {
    rmSync(TEMP_DIR, { recursive: true });
    console.log('\nCleaned up temp directory');
  }
  
  console.log('\n=== Summary ===');
  results.forEach(r => {
    console.log(`${r.section}/${r.slug}: ${r.pageCount} pages${r.error ? ` (ERROR: ${r.error})` : ''}`);
  });
  
  return results;
}

processAllZips().then(results => {
  console.log('\nDone! Update lib/projects.ts with these page counts:');
  results.forEach(r => {
    if (r.pageCount > 0) {
      console.log(`  ${r.slug}: pageCount: ${r.pageCount}`);
    }
  });
}).catch(console.error);
