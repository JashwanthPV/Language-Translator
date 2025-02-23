from flask import Flask, render_template, request, jsonify
from googletrans import Translator
import pyttsx3

app = Flask(__name__)
translator = Translator()
engine = pyttsx3.init()

# Language mapping
LANGUAGES = {
    "english": "en", "kannada": "kn", "hindi": "hi",
    "telugu": "te", "tamil": "ta", "malayalam": "ml"
}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/translate", methods=["POST"])
def translate():
    data = request.json
    text = data.get("text")
    target_lang = LANGUAGES.get(data.get("language"), "en")

    translation = translator.translate(text, dest=target_lang)
    return jsonify({"translated_text": translation.text})

@app.route("/speak", methods=["POST"])
def speak():
    data = request.json
    text = data.get("text")

    engine.save_to_file(text, "static/audio.mp3")
    engine.runAndWait()
    return jsonify({"audio_url": "/static/audio.mp3"})

if __name__ == "__main__":
    app.run(debug=True)
