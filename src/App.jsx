import { Routes, Route } from 'react-router-dom';
import Loading from './pages/Loading';
import LoginStart from './pages/Join/LoginStart';
import Onboarding from './pages/Onboarding/Onboarding';
import Start from './pages/Start';
import InputShopInfo from './pages/Curation/InputShopInfo';
import MainLayout from './layout/MainLayout';
import Test from './pages/Curation/Test';
import ImageUpload from './pages/Curation/ImageUpload';
import VideoComplete from './pages/VideoComplete';
import SetVideoStyle from './pages/Curation/SetVideoStyle';
import Login from './pages/Join/Login';
import Signup from './pages/Join/Signup';
import Mypage from './pages/Mypage';
import StoreDetailPage from './pages/StoreDetailPage';
import KakaoLoginCallback from './api/KakaoLoginCallback';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/loginstart" element={<LoginStart />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/kakao/callback" element={<KakaoLoginCallback />} />

      {/* MainLayout 상속받는 그룹*/}
      <Route element={<MainLayout />}>
        <Route path="/shopinfo" element={<InputShopInfo />} />
        <Route path="/imageupload/:storeId" element={<ImageUpload />} />
        <Route path="/setvideo/:storeId" element={<SetVideoStyle />} />
        <Route path="/videocomplete" element={<VideoComplete />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/store/:storeId" element={<StoreDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
