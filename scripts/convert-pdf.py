#!/usr/bin/env python3
"""
PDF to Image Converter for Portfolio Projects

Usage:
    uv run scripts/convert-pdf.py <pdf_path> <project_slug>

Example:
    uv run scripts/convert-pdf.py ~/Downloads/house-project.pdf residential-house

This will create images in public/images/architecture/<project_slug>/
    - page-1.jpg (use as hero/thumbnail)
    - page-2.jpg, page-3.jpg, etc. (detail gallery images)
"""

import sys
import os
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print("Installing PyMuPDF...")
    os.system("uv add pymupdf")
    import fitz


def convert_pdf_to_images(pdf_path: str, project_slug: str, section: str = "architecture"):
    """Convert a PDF file to JPG images for the portfolio."""
    
    pdf_path = Path(pdf_path).expanduser().resolve()
    
    if not pdf_path.exists():
        print(f"Error: PDF file not found: {pdf_path}")
        sys.exit(1)
    
    # Output directory
    output_dir = Path(__file__).parent.parent / "public" / "images" / section / project_slug
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"Converting: {pdf_path.name}")
    print(f"Output to: {output_dir}")
    
    # Open PDF
    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    
    print(f"Total pages: {total_pages}")
    
    for page_num in range(total_pages):
        page = doc[page_num]
        
        # Render at 2x resolution for crisp display
        zoom = 2.0
        mat = fitz.Matrix(zoom, zoom)
        pix = page.get_pixmap(matrix=mat)
        
        # Save as JPG
        output_path = output_dir / f"page-{page_num + 1}.jpg"
        pix.save(str(output_path))
        
        print(f"  Created: page-{page_num + 1}.jpg ({pix.width}x{pix.height})")
    
    doc.close()
    
    print(f"\nDone! {total_pages} images created.")
    print(f"\nNext steps:")
    print(f"  1. Add project to lib/projects.ts with slug: '{project_slug}'")
    print(f"  2. Set pageCount: {total_pages}")
    print(f"  3. First page (page-1.jpg) will be used as the thumbnail")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    project_slug = sys.argv[2]
    section = sys.argv[3] if len(sys.argv) > 3 else "architecture"
    
    convert_pdf_to_images(pdf_path, project_slug, section)
