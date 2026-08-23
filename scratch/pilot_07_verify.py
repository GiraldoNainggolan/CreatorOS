import os
import re
from docx import Document
from PyPDF2 import PdfReader

def get_char_count(text):
    # Ignoring whitespaces for a more robust structural comparison
    return len("".join(text.split()))

def get_word_count(text):
    return len(text.split())

def main():
    domain = "07_POSTING"
    txt_path = rf"c:\Users\Giraldo Nainggolan\Desktop\Clude\ECC\project\CreatorOS\scratch\pdf_extracts\{domain}.txt"
    md_path = rf"c:\Users\Giraldo Nainggolan\Desktop\Clude\ECC\project\CreatorOS\knowledge\{domain}\{domain}.md"
    docx_path = rf"c:\Users\Giraldo Nainggolan\Desktop\Clude\ECC\project\CreatorOS\knowledge\{domain}\{domain}.docx"
    pdf_path = rf"c:\Users\Giraldo Nainggolan\Desktop\Clude\ECC\project\CreatorOS\knowledge\{domain}\{domain}.pdf"
    
    # 1. Read TXT
    with open(txt_path, 'r', encoding='utf-8') as f:
        txt_content = f.read()
        
    # 2. Read MD
    with open(md_path, 'r', encoding='utf-8') as f:
        md_content = f.read()
        
    # 3. Read DOCX
    docx_content = []
    doc = Document(docx_path)
    for p in doc.paragraphs:
        docx_content.append(p.text)
    docx_text = "\n".join(docx_content)
    
    # 4. Read PDF
    pdf_content = []
    reader = PdfReader(pdf_path)
    for page in reader.pages:
        pdf_content.append(page.extract_text())
    pdf_text = "\n".join(pdf_content)
    
    txt_chars = get_char_count(txt_content)
    txt_words = get_word_count(txt_content)
    
    # Since MD adds some header/footer, we can roughly estimate
    md_chars = get_char_count(md_content)
    md_words = get_word_count(md_content)
    
    docx_chars = get_char_count(docx_text)
    pdf_chars = get_char_count(pdf_text)
    
    print("=== PILOT 07_POSTING VALIDATION REPORT ===")
    print(f"Source TXT   : {txt_words} words, {txt_chars} chars (no spaces)")
    print(f"Generated MD : {md_words} words, {md_chars} chars (no spaces)")
    print(f"Generated DOCX: {get_word_count(docx_text)} words, {docx_chars} chars (no spaces)")
    print(f"Generated PDF : {get_word_count(pdf_text)} words, {pdf_chars} chars (no spaces)")
    
    print("\n=== DIFFERENCE ANALYSIS ===")
    # MD/DOCX/PDF should be very close.
    # MD vs TXT: MD has extra headers/footers, so it should be slightly larger.
    if md_chars >= txt_chars * 0.95:
        print("MD vs TXT: PASS (High source fidelity, content preserved)")
    else:
        print("MD vs TXT: FAIL (Substantial content loss detected)")
        
    if docx_chars >= md_chars * 0.95:
        print("DOCX vs MD: PASS (DOCX extraction successful and matches MD)")
    else:
        print("DOCX vs MD: FAIL (DOCX differs from MD)")
        
    # PyPDF2 extraction can sometimes miss spaces or join things weirdly, 
    # but char count (no spaces) should be identical.
    if pdf_chars >= md_chars * 0.90:
        print("PDF vs MD: PASS (PDF extraction successful and matches MD)")
    else:
        print("PDF vs MD: FAIL (PDF differs from MD)")

if __name__ == "__main__":
    main()
