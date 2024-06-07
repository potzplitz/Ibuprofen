
import openai
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the API key from an environment variable or a configuration file
openai.api_key = 'sk-proj-vQzCChPowemkbhUtM7B4T3BlbkFJntCWP5yB0AvE4GtQswzd'  # Replace with env var or config

@app.route('/')
def home():
    return render_template('index.html')

# Define the system message and knowledge level descriptions
act_knowledge = {
    "low": "Explain it for someone who knows nothing about this topic",
    "below_average": "Explain it for someone who knows a little bit about this topic",
    "average": "Explain it for someone who knows a bit more than the basics about this topic",
    "above_average": "Explain it for someone who knows more than the average person about this topic",
    "high": "Explain it for someone who knows almost anything about this topic."
}

system_message = {
    "math": f"Your name is Mr.C. You can only answer questions about math and physics. All other questions with other topics you have no answer.{act_knowledge['low']}",
    "code": f"Your name is Mr.C. You can only answer questions about coding. All other questions with other topics you have no answer.{act_knowledge['low']}",
    "translate": f"Your name is Mr.C. You can only translate text and words from German to English and from English to German. All other questions with other topics you have no answer.{act_knowledge['low']}"
}

def ask_gpt(question, chat_log=None):
    if chat_log is None:
        chat_log = []

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_message[selected_role]},
        ] + chat_log + [{"role": "user", "content": question}]
    )

    answer = response['choices'][0]['message']['content']
    chat_log.append({"role": "user", "content": question})
    chat_log.append({"role": "assistant", "content": answer})

    return answer, chat_log

@app.route('/ask', methods=['POST'])
def input_prompt():
    question = request.form.get("promptText")
    if question is None or question.lower() == 'exit':
        return jsonify({'response': 'No question provided or exit command received.'})

    response, conversation_log = ask_gpt(question)
    return jsonify({'response': response})

if __name__ == "__main__":
    app.run(debug=True)
app.run(debug=True)