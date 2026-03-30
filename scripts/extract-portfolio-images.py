import os
import shutil
import zipfile
import json
from pathlib import Path
import urllib.request
from PIL import Image
import pytesseract

# Create output directories
OUTPUT_DIR = Path("extracted_portfolio")
IMAGES_DIR = OUTPUT_DIR / "images"
METADATA_DIR = OUTPUT_DIR / "metadata"

IMAGES_DIR.mkdir(parents=True, exist_ok=True)
METADATA_DIR.mkdir(parents=True, exist_ok=True)

# Blob storage URLs for the ZIP files
ZIP_URLS = {
    "project-1": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/project%201.zip",
    "project-2": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/project%202.zip",
    "rhino-project": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/rhino%20project.zip",
    "model-photography": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/Model%20Photography.zip",
    "clothing-brand": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/Clothing%20Brand.zip",
}

# Track extracted files and metadata
extracted_data = {}

print("[v0] Starting portfolio extraction process...")

for project_name, zip_url in ZIP_URLS.items():
    print(f"\n[v0] Processing {project_name}...")
    
    try:
        # Download ZIP file
        zip_path = Path(f"temp_{project_name}.zip")
        print(f"[v0] Downloading {project_name}...")
        urllib.request.urlretrieve(zip_url, str(zip_path))
        
        # Extract ZIP
        extract_path = Path(f"temp_{project_name}")
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(str(extract_path))
        
        print(f"[v0] Extracted {project_name} to {extract_path}")
        
        # Find all JPG files
        jpg_files = list(extract_path.rglob("*.jpg")) + list(extract_path.rglob("*.jpeg")) + list(extract_path.rglob("*.JPG")) + list(extract_path.rglob("*.JPEG"))
        print(f"[v0] Found {len(jpg_files)} JPG files in {project_name}")
        
        project_images = []
        
        # Process each JPG file
        for idx, jpg_file in enumerate(sorted(jpg_files), 1):
            try:
                # Copy to output directory with standardized naming
                output_name = f"{project_name}_slide_{str(idx).zfill(2)}.jpg"
                output_path = IMAGES_DIR / output_name
                
                # Copy file
                shutil.copy2(str(jpg_file), str(output_path))
                print(f"[v0] Saved: {output_name}")
                
                # Try to extract text using OCR (if available)
                description = ""
                try:
                    img = Image.open(jpg_file)
                    description = pytesseract.image_to_string(img).strip()
                    print(f"[v0] OCR extracted {len(description)} chars of text")
                except Exception as e:
                    print(f"[v0] OCR skipped: {str(e)}")
                
                project_images.append({
                    "filename": output_name,
                    "slide_number": idx,
                    "original_path": str(jpg_file),
                    "description": description,
                    "file_size": output_path.stat().st_size,
                })
                
            except Exception as e:
                print(f"[v0] Error processing {jpg_file}: {str(e)}")
        
        extracted_data[project_name] = {
            "total_slides": len(jpg_files),
            "images": project_images,
        }
        
        # Save project metadata
        metadata_path = METADATA_DIR / f"{project_name}_metadata.json"
        with open(str(metadata_path), 'w') as f:
            json.dump(extracted_data[project_name], f, indent=2)
        print(f"[v0] Saved metadata to {metadata_path}")
        
        # Cleanup
        shutil.rmtree(extract_path)
        zip_path.unlink()
        
    except Exception as e:
        print(f"[v0] Error with {project_name}: {str(e)}")

# Save overall summary
summary_path = OUTPUT_DIR / "extraction_summary.json"
with open(str(summary_path), 'w') as f:
    json.dump({
        "projects": extracted_data,
        "total_images": sum(len(v["images"]) for v in extracted_data.values()),
    }, f, indent=2)

print(f"\n[v0] ✓ Extraction complete!")
print(f"[v0] Output directory: {OUTPUT_DIR}")
print(f"[v0] Total images extracted: {sum(len(v['images']) for v in extracted_data.values())}")
print(f"[v0] Summary saved to: {summary_path}")
