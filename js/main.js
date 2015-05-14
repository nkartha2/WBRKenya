$(document).ready(function(){

  var images = [];
  function preload() {
    for (i = 0; i < preload.arguments.length; i++) {
      images[i] = new Image();
      images[i].src = preload.arguments[i];
    }
  }
  preload(
    "../img/slide-1.jpg",
    "../img/slide-2.jpg",
    "../img/slide-3.jpg",
    "../img/slide-4.jpg",
    "../img/slide-5.jpg",
    "../img/slide-6.jpg",
    "../img/wheel-1.png",
    "../img/wheel-2.png",
    "../img/wheel-3.png",
    "../img/wheel-4.png",
    "../img/wheel-5.png",
    "../img/wheel-6.png"
  );


  $('.bxslider').bxSlider({
    // controls:false, 
    speed:1200,
    onSlideBefore : function($slideElement, oldIndex, newIndex){
      var pager, icons, targetPixels, nuPixels, targetParent, pagerWidth;
      pager = $('.bx-pager').eq(0);
      
          icons = [
                    $(".bx-pager-item-0 a"),
                    $(".bx-pager-item-1 a"),
                    $(".bx-pager-item-2 a"),
                    $(".bx-pager-item-3 a"),
                    $(".bx-pager-item-4 a"),
                    $(".bx-pager-item-5 a")
                     ];
      targetPixels =icons[newIndex].css('left');
      console.log("bike "+targetPixels);

      nuPixels = parseInt((targetPixels),10);
      console.log("bike "+nuPixels);

      pagerWidth = pager.width();

      var targetPercentage = nuPixels/pagerWidth * 100 + "%";
      console.log("bike "+targetPercentage);

       // $("img.bike").click(function(){
      $("img.bike").animate(
        {"left": targetPercentage
      },{
        duration:800,
        easing: "swing"
       });

     // });

      // $("img.bike").animate(
      //   $("img.bike").css("left", targetPercentage));

    },
    onSlideAfter : function($slideElement, oldIndex, newIndex){
    }
  });

  //scroll to function 
    //   $(this).waypoint(function() {
    //     $(this).addClass('scrolled-to');
    //   });
    // });

   // progress chart 

  var dollarAmt, convBikes, numBikes, targetBikes, degreeBikes, finalDegree, trackerTitle;

  dollarAmt= 300555;
  targetBikes = 3000;

  convBikes = Math.floor(dollarAmt/147);
  console.log("convBikes "+convBikes);
  trackerTitle= $('.tracker').html(convBikes + ' Bikes');
  degreeBikes = 360/targetBikes;
  finalDegree = (convBikes* degreeBikes);



////changing tracker bubble 
  $('.tracker').hover(
    function() {
    $(this).hide().html(convBikes + ' Lives').fadeIn(300).css('background-color','#e5222f');
  },
      function(){
      $(this).hide().html(convBikes + ' Bikes').fadeIn(300).css('background-color','#38a368');
  }
  );

   var replaceImg;

   var livesImg =[
      "img/wheel-1.png",
      "img/wheel-2.png",
      "img/wheel-3.png",
      "img/wheel-4.png",
      "img/wheel-5.png",
      "img/wheel-6.png"
    ];

   $('.tracker')
      .mouseenter(
      function(){
       replaceImg = livesImg[ Math.floor( Math.random() * 6 ) ];
      console.log(replaceImg);
          $('img.circle').hide().attr("src", replaceImg).fadeIn(300);
      })
    .mouseleave(function(){
      $('img.circle').hide().attr("src", "img/wheel.png").fadeIn(300);
    }
    );     

    $('#circle').circleProgress({
        // value: 0.75,
        value: convBikes/targetBikes,
        thickness:20,
        size: 450,
        startAngle: 1.5*Math.PI,
        fill: {
            gradient: ["#000"]
        }
    });


    var ieRotate = new function () {
      var me = this,
         tracker = $(".tracker"),
          initialPosition,
          finalPosition=finalDegree * (Math.PI/180),
          radius = 220;
      

      console.log(finalPosition);
    /* 
     * Tracker animation
     */
    me.init = function () {
        // Caches the jQuery object for performance reasons.
        $tracker = $(".tracker");
        
        initialPosition = {
            x: parseInt( $tracker.css('left'),10),
            y: parseInt( $tracker.css('top'),10)
        };
        
        // starts the animation.
        rotateOnce();
    };
    
    function rotateOnce() {  
       $tracker.css('text-indent', 0);
        $tracker.animate(
            {
                'text-indent':finalDegree * (Math.PI/180)
            }, {
                
               step:function (now) {
                 $tracker.css('left', initialPosition.x + radius * Math.sin(now))
                           .css('top', initialPosition.y - radius * Math.cos(now))
                },
                duration: 1005,
                easing: 'linear'
               // , complete: rotateOnce
            }
        );
    }
}

$(document).ready(ieRotate.init);




  //   $(".tracker").hover(
  //   function(){
  //       trackerTitle=$(this).html(convBikes + ' Bikes');
  //       // var circleImg = $('#circle'),
  //       //     livesImg= "img/slide-1.jpg";
  //       //   livesImg.css('border-radius', '50%')
  //       //   .css('position', 'absolute').css('right',);
  //       },

  //   function(){
  //      trackerTitle= $('.tracker').html(convBikes + ' Lives');}
  // );

    // Optimalisation: Store the references outside the event handler:
    // var windowsize = $(window).width();

    //   function checkWindowwidth() {
    //     if (windowsize < 440){
    //     //if the window is greater than 440px wide then reduce size of circle 
    //      $('#circle').circleProgress({
    //         size:350
    //       });
    //       }
    // }
    // // Execute on load
    // checkWindowwidth();
    // // Bind event listener
    // $(window).resize(checkWidth);

    // $('.tracker').circleProgress({
    //         startAngle:1.5*Math.PI,
    //         value:50,
    //         canvas:false
    //     });

// http://www.webreference.com/js/column18/circle.html

  // var radius, angle0, steps, x, y;

  // function circle(radius, angle0, steps){
  //   var dangle = finalDegree - angle0;
  //   var sangle = dangle / steps;

  //   // var sangle = finalDegree/steps;

  //   // console.log("dangle "+dangle);
  //   console.log("finalDegree "+finalDegree);

  //   var x = parseInt($('.tracker').css("left"),10);
  //   console.log("x "+x);
  //   // var x = this.css("left");
  //   var y = parseInt($('.tracker').css("top"),10);
  //   console.log("y "+y);
    
  //   var tracker = $('.tracker'),
  //       parent = tracker.parent();

  //   function pos(x, y) {
  //     // $('.tracker').x = Math.round(x);
  //     // $('.tracker').y = Math.round(y);
  //     var newX, newY;

  //     // newX = x/parent.width()  +"px";
  //     // newY = y/parent.height() +"px";

  //     newX = x/parent.width() * 100 + "%";
  //     newY = y/parent.height() * 100 + "%";

  //     console.log(newY);
  //     console.log(newX);


  //     // $('.tracker').offset({
  //     //   top: newY,
  //     //   left: newX
  //     // });
  //     tracker.css('top', newY).css('left', newX);
    
  // }

  //   var cx = x +radius * Math.cos(angle0 * Math.PI / 180);
  //   // console.log("cx "+cx);
  //   var cy = y + radius * Math.sin(angle0 * Math.PI / 180);
  //    // console.log("cy "+cy);
  //   var ar = [];

  //   for (var i = 0; i < steps; i++) {

  //     console.log('degreeBikes '+degreeBikes);
  //     angle0 += sangle;
  //     // angle0 =finalDegree;
  //     console.log("angle0 "+angle0);
  //     x = cx + radius * Math.sin(angle0 * Math.PI / 180);
  //        console.log("x "+x);
  //     y = cy - radius * Math.cos(angle0 * Math.PI / 180);
  //      console.log("y "+y);
  //     // ar[i] = new $('.tracker').pos(x, y);
  //     // ar[i] = new pos(x, y);

  //     // console.log(ar);
  //     pos(x, y);
  //     // console.log(ar);
  //   }
  //    function step() {
  //   $('.tracker').moveTo(this.path[this.num].x, this.path[this.num].y);
  //   if (this.num >= this.path.length - 1) {
  //     clearInterval(this.timer);
  //     this.active = 0;
  //     if (this.statement)
  //       eval(this.statement);
  //   } else {
  //     this.num++;
  //   }
  // }
    // $('.tracker').path = ar;
     // $('.tracker').animate(ar, 500);

    // this.statement = (statement) ? statement : null;
    // this.animate(5000);
  

  // circle(100, -90, 10);

  // (('.tracker').getElementsByClassName).circle(600, 0, -90, 1000);
   // radius:600,
   //  angle0:0,
   //  angle1:-90,
   //  steps:1000
  // });

  // console.log("finalDegree "+finalDegree);
  // var angle = finalDegree,
  //   radius = 100,
  //   trans = 'translate(-50%,-50%) rotate('+angle+'deg) translateY(-'+radius+'px) rotate(-'+angle+'deg)';
  // $('.tracker').css('transform',trans);


  //donate image changing 
  $('.donations').mouseenter(
      function(){
        var donImg = $('#donation'),
            newImg= "img/donation-"+ this.id +".png";
        donImg.attr('src', newImg);
      }
  );

  $('li.donations').mouseenter(
    function(){
        $('ol li.activep').removeClass('activep');
        $(this).addClass('activep');
      });
    // $('.nav-list li.active').removeClass('active');
    //   $(this).addClass('active');



});