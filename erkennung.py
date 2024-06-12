import speech_recognition as sr

# Initialisieren des SpeechRecognition-Objekts
recognizer = sr.Recognizer()

# Verwenden des Mikrofons, um Audio aufzunehmen
with sr.Microphone() as source:
    print("Bitte sprechen Sie jetzt...")
    # Aufnahme des Audios für 5 Sekunden
    audio = recognizer.listen(source, timeout=5)
    
    try:
        # Versuchen, das gesprochene Audio in Text umzuwandeln
        text = recognizer.recognize_google(audio, language="de-DE")  # Erkennung in Deutsch
        print("Sie sagten: " + text)
    except sr.UnknownValueError:
        print("Google konnte das Audio nicht verstehen.")
    except sr.RequestError as e:
        print(f"Es gab ein Problem bei der Anfrage an Google: {e}")

# Die Variable 'text' enthält nun den erkannten Text.
