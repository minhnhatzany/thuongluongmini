import re

def process_file(filename):
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Replace specific wards that merged
        content = re.sub(r', Phường [^,]+, TP\. Tuyên Quang', ', Tỉnh Tuyên Quang', content)
        content = re.sub(r', TP\. Tuyên Quang', ', Tỉnh Tuyên Quang', content)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")
    except Exception as e:
        print(f"Error processing {filename}: {e}")

process_file('js/data.js')
process_file('js/tourism-data.js')
process_file('js/itinerary-data.js')
process_file('js/pages/admin.js')
