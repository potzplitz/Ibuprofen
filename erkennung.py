import time
import pyaudio
import speech_recognition as sr

def recognize_speech():
    # Konfiguration des Audio-Setups
    audio = pyaudio.PyAudio()
    stream = audio.open(format=pyaudio.paInt16, channels=1, rate=44100, input=True, frames_per_buffer=1024)

    recognizer = sr.Recognizer()

    try:
        print("Bereit zum Aufnehmen. Sprache wird für 5 Sekunden aufgezeichnet...")

        # Aufnahme von Audio für 5 Sekunden
        audio_data = stream.read(44100 * 5)  # 5 Sekunden Audio bei 44100 Hz Abtastrate

        # Konvertierung der Rohdaten in ein AudioData-Objekt
        audio_data_obj = sr.AudioData(audio_data, sample_rate=44100, sample_width=2)

        # Audio transkribieren
        recognized_text = recognizer.recognize_google(audio_data_obj)

        print("Erkannter Text: " + recognized_text)

    except sr.UnknownValueError:
        print("Konnte den gesprochenen Text nicht verstehen")
    
    except sr.RequestError as e:
        print("Fehler beim Abrufen der Ergebnisse von Google Speech Recognition service; {0}".format(e))
    
    # Beenden des Audio-Streams
    stream.stop_stream()
    stream.close()
    audio.terminate()

# Funktion aufrufen
recognize_speech()
