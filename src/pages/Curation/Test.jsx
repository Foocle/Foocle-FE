import React from 'react';
import InstructionCard from '../../components/InstructionCard';
import useHeaderStore from '../../stores/headerStore';
import ImageUploaderCard from '../../components/ImageUploaderCard';
import { useEffect } from 'react';
const Test = () => {
  const setHeaderConfig = useHeaderStore((state) => state.setHeaderConfig);
  const resetHeaderConfig = useHeaderStore((state) => state.resetHeaderConfig);

  useEffect(() => {
    setHeaderConfig({
      showBackButton: true,
      showCloseButton: false,
      title: '가게 정보 입력',
      showCompleteButton: false,
      onComplete: () => alert('완료 클릭!'),
    });

    return () => resetHeaderConfig();
  }, [setHeaderConfig, resetHeaderConfig]);

  return (
    <div>
      <InstructionCard text={'저희 '} />
      <ImageUploaderCard />
    </div>
  );
};

export default Test;
