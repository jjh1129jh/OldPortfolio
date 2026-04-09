// App.jsx
import React, { useState } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './App.css';
import { allDataObj, allDataObj2 } from '/public/jsx/data.jsx'; //메뉴중 앞의 10개 메뉴

const slides = ['슬라이드 A', '슬라이드 B', '슬라이드 C', '슬라이드 D'];

const App = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const totalSections = 4; // 필요하면 나중에 자동 계산 가능

  let [allData, setAllData] = useState(allDataObj)
  let [careerData, setCareerData] = useState(allDataObj2)
  let [pageclass, setPageclass] = useState('on1')
  let [currentSlide, setCurrentSlide] = useState(1);
  let [currentCareerSlide, setCurrentCareerSlide] = useState(1);

  const handleSectionEnter = (sectionIndex) => {
  switch (sectionIndex) {
    case 1:
      setPageclass('on1')
      break;
    case 2:
      setPageclass('on2')
      break;
    case 3:
      setPageclass('on3')
      break;
    case 4:
      setPageclass('on4')
      break;
    default:
      break;
    }
  };

  const handleImageScroll = (e) => {
    const img = e.target;
    const parent = img.parentElement;
    const frameHeight = parent.offsetHeight;
    const imgHeight = img.offsetHeight;

    // 내려갈 거리 계산
    const scrollTarget = -(imgHeight - frameHeight) + 'px';
    img.style.setProperty('--scroll-target', scrollTarget);
    img.classList.add('scrolling');
  };

  const resetImageScroll = (e) => {
    const img = e.target;
    img.classList.remove('scrolling');
    img.style.removeProperty('--scroll-target');
  };

  function PopupLink(e) {
      window.open(
        e, 
        "popupWindow", 
        "width=1280,height=721,scrollbars=yes,resizable=yes"
      );
  }

  return (
    <div>
      {/* 상단 nav */}
      <nav className={`top-nav ${pageclass}`}>
        <ul>
          <li className='li1' onClick={() => fullpage_api?.moveTo(1)}>HOME</li>
          <li className='li2' onClick={() => fullpage_api?.moveTo(2)}>WORKS</li>
          <li className='li3' onClick={() => fullpage_api?.moveTo(3)}>CAREER</li>
          <li className='li4' onClick={() => fullpage_api?.moveTo(4)}>ABOUT</li>
        </ul>
      </nav>

      {/* 우측 현재 섹션 표시 */}
      <div className={`section-indicator ${pageclass}`}>
        {/* {currentSection} / {totalSections} */}
        <div className="pagenum pagenum1"><p>HOME</p><div className='dotsBase'><div className='dots'></div></div></div>
        <div className="pagenum pagenum2"><p>WORKS</p><div className='dotsBase'><div className='dots'></div></div></div>
        <div className="pagenum pagenum3"><p>CAREER</p><div className='dotsBase'><div className='dots'></div></div></div>
        <div className="pagenum pagenum4"><p>ABOUT</p><div className='dotsBase'><div className='dots'></div></div></div>
      </div>

      {/* 모바일 하단 현재 섹션 표시 */}
      <div className={`section-indicatorMB`}>
        {currentSection} / {totalSections}
      </div>

      <ReactFullpage
        licenseKey="YOUR_KEY_HERE"
        scrollingSpeed={1000}
        touchSensitivity={30}   // 터치 민감도 ↑
        bigSectionsDestination="top"  // 스와이프 끝까지 안 해도 위/아래 이동
        dragAndMove={true}      // fullpage 공식 애드온: 드래그 스크롤 지원
        afterLoad={(origin, destination, direction) => {
          const currentIndex = destination.index + 1;
          setCurrentSection(currentIndex);   // 인디케이터 업데이트
          handleSectionEnter(currentIndex);  // 👈 여기서 호출
        }}
        render={({ state, fullpageApi }) => {
          // fullpageApi를 상단 nav에서 사용하기 위해 window/global에 연결
          window.fullpage_api = fullpageApi;

          return (
            <ReactFullpage.Wrapper>
              <div className="section section1">
                <div className="sec1textarea">
                  <p>안녕하세요.</p>
                  <p className='midP'><strong>번뜩이는</strong>&nbsp;<span>웹 프로그래머</span></p>
                  <p><strong>정지환</strong> 입니다.</p>
                </div>
              </div>

              <div className="section section2">
                <div className="swiper-container">
                  <Swiper spaceBetween={30} slidesPerView={1} grabCursor={true} onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}>
                    {
                    allData.map((thisData, index) => (
                      <SwiperSlide key={index}>
                        <div className='allArea' style={{backgroundColor:`${thisData.bgcolor}`}}>
                          <div className='explanationArea'>
                            <div className='explanationAreaBG'>

                              <div className='explanationArea_head'>
                                <div className='headText'>
                                  <h1 style={{color:`${thisData.colorcode[0]}`}}>{thisData.id + 1}</h1>
                                  <div className='headName'>
                                    <span>{thisData.subname}</span>
                                    {
                                      thisData.nametype == 'E'
                                      ? <h3 style={{color:`${thisData.colorcode[0]}`,fontFamily:'Arial Greek Regular',fontWeight:'100',fontSize:'70px'}}>{thisData.name}</h3>
                                      : <h4 style={{color:`${thisData.colorcode[0]}`,fontWeight:'500',fontSize:'52px',letterSpacing:'-2px'}}>{thisData.name}</h4>
                                    }

                                  </div>
                                </div>
                                <div className="Language">
                                  <p className='textcircle' style={{backgroundColor:`${thisData.colorcode[0]}`,color:`${thisData.textcolor}`,fontWeight:600}}>주요</p>
                                  <ul className='LanguageUL'>
                                    {
                                      thisData.Language.map(function (item, i) {
                                        return(<li key={i}>{item}</li>)
                                      })
                                    }
                                  </ul>
                                </div>
                                <div className='line line1' style={{backgroundColor:`${thisData.colorcode[0]}`}}></div>
                              </div>

                              <div className="explanationArea_container container_PC">
                                <p>{thisData.content}</p>
                              </div>

                              <div className="explanationArea_bottom">
                              <div className='signature_color'>
                                <ul>
                                  {
                                    thisData.colorcode.map(function (item, i) {
                                      return(<li key={i} style={{backgroundColor:`${item}`}}><p>{item}</p></li>)
                                    })
                                  }
                                </ul>
                              </div>
                              <div className='composition'>
                                <p className='textcircle' style={{backgroundColor:`${thisData.colorcode[0]}`,color:`${thisData.textcolor}`,fontWeight:600}}>구성</p>
                                <ul>
                                  {
                                    thisData.composition.map(function (item, i) {
                                      return(<li key={i}>{item}</li>)
                                    })
                                  }
                                </ul>
                              </div>
                              <div className='features'>
                                <p className='textcircle' style={{backgroundColor:`${thisData.colorcode[0]}`,color:`${thisData.textcolor}`,fontWeight:600}}>기능</p>
                                <ul>
                                  {
                                    thisData.features.map(function (item, i) {
                                      return(<li key={i}>{item}</li>)
                                    })
                                  }
                                </ul>
                              </div>
                              <div className='browser'>
                                <ul>
                                  <li style={{backgroundImage:'url(/img/Chrome.png)',backgroundPosition:'center',backgroundRepeat:'no-repeat',backgroundSize:'100%'}}></li>
                                  <li style={{backgroundImage:'url(/img/Edge.png)',backgroundPosition:'center',backgroundRepeat:'no-repeat',backgroundSize:'100%'}}></li>
                                  <li style={{backgroundImage:'url(/img/Firefox.png)',backgroundPosition:'center',backgroundRepeat:'no-repeat',backgroundSize:'100%'}}></li>
                                  <li style={{backgroundImage:'url(/img/Whale.png)',backgroundPosition:'center',backgroundRepeat:'no-repeat',backgroundSize:'100%'}}></li>
                                </ul>
                              </div>
                              </div>

                               <div className="explanationArea_container container_MB">
                               <div className='line line2' style={{backgroundColor:`${thisData.colorcode[0]}`}}></div>
                                <p>{thisData.content}</p>
                              </div>
                            </div>        
                          </div>
                          <div className='sampleArea'>
                            {
                              thisData.weblink != ''
                              ? <a href={`${thisData.weblink}`} target="_blank" rel="noopener noreferrer"></a>
                              : null
                            }
                            {
                              thisData.imagesPC != ''
                              ? <div className='sampleOBJ sample_PC'>
                                  <div>
                                    <div className='touchBox'>
                                      <img className='tab' src="/img/tab.png" alt="터치" />
                                      <img className='tabArrow' src="/img/tabArrow.png" alt="터치유도" />
                                    </div>
                                    <div className='touchBoxMB'>
                                      <p>화면을 클릭해보세요!</p>
                                    </div>
                                    <img className='frame frame_PC' src="/img/PcBlack.png" alt="PC" />
                                    <div className='whiteframe_PC'>
                                      <div>
                                        <img className="scroll-img" src={`${thisData.imagesPC}`} alt="PC페이지" onClick={(e) => handleImageScroll(e)} onMouseLeave={(e) => resetImageScroll(e)} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              : null
                            }
                            {
                              thisData.imagesTB != ''
                              ? <div className='sampleOBJ sample_TB'>
                                  <div>
                                    <img className='frame frame_TB' src="/img/Ipad.png" alt="Tablet" />
                                    <div className='whiteframe_TB'>
                                      <div>
                                        <img  className="scroll-img" src={`${thisData.imagesTB}`} alt="tablet페이지" onClick={(e) => handleImageScroll(e)} onMouseLeave={(e) => resetImageScroll(e)} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              : null
                            }
                            {
                              thisData.imagesMB != ''
                              ? <div className='sampleOBJ sample_MB'>
                                  <div>
                                    <img className='frame frame_MB' src="/img/Mobile.png" alt="Mobile" />
                                    <div className='whiteframe_MB'>
                                      <div>
                                        <img className="scroll-img"  src={`${thisData.imagesMB}`} alt="Mobile페이지" onClick={(e) => handleImageScroll(e)} onMouseLeave={(e) => resetImageScroll(e)} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              : null
                            }
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="slide-counter">슬라이드를 드래그해서 옆으로 넘길 수 있습니다.</div>
                </div>
              </div>

              <div className="section section3">
                <div className="swiper-container">
                  <Swiper spaceBetween={30} slidesPerView={1} grabCursor={true}  onSlideChange={(swiper) => setCurrentCareerSlide(swiper.activeIndex + 1)}>
                    {
                    careerData.map((thisData, index) => (
                      <SwiperSlide key={index}>
                        <div className='allArea' style={{backgroundColor:`${thisData.bgcolor}`}}>
                          <div className='explanationArea'>
                            <div className='explanationAreaBG'>

                              <div className='explanationArea_head'>
                                <h5>PROJECT</h5>
                                <h2>{thisData.name}</h2>
                                <div className="Language">
                                  <p className='textcircle' style={{backgroundColor:`${thisData.objcolor}`}}>주요</p>
                                  <ul className='LanguageUL'>
                                    {
                                      thisData.Language.map(function (item, i) {
                                        return(<li key={i}>{item}</li>)
                                      })
                                    }
                                  </ul>
                                </div>
                                <div className='line line1' style={{backgroundColor:`${thisData.objcolor}`}}></div>
                              </div>

                              <div className="explanationArea_container container_PC">
                                <p>{thisData.content}</p>
                              </div>

                              <div className="explanationArea_bottom">
                                <div className='Contribution'>
                                  <p className='textcircle' style={{backgroundColor:`${thisData.objcolor}`}}>기여도</p>
                                  <span>{thisData.contribution}</span>
                                </div>
                                <div className='Participants'>
                                  <p className='textcircle' style={{backgroundColor:`${thisData.objcolor}`}}>참여인원</p>
                                  <span>{thisData.participants}</span>
                                </div>
                                <div className='Responsibilities'>
                                  <p className='textcircle' style={{backgroundColor:`${thisData.objcolor}`}}>담당업무</p>
                                  <span>{thisData.responsibilities}</span>
                                </div>
                              </div>

                               <div className="explanationArea_container container_MB">
                               <div className='line line2' style={{backgroundColor:`${thisData.objcolor}`}}></div>
                                <p>{thisData.content}</p>
                              </div>
                            </div>        
                          </div>
                          <div className='sampleArea'>
                            <div className='sampleBG'>
                              <div>
                                <img className='sampleImg' src={thisData.images} alt="PC" />
                                <div className='btns btnsPC'>
                                  {
                                    thisData.weblink.length != 0
                                    ? thisData.linktype == 'W'
                                      ? thisData.weblink.length == 1
                                        ? <a className='textcircle2' onClick={()=>{PopupLink(thisData.weblink[0])}} style={{backgroundColor:`${thisData.objcolor}`}}>HOME</a>
                                        : thisData.weblink.map(function (item, i) {
                                            return(
                                              // <a className='textcircle2' key={i} href={`${thisData.weblink[i]}`} style={{backgroundColor:`${thisData.objcolor}`}}>{`HOME${i+1}`}</a>
                                              <a className='textcircle2' key={i} onClick={()=>{PopupLink(thisData.weblink[i])}} style={{backgroundColor:`${thisData.objcolor}`}}>{`HOME${i+1}`}</a>
                                            )
                                          })
                                      : <a className='textcircle2' href={`${thisData.weblink[0]}`} target="_blank" rel="noopener noreferrer" style={{backgroundColor:`${thisData.objcolor}`}}>HOME</a>
                                    : <a className='textcircle2' href='/' style={{backgroundColor:'#303030',pointerEvents:'none',opacity:0.5}}>NONE</a>

                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="slide-counter">슬라이드를 드래그해서 옆으로 넘길 수 있습니다.</div>
                </div>
              </div>

              <div className="section section4">
                <div className="Box">
                  <div className="aboutBox">
                    <div className="aboutText"><h1>About</h1></div>
                    <div className='sec4grid'>
                      <div className="grid grid1">
                        <p className="gridTitle">PROFILE</p>
                        <div className="gridInfo">
                          <p>정지환</p>
                          <p>인천 서구</p>
                          <p>1996.11.29</p>
                          <p>멀티미디어학 졸업</p>
                          <p>TIS정보기술교육센터 수료</p>
                        </div>
                      </div>
                      <div className="grid grid2">
                        <p className="gridTitle">CAREER</p>
                        <div className="gridInfo">
                          <p>미림미디어랩<br/>(2022.06 ~ 2023.09)</p><br/>
                          <p>미림미디어랩 (외주)<br/>(2023.10 ~ 2023.12)</p><br/>
                          <p>다락컴퍼니<br/>(2024.02 ~ 2025.04)</p><br/>
                          <p>비즈엠디지 (외주)<br/>(2025.06 ~ 2025.10)</p>
                        </div>
                      </div>
                      <div className="grid grid3">
                        <p className="gridTitle">LICENSE</p>
                        <div className="gridInfo">
                          <p>정보처리산업기사</p>
                          <p>웹디자인기능사</p>
                          <p>컴퓨터그래픽스기능사</p>
                          <p>사무자동화산업기사</p>
                        </div>
                      </div>
                      <div className="grid grid4">
                        <p className="gridTitle">ABILITY</p>
                        <div className="gridInfo">
                          <p>HTML</p>
                          <p>CSS / SCSS</p>
                          <p>Javascript</p>
                          <p>Jquery</p>
                          <p>React</p>
                          <p>Redux</p>
                          <p>Bootstrap</p>
                          <p>Adobe Photoshop</p>
                          <p>Adobe illustrator</p>
                          <p>Adobe Lightroom</p>
                          <p>Adobe Audition</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
};

export default App;
