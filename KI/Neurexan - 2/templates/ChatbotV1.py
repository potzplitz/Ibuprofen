import openai
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/')
def home():
    return render_template('index.html')

# Replace 'your-api-key' with your actual OpenAI API key
openai.api_key = 'sk-proj-vQzCChPowemkbhUtM7B4T3BlbkFJntCWP5yB0AvE4GtQswzd'

# Ask the user to select a role
print("Select a role:")
print("1: Math")
print("2: Code")
print("3: Translate")
role_choice = input("Enter the number of your choice: ")

if role_choice == "1":
    selected_role = "math"
elif role_choice == "2":
    selected_role = "code"
elif role_choice == "3":
    selected_role = "translate"
else:
    print("Invalid choice, defaulting to Math")
    selected_role = "Math"

print("Select the profesionalism:")
print("1: for low knowledge")
print("2: for below average knowledge")
print("3: for average knowledge")
print("4: for above average knowledge")
print("5: for high knowledge")
prof_choice = input("Enter the number of your choice: ")

if prof_choice == "1":
    selected_knowledge = "low"
elif prof_choice == "2":
    selected_knowledge = "beav"
elif prof_choice =="3":
    selected_knowledge = "average"
elif prof_choice == "4":
    selected_knowledge = "abav"
elif prof_choice == "5":
    selected_knowledge = "high"
else:
    print("Invalid choice, defaulting to average knowledge")
    selected_knowledge = "average"

act_knowledge = {
    "low":"Explain it for someone who know nothing about this topic",
    "beav":"Explain it for someone who know a little bit about this topic",
    "average":"Explain it for someone who know a bit more than the basics about this topic",
    "abav":"Explain it for someone who knows more than the average person about this topic",
    "high":"Explain it for someone who knows almost anything about this topic."
}

# Define the system message based on the selected role
system_message = {
    "math": "Your name is Mr.C. You can only answer questions about math and physics. All other questions with other topics you have no answer."+act_knowledge[selected_knowledge],
    "code": "Your name is Mr.C. You can only answer questions about coding. All other questions with other topics you have no answer."+act_knowledge[selected_knowledge],
    "translate": "Your name is Mr.C. You can only translate text and words from German to English and from English to German. All other questions with other topics you have no answer."+act_knowledge[selected_knowledge]
}

def ask_gpt(question, chat_log=None):
    """
    Asks a question to the GPT assistant and returns the response.
    
    :param question: The question to ask the assistant.
    :param chat_log: The previous conversation history, as a list of dicts.
    :return: The assistant's response to the question.
    """
    if chat_log is None:
        chat_log = []

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # You can use other models as needed
        messages=[
            {"role": "system", "content": system_message[selected_role]},
        ] + chat_log + [{"role": "user", "content": question}]
    )

    answer = response['choices'][0]['message']['content']
    chat_log.append({"role": "user", "content": question})
    chat_log.append({"role": "assistant", "content": answer})

    return answer, chat_log

# Example usage:
if __name__ == "__main__":
    # Initialize the conversation log
   @app.route('/ask', methods=['POST'])
   def input_prompt():
        question = request.form.get("promptText")
        if question is None or question.lower() == 'exit':
         return jsonify({'response': 'No question provided or exit command received.'})

         response, conversation_log = ask_gpt(question)
         return jsonify({'response': response})

    
    # Ask the assistant a question
@app.route('/first_userinput',methods=['POST'])
def input_prompt():
        while True:
            question=request.form["promptText"]
            #question = input("What's your question? (type 'exit' to quit): ")
            if question.lower() == "exit":
                break
            response, conversation_log = ask_gpt(question, conversation_log)
            print(f"Assistant: {response}")
            return jsonify({'response':response})
app.run(debug=True)