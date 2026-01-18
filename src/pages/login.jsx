import { useState } from "react"

export default function Login({onLogin, goRegister}){
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setLoading(true);
        setError("");

        try{
            const res = await fetch ("/auth/login", {
                method:"POST",
                headers:{
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            if (!res.ok){
                throw new error ("Login Gagal");
            }
            const data = await res.json();
            console.log("login sukses", data);

            onLogin(data);
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false);
        }
    }

    return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="bg-[#FCF8F8] w-96 text-center border-2 border-gray-400 rounded-lg">
        <h1 className="text-2xl font-bold m-5">Login</h1>
        <div className="flex flex-col items-center">
            <input type="email" label="email" className="h-7 w-xs border p-1 rounded m-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <input type="password" label="email" className="h-7 w-xs border p-1 rounded m-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            
            <button 
            onClick={handleLogin} 
            className={`text-md text-white rounded-lg cursor-pointer w-32 p-0.5 m-3
            ${loading ? 'bg-gray-500' : 'bg-blue-600'}`}>    
            {loading ? 'loading...' : 'login'}
            </button>
            
            <p className="text-xs">Belum punya akun ?</p>
            <button onClick={goRegister}className="text-md text-green-600 border-1 border-green-600 rounded-lg cursor-pointer w-32 p-0.5 m-3">Daftar</button>
        </div>
    </div>
    </div>
    )
}