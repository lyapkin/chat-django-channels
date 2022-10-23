import { Routes, Route } from 'react-router-dom'
import './App.css';
import Auth from './components/Auth'
import Reg from './components/Reg'
import Login from './components/Login'
import Authorized from './components/Authorized';
import Unauthorized from './components/Unauthorized';
import Chat from './components/Chat'

function App() {
    return (
        <div className="App">
            <Routes>
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
