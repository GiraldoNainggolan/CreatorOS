import PyPDF2
import os

pdf_path = r"c:\Users\Giraldo Nainggolan\Desktop\Clude\ECC\project\CreatorOS\knowledge\Paket_Lengkap.pdf"
out_dir = r"c:\Users\Giraldo Nainggolan\Desktop\Clude\ECC\project\CreatorOS\scratch\pdf_extracts"

os.makedirs(out_dir, exist_ok=True)

ranges = {
    "07_POSTING": (219, 223),
    "08_ANALYTICS": (233, 249),
    "09_DIGITAL_PRODUCT": (250, 267),
    "10_PORTFOLIO": (268, 284),
    "11_REPURPOSE": (285, 302),
    "12_ARCHIVE": (303, 317),
    "13_AI_LIBRARY": (318, 334),
    "14_KNOWLEDGE_BASE": (335, 352),
    "15_ASSET_LIBRARY": (353, 366),
    "16_BUSINESS": (367, 381),
    "17_SOP": (382, 395)
}

if not os.path.exists(pdf_path):
    print(f"File not found: {pdf_path}")
else:
    with open(pdf_path, "rb") as f:
        reader = PyPDF2.PdfReader(f)
        for domain, (start, end) in ranges.items():
            text = ""
            # PyPDF2 is 0-indexed, so page 1 is index 0.
            # Assuming the pages given are 1-indexed (e.g. page 219 is index 218).
            for i in range(start - 1, min(end, len(reader.pages))):
                page = reader.pages[i]
                text += page.extract_text() + "\n"
            
            out_file = os.path.join(out_dir, f"{domain}.txt")
            with open(out_file, "w", encoding="utf-8") as out:
                out.write(text)
            print(f"Extracted {domain} to {out_file}")
