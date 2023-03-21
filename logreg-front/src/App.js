import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import Auth from './components/auth/Auth'
import Reg from './components/auth/Reg'
import Login from './components/auth/Login'
import Authorized from './components/Authorized';
import Unauthorized from './components/auth/Unauthorized';
import Chat from './components/chat/Chat'
import useAuth from './hooks/useAuth';

function App() {
    const auth = useAuth()

    const elem = auth.is_authenticated ? <Navigate to='chat' replace /> : <Navigate to='auth' replace />
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<Navigate to='chat' replace />} />

                <Route element={<Unauthorized />}>
                    <Route path='auth' element={<Auth />}>
                        <Route path='reg' element={<Reg />} />
                        <Route path='login' element={<Login />} />
                    </Route>
                </Route>

                <Route element={<Authorized />}>
                    <Route path='chat' element={<Chat />} >
                        <Route path=':connectionUserId' element={null} />
                    </Route>
                </Route>
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
