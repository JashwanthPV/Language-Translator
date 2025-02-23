async function translateText() {
    let text = document.getElementById("inputText").value;
    let language = document.getElementById("languageSelect").value;

    let response = await fetch("/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text, language: language })
    });

    let data = await response.json();
    document.getElementById("translatedText").innerText = data.translated_text;
}

// Speech-to-Text
function startSpeechToText() {
    let recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
        document.getElementById("inputText").value = event.results[0][0].transcript;
    };
}

// Text-to-Speech
async function speakText() {
    let text = document.getElementById("translatedText").innerText;
    
    let response = await fetch("/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text })
    });

    let data = await response.json();
    let audio = new Audio(data.audio_url);
    audio.play();
}
