import os
import shutil
import zipfile
import json
from pathlib import Path
import urllib.request

# Create output directories
OUTPUT_DIR = Path("public/portfolio-images")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Blob storage URLs for the ZIP files
ZIP_URLS = {
    "project-1": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/project%201.zip",
    "project-2": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/project%202.zip",
    "rhino-project": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/rhino%20project.zip",
    "model-photography": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/Model%20Photography.zip",
    "clothing-brand": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/Clothing%20Brand.zip",
}

# Project metadata for descriptions
PROJECT_INFO = {
    "project-1": {
        "title": "Foundations + Visual Studies 1",
        "description": "First year architecture portfolio showcasing foundational design skills, spatial understanding, and visual studies exploration.",
        "year": "Year 1",
        "section": "architecture"
    },
    "project-2": {
        "title": "Architectural Design II: Foundations",
        "description": "Second year architecture project demonstrating advanced design thinking and conceptual development.",
        "year": "Year 2",
        "section": "architecture"
    },
    "rhino-project": {
        "title": "Architectural Design II: Visual Studies",
        "description": "Digital modeling project created using Rhino 3D, exploring parametric design and computational techniques.",
        "year": "Year 2",
        "section": "architecture"
    },
    "model-photography": {
        "title": "Model Photography",
        "description": "Portrait and fashion photography showcasing creative direction, lighting techniques, and collaborative work with models.",
        "year": "2024",
        "section": "photography"
    },
    "clothing-brand": {
        "title": "Horalta",
        "description": "Original clothing brand concept featuring unique designs, gothic typography, and fashion pieces.",
        "year": "2024",
        "section": "clothing"
    }
}

# Track extracted files and metadata
extracted_data = {}

print("[v0] Starting portfolio image extraction...")

for project_name, zip_url in ZIP_URLS.items():
    print(f"\n[v0] Processing {project_name}...")
    
    try:
        # Create project directory
        project_dir = OUTPUT_DIR / project_name
        project_dir.mkdir(exist_ok=True)
        
        # Download ZIP file
        zip_path = Path(f"/tmp/{project_name}.zip")
        print(f"[v0] Downloading {project_name}...")
        urllib.request.urlretrieve(zip_url, str(zip_path))
        
        # Extract ZIP
        temp_extract = Path(f"/tmp/{project_name}_extract")
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(str(temp_extract))
        
        print(f"[v0] Extracted {project_name}")
        
        # Find all JPG/PNG files
        image_files = (
            list(temp_extract.rglob("*.jpg")) + 
            list(temp_extract.rglob("*.jpeg")) + 
            list(temp_extract.rglob("*.JPG")) + 
            list(temp_extract.rglob("*.JPEG")) +
            list(temp_extract.rglob("*.png")) +
            list(temp_extract.rglob("*.PNG"))
        )
        
        print(f"[v0] Found {len(image_files)} images in {project_name}")
        
        project_images = []
        
        # Process each image file
        for idx, img_file in enumerate(sorted(image_files), 1):
            try:
                # Get file extension
                ext = img_file.suffix.lower()
                
                # Copy to output directory with standardized naming
                output_name = f"{str(idx).zfill(2)}{ext}"
                output_path = project_dir / output_name
                
                # Copy file maintaining quality
                shutil.copy2(str(img_file), str(output_path))
                print(f"  ✓ {output_name} ({output_path.stat().st_size / 1024:.1f} KB)")
                
                project_images.append({
                    "filename": output_name,
                    "slide_number": idx,
                    "path": f"/portfolio-images/{project_name}/{output_name}",
                    "file_size": output_path.stat().st_size,
                })
                
            except Exception as e:
                print(f"[v0] Error processing {img_file}: {str(e)}")
        
        # Store project data
        project_info = PROJECT_INFO.get(project_name, {})
        extracted_data[project_name] = {
            "title": project_info.get("title", project_name),
            "description": project_info.get("description", ""),
            "year": project_info.get("year", ""),
            "section": project_info.get("section", ""),
            "total_images": len(project_images),
            "images": project_images,
        }
        
        # Save project metadata
        metadata_path = project_dir / "metadata.json"
        with open(str(metadata_path), 'w') as f:
            json.dump(extracted_data[project_name], f, indent=2)
        
        print(f"[v0] {project_name}: {len(project_images)} images extracted ✓")
        
        # Cleanup temporary files
        shutil.rmtree(temp_extract)
        zip_path.unlink()
        
    except Exception as e:
        print(f"[v0] Error with {project_name}: {str(e)}")

# Save overall summary
summary_path = OUTPUT_DIR / "all-projects-metadata.json"
with open(str(summary_path), 'w') as f:
    json.dump(extracted_data, f, indent=2)

print(f"\n[v0] ✓ Extraction complete!")
print(f"[v0] Output: {OUTPUT_DIR}")
total = sum(v['total_images'] for v in extracted_data.values())
print(f"[v0] Total images: {total}")
for project, data in extracted_data.items():
    print(f"  • {data['title']}: {data['total_images']} images")

