import { useState } from 'react'
import Header from './assets/component/header'
import Login from './pages/login'
import Register from './pages/register'

function App() {
  const [page, setPage] = useState('login');
  return(
    <>
      {page === 'login' && (
        <Login 
        onLogin={() => setPage("quiz")}
        goRegister={() => setPage ('register')}
        />
      )}
      {page === 'register' && (
        <Register goLogin={() => setPage('login')}
        /> 
      )}

      {page === 'quiz' && (
        <h1 className=''>Halaman Quiz</h1>
      ) }
    </>
  )
}

export default App;
