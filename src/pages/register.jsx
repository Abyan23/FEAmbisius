import { useState } from "react"

export default function Register({ goLogin }){
    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const handleRegister = () => {
        setLoading(true);
        setError('');
        setTimeout(() =>{
            setLoading(false);
            setError('register gagal (contoh error)');
        }, 2000)
        // console.log(name);
        // console.log(email);
    };

    return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="bg-[#FCF8F8] w-96 text-center border-2 border-gray-400 rounded-lg">
        <h1 className="text-2xl font-bold m-5">Register</h1>
        <div className="flex flex-col items-center">
            <input type="Nama" label="Name" className="h-7 w-xs border p-1 rounded m-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="Email" label="email" className="h-7 w-xs border p-1 rounded m-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="Password" label="Password" className="h-7 w-xs border p-1 rounded m-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            
            <button 
            onClick={handleRegister}
            disabled={loading} 
            className="text-md text-white rounded-lg cursor-pointer bg-blue-900 w-32 p-0.5 m-3">
                {loading ? 'Loading' : 'Daftar'}
            </button>

            <p className="text-xs">Sudah Punya Akun ?</p>
            
            <button onClick={goLogin} className="text-md text-green-600 border-1 border-green-600 rounded-lg cursor-pointer w-32 p-0.5 m-3">Login</button>
        
        </div>
    </div>
    </div>
    )
}