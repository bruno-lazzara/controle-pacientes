import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Sessoes from "./pages/Sessoes";
import Header from './components/Header';

function AppRouter() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/admin' element={<Header />}>
            <Route path='sessoes' element={<Sessoes />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}

export default AppRouter;