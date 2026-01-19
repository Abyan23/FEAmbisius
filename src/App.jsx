import { useState } from "react";
import Header from "./assets/component/header";
import Login from "./pages/login";
import Register from "./pages/register";
import Quiz from "./pages/quiz";
import ActiveQuiz from "./pages/activequiz";
import Profile from "./pages/profile";
import HistoryQuiz from "./pages/history";
import { logoutUser } from "./services/auth";
import toast from "react-hot-toast";

function App() {
  const [page, setPage] = useState("login");
  const [activeQuiz, setActiveQuiz] = useState(null);

  // Handler logout async
  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      if (res.success) {
        localStorage.removeItem("access_token");
        toast.success("Logout berhasil!");
        setPage("login");
      } else {
        toast.error(res.error?.message || "Logout gagal");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Logout gagal");
    }
  };

  return (
    <>
      {(page === "quiz" || page === "active-quiz" || page === "history-quiz" || page === "profile") && (
        <Header onLogout={handleLogout} goPage={setPage} />
      )}

      {page === "login" && (
        <Login
          goQuiz={() => setPage("quiz")}
          goRegister={() => setPage("register")}
        />
      )}

      {page === "register" && <Register goLogin={() => setPage("login")} />}

      {page === "quiz" && <Quiz goPage={setPage} setActiveQuiz={setActiveQuiz} />}

      {page === "active-quiz" && (
        <ActiveQuiz goPage={setPage} activeQuiz={activeQuiz} />
      )}

      {page === "history-quiz" && <HistoryQuiz />}

      {page === "profile" && <Profile />}
    </>
  );
}

export default App;
