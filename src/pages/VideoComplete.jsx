import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useHeaderStore from '../stores/headerStore';
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import ExVideo from "../assets/video/ex_video.mp4";
import Blog from "../assets/img/blog.svg";
import URL from "../assets/img/URL.svg";

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
    gap: 10px;

    width: 100%;
    max-width: 540px;
    height: 70px;
    padding: 21px 0 21px 16px;
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
  font-size: 18px;
  font-family: "Pretendard-Semibold";
  color: #4D4D4D;
`;
const TitleInput = styled.input`
    min-width: 0; /* 길 때 수평 스크롤/깨짐 방지 */
    height: 100%;
    border: none;
    outline: none;
    background: transparent;

    font-size: 18px;
    font-family: "Pretendard-Regular";
    color: #868686;

  &::placeholder {
    color: #868686;
  }
`;

//영상 썸네일
const ThumbSection = styled.div`
    width: 100%;
    height: 412px;
    display: flex;
    justify-content: center;
    margin: 14.67px 0 20px 0;
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
    width: 294px;
    height: 360px;
    object-fit: cover;
    border-radius: 20px;
    cursor: pointer;
`;
// 주황색 알림창
const AlertBubble = styled.div`
    display: flex;
    align-items: center;
    width: 243px; 
    height: 32px;
    position: absolute;
    top: 0;
    left: 221px;
    transform: translateX(-70%);
    background-color: #FF7300;
    border-radius: 10px;
    white-space: nowrap;
    p {
        font-size: 14px;
        font-family: "Pretendard-SemiBold";
        color: #FFFFFF;
        padding: 0 10px;
    }

    /* 아래 삼각형 꼬리 */
    &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 86%;
    transform: translateX(-50%);
    border-width: 6px 6px 1px 6px;
    border-style: solid;
    border-color: #ff7300 transparent transparent transparent;
  }
`;
// 오른쪽 위 ... 버튼
const ShareButton = styled.button`
    position: absolute;
    top: 70px;
    left: 238px;

    border: none;
    outline: none;
    border-radius: 20px;
    background: transparent;
    cursor: pointer;
    
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
`;
const Dot = styled.span`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #FFFFFF;
`;

//추천 홍보글
const TextSection = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
`
const Labal = styled.span`
    font-size: 24px;
    font-family: "Pretendard-SemiBold";
    color: #464A4D;
    margin-top: 30px;
`;
const TextArea = styled(TextareaAutosize)`
    width: 100%;
    /* height: auto; */
    border: 1.54px solid #E8EEF2;
    border-radius: 15px;
    padding: 20px 10px;
    margin: 0px;
    font-size: 24px;
    font-family: "Pretendard-Medium";
    color: #4D4D4D;
    line-height: 40px;
    /* resize: vertical; */
    box-sizing: border-box;
    white-space: pre-wrap;
`;

//추천 태그
const TagWrap = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
`;
const Tag = styled.button`
    width: auto;
    height: 36px;
    border: 1px solid #D0D0D0;
    border-radius: 55px;
    background-color: #FFFFFF;
    color: #4D4D4D;
    font-size: 18px;
    font-family: "Pretendard-SemiBold";
    padding: 4px 16px;
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
    padding: 30px 30px 19.27px 30px;

    width: min(100%, ${CONTENT_MAX}px);
    box-sizing: border-box;

    /* 가운데 정렬 +  애니메이션 */
    transform: translate(-50%, ${props => (props.$open ? '0%' : '100%')});
    transition: transform 280ms ease;
    z-index: 1001;
`;
const GrabBar = styled.span`
    width: 242px;
    border: 2px solid #C4C4C4;
    border-radius: 5px;
`
const SNSBtn = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    img {
        width: 72.98px;
        height: 72.98px;
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
        width: 72.98px;
        line-height: 28px;
        font-size: 14px;
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

    // // 드래그 상태
    // const [isDragging, setIsDragging] = useState(false);
    // const [dragY, setDragY] = useState(0); // 아래로 끌어내린 거리(px)
    // const startYRef = useRef(0);
    // const CLOSE_THRESHOLD = 100; 
    
    // //GrabBar를 누를 때 시작
    // const onPointerDown = (e) => {
    //     setIsDragging(true);
    //     startYRef.current = e.clientY ?? (e.touches?.[0]?.clientY || 0);
    // };
    // // 이동: 아래로만(양수) 반응
    // const onPointerMove = (e) => {
    //     if (!isDragging) return;
    //     const clientY = e.clientY ?? (e.touches?.[0]?.clientY || 0);
    //     const delta = clientY - startYRef.current;
    //     setDragY(delta > 0 ? delta : 0);
    // };
    // // 끝: 임계치 넘으면 닫고, 아니면 원위치
    // const onPointerUp = () => {
    //     if (!isDragging) return;
    //     setIsDragging(false);
    //     if (dragY > CLOSE_THRESHOLD) {
    //         setDragY(0);
    //         closeSheet();
    //     } else {
    //         setDragY(0);
    //     }
    // };
    // //전역 리스너 등록/해제
    // useEffect(() => {
    //     if (!isDragging) return;
    //     window.addEventListener("pointermove", onPointerMove);
    //     window.addEventListener("pointerup", onPointerUp);
    //     return () => {
    //         window.removeEventListener("pointermove", onPointerMove);
    //         window.removeEventListener("pointerup", onPointerUp);
    //     };
    // }, [isDragging, dragY]);

    // // 시트 열릴 때 바디 스크롤 잠금(선택)
    // useEffect(() => {}
    //     if (isSheetOpen) document.body.style.overflow = 'hidden';
    //     else document.body.style.overflow = '';
    //     return () => { document.body.style.overflow = ''; };
    // }, [isSheetOpen]);
    
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
                    <img src={Blog} alt="인스타그램"/>
                    <img src={Blog} alt="카카오톡"/>
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
        </PageWrapper>
    );
}

export default VideoComplete;