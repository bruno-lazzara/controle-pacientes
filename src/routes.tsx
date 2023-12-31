import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Sessoes from "./pages/Sessoes";
import Header from './components/Header';
import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';
import Pacientes from './pages/Pacientes';
import FormPaciente from './pages/Pacientes/FormPaciente';
import Parametros from './pages/Parametros';
import FormParametro from './pages/Parametros/FormParametro';

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
                <Route path='pacientes/novo' element={<FormPaciente />} />
                <Route path='pacientes/:id' element={<FormPaciente />} />

                <Route path='parametros' element={<Parametros />} />
                <Route path='parametros/:id' element={<FormParametro />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </RecoilRoot>
    </main>
  );
}

export default AppRouter;