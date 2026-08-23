import os
import sys
import importlib

def check_dependency(name):
    try:
        importlib.import_module(name)
        return "OK"
    except ImportError:
        return "UNAVAILABLE"

print("=== CREATOROS AUDIT TOOL CHECK ===")
print(f"Python: OK (v{sys.version.split()[0]})")
print("\nOptional parsers:")
print(f"openpyxl: {check_dependency('openpyxl')}")
print(f"PyPDF2: {check_dependency('PyPDF2')}")
print(f"fitz: {check_dependency('fitz')}")
print(f"python-docx: {check_dependency('docx')}")

print("\nForensic checks:")
overall_fail = False

files_to_check = [
    'knowledge/04_SCRIPT/04_SCRIPT.docx',
    'knowledge/New Microsoft Word Document.docx'
]

for path in files_to_check:
    print(f"{os.path.basename(path)}:")
    if not os.path.exists(path):
        print("  size = 0")
        print("  non-zero bytes = 0")
        print("  status = MISSING")
        overall_fail = True
        continue
    try:
        size = os.path.getsize(path)
        print(f"  size = {size}")
        with open(path, 'rb') as f:
            data = f.read()
            non_zero = sum(1 for b in data if b != 0)
        print(f"  non-zero bytes = {non_zero}")
        
        if size == 0:
            print("  status = INVALID (Empty)")
            overall_fail = True
        elif non_zero == 0:
            print("  status = ZERO_FILLED")
            overall_fail = True
        else:
            print("  status = VALID")
    except Exception as e:
        print(f"  status = ERROR ({e})")
        overall_fail = True

print(f"\nOverall:")
if overall_fail:
    print("AUDIT TOOLING HEALTH = FAIL")
    sys.exit(1)
else:
    print("AUDIT TOOLING HEALTH = PASS")
    sys.exit(0)
