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

// GETTING RECOMMENDATION
export const getRecommendationAPIMethod = (age, description) => {
  console.log(age, description);
  const response = fetch(`http://localhost:3001/run-python/${age}/${description}`, {
    ...defaultHeaders,
    method: "GET",
  });
  return response;
};

// UPDATE A QUESTION
export const updateQuestionAPIMethod = (questionId, recList) => {
  return fetch(
    `http://localhost:3001/api/questions/updateQuestion/${questionId}`,
    {
      ...defaultHeaders,
      method: "PUT", // The method defaults to GET
      body: JSON.stringify(recList),
    }
  );
};