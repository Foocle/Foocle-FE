// 이미지(가게 외관, 가게 내부, 요리 등) 업로드 페이지

import { useEffect } from 'react';
import useHeaderStore from '../../stores/headerStore';
import StepperComponent from '../../components/ProgressBar';
const ImageUpload = () => {
  const setHeaderConfig = useHeaderStore((state) => state.setHeaderConfig);
  const resetHeaderConfig = useHeaderStore((state) => state.resetHeaderConfig);
  const activeSteps = [1, 2];
  useEffect(() => {
    setHeaderConfig({
      showBackButton: true,
      showCloseButton: false,
      title: '이미지 업로드',
      showCompleteButton: false,
    });
    return () => resetHeaderConfig();
  }, [setHeaderConfig, resetHeaderConfig]);
  return (
    <div>
      <StepperComponent activeSteps={activeSteps} />
    </div>
  );
};

export default ImageUpload;
