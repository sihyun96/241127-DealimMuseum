$('a[href="#"]').on('click', function (e) {
  e.preventDefault();
});

// **************** 메뉴 스크롤 후 고정
let scrollbar = 550;
$(window).on('scroll', function () {
  const scrollHt = $(this).scrollTop()
  if (scrollHt > scrollbar) {
    $('.nav-main').addClass('fixed')
  } else {
    $('.nav-main').removeClass('fixed')
  }
});

// **************** 아래버튼
$('.scroll-wrapper').on('click', function (e) {
  e.preventDefault();

  const scrolldown = $('.about').offset().top;
  scrollTo({
    top: scrolldown,
    behavior: 'smooth'
  })
});

// **************** 메뉴 border
let borderOff = $('.bg1').offset().top;
$(window).on('scroll', function() {
  const scrollHt = $(this).scrollTop()
  if( scrollHt > borderOff ) {
    $('header .top-wrapper .nav-main .global-menu').addClass('borderoff')
  } else {
    $('header .top-wrapper .nav-main .global-menu').removeClass('borderoff')
  }
});

let borderOn = $('.Experiment-wrapper').offset().top;
$(window).on('scroll', function() {
  const scrollHt = $(this).scrollTop()
  if( scrollHt > borderOn) {
    $('header .top-wrapper .nav-main .global-menu').addClass('borderon')
  } else {
    $('header .top-wrapper .nav-main .global-menu').removeClass('borderon')
  }
});
// **************** GSAP 플러그인
gsap.registerPlugin(ScrollTrigger);

// **************** 글자 GSAP
gsap.utils.toArray('.rolled-over-text').forEach((txt) => {
  const txtAni = gsap.timeline({
    scrollTrigger: {
      trigger: txt,
      start: 'bottom bottom',
      end: 'bottom bottom',
      scrub: 1
    }
  });
  txtAni.fromTo(
    txt,
    { opacity: 0, y: 170, overflow: 'hidden' },
    { opacity: 1, y: 0, ease: "expoScale(0.5,7,none)", duration: 3 }
  )
});

// **************** main GSAP
const mainAni = gsap.timeline({
  scrollTrigger: {
    trigger: '.top-ani',
    start: '0 0',
    end: '4000px',
    scrub: true,
  }
});

const animations = [
  {
    target: '.ani-d',
    keyframes: [
      { x: 0, y: 1000, scale: 0.5 },
      { x: 352, y: 1500, zIndex:9999 },
      // { y: 2000, scale: 0.5, opacity: 0.5, ease: "power1.out"},
      { y: 2300, scale: 0.6, opacity: 0.7, ease: "power1.out", zIndex:9999 },
      { y: 2800, scale: 0.8, opacity: 1, ease: "power1.out", zIndex:-1 },
      { y: 3100, scale: 2, opacity: 1, ease: "power1.out", zIndex:-1 },
      { y: 3500, scale: 4, opacity: 1, ease: "power1.out" },
      { y: 5000, scale: 5, opacity: 1, ease: "power1.out" },
    ],
  },
  {
    target: '.ani-l',
    keyframes: [
      { x: 0, y: 1000, scale: 0.5 },
      { x: -350, y: 1500 },
      // { y: 2000, scale: 0.5, opacity: 0.7, ease: "power1.out" },
      { y: 2300, scale: 0.6, opacity: 0.8, ease: "power1.out" },
      { y: 2800, scale: 0.8, opacity: 1, ease: "power1.out" },
      { y: 3100, scale: 2, opacity: 1, ease: "power1.out" },
      { y: 3500, scale: 4, opacity: 1, ease: "power1.out" },
      { y: 5000, scale: 5, opacity: 1, ease: "power1.out" },
    ]
  }
];
animations.forEach(({ target, keyframes }) => {
  keyframes.forEach((keyframe, index) => {
    mainAni.to(target, keyframe, `+${index * 0.5}`); // 키프레임 간격 축소
  });
});


// **************** img GSAP
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".big-img",
    start: "top top",
    end: "+=300%",
    scrub: 3,
    pin: true,
  }
});

// 위로 올라오는 애니메이션
tl.fromTo('.artspace1', { y: '100%' }, { y: 0, duration: 1 })
  .fromTo('.artspace2', { y: '100%' }, { y: 0, duration: 1 })
  .fromTo('.artspace3', { y: '100%' }, { y: 0, duration: 1 })

  // big-img 배경색 투명하게
  .to('.big-img-wrapper', { backgroundColor: 'transparent', duration: 0.5 }, '+=0.5')


// artspace1, artspace2가 artspace3 위치로 이동
tl.to('.artspace1', { x: '200%', duration: 1 }, '+=0.')
  .to('.artspace2', { x: '100%', duration: 1 }, '<')
  .fromTo('.Experiment-wrapper', { opacity: 0 }, { opacity: 1, duration: 3}, '<')
  .to ('.Experiment-wrapper', {zIndex: 9999}, )


  // 애니메이션 마지막 빈 공간
  .to({}, { duration: 2 });



