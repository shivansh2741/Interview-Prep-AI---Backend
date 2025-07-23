export const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (`
You are an AI interview preparation assistant.

Task:
Generate a list of important technical interview questions **with detailed answers** based on the following input:

- Role: ${role}
- Experience: ${experience} years
- Topics to Focus: ${topicsToFocus} (comma-separated)
- Number of Questions: ${numberOfQuestions}

Requirements:
- Each answer should be beginner-friendly and technically accurate.
- Include code examples where necessary.
- Return only valid JSON.
- Keep it a bit concise only as this is just a overview, if user wants more detail regarding this question they can explore later.

Respond in the following format:
[
  {
    "question": "First question here",
    "answer": "Answer to the first question"
  },
  {
    "question": "Second question here",
    "answer": "Answer to the second question"
  }
  // up to ${numberOfQuestions} questions total
]

Important: Do NOT include any extra commentary or markdown. Only return clean JSON output.
`);

export const conceptExplainingPrompt = (question) => (`You are an expert technical educator.

Task:
Explain the following interview question and the concept behind it in depth, in a beginner-friendly way.

- Question: ${question}

Requirements:
- Break down the concept clearly with real-world analogies or examples.
- Add code blocks if necessary.
- End the response with a title that summarizes the concept in a crisp, meaningful way.
- Return only valid JSON.

Respond in the following format:
{
  "title": "Concept Title",
  "explanation": "In-depth explanation with examples and clarity."
}

Important: Do NOT include any extra text, markdown, or comments. Only return clean JSON.
`);
