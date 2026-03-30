#!/usr/bin/env python3
import urllib.request
import zipfile
import os
from pathlib import Path

# Configuration
ZIP_URLS = {
    "project 2": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/project%202.zip",
    "rhino project": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/rhino%20project.zip",
    "car photography": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/car%20photography.zip",
    "model photography": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/Model%20Photography.zip",
    "clothing brand": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/Clothing%20Brand.zip",
}

PROJECT_MAPPING = {
    "project 2": ("architecture", "project-2"),
    "rhino project": ("architecture", "rhino-project"),
    "car photography": ("photography", "car-photography"),
    "model photography": ("photography", "model-photography"),
    "clothing brand": ("clothing", "clothing-brand"),
}

def extract_portfolio_zip(name, url, section, slug):
    """Download and extract a portfolio ZIP file"""
    
    base_path = Path("/vercel/share/v0-project/public/images")
    output_dir = base_path / section / slug
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"\n{'='*60}")
    print(f"Processing: {name}")
    print(f"{'='*60}")
    print(f"Downloading from: {url}")
    
    try:
        # Download ZIP
        zip_path = f"/tmp/{name}.zip"
        urllib.request.urlretrieve(url, zip_path)
        file_size = os.path.getsize(zip_path)
        print(f"Downloaded {file_size:,} bytes")
        
        # List ZIP contents
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            files = zip_ref.namelist()
            print(f"ZIP contains {len(files)} files:")
            for f in sorted(files)[:5]:
                print(f"  - {f}")
            if len(files) > 5:
                print(f"  ... and {len(files) - 5} more")
            
            # Extract and rename
            print(f"\nExtracting to: {output_dir}")
            page_num = 1
            for filename in sorted(files):
                if filename.endswith(('.png', '.jpg', '.jpeg')):
                    # Read file content
                    file_data = zip_ref.read(filename)
                    
                    # Determine extension
                    ext = filename.split('.')[-1].lower()
                    if ext == 'jpeg':
                        ext = 'jpg'
                    
                    # Write with new name
                    new_filename = f"page-{page_num}.{ext}"
                    output_path = output_dir / new_filename
                    output_path.write_bytes(file_data)
                    page_num += 1
            
            page_count = page_num - 1
            print(f"Extracted {page_count} images")
            
            # List output
            output_files = sorted([f.name for f in output_dir.glob('page-*')])
            print(f"\nOutput directory ({len(output_files)} files):")
            for f in output_files[:5]:
                print(f"  - {f}")
            if len(output_files) > 5:
                print(f"  ... and {len(output_files) - 5} more")
            
            return page_count
        
    except Exception as e:
        print(f"Error processing {name}: {e}")
        return 0
    finally:
        # Clean up
        if os.path.exists(zip_path):
            os.remove(zip_path)

# Extract all remaining files
results = {}
for name, url in ZIP_URLS.items():
    section, slug = PROJECT_MAPPING[name]
    page_count = extract_portfolio_zip(name, url, section, slug)
    results[name] = {"section": section, "slug": slug, "pages": page_count}

print(f"\n{'='*60}")
print("EXTRACTION SUMMARY")
print(f"{'='*60}")
for name, info in results.items():
    print(f"{name:20} -> {info['section']}/{info['slug']:20} ({info['pages']} pages)")
