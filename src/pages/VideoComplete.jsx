import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useHeaderStore from '../stores/headerStore';
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import ExVideo from "../assets/video/EXvideo.mp4";
import Blog from "../assets/img/blog.svg";
import URL from "../assets/img/URL.svg";
import Instagram from "../assets/img/Instagram.svg";
import Kakao from "../assets/img/Vector.svg";
import VideoOverlay from "../components/VideoModal.jsx";

//styled
const CONTENT_MAX = 600;

const PageWrapper = styled.div`
    width: 100%;
    max-width: ${CONTENT_MAX}px;
    display: flex;
    flex-direction: column;
`;

const TitleSection = styled.div`
    display: flex;
    align-items: center;
    gap: clamp(6px, 2vw, 12px);

    width: 100%;
    max-width: 600px;
    height: clamp(48px, 10vh, 70px);
    padding: clamp(10px, 2vh, 21px) 0 clamp(10px, 2vh, 21px) clamp(10px, 5vw, 16px);
    box-sizing: border-box;

    border: 1px solid transparent;
    border-radius: 15px;
    background-image:
        linear-gradient(#E7E7E7, #E7E7E7),
        linear-gradient(170deg, #E7E7E7, #A2A2A2);
    background-origin: border-box;
    background-clip: padding-box, border-box;
`;
// 추천 제목
const AItitle = styled.label`
    white-space: nowrap;
    font-size: clamp(14px, 4.5vw, 18px);
    font-family: "Pretendard-Semibold";
    color: #4D4D4D;
`;
const TitleInput = styled.input`
    min-width: 0; /* 길 때 수평 스크롤/깨짐 방지 */
    height: 100%;
    border: none;
    outline: none;
    background: transparent;

    font-size: clamp(14px, 4.5vw, 18px);
    font-family: "Pretendard-Regular";
    color: #868686;

  &::placeholder {
    color: #868686;
  }
`;

//영상 썸네일
const ThumbSection = styled.div`
    width: 100%;
    height: clamp(300px, 55vh, 412px);
    display: flex;
    justify-content: center;
    margin: clamp(10px, 2vh, 14.67px) 0 clamp(12px, 2.8vh, 20px) 0;
`;
const ThumbCard = styled.div`
    width: fit-content;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
`;
const ThumbVideo = styled.video`
    width: clamp(220px, 78vw, 294px);
    height: clamp(270px, 48vh, 360px);
    object-fit: cover;
    border-radius: 20px;
    cursor: pointer;
`;
// 주황색 알림창
const AlertBubble = styled.div`
    display: flex;
    align-items: center;
    width: clamp(180px, 60vw, 243px); 
    height: clamp(26px, 4vh, 32px);
    position: absolute;
    top: 0;
    left: clamp(140px, 58vw, 221px);
    transform: translateX(-70%);
    background-color: #FF7300;
    border-radius: 10px;
    white-space: nowrap;
    p {
        font-size: clamp(12px, 3.5vw, 14px);
        font-family: "Pretendard-SemiBold";
        color: #FFFFFF;
        padding: 0 clamp(8px, 2.2vw, 10px);
    }

    /* 아래 삼각형 꼬리 */
    &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 86%;
    transform: translateX(-50%);
    border-width: clamp(5px, 1.5vw, 6px) clamp(5px, 1vw, 6px) 1px clamp(5px, 1vw, 6px);
    border-style: solid;
    border-color: #FF7300 transparent transparent transparent;
  }
`;
// 오른쪽 위 ... 버튼
const ShareButton = styled.button`
    position: absolute;
    top: clamp(46px, 10.4vh, 70px);
    left: clamp(160px, 61vw, 238px);

    border: none;
    outline: none;
    border-radius: 20px;
    background: transparent;
    cursor: pointer;
    
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(4px, 1.8vw, 7px);
`;
const Dot = styled.span`
    width: clamp(5px, 1.7vw, 7px);
    height: clamp(5px, 1.7vw, 7px);
    border-radius: 50%;
    background: #FFFFFF;
`;

