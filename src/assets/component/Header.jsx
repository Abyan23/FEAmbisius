import { useState, useEffect } from "react";
import { getProfile } from "../../services/auth";

export default function Header({ onLogout, goPage }){
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({ name: 'Loading...', email: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const data = await getProfile();
            setUser({
                name: data.data?.name || data.name || 'User',
                email: data.data?.email || data.email || ''
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
            setUser({ name: 'User', email: '' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full bg-amber-400 justify-between items-center p-4 shadow-md">
            <h1 className="text-xl font-bold text-gray-800">Mini Quiz Ambis</h1>
            <div className="relative">
                <button 
                    onClick={() => setOpen(!open)}
                    disabled={loading}
                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                        {loading ? '...' : user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                        {loading ? 'Loading...' : user.name}
                    </span>
                    <svg 
                        className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {open && (
                    <>
                        <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setOpen(false)}
                        />
                        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-xl overflow-hidden z-20">
                            <div className="px-4 py-3 border-b bg-gray-50">
                                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    goPage && goPage("quiz"); // redirect ke menu quiz
                                }}
                                className="block w-full text-left px-4 py-2.5 hover:bg-gray-100 text-sm transition-colors"
                            >
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.84 6.844L12 14z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7" />
                                    </svg>
                                    Quiz
                                </span>
                            </button>
                            <button 
                                onClick={() => {
                                    setOpen(false);
                                    goPage && goPage('profile');
                                }}
                                className="block w-full text-left px-4 py-2.5 hover:bg-gray-100 text-sm transition-colors">
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Profile
                                </span>
                            </button>
                            <button 
                                onClick={() => {
                                    setOpen(false);
                                    goPage && goPage("history-quiz"); 
                                }}
                                className="block w-full text-left px-4 py-2.5 hover:bg-gray-100 text-sm transition-colors"
                            >
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    History
                                </span>
                            </button>

                            <div className="border-t">
                                <button 
                                    onClick={async () => {
                                        setOpen(false);
                                        await onLogout();
                                    }}
                                    className="block w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 text-sm font-medium transition-colors">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </span>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
