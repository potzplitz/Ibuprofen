import openai
from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse as urlparse
from urllib.parse import parse_qs
import json

# Replace 'your-api-key' with your actual OpenAI API key
openai.api_key = 'sk-proj-5jLZmHTAYBQMRuFZdkxwT3BlbkFJsMmRcfD4tCgsqweWzcbI'

# Define a fixed role and knowledge level
def ask_gpt(question, role, knowledge, chat_log=None):
    """
    Asks a question to the GPT assistant and returns the response.
    
    :param question: The question to ask the assistant.
    :param role: The role the assistant should take on.
    :param knowledge: The knowledge level the assistant should assume.
    :param chat_log: The previous conversation history, as a list of dicts.
    :return: The assistant's response to the question.
    """
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
        "translate": f"Your name is Mr.C. You can only translate stuff. {act_knowledge[knowledge]}"
    }

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # You can use other models as needed
        messages=[
            {"role": "system", "content": system_message.get(role, system_message["code"])},
        ] + chat_log + [{"role": "user", "content": question}]
    )

    answer = response['choices'][0]['message']['content']
    chat_log.append({"role": "user", "content": question})
    chat_log.append({"role": "assistant", "content": answer})

    return answer, chat_log

class RequestHandler(BaseHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        self.conversation_log = [{"role": "system", "content": "Welcome to the assistant service. Please specify your question, role, and knowledge level."}]
        super().__init__(*args, **kwargs)

    def do_GET(self):
        # Parse the query parameters
        url = urlparse.urlparse(self.path)
        query_params = parse_qs(url.query)

        question = query_params.get('question', [None])[0]
        role = query_params.get('role', ['code'])[0]  # Default to 'code' if not provided
        knowledge = query_params.get('knowledge', ['average'])[0]  # Default to 'average' if not provided

        if question is None:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')  # CORS header
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'No question provided'}).encode())
            return

        # Get the response from OpenAI
        response, self.conversation_log = ask_gpt(question, role, knowledge, self.conversation_log)

        response_data = {'response': response}
        response_json = json.dumps(response_data)
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')  # CORS header
        self.end_headers()
        self.wfile.write(response_json.encode())

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
