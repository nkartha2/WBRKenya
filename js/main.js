$(document).ready(function(){

/////////////////////////////////preloading images 
////slide images = top slider images 
///donation-''.png = donation section images 
///wheel images = faces within the wheel progress bar

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
    "../img/home-inactive.png",
    "../img/home.png",
    "../img/home.png",
    "../img/foot-inactive.png",
    "../img/footprint-active.png",
    "../img/pencil-inactive.png",
    "../img/pencil-active.png",
    "../img/school-inactive.png",
    "../img/school-active.png",
    "../img/clock-inactive.png",
    "../img/time-active.png",
    "../img/dream-inactive.png",
    "../img/dream-active.png",
    "../img/donation-basics.png",
    "../img/donation-bike.png",
    "../img/donation-bike5.png",
    "../img/donation-bike10.png",
    "../img/donation-wheelset.png",
    "../img/donation-toolkit.png",
    "../img/wheel-1.png",
    "../img/wheel-2.png",
    "../img/wheel-3.png",
    "../img/wheel-4.png",
    "../img/wheel-5.png",
    "../img/wheel-6.png"
  );
  
  slider = undefined;
  windowsize = $(window).width();


 //////////////////////////////progress chart variables
 ///////////dollaramount= current number of dollars raised 
  ///////////targetBikes= number of bikes that WBR aims to raise 
  ////goal=what is animating the wheel progress bar 
  ////finaldegree=what point on the circle the progress bar is animating until 

  var dollarAmt, convBikes,goal, numBikes, targetBikes, degreeBikes, finalDegree, trackerTitle;

  dollarAmt=410000;
  targetBikes = 3000;
  convBikes = Math.floor(dollarAmt/147);
  goal= convBikes/3000;
  degreeBikes = 360/targetBikes;
  finalDegree = (convBikes*degreeBikes);


// // ///////////////////////////////days remaining timer 

  var d = new Date().getDate();
  var dday= 31-d;

  $('.progress em').html(dday);

//////////////////////////////circle diameter and circle progress diameter

///width of wheel 
var figureWidth=parseInt($('.progress figure img.wheel').width(),10);
///width of parent progress figure 
var figureParent = parseInt($('.progress').parent().width(),10);
///used for scaling wheel and images 
var diamnoprogress = (figureWidth/figureParent *200)+'%';
var radiusprogress = -5+figureWidth/2;
var svgWidth = $('#container').css('width', diamnoprogress);


//////////////////////////////donate image changing with form value

  var donImg = $('#donation');
  var activep=$('ol li.activep');

  $('#userdollars').keyup(function(){
      var userdoll= parseInt($('#userdollars').val(),10);
      console.log('userdoll '+userdoll);
      if(userdoll<=24)
        evaluateDonation("basics");
      else if(userdoll<=49)
        evaluateDonation("wheelset");
      else if(userdoll<=146)
        evaluateDonation("toolkit");
      else if(userdoll<=734)
        evaluateDonation("bike");
      else if(userdoll<=1469)
        evaluateDonation("bike5");
      else
        evaluateDonation("bike10");
  });

function evaluateDonation(level){
  donImg= donImg.attr('src', "img/donation-"+level+".png");
  $('ol li.activep').removeClass('activep');
  $('ol li#'+level).addClass('activep');
  $('ol li figcaption.activefig').removeClass('activefig');
  $('ol li#'+level+' figcaption').addClass('activefig');

  $donImg.attr('src',"img/donation-wheelset").css('width','60%');
}


//////////////////////////////donate image changing 
////please name donate images to "img/donation-"+".png"

  $('.donations figcaption').mouseenter(
      function(){
        console.log(this);
        var figpar=  $(this).parent();
        // var donImg = $('#donation'),
         var newImg= "img/donation-"+ figpar.attr('id')+".png";
        donImg.attr('src', newImg);
        console.log(donImg);
      }
  );

//////////////////////////////donate ol li p changing
  $('.donations figcaption').mouseenter(
      function(){
          $('ol li.activep').removeClass('activep');
          var figpar=  $(this).parent();
          figpar.addClass('activep');
        });

    $('.donations figcaption').mouseenter(
      function(){
          $('.donations figcaption.activefig').removeClass('activefig');
          $(this).addClass('activefig');
        });

//////////////////////////////mobile 

$('#mobileform').change(function(){
  var mobileLevel= $('#mobileform').val();
  console.log('mobileLevel '+mobileLevel);
  donImg= donImg.attr('src', "img/donation-"+mobileLevel+".png");
    $('ol li.activep').removeClass('activep');
  $('ol li#'+mobileLevel).addClass('activep');
});

// $('#mobileform').mousedown(function(){
//   $('#mobileform option').each(function(){
//     $(this).append($(this).data('focus'));
//   });
// });

// $('#mobileform').mouseup(function(){
//   $('#mobileform option').each(function(){
//     $(this).empty();
//     $(this).text($(this).data('blur'));
//   });
// });

//////////////////////////////bike animation with bxslider

 initSlider = function() {
    slider = $('.bxslider').bxSlider({
      // controls:false, 
      speed:2500,
      slideWidth:1440,
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

        nuPixels = parseInt((targetPixels),10)-5;
        console.log("bike "+nuPixels);

        pagerWidth = pager.width();

        var targetPercentage = nuPixels/pagerWidth * 100 + "%";
        console.log("bike "+targetPercentage);

  ///////////////////////////////bike animating from pager to pager 
        $("img.bike").animate(
          {"left": targetPercentage
        },{
          duration:900,
          easing: "swing"
         });

      },
      onSlideAfter : function($slideElement, oldIndex, newIndex){
      }
    });

////////////////////////////// Initial bike position 
  var pagItem0Left= parseInt($('.bx-pager-item-0 a').position().left,10)-11;

      var initTargetLeft = pagItem0Left/windowsize *100 +'%';
      $('img.bike').css('left',initTargetLeft);
      console.log(initTargetLeft + ' initTargetLeft');
  };
