from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)

# Load dataset
df = pd.read_csv("faq.csv")

# Load model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Precompute embeddings
question_embeddings = model.encode(df["question"].tolist())

def get_answer(user_input):
    user_embedding = model.encode([user_input])

    similarity = cosine_similarity(user_embedding, question_embeddings)
    index = similarity.argmax()

    score = similarity[0][index]

    if score < 0.4:
        return "I'm not fully sure, but I can help with questions about my skills, projects, or experience."

    return df["answer"][index]

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_input = data.get("message")

    response = get_answer(user_input)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)