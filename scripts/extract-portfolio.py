#!/usr/bin/env python3
"""
Download and extract portfolio ZIPs from Blob storage
"""

import os
import urllib.request
import zipfile
import shutil
from pathlib import Path

# URLs to download
DOWNLOADS = {
    "project-1": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/project%201.zip",
    "project-2": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/project%202.zip",
    "rhino-project": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/rhino%20project.zip",
    "car-photography": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/Model%20Photography.zip",
    "model-photography": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/Model%20Photography.zip",
    "clothing-brand": "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/Clothing%20Brand.zip",
}

SECTIONS = {
    "project-1": "architecture",
    "project-2": "architecture",
    "rhino-project": "architecture",
    "car-photography": "photography",
    "model-photography": "photography",
    "clothing-brand": "clothing",
}

def download_and_extract():
    """Download ZIPs and extract to public/images"""
    
    base_dir = Path("public/images")
    base_dir.mkdir(parents=True, exist_ok=True)
    
    for slug, url in DOWNLOADS.items():
        section = SECTIONS.get(slug)
        if not section:
            print(f"[v0] Skipping {slug} - no section found")
            continue
        
        # Create project directory
        project_dir = base_dir / section / slug
        project_dir.mkdir(parents=True, exist_ok=True)
        
        # Download ZIP
        zip_path = f"/tmp/{slug}.zip"
        print(f"[v0] Downloading {slug}...")
        
        try:
            urllib.request.urlretrieve(url, zip_path)
            print(f"[v0] Downloaded to {zip_path}")
            
            # Extract
            print(f"[v0] Extracting {slug}...")
            with zipfile.ZipFile(zip_path, 'r') as zip_ref:
                zip_ref.extractall(project_dir)
            
            print(f"[v0] Extracted {slug} to {project_dir}")
            
            # List extracted files
            extracted_files = list(project_dir.glob("*"))
            print(f"[v0] Files in {project_dir}: {len(extracted_files)}")
            for f in sorted(extracted_files)[:5]:
                print(f"  - {f.name}")
            
            # Clean up
            os.remove(zip_path)
            
        except Exception as e:
            print(f"[v0] Error with {slug}: {e}")
    
    print("[v0] Portfolio extraction complete!")

if __name__ == "__main__":
    download_and_extract()
