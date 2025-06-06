import requests
from bs4 import BeautifulSoup

url = "https://jyutping.org/jyutping/"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

buttons = soup.find_all('button', class_='inline-flex')
jyutping_ids = []
for button in buttons:
    # Extract `id` from the button or associated data attributes
    if 'aria-label' in button.attrs and 'Play audio' in button['aria-label']:
        jyutping_id = button['aria-label'].replace('Play audio ', '')
        jyutping_ids.append(jyutping_id)

# Download audio files
base_audio_url = "https://jyutping.org/audio/"
for jyutping_id in jyutping_ids:
    audio_url = f"{base_audio_url}{jyutping_id}.mp3"
    print(f"Downloading {audio_url}...")
    audio_response = requests.get(audio_url)
    if audio_response.status_code == 200:
        with open(f"{jyutping_id}.mp3", 'wb') as f:
            f.write(audio_response.content)
    else:
        print(f"Failed to download {audio_url}")