// **************** bottom GSAP
window.addEventListener('load', function () {
  const target = document.querySelector('.bottom-ani');

  // 애니메이션 실행 함수
  const animateOnScroll = (entries) => {
    entries.forEach(entry => {
      const element = entry.target;

      // 애니메이션 초기화 함수
      const resetAnimation = () => {
        gsap.set(element.querySelectorAll('svg'), {
          y: '100%',
          rotation: 0,
          scale: 0.5,
          rotation: 90,
          anticipatePin: 1,
        });
      };

      if (entry.isIntersecting) {
        // 뷰포트에 들어오면 애니메이션 시작
        gsap.timeline()
          .fromTo(
            element.querySelectorAll('svg'),
            { y: '100%' },
            {
              y: '0%',
              duration: 1,
              stagger: 0.2,
              ease: 'power2.out',
            }
          )
          .to(element.querySelectorAll('svg'), {
            rotation: 0,
            duration: 1,
            ease: 'power1.out',
            transformOrigin: 'center center',
          })
          .to(element.querySelectorAll('svg'), {
            scale: 1,
            duration: 0.5,
            ease: 'power1.out',
          });
      } else {
        // 뷰포트를 벗어나면 초기화
        resetAnimation();
      }
    });
  };

  // IntersectionObserver 옵션
  const options = {
    root: null,
    threshold: 0, // 뷰포트에 살짝이라도 들어오면 실행
    rootMargin: '0px',
  };

  // IntersectionObserver 생성
  const observer = new IntersectionObserver(animateOnScroll, options);
  observer.observe(target);
});



// **************** hover GSAP

// Experiment-wrapper hover
const arrowWrapper = document.querySelector('.big-btn');
const arrow1 = document.querySelector('.arrow1');

const bar = document.querySelector('.bar');

const barS1Wrapper = document.querySelector('.bar1')
const barS2Wrapper = document.querySelector('.bar2')
const barS1 = document.querySelector('.bar-s1');
const barS2 = document.querySelector('.bar-s2');

const bottomArrow = document.querySelector('.line-wrapper')
const arrow2 = document.querySelector('.arrow2');

const aboutBorder1 = document.querySelector('.title1')
const aboutBorder2 = document.querySelector('.title2')
const border1 = document.querySelector('.title-bar1');
const border2 = document.querySelector('.title-bar2');


// GSAP 타임라인 설정
const arrowAni = gsap.timeline({ paused: true }); // 처음에는 멈춤 상태
arrowAni
  .to(arrow1, {
    x: 20, // 앞으로 20px 이동
    duration: 0.3,
    ease: "power1.out",
  })
  .set(arrow1, { x: -20 }) // 뒤로 이동 후 새로운 위치로 초기화
  .to(arrow1, {
    x: 0, 
    duration: 0.3,
    ease: "power1.out",
  });

const barAni = gsap.timeline({ paused: true });
barAni 
  .to(bar, {
    x: 440, 
    duration: 0.5,
    ease: "power1.out",
  })
  .set(bar, { x: -440 })
  .to(bar, {
    x: 0, 
    duration: 0.5,
    ease: "power1.out",
  });

  const barS1Ani = gsap.timeline({ paused: true  });
  barS1Ani 
  .to(barS1, {
    x: 150, 
    duration: 0.5,
    ease: "power1.out",
  })
  .set(barS1, { x: -150 })
  .to(barS1, {
    x: 0, 
    duration: 0.5,
    ease: "power1.out",
  });

  const barS2Ani = gsap.timeline({ paused: true  });
  barS2Ani 
  .to(barS2, {
    x: 150, 
    duration: 0.5,
    ease: "power1.out",
  })
  .set(barS2, { x: -150 })
  .to(barS2, {
    x: 0, 
    duration: 0.5,
    ease: "power1.out",
  });

  const arrow2Ani = gsap.timeline({ paused: true }); // 처음에는 멈춤 상태
arrow2Ani
  .to(arrow2, {
    x: 20, // 앞으로 20px 이동
    duration: 0.3,
    ease: "power1.out",
  })
  .set(arrow2, { x: -20 }) // 뒤로 이동 후 새로운 위치로 초기화
  .to(arrow2, {
    x: 0, 
    duration: 0.3,
    ease: "power1.out",
  });

  const border1Ani = gsap.timeline({ paused: true  });
  border1Ani 
  .to(border1, {
    x: 600, 
    duration: 0.5,
    ease: "power1.out",
  })
  .set(border1, { x: -150 })
  .to(border1, {
    x: 0, 
    duration: 0.5,
    ease: "power1.out",
  });

  const border2Ani = gsap.timeline({ paused: true  });
  border2Ani 
  .to(border2, {
    x: 1020, 
    duration: 0.5,
    ease: "power1.out",
  })
  .set(border2, { x: -150 })
  .to(border2, {
    x: 0, 
    duration: 0.5,
    ease: "power1.out",
  });
  
  // hover 시 애니메이션 재시작
arrowWrapper.addEventListener('mouseenter', () => {
  arrowAni.restart();
  barAni.restart();  
});
barS1Wrapper.addEventListener('mouseenter', () => {
  barS1Ani.restart();  
});
barS2Wrapper.addEventListener('mouseenter', () => {
  barS2Ani.restart();    
});
arrow2.addEventListener('mouseenter', () => {
  arrow2Ani.restart();
});
aboutBorder1.addEventListener('mouseenter', () => {
  border1Ani.restart();
});
aboutBorder2.addEventListener('mouseenter', () => {
  border2Ani.restart();
});


