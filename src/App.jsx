import { Routes, Route } from 'react-router-dom';
import { Start } from './pages/Start';
import Onboarding from './pages/Onboarding/Onboarding';
import InputShopInfo from './pages/Curation/InputShopInfo';
import MainLayout from './layout/MainLayout';
import Test from './pages/Curation/Test';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />

      {/* MainLayout 상속받는 그룹*/}
      <Route element={<MainLayout />}>
        <Route path="shopinfo" element={<InputShopInfo />} />
        <Route path="test" element={<Test />} />
      </Route>
    </Routes>
  );
}

export default App;