//추천 홍보글
const TextSection = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: clamp(6px, 2vw, 10px);
`
const Labal = styled.span`
    font-size: clamp(18px, 6vw, 24px);
    font-family: "Pretendard-SemiBold";
    color: #464A4D;
    margin-top: clamp(20px, 4vh, 30px);
`;
const TextArea = styled(TextareaAutosize)`
    width: 100%;
    border: 1.54px solid #E8EEF2;
    border-radius: 15px;
    padding: clamp(14px, 3.2vw, 20px) clamp(8px, 2.2vw, 10px);
    margin: 0px;
    font-size: clamp(16px, 5vw, 24px);
    font-family: "Pretendard-Medium";
    color: #4D4D4D;
    line-height: clamp(29px, 8vw, 40px);
    box-sizing: border-box;
    white-space: pre-wrap;
`;

//추천 태그
const TagWrap = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: clamp(6px, 2vw, 10px);
`;
const Tag = styled.button`
    width: auto;
    height: clamp(28px, 5vh, 36px);
    border: 1px solid #D0D0D0;
    border-radius: 55px;
    background-color: #FFFFFF;
    color: #4D4D4D;
    font-size: clamp(14px, 4vw, 18px);
    font-family: "Pretendard-SemiBold";
    padding: clamp(3px, 0.8vw, 4px) clamp(10px, 3.2vw, 16px);
    cursor: pointer;
`;

//오버레이
const Overlay = styled.div`
    position: fixed;
    left: 50%;
    top: 0;
    width: min(100vw, ${CONTENT_MAX}px);
    height: 100vh;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.45);
    z-index: 1000;
`;
const ShareSheetWrapper = styled.div`
    position: fixed;
    left: 50%;
    bottom: 0;

    display: flex;
    height: auto;
    flex-direction: column;
    align-items: center;
    gap: 25px;

    background-color: #FFFFFF;

    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    padding: clamp(18px, 4vw, 30px) clamp(18px, 4vw, 30px) clamp(14px, 3vw, 19.27px) clamp(18px, 4vw, 30px);

    width: min(100%, ${CONTENT_MAX}px);
    box-sizing: border-box;

    /* 가운데 정렬 +  애니메이션 */
    transform: translate(-50%, ${props => (props.$open ? '0%' : '100%')});
    transition: transform 280ms ease;
    z-index: 1001;
`;
const GrabBar = styled.span`
    width: clamp(120px, 40vw, 242px);
    border: 2px solid #C4C4C4;
    border-radius: 5px;
`
const SNSBtn = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    img {
        width: clamp(56px, 19vw, 72.98px);
        height: clamp(56px, 15vw, 72.98px);
        cursor: pointer;
    }
`;
const ShareText = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    
    span {
        width: clamp(56px, 19vw, 72.98px);
        line-height: clamp(20px, 6vw, 28px);
        font-size: clamp(12px, 3.5vw, 14px);
        font-family: "Pretendard-Medium";
        color: #4D4D4D;
    }
`

