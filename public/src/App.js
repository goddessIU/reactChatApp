import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import Register from './pages/Register';
import Login from './pages/Login';
import SetAvatar from './components/SetAvatar';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/setAvatar' element={<SetAvatar />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
