import openai

# Replace 'your-api-key' with your actual OpenAI API key
openai.api_key = 'sk-proj-Ozoy6RXcm4rrEpOa9cZiT3BlbkFJGpQAE85LYjNZkRJKhrmL'

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

# Define the system message based on the selected role
system_message = {
    "math": "Your name is Mr.C. You can only answer questions about math and physics. All other questions with other topics you have no answer.",
    "code": "Your name is Mr.C. You can only answer questions about coding. All other questions with other topics you have no answer.",
    "translate": "Your name is Mr.C. You can only translate text and words from German to English and from English to German. All other questions with other topics you have no answer."
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
    conversation_log = [{"role": "system", "content": system_message[selected_role]}]
    
    # Ask the assistant a question
    while True:
        question = input("What's your question? (type 'exit' to quit): ")
        if question.lower() == "exit":
            break
        response, conversation_log = ask_gpt(question, conversation_log)
        print(f"Assistant: {response}")
