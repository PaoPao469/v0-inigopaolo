#!/usr/bin/env python3
"""
Process uploaded PDFs from v0 into images and metadata.
Converts PDF pages to JPG images and extracts text content.
"""

import sys
import os
from pathlib import Path
import json
from datetime import datetime

try:
    import fitz  # PyMuPDF
except ImportError:
    print("PyMuPDF not installed. Install with: pip install PyMuPDF pillow")
    sys.exit(1)

from PIL import Image
import io

def process_pdf(pdf_path, output_base_path, project_slug):
    """
    Process a single PDF file into images and metadata.
    
    Args:
        pdf_path: Path to the input PDF
        output_base_path: Base directory for output (e.g., public/images/architecture)
        project_slug: Project slug for folder naming
    """
    if not os.path.exists(pdf_path):
        print(f"[ERROR] PDF not found: {pdf_path}")
        return None
    
    # Create output directory
    output_dir = os.path.join(output_base_path, project_slug)
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"[INFO] Processing: {pdf_path}")
    print(f"[INFO] Output: {output_dir}")
    
    try:
        doc = fitz.open(pdf_path)
        page_count = len(doc)
        print(f"[INFO] Total pages: {page_count}")
        
        pages_metadata = []
        
        for page_num in range(page_count):
            print(f"[INFO] Converting page {page_num + 1}/{page_count}...")
            
            page = doc[page_num]
            
            # Extract text
            text_content = page.get_text()
            
            # Render page to image (high DPI for quality)
            pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
            
            # Convert to PIL Image
            img_data = pix.tobytes("ppm")
            img = Image.open(io.BytesIO(img_data))
            
            # Get image dimensions
            width, height = img.size
            
            # Save image
            image_filename = f"page-{page_num + 1:02d}.jpg"
            image_path = os.path.join(output_dir, image_filename)
            img.save(image_path, "JPEG", quality=85, optimize=True)
            print(f"[SUCCESS] Saved: {image_filename} ({width}x{height})")
            
            # Save individual page metadata
            page_meta = {
                "pageNumber": page_num + 1,
                "imagePath": f"/images/{project_slug}/{image_filename}",
                "textContent": text_content.strip(),
                "width": width,
                "height": height,
                "fileName": image_filename,
            }
            pages_metadata.append(page_meta)
            
            # Save individual page JSON
            meta_filename = f"page-{page_num + 1:02d}-meta.json"
            meta_path = os.path.join(output_dir, meta_filename)
            with open(meta_path, "w", encoding="utf-8") as f:
                json.dump(page_meta, f, indent=2, ensure_ascii=False)
        
        # Save combined project metadata
        project_meta = {
            "projectSlug": project_slug,
            "pageCount": page_count,
            "pages": pages_metadata,
            "processingDate": datetime.now().isoformat(),
            "sourcePdf": os.path.basename(pdf_path),
        }
        
        project_meta_path = os.path.join(output_dir, "project.json")
        with open(project_meta_path, "w", encoding="utf-8") as f:
            json.dump(project_meta, f, indent=2, ensure_ascii=False)
        
        print(f"[SUCCESS] Saved project metadata: project.json")
        print(f"[SUCCESS] Processing complete for {project_slug}")
        print(f"[INFO] Total pages processed: {page_count}\n")
        
        return page_count
        
    except Exception as e:
        print(f"[ERROR] Failed to process PDF: {e}")
        return None
    finally:
        doc.close()

def main():
    """Main processing workflow"""
    
    # Define projects to process
    projects = [
        {
            "pdf": "user_read_only_context/text_attachments/project-2-aKtPd.pdf",
            "slug": "project-2",
            "section": "architecture",
        },
        {
            "pdf": "user_read_only_context/text_attachments/rhino-project-MjCMx.pdf",
            "slug": "rhino-project",
            "section": "architecture",
        },
        {
            "pdf": "user_read_only_context/text_attachments/Clothing-Brand-oliyN.pdf",
            "slug": "clothing-brand",
            "section": "clothing",
        },
    ]
    
    results = {}
    
    for project in projects:
        section = project["section"]
        slug = project["slug"]
        pdf_path = project["pdf"]
        
        # Create output base path
        output_base = f"public/images/{section}"
        os.makedirs(output_base, exist_ok=True)
        
        print(f"\n{'='*60}")
        print(f"Processing: {slug}")
        print(f"{'='*60}")
        
        page_count = process_pdf(pdf_path, output_base, slug)
        
        if page_count:
            results[slug] = {
                "status": "success",
                "pageCount": page_count,
                "section": section,
            }
        else:
            results[slug] = {
                "status": "failed",
                "section": section,
            }
    
    # Print summary
    print(f"\n{'='*60}")
    print("PROCESSING SUMMARY")
    print(f"{'='*60}")
    
    for slug, result in results.items():
        status = result["status"].upper()
        section = result["section"]
        
        if status == "SUCCESS":
            page_count = result["pageCount"]
            print(f"✓ {slug} ({section}) - {page_count} pages")
        else:
            print(f"✗ {slug} ({section}) - FAILED")
    
    print(f"\nUpdate lib/projects.ts with the page counts above.")

if __name__ == "__main__":
    main()
