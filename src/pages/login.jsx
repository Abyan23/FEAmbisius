import { useState } from "react"
import { loginUser } from "../services/auth";
import toast, { ToastBar } from "react-hot-toast";

export default function Login({goQuiz, goRegister}){
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await loginUser (email, password);
            
            localStorage.setItem("access_token", res.data.access_token);
            localStorage.setItem("refresh_token", res.data.refresh_token);          

            toast.success('Berhasil Login')
            goQuiz();
        } catch (err){
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white w-96 p-8 border border-gray-200 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>
                
                <div className="flex flex-col gap-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            type="email" 
                            className="w-full h-10 border border-gray-300 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="email@example.com"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            className="w-full h-10 border border-gray-300 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder=""
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <button 
                        onClick={handleLogin}
                        disabled={loading} 
                        className={`w-full h-11 text-white font-medium rounded-lg mt-2 transition-colors ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}>
                        {loading ? 'Loading' : 'Login'}
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">already have an account?{' '}
                            <button 
                                onClick={goRegister} 
                                className="text-blue-600 font-medium hover:underline">
                                Register
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}