import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Landing from './pages/landing';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
      </Route>
    </Routes>
  );
}

export default App;