//////////////////////bxslider initiating and destroying according to windowsize

  sliderExists = function() {
    return (slider !== undefined);
  };

  sizeUpSlider = function() {
    if (windowsize < 670) {
      if (sliderExists()) {
        slider.destroySlider();
        slider = undefined;
      }
    } else {
      if (!sliderExists()) {
        initSlider();
      }
    }
  };

  sizeUpSlider(); // fire on load


  //////////////////////////////////////////size/diameter of circleprogress bar scaling 
    
  var checkWindowWidth = function() {
    var figureWidth=parseInt($('.progress figure img.wheel').width(),10);
// console.log('figureWidth ' + figureWidth);
var figureParent = parseInt($('.progress').parent().width(),10);
      if (windowsize < 480){
          diamnoprogress = -40 + (figureWidth/figureParent *200)+'%';
          svgWidth = $('#container').css('width', diamnoprogress);
          diamnoprogress2 = -43+(figureWidth/figureParent *200)+'%';
          $('img.wheel1').css('width', diamnoprogress2);
        } else if
       (windowsize < 610){
          diamnoprogress = -11+ (figureWidth/figureParent *200)+'%';
          svgWidth = $('#container').css('width', diamnoprogress);
          diamnoprogress2 = -12+(figureWidth/figureParent *200)+'%';
          $('img.wheel1').css('width', diamnoprogress2);
        }else if (windowsize < 680){
          diamnoprogress = -10 + (figureWidth/figureParent *200)+'%';
          svgWidth = $('#container').css('width', diamnoprogress);
           diamnoprogress2 = -13+(figureWidth/figureParent *200)+'%';
          $('img.wheel1').css('width', diamnoprogress2);
        }else if (windowsize < 750){
          diamnoprogress = -5 + (figureWidth/figureParent *200)+'%';
          svgWidth = $('#container').css('width', diamnoprogress);
           diamnoprogress2 = -7+(figureWidth/figureParent *200)+'%';
          $('img.wheel1').css('width', diamnoprogress2);
        }
        else if (windowsize < 811){
          diamnoprogress = -5 + (figureWidth/figureParent *200)+'%';
          svgWidth = $('#container').css('width', diamnoprogress);
           diamnoprogress2 = -7+(figureWidth/figureParent *200)+'%';
          $('img.wheel1').css('width', diamnoprogress2);
        }
        else if (windowsize < 820){
          diamnoprogress = 30+ (figureWidth/figureParent *200)+'%';
          svgWidth = $('#container').css('width', diamnoprogress);
           diamnoprogress2 = 27+(figureWidth/figureParent *200)+'%';
          $('img.wheel1').css('width', diamnoprogress2);
        }else if (windowsize < 835){
          diamnoprogress = 32 + (figureWidth/figureParent *200)+'%';
          svgWidth = $('#container').css('width', diamnoprogress);
          diamnoprogress2 = 27+(figureWidth/figureParent *200)+'%';
          $('img.wheel1').css('width', diamnoprogress2);
        }else if (windowsize<1100){
          diamnoprogress = 29+(figureWidth/figureParent *200)+'%';
          svgWidth = $('#container').css('width', diamnoprogress);
          diamnoprogress2 = 27+(figureWidth/figureParent *200)+'%';
          $('img.wheel1').css('width', diamnoprogress2);
        }else if (windowsize<1199){
          diamnoprogress = 31+(figureWidth/figureParent *200)+'%';
          svgWidth = $('#container').css('width', diamnoprogress);
          diamnoprogress2 = 28+(figureWidth/figureParent *200)+'%';
          $('img.wheel1').css('width', diamnoprogress2);
        }
        if (windowsize>1200){
          diamnoprogress = 38+(figureWidth/figureParent *200)+'%';
          svgWidth = $('#container').css('width', diamnoprogress);
           diamnoprogress2 = 35+(figureWidth/figureParent *200)+'%';
          $('img.wheel1').css('width', diamnoprogress2);
        }
    };

