import json

with open('js/writing.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

code = ''.join(lines[4:1356]).strip()
if code.startswith('const DEFAULT_WRITING_SETS = '):
    code = code[len('const DEFAULT_WRITING_SETS = '):]
if code.endswith(';'):
    code = code[:-1]

sets = json.loads(code)

with open('scratch/all_50_sets.txt', 'w', encoding='utf-8') as f:
    f.write(f'Total sets: {len(sets)}\n')
    for i, s in enumerate(sets):
        f.write(f"{i+1:2d}. id={s.get('id')} | cat={s.get('category')} | subType={s.get('subType')} | title={s.get('title')}\n   prompt={s.get('prompt')}\n   thinking={s.get('thinkingGuide')}\n\n")

print(f'Successfully written {len(sets)} sets to scratch/all_50_sets.txt')
