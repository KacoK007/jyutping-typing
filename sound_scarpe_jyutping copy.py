import requests
from bs4 import BeautifulSoup
import os
import re

url = "https://opencantonese.org/books/cantonese-life-1/pronunciation-guide/jyutping-chart"
base_url = "https://opencantonese.org"

response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

buttons = soup.find_all('span', role='button')

output_dir = os.path.join('public', 'audio')
os.makedirs(output_dir, exist_ok=True)

for button in buttons:
    tabindex = button.get('tabindex', '')
    if tabindex.endswith('.mp3'):
        audio_url = base_url + tabindex
        jyutping_id = button.get_text().strip()
        filename = os.path.basename(tabindex)
        filename = re.sub(r'-\d+-', '-', filename)
        filepath = os.path.join(output_dir, filename)
        print(f"Downloading {audio_url} as {filepath}...")
        audio_response = requests.get(audio_url)
        if audio_response.status_code == 200:
            with open(filepath, 'wb') as f:
                f.write(audio_response.content)
        else:
            print(f"Failed to download {audio_url}")