import { useState } from "react"
import { registerUser } from "../services/auth";
import toast from "react-hot-toast";

export default function Register({ goLogin, goVerify }){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            toast.error('all fields must be filled in!');
            return;
        }

        setLoading(true);

        try {
            await registerUser(name, email, password);
            toast.success('Success');
            
            // Simpan email untuk halaman verifikasi
            localStorage.setItem('pendingEmail', email);
            
            // Pindah ke halaman verify
            goVerify();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white w-96 p-8 border border-gray-200 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h1>
                
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input 
                            type="text" 
                            className="w-full h-10 border border-gray-300 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Your Name"
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

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
                        <p className="text-xs text-gray-500 mt-1">Min. 8 characters, use letters, numbers and special characters (!,@,#,$,%)</p>
                    </div>
                    
                    <button 
                        onClick={handleRegister}
                        disabled={loading} 
                        className={`w-full h-11 text-white font-medium rounded-lg mt-2 transition-colors ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}>
                        {loading ? 'Loading...' : 'Register'}
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">Sudah punya akun?{' '}
                            <button 
                                onClick={goLogin} 
                                className="text-blue-600 font-medium hover:underline">
                                Login
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}