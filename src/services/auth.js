

// export const registerUser = async (name, email, password) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (!email.includes("@")) {
//         reject(new Error("Email tidak valid"));
//       }

//       resolve({
//         message: "Verification email sent"
//       });
//     }, 1000);
//   });
// };

// export const loginUser = async (email, password) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (password.length < 6) {
//         reject(new Error("Password salah"));
//       }

//       resolve({
//         token: "mock-jwt-token-123",
//         user: {
//           id: 1,
//           name: "Mock User",
//           email
//         }
//       });
//     }, 1000);
//   });
// };

const BASE_URL = '/api/v1';

// Helper function untuk handle error
const handleResponse = async (res) => {
  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.error?.details || data?.error?.message || 'Request failed');
  }

  return data;
};

// Helper function untuk get token
const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// ============ AUTH ============

export const registerUser = async (name, email, password) => {
  const payload = { name, email, password };

  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};

export const loginUser = async (email, password) => {
  const payload = { email, password };

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};

export const verifyEmail = async (token) => {
  const res = await fetch(`${BASE_URL}/auth/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  return handleResponse(res);
};

export const logoutUser = async () => {
    const res = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: getAuthHeaders(),
    });
    return handleResponse(res);
};


// ============ PROFILE ============

export const getProfile = async () => {
  const res = await fetch(`${BASE_URL}/auth/profile`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
};

export const updateProfile = async (name, email) => {
  const payload = { name, email };

  const res = await fetch(`${BASE_URL}/auth/profile`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};

export const changePassword = async (oldPassword, newPassword) => {
  const payload = { 
    old_password: oldPassword, 
    new_password: newPassword 
  };

  const res = await fetch(`${BASE_URL}/auth/change-password`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};

// ============ QUIZ ============

export const getSubtests = async () => {
  const res = await fetch(`${BASE_URL}/subtests`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
};

export const startQuiz = async (subtestId) => {
  const res = await fetch(`${BASE_URL}/quiz/start/${subtestId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
};

export const getActiveQuiz = async () => {
  const res = await fetch(`${BASE_URL}/quiz/active`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
};

export const submitQuiz = async (answers) => {
  const res = await fetch(`${BASE_URL}/quiz/submit`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({answers}), 
  });

  return handleResponse(res);
};


// ============ HISTORY ============

export const getQuizHistory = async (limit = 10, offset = 0) => {
  const res = await fetch(`${BASE_URL}/quiz/history?limit=${limit}&offset=${offset}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
};

export const getQuizResult = async (sessionId) => {
  const res = await fetch(`${BASE_URL}/quiz/result/${sessionId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(res);
};