window.addEventListener("load", function(){
    let header=document.querySelector("#header");
    let menuArea=header.firstElementChild; // #header .menu_zone
    let gnb=menuArea.querySelector("#gnb"); // #header .menu_zone #gnb
    let gnbList=gnb.querySelectorAll("li"); // #header .menu_zone #gnb li
 
    let mobile=menuArea.querySelector(".mobile"); // #header .menu_zone .mobile
    let mobileGnb=mobile.querySelector("#m_gnb"); // #header .menu_zone .mobile #m_gnb
    let mobileGnbList=mobile.querySelectorAll("li"); // #header .menu_zone .mobile #m_gnb li
 
    let tab=menuArea.querySelector(".tab");
    let dim=menuArea.querySelector(".dim");
    let btnTop=document.querySelector(".btn_top");
 
    let section=this.document.querySelectorAll("section");

    let isMobile;

    function resizeTest(){
        if(window.innerWidth > 720){
            if(isMobile != "desktop") isMobile= "desktop";
        }
        else{
            if(isMobile != "mobile") isMobile= "mobile";
        }
    };
    
    resizeTest(); //처음에 값을 가집니다.

    window.addEventListener("resize", function(){
        resizeTest();

        if(window.innerWidth > 720){
            tab.classList.remove("active");
            mobile.classList.remove("active");
            dim.classList.remove("active");
        }
    });

    function controlMenu(n){
        // console.log(n);

        gnbList.forEach(function(item, i){
        if(i == n){
            gnbList[i].classList.add("active");
        }
        else{
            gnbList[i].classList.remove("active");
        }
        });

        if(n != 0){ //header 구간이 아닐 떄
        menuArea.classList.add("fixed"); //menu_zone
        btnTop.classList.add("active"); //fixed 상태인 버튼
        }
        else{
        menuArea.classList.remove("fixed");
        btnTop.classList.remove("active");
        }
    }

    // 1) 페이지 구조를 작성했습니다.
    let pageList=[header, ...section];

    //console.log(pageList);

    // 2) 메뉴 활성화를 시킵니다. scrollTigger를 사용해서 만듭니다.
    pageList.forEach(function(item, i){
        console.log(item, i);
        gsap.timeline({
            scrollTrigger:{
                trigger: item,
                start: "top center",
                end: "bottom center",
                //markers: true,
                onEnter: function(){
                    console.log("enter :"+i);
                    controlMenu(i);
                },
                onEnterBack: function(){
                    console.log("enter back :"+i);
                    controlMenu(i);
                }
            }
        });
    });

    // 3) tab 클릭으로 이동합니다. scrollTo 이동입니다.
    let topPos=0;

    tab.addEventListener("click", function(e){
        e.preventDefault(); 
  
        tab.classList.toggle("active");
        mobile.classList.toggle("active");
        dim.classList.toggle("active");
    });

    gnbList.forEach(function(item, i){
        gnbList[i].addEventListener("click", function(e){
           e.preventDefault();
  
           topPos=pageList[i].offsetTop;
  
           // console.log(topPos);
  
           gsap.to(window, { scrollTo: topPos, duration: 0.4 });
        });
  
        mobileGnbList[i].addEventListener("click", function(e){
           e.preventDefault();
  
           topPos=pageList[i].offsetTop;
  
           gsap.to(window, { scrollTo: topPos, duration: 0.4, onComplete: function(){
              tab.classList.remove("active");
              mobile.classList.remove("active");
              dim.classList.remove("active");
           }});
        });
     });
  
     btnTop.addEventListener("click", function(e){
        e.preventDefault();
  
        gsap.to(window, { scrollTo: 0, duration: 0.4 });
     });

    // 4) GASP 애니메이션을 카테고리마다 지정합니다.
    // 4-1) header
    const startTl=gsap.timeline();

    //set() / to() / fromTo() / from()
    startTl.from(".text_zone p", {
        y: 30,
        opacity: 0,
        duration: 0.6
    });

    startTl.from(".text_zone h2", {
        y: 30,
        opacity: 0,
        duration: 0.6
    });

    startTl.from(".text_zone .more", {
        y: 30,
        opacity: 0,
        duration: 0.6
    });

    // 4-2) business
    const businessTl=gsap.timeline({
        scrollTrigger:{
            trigger: "#business",
            start: "top center",
            end: "bottom center"
        }
    });

    let businessList=document.querySelectorAll("#business li");

    businessList.forEach(function(item, i){
        if(i%2 == 0){ //짝수
            businessTl.from(item, { y: 100, opacity: 0, duration: 0.3 });
        }
        else{ //홀수
            businessTl.from(item, { y: -100, opacity: 0, duration: 0.3 });
        }
    });

    //짝수, 홀수를 계산해 봅시다.
    console.log(10/2); //5
    console.log(10%2); //0

    // % : 나머지 연산자입니다.
    // 4-3) portfolio
    const portfolioTl=gsap.timeline({
        scrollTrigger:{
            trigger: "#portfolio",
            start: "top center",
            end: "bottom center",
        }
    });
    let portfolioList=document.querySelectorAll("#portfolio li");

    portfolioList.forEach(function(item, i){
        portfolioTl.from(item, { y: 100, opacity: 0, duration: 0.2 });
    });

    // 4-4) service
    const serviceTl=gsap.timeline({
        scrollTrigger:{
            trigger: "#service",
            start: "top center",
            end: "bottom center",
        }
    });

    let serviceList=document.querySelectorAll("#service li");

    serviceList.forEach(function(item, i){
        if(i%2 == 0){ //짝수
            serviceTl.from(item, { x: 100, opacity: 0, duration: 1.2, ease: "power2.out" });
        }
        else{ //홀수
            serviceTl.from(item, { x: -100, opacity: 0, duration: 1.2, ease: "power2.out" });
        }
    });

    // 4-5) contact
    const contactTl=gsap.timeline({
        scrollTrigger:{
            trigger: "#contact",
            start: "top center",
            end: "bottom center",
        }
    });

    contactTl.from("#name", { y: 30, opacity: 0, duration: 0.4 });

	contactTl.from("#email", { y: 30, opacity: 0, duration: 0.4 });

	contactTl.from("#subject", { y: 30, opacity: 0, duration: 0.4 });

	contactTl.from(".text_wrap", { y: 30, opacity: 0, duration: 0.4 });

	contactTl.from(".submit", { y: 30, opacity: 0, duration: 0.4 });


    gsap.to("body", {
        backgroundColor: "#0C0F1C",
        scrollTrigger: {
          trigger: "#targetSection",
          start: "top center",
          end: "bottom center",
          scrub: true
        }
    });
 });