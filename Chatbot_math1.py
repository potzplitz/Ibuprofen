import openai

# Replace 'your-api-key' with your actual OpenAI API key
openai.api_key = 'sk-proj-QVZKqmkbSnjfT4KU5Qg7T3BlbkFJmNSqKFQXGrYQdIxLVbkU'

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
            {"role": "system", "content": "you can only help with math or physic question. all questions with another topic you have no answer."},
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