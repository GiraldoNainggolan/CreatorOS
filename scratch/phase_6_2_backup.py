import os
import shutil

domains = [
    "07_POSTING", "08_ANALYTICS", "09_DIGITAL_PRODUCT", "10_PORTFOLIO",
    "11_REPURPOSE", "12_ARCHIVE", "13_AI_LIBRARY", "14_KNOWLEDGE_BASE",
    "15_ASSET_LIBRARY", "16_BUSINESS", "17_SOP"
]

base_dir = r"c:\Users\Giraldo Nainggolan\Desktop\Clude\ECC\project\CreatorOS\knowledge"
backup_dir = r"c:\Users\Giraldo Nainggolan\Desktop\Clude\ECC\project\CreatorOS\docs\audit\canonicalization\phase-6-backup"

os.makedirs(backup_dir, exist_ok=True)

for domain in domains:
    domain_dir = os.path.join(base_dir, domain)
    for ext in [".md", ".docx", ".pdf"]:
        file_name = f"{domain}{ext}"
        src = os.path.join(domain_dir, file_name)
        dst = os.path.join(backup_dir, file_name)
        if os.path.exists(src):
            shutil.move(src, dst)
            print(f"Backed up {file_name}")

print("Backup complete.")
