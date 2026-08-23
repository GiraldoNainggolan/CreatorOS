import os
import hashlib
import subprocess

MEDIA_EXTS = ('.mp4', '.mov', '.avi', '.mkv', '.mp3', '.wav', '.m4a', '.aac', '.webm', '.gif', '.png', '.jpg', '.jpeg')

def get_hash(path):
    h = hashlib.sha256()
    try:
        with open(path, 'rb') as f:
            while chunk := f.read(8192):
                h.update(chunk)
        return h.hexdigest()
    except Exception:
        return "UNKNOWN"

def get_magic(path):
    try:
        with open(path, 'rb') as f:
            bytes_read = f.read(16)
            return bytes_read.hex()
    except Exception:
        return "UNKNOWN"

def check_zeros(path):
    try:
        size = os.path.getsize(path)
        if size == 0: return size, 0, 0
        with open(path, 'rb') as f:
            data = f.read()
            non_zero = sum(1 for b in data if b != 0)
            return size, non_zero, (size - non_zero) / size
    except Exception:
        return -1, -1, -1

print("=== MEDIA FORENSICS START ===")
ffprobe_available = False
try:
    subprocess.run(['ffprobe', '-version'], capture_output=True, text=True, check=True)
    ffprobe_available = True
    print("FFPROBE AVAILABLE: YES")
except Exception:
    print("FFPROBE AVAILABLE: NO")

media_files = []
for root, dirs, files in os.walk('knowledge'):
    for file in files:
        if file.lower().endswith(MEDIA_EXTS) or 'gugugugu' in file.lower():
            path = os.path.join(root, file)
            media_files.append(path)
            size, non_zero, zero_ratio = check_zeros(path)
            magic = get_magic(path)
            file_hash = get_hash(path)
            print(f"\nFILE: {path}")
            print(f"SIZE: {size}")
            print(f"NON-ZERO BYTES: {non_zero}")
            print(f"ZERO RATIO: {zero_ratio:.4f}" if zero_ratio != -1 else "ZERO RATIO: ERROR")
            print(f"MAGIC BYTES: {magic}")
            print(f"HASH: {file_hash}")
            
            if ffprobe_available and file.lower().endswith(('.mp3', '.mp4', '.wav', '.m4a')):
                try:
                    result = subprocess.run(['ffprobe', '-v', 'error', '-show_format', '-show_streams', path], capture_output=True, text=True, timeout=5)
                    print(f"FFPROBE STDOUT: {result.stdout.strip()}")
                    print(f"FFPROBE STDERR: {result.stderr.strip()}")
                except Exception as e:
                    print(f"FFPROBE ERROR: {e}")

print("\n=== MEDIA FORENSICS END ===")
