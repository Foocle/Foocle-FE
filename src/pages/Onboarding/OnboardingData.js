import onboardingVideo from '../../assets/img/onboarding_video.svg';
import onboardingScript from '../../assets/img/onboarding_script.svg';
import onboardingHamburger from '../../assets/img/onboarding_hamburger.svg';

const OnboardingData = [
    {
        id: 1,
        title: "텍스트 기반 쇼츠 생성",
        description: "메뉴명과 간단한 설명만 입력하면 AI가 자동으로 \n쇼츠영상을 만들 수 있어요!",
        image: onboardingVideo, 
        ctaLabel: "다음으로"
    },
    {
        id: 2,
        title: "AI 대본 작성",
        description: "음식의 특징과 설명만 입력하면, AI가 다양한 \n스타일의 대본을 뚝딱 만들어드려요!",
        image: onboardingScript,
        ctaLabel: "다음으로"
    },
    {
        id: 3,
        title: "이미지를 동영상으로",
        description: "메뉴 사진 한 장만 업로드하면, VEO3가 생동감 \n넘치는 쇼츠 영상으로 바꿔드려요.",
        image: onboardingHamburger,
        ctaLabel: "시작하기"
    },
];

export default OnboardingData;