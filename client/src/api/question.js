const defaultHeaders = {
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
};

// CREATING A QUESTION
export const createQuestionAPIMethod = (question) => {
  const response = fetch("http://localhost:3001/api/questions/createQuestion", {
    ...defaultHeaders,
    method: "POST",
    body: JSON.stringify(question),
  });
  return response;
};