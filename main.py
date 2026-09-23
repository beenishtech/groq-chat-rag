import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

#constant and variable | ALL CAPS

API_KEY = os.getenv("GROQ_API_KEY")
MODEL = os.getenv("GROQ_MODEL", "openai/gpt-oss-20b")
KNOWLEDGE_FILE = "sample_docs/knowledge.txt"

def basic_chat():
    client = Groq(api_key=API_KEY)
    messages = [{"role": "system", "content": "You are a helpful assistant"}]
    
    print("\nBasic Groq Chat")
    print("Type 'exit' to stop.\n")

    while True:
        prompt = input("You: ").strip()
        if not prompt or prompt.lower() in ("exit", "quit"):
            break

        messages.append({"role": "user", "content": prompt})
        response = client.chat.completions.create(
            model=MODEL,
            messages=messages
        )
        reply = response.choices[0].message.content
        messages.append({"role": "assistant", "content": reply})
        print(f"Groq: {reply}\n")

def rag_chat():
    client = Groq(api_key=API_KEY)

    with open(KNOWLEDGE_FILE, encoding="utf-8") as file:
        document = file.read()

    print(f"\nGroq RAG Chat")
    print(f"Using: {KNOWLEDGE_FILE}")
    print("Type 'exit' to stop.\n")

    while True:
        question = input("You: ").strip()
        if not question or question.lower() in ("exit", "quit"):
            break

        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "Answer using only the document below."},
                {
                    "role": "user",
                    "content": f"Document:\n{document}\n\nQuestion: {question}",
                },
            ],
            model=MODEL,
        )
        print(f"Groq: {response.choices[0].message.content}\n")


print("Groq API Demos")
print("1. Basic chat")
print("2. RAG chat")
choice = input("Choose 1 or 2: ").strip()

if choice == "1":
    basic_chat()
elif choice == "2":
    rag_chat()
else:
    print("Invalid choice. Enter 1 or 2.")