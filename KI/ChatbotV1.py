import openai

# Replace 'your-api-key' with your actual OpenAI API key
openai.api_key = 'sk-proj-Ozoy6RXcm4rrEpOa9cZiT3BlbkFJGpQAE85LYjNZkRJKhrmL'

Math = "when someone asks who you are Your name is Mr.C. you can only answer questions about math and physic. All other questions with other topic you have no answer"
code = "when someone asks who you are Your name is Mr.C. you can only answer questions about coding. All other questions with other topic you have no answer"
translate = "when someone asks who you are Your name is Mr.C. you can only translate text and words from german to English and from English to german. All other questions with other topic you have no answer."

def ask_gpt(question, chat_log=None, role="math"):
    """
    Asks a question to the GPT assistant and returns the response.
    
    :param question: The question to ask the assistant.
    :param chat_log: The previous conversation history, as a list of dicts.
    :param role: The role to be used for the system message.
    :return: The assistant's response to the question.
    """
    if chat_log is None:
        chat_log = []

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # You can use other models as needed
        messages=[
            {"role": "system", "content": Math},
        ] + chat_log + [{"role": "user", "content": question}]
    )

    answer = response['choices'][0]['message']['content']
    chat_log.append({"role": "user", "content": question})
    chat_log.append({"role": "assistant", "content": answer})

    return answer, chat_log

# Example usage:
if __name__ == "__main__":
    # Initialize the conversation log
    conversation_log = []

    # Ask the user to select a role
    print("Select a role:")
    print("1: Math")
    print("2: Code")
    print("3: Translate")
    print("4: TextGenerator")
    role_choice = input("Enter the number of your choice: ")

    if role_choice == "1":
        selected_role = "math"
    elif role_choice == "2":
        selected_role = "code"
    elif role_choice == "3":
        selected_role = "translate"
    elif role_choice == "4":
        selected_role = "textgenerator"
    else:
        print("Invalid choice, defaulting to Math")
        selected_role = "math"

    # Ask the assistant a question
    while True:
        question = input("What's your question? (type 'exit' to quit): ")
        if question.lower() == "exit":
            break
        response, conversation_log = ask_gpt(question, conversation_log, selected_role)
        print(f"Assistant: {response}")
