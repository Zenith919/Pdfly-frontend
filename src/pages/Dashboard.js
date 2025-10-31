import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchPDFs, uploadPDF } from "../utils/api";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [pdfs, setPdfs] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch all user PDFs on load
  useEffect(() => {
    const loadPDFs = async () => {
      try {
        const data = await fetchPDFs(token);
        setPdfs(data);
      } catch (err) {
        console.error("Error fetching PDFs:", err);
        setMessage("❌ Failed to load PDFs.");
      } finally {
        setLoading(false);
      }
    };

    if (token) loadPDFs();
  }, [token]);

  // Handle file upload
  const handleUpload = async () => {
    if (!file) return setMessage("Please select a file first!");
    try {
      const uploaded = await uploadPDF(file, token);
      setPdfs((prev) => [...prev, uploaded]);
      setMessage("✅ File uploaded successfully!");
    } catch (err) {
      setMessage("❌ Upload failed. Try again.");
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading your dashboard...</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="pt-24 px-6 md:px-10">
        <h2 className="text-2xl font-semibold mb-2">
          Welcome, {user?.name || "User"} 👋
        </h2>
        <p className="mb-4 text-sm text-gray-500">{message}</p>

        {/* Upload section */}
        <div className="flex flex-col md:flex-row items-center gap-3 mb-8">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-auto"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Upload PDF
          </button>
        </div>

        {/* PDF list */}
        <h3 className="text-xl font-medium mb-3">Your Uploaded PDFs</h3>
        {pdfs.length > 0 ? (
          <ul className="space-y-2">
            {pdfs.map((pdf) => (
              <li key={pdf._id || pdf.name}>
                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {pdf.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No PDFs uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
