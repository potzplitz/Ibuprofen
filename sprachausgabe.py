import pyttsx3

# Initialisieren des TTS-Engines
engine = pyttsx3.init()

# Eingegebener Text
eingabe_text = input("Bitte geben Sie einen Text ein: ")

# Liste verfügbarer Stimmen abrufen
voices = engine.getProperty('voices')

# Eine bestimmte Stimme auswählen, z.B. die erste verfügbare Stimme
# Sie können den Index ändern, um eine andere Stimme auszuwählen
engine.setProperty('voice', voices[0].id)

# Optional: Die Stimme oder Geschwindigkeit anpassen
# engine.setProperty('rate', 150)  # Sprachgeschwindigkeit (Worte pro Minute)
# engine.setProperty('volume', 0.5)  # Lautstärke (0.0 - 1.0)

# Text sprechen lassen
engine.say(eingabe_text)
engine.runAndWait()

print("Die Audioausgabe wurde abgespielt.")
