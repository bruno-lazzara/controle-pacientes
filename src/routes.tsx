import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Sessoes from "./pages/Sessoes";
import Header from './components/Header';
import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';
import Pacientes from './pages/Pacientes';

function AppRouter() {
  return (
    <main>
      <RecoilRoot>
        <Router>
          <Suspense fallback='Carregando...'>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/admin' element={<Header />}>
                <Route path='sessoes' element={<Sessoes />} />
                <Route path='pacientes' element={<Pacientes />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </RecoilRoot>
    </main>
  );
}

export default AppRouter;