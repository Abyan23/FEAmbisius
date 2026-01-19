import { useEffect, useState, useRef } from "react";
import { getActiveQuiz, submitQuiz } from "../services/auth";
import toast from "react-hot-toast";

export default function ActiveQuiz({ goPage }) {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null); 
  const timerRef = useRef(null);

  useEffect(() => {
    fetchActiveQuiz();
    return () => clearInterval(timerRef.current);
  }, []);

  const fetchActiveQuiz = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getActiveQuiz();
      setQuiz(data.data);

      const expiresAt = new Date(data.data.expires_at).getTime();
      const now = Date.now();
      const diffSec = Math.max(Math.floor((expiresAt - now) / 1000), 0);
      setTimeLeft(diffSec);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (err) {
      console.error(err);
      setError(err.message || "Gagal memuat quiz aktif.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnswer = (questionNumber, option) => {
    setAnswers((prev) => ({ ...prev, [questionNumber]: option }));
  };

  const handleSubmit = async () => {
    if (!quiz) return;
    if (timeLeft <= 0) {
      toast.error("Waktu habis. Quiz sudah expired.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {};
      Object.entries(answers).forEach(([key, value]) => {
        payload[key] = value; 
      });

      const res = await submitQuiz(payload);

      if (res.success) {
        toast.success("Jawaban berhasil dikirim!");
        goPage && goPage("quiz");
      } else {
        toast.error(res.error?.message || "Gagal submit quiz");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Gagal submit quiz");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading) return <p className="text-center mt-10">Loading quiz...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!quiz) return <p className="text-center mt-10">Tidak ada quiz aktif.</p>;

  const currentQuestion = quiz.questions[currentIndex];

  return (
    <div className="flex justify-center items-start min-h-screen p-5">
      <div className="bg-[#FCF8F8] w-full max-w-2xl border-2 border-gray-400 rounded-lg p-5">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">{quiz.subtest_name}</h1>
          <span className={`font-bold ${timeLeft <= 0 ? "text-red-600" : "text-blue-600"}`}>
            {timeLeft <= 0 ? "Expired" : formatTime(timeLeft)}
          </span>
        </div>

        <p className="mb-3 text-gray-700">
          Question {currentQuestion.question_number} / {quiz.questions.length}
        </p>

        <div className="mb-5">
          <p className="font-medium mb-3">{currentQuestion.question_text}</p>
          <ul className="space-y-2">
            {currentQuestion.options.map((opt, idx) => (
              <li key={idx}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`q${currentQuestion.question_number}`}
                    value={String.fromCharCode(65 + idx)}
                    checked={answers[currentQuestion.question_number] === String.fromCharCode(65 + idx)}
                    onChange={() => handleSelectAnswer(currentQuestion.question_number, String.fromCharCode(65 + idx))}
                    className="accent-blue-500"
                    disabled={timeLeft <= 0}
                  />
                  <span>{opt}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between mt-5">
          <button
            onClick={() => setCurrentIndex((i) => i - 1)}
            disabled={currentIndex === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
          >
            Previous
          </button>

          {currentIndex < quiz.questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex((i) => i + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting || timeLeft <= 0}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              {submitting ? "Submitting..." : "Submit Quiz"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
