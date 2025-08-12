import { Routes, Route } from 'react-router-dom';
import { Start } from './pages/Start';
import InputShopInfo from './pages/Curation/InputShopInfo';
import MainLayout from './layout/MainLayout';
import Test from './pages/Curation/Test';
import ImageUpload from './pages/Curation/ImageUpload';
function App() {
  return (
    <Routes>
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
