import pyttsx3

# Initialisieren des TTS-Engines
engine = pyttsx3.init()

# Eingegebener Text
eingabe_text = input("Bitte geben Sie einen Text ein: ")

# Text sprechen lassen
engine.say(eingabe_text)
engine.runAndWait()

# Optional: Die Stimme oder Geschwindigkeit anpassen
# engine.setProperty('rate', 150)  # Sprachgeschwindigkeit
# engine.setProperty('volume', 1.0)  # Lautstärke
# voices = engine.getProperty('voices')  # Liste verfügbarer Stimmen
# engine.setProperty('voice', voices[0].id)  # Auswahl einer Stimme aus der Liste

print("Die Audioausgabe wurde abgespielt.")
