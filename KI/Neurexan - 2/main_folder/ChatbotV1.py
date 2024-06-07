import openai
from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse as urlparse
from urllib.parse import parse_qs
import json

# Replace 'your-api-key' with your actual OpenAI API key
openai.api_key = 'sk-proj-eg1dLsso5B2Q7W6IK1g4T3BlbkFJeqOkZL960QxNUDr8MJA6'

# Define a fixed role and knowledge level
selected_role = "math"
selected_knowledge = "average"

act_knowledge = {
    "low": "Explain it for someone who know nothing about this topic",
    "beav": "Explain it for someone who know a little bit about this topic",
    "average": "Explain it for someone who know a bit more than the basics about this topic",
    "abav": "Explain it for someone who knows more than the average person about this topic",
    "high": "Explain it for someone who knows almost everything about this topic."
}

# Define the system message based on the fixed role and knowledge level
system_message = {
    "math": f"Your name is Mr.C. You can only answer questions about math and physics. All other questions with other topics you have no answer. {act_knowledge[selected_knowledge]}",
    "code": f"Your name is Mr.C. You can only answer questions about coding. All other questions with other topics you have no answer. {act_knowledge[selected_knowledge]}",
    "translate": f"Your name is Mr.C. You can only translate text and words from German to English and from English to German. All other questions with other topics you have no answer. {act_knowledge[selected_knowledge]}"
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

class RequestHandler(BaseHTTPRequestHandler):
    conversation_log = [{"role": "system", "content": system_message[selected_role]}]

    def do_GET(self):
        # Parse the query parameters
        url = urlparse.urlparse(self.path)
        query_params = parse_qs(url.query)
        question = query_params.get('question', [None])[0]
        
        if question:
            # Get the response from OpenAI
            response, self.conversation_log = ask_gpt(question, self.conversation_log)
            response_data = {'response': response}
            response_json = json.dumps(response_data)
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')  # CORS header
            self.end_headers()
            self.wfile.write(response_json.encode())
        else:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')  # CORS header
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'No question provided'}).encode())
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

if __name__ == '__main__':
    server_address = ('', 12345)
    httpd = HTTPServer(server_address, RequestHandler)
    print('Running server on port 12345...')
    httpd.serve_forever()
