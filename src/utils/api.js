import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// ✅ Fetch logged-in user data
export const fetchUserData = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Upload a PDF
export const uploadPDF = async (file, token) => {
  const formData = new FormData();
  formData.append("pdf", file);

  const res = await axios.post(`${API_BASE_URL}/pdf/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// ✅ Fetch all PDFs
export const fetchPDFs = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/pdf`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
