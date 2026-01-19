import { useState } from "react"
import { verifyEmail } from "../services/auth";
import toast from "react-hot-toast";

export default function VerifyEmail({ goLogin }){
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const pendingEmail = localStorage.getItem('pendingEmail') || '';

    const handleVerify = async () => {
        if (!token) {
            toast.error('Masukkan kode verifikasi!');
            return;
        }

        setLoading(true);

        try {
            const res = await verifyEmail(token);
            toast.success('Email berhasil diverifikasi! Silakan login.');
            localStorage.removeItem('pendingEmail');
            goLogin();
        } catch (err) {
            toast.error(err.message || 'Verifikasi gagal!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white w-96 p-8 border border-gray-200 rounded-xl shadow-lg">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Verifikasi Email</h1>
                    <p className="text-sm text-gray-600 mt-2">
                        Kami telah mengirim kode verifikasi ke
                    </p>
                    <p className="text-sm font-medium text-blue-600">{pendingEmail}</p>
                </div>
                
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Kode Verifikasi
                        </label>
                        <input 
                            type="text" 
                            className="w-full h-12 border border-gray-300 px-3 rounded-lg text-center text-lg font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="XXXXXX"
                            value={token} 
                            onChange={(e) => setToken(e.target.value)}
                        />
                    </div>
                    
                    <button 
                        onClick={handleVerify}
                        disabled={loading} 
                        className={`w-full h-11 text-white font-medium rounded-lg transition-colors ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}>
                        {loading ? 'Memverifikasi...' : 'Verifikasi'}
                    </button>

                    <div className="text-center mt-2">
                        <button 
                            onClick={goLogin} 
                            className="text-sm text-gray-600 hover:text-gray-800">
                            Kembali ke Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}