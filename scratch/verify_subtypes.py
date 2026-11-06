import json, re

with open('js/writing.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

code = ''.join(lines[4:1356]).strip()
if code.startswith('const DEFAULT_WRITING_SETS = '):
    code = code[len('const DEFAULT_WRITING_SETS = '):]
if code.endswith(';'):
    code = code[:-1]

sets = json.loads(code)

with open('js/enhancements.js', 'r', encoding='utf-8') as f:
    enh = f.read()

# Find all template keys in SCAFFOLD_TEMPLATES
tpl_keys = re.findall(r'(\w+):\s*\{\s*group:', enh)
print("SCAFFOLD_TEMPLATES keys:", tpl_keys)

subType_counts = {}
missing = []
for s in sets:
    st = s.get('subType')
    if not st:
        missing.append((s['id'], s['title'], 'NO SUBTYPE'))
    elif st not in tpl_keys:
        missing.append((s['id'], s['title'], f'INVALID SUBTYPE: {st}'))
    else:
        subType_counts[st] = subType_counts.get(st, 0) + 1

print("\nsubType counts across 50 sets:")
for k, v in subType_counts.items():
    print(f"  {k}: {v} sets")

if missing:
    print("\nMissing or invalid:")
    for m in missing:
        print(" ", m)
else:
    print("\nAll 50 sets have 100% valid subType matching SCAFFOLD_TEMPLATES!")
