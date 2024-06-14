import speech_recognition as sr
import openai
import pyttsx3

# Set up the SpeechRecognition object
recognizer = sr.Recognizer()

# Initialize the TTS engine
tts_engine = pyttsx3.init()

# Define a function to handle the speech-to-text conversion
def recognize_speech():
    with sr.Microphone() as source:
        print("Bitte sprechen Sie jetzt...")
        audio = recognizer.listen(source, timeout=5)
        
        try:
            # Convert the spoken audio to text
            question = recognizer.recognize_google(audio, language="de-DE")  # Recognition in German
            print("Sie sagten: " + question)
            return question
        except sr.UnknownValueError:
            print("Google konnte das Audio nicht verstehen.")
            return None
        except sr.RequestError as e:
            print(f"Es gab ein Problem bei der Anfrage an Google: {e}")
            return None

# Replace 'your-api-key' with your actual OpenAI API key
openai.api_key = 'sk-proj-4UXiVX0HbxFNAvYew9eVT3BlbkFJ0ExXUP5hkVWQJNHgTdA6'

# Define a function to interact with the GPT assistant
def ask_gpt(question, role, knowledge, chat_log=None):
    if chat_log is None:
        chat_log = []

    act_knowledge = {
        "low": "Explain it for someone who knows nothing about this topic",
        "below_average": "Explain it for someone who knows a little bit about this topic",
        "average": "Explain it for someone who knows a bit more than the basics about this topic",
        "above_average": "Explain it for someone who knows more than the average person about this topic",
        "high": "Explain it for someone who knows almost everything about this topic."
    }

    system_message = {
        "math": f"Your name is Mr.C. You can only answer questions about math and physics. All other questions with other topics you have no answer. {act_knowledge[knowledge]}",
        "code": f"Your name is Mr.C. You can only answer questions about coding. All other questions with other topics you have no answer. {act_knowledge[knowledge]}",
        "translate": f"Your name is Mr.C. You can only translate text and words from German to English and from English to German. All other questions with other topics you have no answer. {act_knowledge[knowledge]}"
    }

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # You can use other models as needed
        messages=[
            {"role": "system", "content": system_message.get(role, system_message["math"])},
        ] + chat_log + [{"role": "user", "content": question}]
    )

    answer = response['choices'][0]['message']['content']
    chat_log.append({"role": "user", "content": question})
    chat_log.append({"role": "assistant", "content": answer})

    return answer, chat_log

# Define a function to speak the given text
def speak_text(text):
    tts_engine.say(text)
    tts_engine.runAndWait()

# Example usage:
if __name__ == "__main__":
    # Recognize the spoken question
    question = recognize_speech()
    
    if question:
        # Ask the GPT assistant
        role = "math"  # Example role
        knowledge = "average"  # Example knowledge level
        answer, _ = ask_gpt(question, role, knowledge)
        print("GPT Assistant says:", answer)
        # Speak the answer
        speak_text(answer)
    else:
        print("Die Frage konnte nicht verstanden werden.")
        speak_text("Die Frage konnte nicht verstanden werden.")
