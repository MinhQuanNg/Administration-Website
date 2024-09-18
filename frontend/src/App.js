import './App.css';
import Dashboard from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register/Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './routing/ProtectedRoute';
import { Test } from './test';

import 'dayjs/locale/vi';


function App() {
  return (
    <Router>
      <main className="App">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/test' element={<Test />} />
          <Route element={<ProtectedRoute />}>
              <Route path='/dashboard' element={<Dashboard section="dossier"/>} />
              <Route path='/mytasks' element={<Dashboard section="mytasks"/>} />
              <Route path='/settings' element={<Dashboard section="settings" />} />
          </Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
