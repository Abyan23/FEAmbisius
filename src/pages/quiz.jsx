import { useEffect, useState } from "react";
import { getSubtests, startQuiz, getActiveQuiz } from "../services/auth";
import toast from "react-hot-toast";

export default function Quiz({ goPage, setActiveQuiz }) {
  const [subtests, setSubtests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startingQuizId, setStartingQuizId] = useState(null);

  useEffect(() => {
    fetchSubtests();
  }, []);

  const fetchSubtests = async () => {
    setLoading(true);
    try {
      const res = await getSubtests();
      setSubtests(res.data || []);
    } catch (err) {
      toast.error(err.message || "Gagal memuat subtests.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = async (subtestId) => {
    setStartingQuizId(subtestId);
    try {
      const res = await startQuiz(subtestId);

      if (res.success) {
        toast.success(`Quiz "${res.data.subtest_name}" dimulai!`);
        setActiveQuiz && setActiveQuiz(res.data);
        goPage && goPage("active-quiz");
      }
    } catch (err) {
      console.error(err);

      if (err.message.includes("409") || err.message.includes("Active quiz exists")) {
        if (window.confirm("Sesi aktif ditemukan! Lanjutkan sesi sebelumnya?")) {
          const active = await getActiveQuiz();
          setActiveQuiz && setActiveQuiz(active.data);
          goPage && goPage("active-quiz");
        }
      } else {
        toast.error(err.message || "Gagal memulai quiz.");
      }
    } finally {
      setStartingQuizId(null);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading subtests...</p>;
  if (!subtests.length) return <p className="text-center mt-10">Tidak ada subtests tersedia.</p>;

  return (
    <div className="flex flex-col items-center mt-5">
      <h1 className="text-2xl font-bold mb-5">Subtest Tersedia</h1>
      <div className="flex flex-col gap-3 w-full max-w-md">
        {subtests.map((sub) => (
          <button
            key={sub.id}
            onClick={() => handleStartQuiz(sub.id)}
            disabled={startingQuizId === sub.id}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {startingQuizId === sub.id ? "Memulai..." : sub.name}
          </button>
        ))}
      </div>
    </div>
  );
}
