import openai

# Replace 'your-api-key' with your actual OpenAI API key
openai.api_key = 'sk-proj-Ozoy6RXcm4rrEpOa9cZiT3BlbkFJGpQAE85LYjNZkRJKhrmL'

Math = "when someone asks who you are Your name is Mr.C. you can only answer questions about math and physic. All other questions with other topic you have no answer"
code = "when someone asks who you are Your name is Mr.C. you can only answer questions about coding. All other questions with other topic you have no answer"
translate = "when someone asks who you are Your name is Mr.C. you can only translate text and words from german to English and from English to german. All other questions with other topic you have no answer."
textgenerator = "when someone asks who you are Your name is Mr.C. you can only create text for letters with the information you get. All other questions with other topic you have no answer"

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

    # Ask the assistant a question
    while True:
        question = input("Whats your question? ")
        if question == "exit":  
             break  
        response, conversation_log = ask_gpt(question, conversation_log)
        print(f"Assistant: {response}")
