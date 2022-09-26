import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import MainPage from './pages/MainPage';
import NewDoctor from './pages/NewDoctor';
import Doctor from './pages/Doctor';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="/doctors" element={<MainPage />} />
        <Route path="/doctors/new" element={<NewDoctor />} />
        <Route path="/doctors/:id" element={<Doctor />} />
      </Route>
    </Routes>
  );
}

export default App;
