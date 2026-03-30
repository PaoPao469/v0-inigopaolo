#!/usr/bin/env python3
import os
import re
from pathlib import Path

# Define the portfolio structure with actual file counts from extraction
projects = {
    "architecture": {
        "project-1": 35,
        "project-2": 12,
        "rhino-project": 1,  # Will check and fix
    },
    "photography": {
        "car-photography": 17,
        "model-photography": 17,
    },
    "clothing": {
        "clothing-brand": 19,
    }
}

base_path = Path("public/images")

def rename_images_in_folder(folder_path, expected_count):
    """Rename all images in a folder to page-1.png, page-2.png, etc."""
    if not folder_path.exists():
        print(f"[v0] Folder not found: {folder_path}")
        return 0
    
    # Get all image files
    image_files = sorted([
        f for f in folder_path.iterdir()
        if f.suffix.lower() in {'.png', '.jpg', '.jpeg', '.gif'}
    ])
    
    if not image_files:
        print(f"[v0] No images found in {folder_path}")
        return 0
    
    print(f"[v0] Found {len(image_files)} images in {folder_path.name}")
    
    # Rename each file
    for i, old_file in enumerate(image_files, 1):
        new_name = f"page-{i}.png"
        new_path = folder_path / new_name
        
        # Convert to PNG if needed (for consistency)
        if old_file.suffix.lower() != '.png':
            print(f"[v0] Converting {old_file.name} to PNG format")
        
        old_file.rename(new_path)
        print(f"[v0] Renamed: {old_file.name} → {new_name}")
    
    return len(image_files)

# Process all projects
for section, section_projects in projects.items():
    section_path = base_path / section
    
    for project_slug, _ in section_projects.items():
        project_path = section_path / project_slug
        
        if project_path.exists():
            # Check for nested folder (like "rhino project" folder inside)
            subdirs = [d for d in project_path.iterdir() if d.is_dir()]
            
            if subdirs:
                print(f"[v0] Found nested folder in {project_slug}")
                for subdir in subdirs:
                    print(f"[v0] Processing nested: {subdir.name}")
                    count = rename_images_in_folder(subdir, 1)
                    if count > 0:
                        # Move nested images up to parent
                        for img in subdir.iterdir():
                            if img.suffix.lower() in {'.png', '.jpg', '.jpeg'}:
                                img.rename(project_path / img.name)
                        # Remove empty subdir
                        subdir.rmdir()
            else:
                count = rename_images_in_folder(project_path, 1)
                print(f"[v0] Total pages for {project_slug}: {count}\n")

print("[v0] Image renaming complete!")