checkWindowWidth(); // fire on load

$( window ).resize(function(){ // fire on resize
  windowsize = $(window).width();
  checkWindowWidth(); // for diamnoprogress
  sizeUpSlider(); // for bxslider
});


////////////////////////////changing tracker bubble 
  trackerTitle= $('.tracker').html(convBikes + ' Bikes');

//////////////////////////////changing wheel images 

  $('img.wheel1').hide();

  function wheelPeople(){
  

    $('img.wheel1:nth-of-type(1)').delay(1000).fadeIn(1000);
    $('img.wheel1:nth-of-type(2)').delay(3000).fadeIn(1000);
    $('img.wheel1:nth-of-type(3)').delay(5000).fadeIn(1000);
    $('img.wheel1:nth-of-type(4)').delay(7000).fadeIn(1000);
    $('img.wheel1:nth-of-type(5)').delay(9000).fadeIn(1000);
    $('img.wheel1:nth-of-type(6)').delay(11000).fadeIn(1000);


    window.setTimeout(function(){$('img.wheel1').fadeOut(500);}, 16000);
    window.setTimeout(function(){$('.tracker').html(convBikes + ' Lives').css('background-color','#38a368');}, 1000);
  }

//////////////////////////////initiating circle progress with waypoints 

  $('.progress').waypoint(function() {
    var circle = new ProgressBar.Circle('#container', {
      color: '#000000',
      strokeWidth: 5,
      trailWidth: 5,
      duration: 2000
      });
     circle.animate(goal, function() {
      circle.animate(goal);
      var timeoutID = window.setTimeout(wheelPeople, 1000);
    });
    this.destroy();
    },
    {
      offset: 200
  });
});
