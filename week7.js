var vm = new Vue({
    el: "#app",
    data: {
      keyword: "",
      cards: [
        {
          link:"https://h5p.org/h5p/embed/107824",
          title: "排序看" ,
          width: "100%" ,
          height: "100%" 
          // width: "1090px" ,
          // height: "760px"         
        },
        {
          // link:"https://h5p.org/h5p/embed/554805",
          link:"https://www.tku.edu.tw",
            title: "找看看",
            width: "100%" ,
          height: "100%" 
            // width: "1090px" ,
            // height: "815px"

          },
          {
            link:"https://h5p.org/h5p/embed/231678",
            title: "配對",
            width: "1090px" ,
            height: "474px"
            
          },
          {
            link:"https://h5p.org/h5p/embed/707",
            title: "記憶",
            width: "1090px" ,
            height: "232px"
          },
          {
            link:"https://www.youtube.com/embed/BxwK92i93OE",
            title: "音樂",
            width: "100%" ,
            height: "100%"
            // width: "560px" ,
            // height: "315px"
          }

          
		],
    },
    
    mounted:function(){        
        swiper = new Swiper('.carousel', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            pagination: {
                el: '.swiper-pagination',
                type: "fraction",
            }
        })     

        }
  });
