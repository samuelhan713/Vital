const defaultHeaders = {
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
};

// GET ALL QUESTIONS BY USERID
export const getMyQuestionsAPIMethod = (currentUserId) => {
  const res = fetch(
    `http://localhost:3001/api/questions/myQuestions/${currentUserId}`,
    {
      ...defaultHeaders,
      method: "GET",
    }
  );
  return res;
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
export const updateQuestionAPIMethod = (questionId, rec_list) => {
  return fetch(
    `http://localhost:3001/api/questions/updateQuestion/${questionId}`,
    {
      ...defaultHeaders,
      method: "PUT", // The method defaults to GET
      body: JSON.stringify(rec_list),
    }
  );
};