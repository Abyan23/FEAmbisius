import { useEffect, useState } from "react";
import { getQuizHistory } from "../services/auth";
import toast from "react-hot-toast";

export default function HistoryQuiz() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await getQuizHistory();
      setHistory(res.data.results || []); // <--- PENTING: ambil results
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Gagal memuat history quiz");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading history...</p>;
  if (!history.length) return <p className="text-center mt-10">Belum ada history quiz.</p>;

  return (
    <div className="flex justify-center p-5">
      <div className="w-full max-w-3xl bg-[#FCF8F8] border-2 border-gray-400 rounded-lg p-5">
        <h1 className="text-2xl font-bold mb-5">History Quiz</h1>
        <ul className="space-y-3">
          {history.map((item) => (
            <li key={item.id} className="border p-3 rounded bg-white shadow">
              <p><strong>Subtest:</strong> {item.subtest_name}</p>
              <p><strong>Score:</strong> {item.score} / {item.total_questions} ({item.percentage}%)</p>
              <p><strong>Correct Answers:</strong> {item.correct_answers}</p>
              <p><strong>Total Time:</strong> {item.total_time_seconds} sec</p>
              <p><strong>Completed At:</strong> {new Date(item.completed_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
