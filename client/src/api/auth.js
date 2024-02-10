const defaultHeaders = {
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
};

//register user
export const createUserAPIMethod = (user) => {
  const response = fetch("http://localhost:3001/api/auth/register", {
    ...defaultHeaders,
    method: "POST",
    body: JSON.stringify(user),
  });
  return response;
};

//login user
export const loginUserAPIMethod = async (user) => {
  const response = await fetch("http://localhost:3001/api/auth/login", {
    ...defaultHeaders,
    method: "POST",
    body: JSON.stringify(user),
  });

  return response;
};