import zipfile
import xml.etree.ElementTree as ET
import glob
import json

def extract_docx_text(path):
    try:
        with zipfile.ZipFile(path) as docx:
            xml_content = docx.read('word/document.xml')
            tree = ET.XML(xml_content)
            # Find all text nodes
            namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            text = []
            for p in tree.findall('.//w:p', namespaces):
                para_text = "".join(node.text for node in p.findall('.//w:t', namespaces) if node.text)
                if para_text:
                    text.append(para_text)
            return "\n".join(text)
    except Exception as e:
        return f"ERROR: {str(e)}"

def extract_xlsx_text(path):
    try:
        with zipfile.ZipFile(path) as xlsx:
            # Get shared strings
            shared_strings = []
            if 'xl/sharedStrings.xml' in xlsx.namelist():
                xml_content = xlsx.read('xl/sharedStrings.xml')
                tree = ET.XML(xml_content)
                namespaces = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
                for t in tree.findall('.//ns:t', namespaces):
                    shared_strings.append(t.text if t.text else "")
            
            # Read sheets
            sheet_data = {}
            for name in xlsx.namelist():
                if name.startswith('xl/worksheets/sheet') and name.endswith('.xml'):
                    xml_content = xlsx.read(name)
                    tree = ET.XML(xml_content)
                    namespaces = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
                    cells = []
                    for row in tree.findall('.//ns:row', namespaces):
                        row_data = []
                        for c in row.findall('.//ns:c', namespaces):
                            v = c.find('ns:v', namespaces)
                            if v is not None:
                                val = v.text
                                if c.attrib.get('t') == 's':  # shared string
                                    val = shared_strings[int(val)]
                                row_data.append(val)
                        if row_data:
                            cells.append(" | ".join(str(x) for x in row_data))
                    sheet_data[name] = "\n".join(cells)
            return sheet_data
    except Exception as e:
        return f"ERROR: {str(e)}"

results = {}

docx_files = glob.glob('knowledge/**/*.docx', recursive=True)
for f in docx_files:
    results[f] = extract_docx_text(f)

xlsx_files = glob.glob('knowledge/**/*.xlsx', recursive=True)
for f in xlsx_files:
    results[f] = extract_xlsx_text(f)

with open('scratch/office_dump.json', 'w', encoding='utf-8') as out:
    json.dump(results, out, indent=2, ensure_ascii=False)
