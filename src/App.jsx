import { Routes, Route } from 'react-router-dom';
import LoginStart from './pages/Join/LoginStart';
import Onboarding from './pages/Onboarding/Onboarding';
import Start from './pages/Start';
import InputShopInfo from './pages/Curation/InputShopInfo';
import MainLayout from './layout/MainLayout';
import Test from './pages/Curation/Test';
import ImageUpload from './pages/Curation/ImageUpload';
function App() {
  return (
    <Routes>
      <Route path="/loginstart" element={<LoginStart />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/" element={<Start />} />

      {/* MainLayout 상속받는 그룹*/}
      <Route element={<MainLayout />}>
        <Route path="shopinfo" element={<InputShopInfo />} />
        <Route path="imageupload" element={<ImageUpload />} />
        <Route path="test" element={<Test />} />
      </Route>
    </Routes>
  );
}

export default App;
