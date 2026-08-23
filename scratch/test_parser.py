import os
import re

def reconstruct_text(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    # Remove leading/trailing whitespaces and empty lines
    cleaned_lines = [line.strip() for line in lines if line.strip()]
    
    # Heuristics for reconstruction
    # Words usually don't start with upper case unless it's a new sentence, but here everything is on a new line.
    # Let's join everything, but insert newlines before known structural markers.
    
    reconstructed = []
    current_paragraph = []
    
    structural_markers = [
        r'^\d{2}_[A-Z_]+', # e.g. 01_PUBLISHING_STRATEGY
        r'^📂',
        r'^🏛',
        r'^##',
        r'^###',
        r'^\[ \]',
        r'^\-',
        r'^\*'
    ]
    
    for word in cleaned_lines:
        is_marker = False
        for marker in structural_markers:
            if re.match(marker, word):
                is_marker = True
                break
        
        # If it's a marker, or if it looks like the start of a completely new section
        if is_marker:
            if current_paragraph:
                reconstructed.append(" ".join(current_paragraph))
                current_paragraph = []
            reconstructed.append(word)
        else:
            current_paragraph.append(word)
            
    if current_paragraph:
        reconstructed.append(" ".join(current_paragraph))
        
    out_path = r"c:\Users\Giraldo Nainggolan\Desktop\Clude\ECC\project\CreatorOS\scratch\test_out.md"
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write("\n\n".join(reconstructed))
    return out_path

out_path = reconstruct_text(r"c:\Users\Giraldo Nainggolan\Desktop\Clude\ECC\project\CreatorOS\scratch\pdf_extracts\07_POSTING.txt")
print(f"Output written to {out_path}")
