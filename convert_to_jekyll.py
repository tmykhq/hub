import os
import re
import json

files_to_convert = [
    'installing',
    'console',
    'security',
    'monitoring',
    'support',
    'learning'
]

def convert_file(base_name):
    html_file = f"docs/{base_name}.html"
    yaml_file = f"docs/_data/{base_name}.yml"
    
    if not os.path.exists(html_file):
        print(f"Skipping {html_file}, not found.")
        return

    with open(html_file, 'r') as f:
        content = f.read()

    # Regex to find the grid-container and its contents
    # We will use non-greedy match to grab the contents between <div class="grid-container"> and the closing </div>
    # Note: there might be nested divs, but since cards don't have nested divs, a simple regex or string splitting will work.
    
    grid_start = '<div class="grid-container">'
    grid_end_idx = content.find('</main>')
    
    start_idx = content.find(grid_start)
    if start_idx == -1:
        print(f"Could not find grid-container in {html_file}")
        return
        
    start_idx += len(grid_start)
    
    # We'll just look for cards within the grid container
    grid_content = content[start_idx:content.rfind('</div>', 0, grid_end_idx)]
    
    # Parse cards
    cards = []
    card_pattern = re.compile(
        r'<div class="card">\s*'
        r'<h3>(.*?)</h3>\s*'
        r'<div class="tags-container">\s*'
        r'<span class="tag tag-difficulty">(.*?)</span>\s*'
        r'<span class="tag tag-topic">(.*?)</span>\s*'
        r'<span class="tag tag-type">(.*?)</span>\s*'
        r'</div>\s*'
        r'<p>(.*?)</p>\s*'
        r'<a href="(.*?)".*?>(.*?) &rarr;</a>\s*'
        r'</div>', re.DOTALL
    )
    
    matches = card_pattern.findall(grid_content)
    
    yaml_lines = []
    for match in matches:
        title, difficulty, topic, type_, desc, link, link_text = match
        # Clean up any potential HTML entities or newlines
        title = title.strip()
        difficulty = difficulty.strip()
        topic = topic.strip()
        type_ = type_.strip()
        desc = desc.strip()
        link = link.strip()
        link_text = link_text.strip()
        
        yaml_lines.append(f"- title: {json.dumps(title)}")
        yaml_lines.append(f"  difficulty: {json.dumps(difficulty)}")
        yaml_lines.append(f"  topic: {json.dumps(topic)}")
        yaml_lines.append(f"  type: {json.dumps(type_)}")
        yaml_lines.append(f"  desc: {json.dumps(desc)}")
        yaml_lines.append(f"  link: {json.dumps(link)}")
        yaml_lines.append(f"  link_text: {json.dumps(link_text)}")
        
    with open(yaml_file, 'w') as f:
        f.write('\n'.join(yaml_lines) + '\n')
        
    print(f"Generated {yaml_file} with {len(matches)} cards.")

    # Now rewrite the HTML file
    liquid_loop = f"""
            {{% for item in site.data.{base_name} %}}
            <div class="card">
                <h3>{{{{ item.title }}}}</h3>
                <div class="tags-container">
                    <span class="tag tag-difficulty">{{{{ item.difficulty }}}}</span>
                    <span class="tag tag-topic">{{{{ item.topic }}}}</span>
                    <span class="tag tag-type">{{{{ item.type }}}}</span>
                </div>
                <p>{{{{ item.desc }}}}</p>
                <a href="{{{{ item.link }}}}" target="_blank" rel="noopener noreferrer">{{{{ item.link_text }}}} &rarr;</a>
            </div>
            {{% endfor %}}
        """
        
    # Replace the inner contents of grid-container
    new_html = content[:start_idx] + liquid_loop + content[content.rfind('</div>', 0, grid_end_idx):]
    
    with open(html_file, 'w') as f:
        f.write(new_html)
        
    print(f"Updated {html_file} to use Liquid tags.")

for f in files_to_convert:
    convert_file(f)
