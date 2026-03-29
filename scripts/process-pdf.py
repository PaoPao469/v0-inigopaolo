#!/usr/bin/env python3
"""
Enhanced PDF Processor for Portfolio Projects

Extracts both images and text descriptions from PDF files,
storing them in a structured format for the portfolio.

Usage:
    uv run scripts/process-pdf.py <pdf_path> <project_slug> [section]

Example:
    uv run scripts/process-pdf.py ~/Downloads/house-project.pdf residential-house architecture

Output structure:
    public/images/<section>/<project_slug>/
        page-1.jpg          # Full page render
        page-1-meta.json    # Text content and metadata
        page-2.jpg
        page-2-meta.json
        ...
        project.json        # Combined project data
"""

import sys
import os
import json
from pathlib import Path
from typing import TypedDict, List, Optional

try:
    import fitz  # PyMuPDF
except ImportError:
    print("Installing PyMuPDF...")
    os.system("uv add pymupdf")
    import fitz


class PageData(TypedDict):
    pageNumber: int
    imagePath: str
    width: int
    height: int
    textContent: str
    textBlocks: List[dict]
    hasImages: bool
    embeddedImageCount: int


class ProjectData(TypedDict):
    slug: str
    section: str
    pageCount: int
    pages: List[PageData]
    extractedAt: str


def extract_text_blocks(page) -> List[dict]:
    """Extract text with position data from a page."""
    blocks = []
    text_dict = page.get_text("dict")
    
    for block in text_dict.get("blocks", []):
        if block.get("type") == 0:  # Text block
            block_text = ""
            for line in block.get("lines", []):
                for span in line.get("spans", []):
                    block_text += span.get("text", "") + " "
            
            block_text = block_text.strip()
            if block_text:
                blocks.append({
                    "text": block_text,
                    "bbox": block.get("bbox", []),
                    "type": "text"
                })
    
    return blocks


def extract_page_text(page) -> str:
    """Extract all text content from a page."""
    return page.get_text("text").strip()


def count_embedded_images(page) -> int:
    """Count embedded images in a page."""
    return len(page.get_images())


def process_pdf(pdf_path: str, project_slug: str, section: str = "architecture") -> ProjectData:
    """Process a PDF file, extracting images and text for each page."""
    
    pdf_path = Path(pdf_path).expanduser().resolve()
    
    if not pdf_path.exists():
        print(f"Error: PDF file not found: {pdf_path}")
        sys.exit(1)
    
    # Output directory
    output_dir = Path(__file__).parent.parent / "public" / "images" / section / project_slug
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"Processing: {pdf_path.name}")
    print(f"Output to: {output_dir}")
    print("-" * 50)
    
    # Open PDF
    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    
    print(f"Total pages: {total_pages}\n")
    
    pages_data: List[PageData] = []
    
    for page_num in range(total_pages):
        page = doc[page_num]
        page_index = page_num + 1
        
        print(f"Page {page_index}/{total_pages}:")
        
        # Render page as image at 2x resolution
        zoom = 2.0
        mat = fitz.Matrix(zoom, zoom)
        pix = page.get_pixmap(matrix=mat)
        
        # Save page image
        image_filename = f"page-{page_index}.jpg"
        image_path = output_dir / image_filename
        pix.save(str(image_path))
        print(f"  Image: {image_filename} ({pix.width}x{pix.height})")
        
        # Extract text content
        text_content = extract_page_text(page)
        text_blocks = extract_text_blocks(page)
        embedded_count = count_embedded_images(page)
        
        print(f"  Text: {len(text_content)} chars, {len(text_blocks)} blocks")
        print(f"  Embedded images: {embedded_count}")
        
        # Create page data
        page_data: PageData = {
            "pageNumber": page_index,
            "imagePath": f"/images/{section}/{project_slug}/{image_filename}",
            "width": pix.width,
            "height": pix.height,
            "textContent": text_content,
            "textBlocks": text_blocks,
            "hasImages": embedded_count > 0,
            "embeddedImageCount": embedded_count,
        }
        
        pages_data.append(page_data)
        
        # Save individual page metadata
        meta_path = output_dir / f"page-{page_index}-meta.json"
        with open(meta_path, "w", encoding="utf-8") as f:
            json.dump(page_data, f, indent=2, ensure_ascii=False)
        
        print()
    
    doc.close()
    
    # Create combined project data
    from datetime import datetime
    
    project_data: ProjectData = {
        "slug": project_slug,
        "section": section,
        "pageCount": total_pages,
        "pages": pages_data,
        "extractedAt": datetime.now().isoformat(),
    }
    
    # Save project.json
    project_json_path = output_dir / "project.json"
    with open(project_json_path, "w", encoding="utf-8") as f:
        json.dump(project_data, f, indent=2, ensure_ascii=False)
    
    print("-" * 50)
    print(f"Done! Processed {total_pages} pages.")
    print(f"\nOutput files:")
    print(f"  - {total_pages} page images (page-*.jpg)")
    print(f"  - {total_pages} metadata files (page-*-meta.json)")
    print(f"  - 1 project file (project.json)")
    print(f"\nNext steps:")
    print(f"  1. Review extracted text in project.json")
    print(f"  2. Add project to lib/projects.ts with slug: '{project_slug}'")
    print(f"  3. Optionally edit page descriptions in meta files")
    
    return project_data


def print_text_preview(project_data: ProjectData):
    """Print a preview of extracted text for review."""
    print("\n" + "=" * 50)
    print("TEXT EXTRACTION PREVIEW")
    print("=" * 50)
    
    for page in project_data["pages"]:
        print(f"\n--- Page {page['pageNumber']} ---")
        text = page["textContent"]
        if text:
            # Show first 500 chars
            preview = text[:500] + "..." if len(text) > 500 else text
            print(preview)
        else:
            print("[No text content]")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    project_slug = sys.argv[2]
    section = sys.argv[3] if len(sys.argv) > 3 else "architecture"
    
    project_data = process_pdf(pdf_path, project_slug, section)
    print_text_preview(project_data)
