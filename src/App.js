import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import MainPage from './pages/MainPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="/doctors" element={<MainPage />} />
      </Route>
    </Routes>
  );
}

export default App;
