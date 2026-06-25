import './ColorPicker';
import './App.css';
import WelcomePage from './componenets/WelcomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './componenets/AppLayout';
import SignupPage from './componenets/SignupPage';
import LoginPage from './componenets/LoginPage';
import Dashboard from './componenets/dashboard/Dashboard';
import GroupPage from './componenets/groups/GroupPage';
import ProtectedRoute from './componenets/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} >
          </Route>
          <Route path='groups' element={<ProtectedRoute><GroupPage /></ProtectedRoute>} >
          </Route>
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
