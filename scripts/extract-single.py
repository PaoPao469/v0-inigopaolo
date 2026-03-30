#!/usr/bin/env python3
"""
Extract a single ZIP file from URL to public/images folder
"""

import urllib.request
import zipfile
import io
import os
import re

# Project 1 ZIP
ZIP_URL = "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com/project%201.zip"
OUTPUT_DIR = "/vercel/share/v0-project/public/images/architecture/project-1"

def natural_sort_key(s):
    """Sort strings with numbers naturally (page-2 before page-10)"""
    return [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', s)]

def main():
    print(f"Downloading ZIP from: {ZIP_URL}")
    
    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Download ZIP
    req = urllib.request.Request(ZIP_URL, headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    zip_data = response.read()
    print(f"Downloaded {len(zip_data)} bytes")
    
    # Extract ZIP
    with zipfile.ZipFile(io.BytesIO(zip_data), 'r') as zf:
        # List contents
        names = zf.namelist()
        print(f"ZIP contains {len(names)} files:")
        for name in names:
            print(f"  - {name}")
        
        # Filter image files
        image_files = [
            n for n in names 
            if n.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))
            and not n.startswith('__MACOSX')
            and not os.path.basename(n).startswith('.')
        ]
        
        # Sort naturally
        image_files.sort(key=natural_sort_key)
        print(f"\nFound {len(image_files)} images to extract")
        
        # Extract and rename
        for i, name in enumerate(image_files, 1):
            ext = os.path.splitext(name)[1].lower()
            new_name = f"page-{i}{ext}"
            out_path = os.path.join(OUTPUT_DIR, new_name)
            
            # Extract file data
            data = zf.read(name)
            with open(out_path, 'wb') as f:
                f.write(data)
            
            print(f"Extracted: {name} -> {new_name}")
    
    print(f"\nDone! Files saved to: {OUTPUT_DIR}")
    
    # List output directory
    print("\nOutput directory contents:")
    for f in sorted(os.listdir(OUTPUT_DIR)):
        print(f"  - {f}")

if __name__ == "__main__":
    main()