const VideoComplete = () => {
    const { state } = useLocation ();

    // Header 상태 관리
    const navigate = useNavigate();
    const setHeaderConfig = useHeaderStore((state) => state.setHeaderConfig);
    const resetHeaderConfig = useHeaderStore((state) => state.resetHeaderConfig);
    
    useEffect(() => {
        setHeaderConfig({
            showBackButton: false,
            showCloseButton: true,
            title: "쇼츠 생성 완료",
            showCompleteButton: true,
        });
        return () => resetHeaderConfig();
    }, [setHeaderConfig, resetHeaderConfig]);

    // 바텀시트 상태
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const openSheet = () => setIsSheetOpen(true);
    const closeSheet = () => setIsSheetOpen(false);

    // 영상 오버레이 상태
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    // 시트,영상 열릴 때 스크롤 잠금
    useEffect(() => {
        const locked = isSheetOpen || isVideoOpen;
        document.body.style.overflow = locked ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isSheetOpen, isVideoOpen]);
    
    //incoming data
    const {
        suggestedTitle = "12000원에 이게 다 무제한?",
        scriptText: incomingScript = `12000원에 이게 다 무제한이라고?
여기는 생선구이 하나만 시켜도 
무제한으로 8가지 반찬과 청국장, 오징어국, 
누룽지, 보리비빔밥을 먹을 수 있는 곳이에요
이 모든 게 12000원밖에 안 하는데
여기에 8천 원만 추가하면
제육이 한가득 나와요
저렴하면 맛이 별로라 안 가게 되는데
다가생구이는 맛까지 대박이라
진짜 말도 안되는곳이에요ㅠㅠ
점심에만 파는 메뉴라 꼭 점심에 가셔야해요! 
        
연탄생선구이백반 12,000원
제육볶음 8,000원
        
#다가생구이 서울본점
서울 마포구 새창로 4길 16-10 1층`,
        tags: incomingTags = ["#공덕", "#공덕맛집", "#서울", "#마포구맛집", "#서울맛집", "#노포식당", "#노포맛집", "#오늘의식당", "#저녁추천"]
    } = state ?? {};

    //title
    const [title, setTitle] = useState(suggestedTitle);
    const TITLE_MAX = 30;

    useEffect(() => {
        setTitle(suggestedTitle);
    }, [suggestedTitle])

    //script
    const [script, setScript] = useState(incomingScript);
    const SCRIPT_MAX = 500;

    //tags 
    //TODO : 선택 가능하도록?
    const [tags, setTags] = useState(incomingTags);
    const [selected, setSelected] = useState(() => new Set());

    const toggleTags = (t) => {
        setSelected((prev) => {
            const next= new Set(prev);
            if (next.has(t)) next.delete(t);
            else if (next.size < 5) next.add(t);
            return next;
        });
    };

    return (
        <PageWrapper>

            <TitleSection>
                <AItitle>추천제목</AItitle>
                <TitleInput 
                    type="text"
                    maxLength={TITLE_MAX}
                    placeholder={`예) ${suggestedTitle}`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </TitleSection>

            <ThumbSection>
                <ThumbCard>
                    <AlertBubble>
                        <p>해당 버튼을 눌러서 SNS에 공유해보세요</p>
                    </AlertBubble>
                    <ThumbVideo 
                        src={ExVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls={false}   
                        onClick={() => setIsVideoOpen(true)}
                    />
                    <ShareButton onClick={openSheet}>
                        <Dot /><Dot /><Dot />
                    </ShareButton>
                </ThumbCard>
            </ThumbSection>

            <TextSection>
                <Labal>AI 추천 홍보글</Labal>
                <TextArea
                    value={script}
                    maxLength={SCRIPT_MAX}
                    onChange={(e) => setScript(e.target.value)}
                    minRows={1}
                />
            </TextSection>

            <TextSection>
                <Labal>추천 태그</Labal>
                <TagWrap>
                    {tags.map((t) => (
                        <Tag
                            key={t}
                            $active={selected.has(t)}
                            onClick={() => toggleTags(t)}
                            aria-pressed={selected.has(t)}
                        >
                            {t}
                        </Tag>
                    ))}
                </TagWrap>
            </TextSection> 

            {isSheetOpen && <Overlay onClick={closeSheet} />}
            <ShareSheetWrapper $open={isSheetOpen} onClick={(e) => e.stopPropagation()}>
                <GrabBar/>
                <SNSBtn>
                    <img src={Instagram} alt="인스타그램"/>
                    <img src={Kakao} alt="카카오톡"/>
                    <img src={Blog} alt="블로그"/>
                    <img src={URL} alt="URL 복사"/>
                </SNSBtn>
                <ShareText>
                    <span>인스타그램</span>
                    <span>카카오톡</span>
                    <span>블로그</span>
                    <span>URL 복사</span>
                </ShareText>
            </ShareSheetWrapper>

            <VideoOverlay
                open={isVideoOpen}
                src={ExVideo}
                onClose={() => setIsVideoOpen(false)}
                maxWidth={CONTENT_MAX}
            />
        </PageWrapper>
    );
}

export default VideoComplete;