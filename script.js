//loader check
$(function(){

//basic unit constructor. Arguments supplied by subconstructors
var Unit = function(d, h, s, a, r, id) {
  {
    this.side=d;
    this.health=h;
    this.speed=s;
    this.aim=a;
    this.range=r;
    this.id = id;
    this.attack = function(victim){
      if(this.range > Math.floor((Math.random()*100))){
        victim.health-=3;
      }
      else{
        alert("Missed!")
      }
    }
  }
}

//to make adjusting stats easier.
var accChart = {rookie: 65, squaddie: 70, sergeant: 75}
var healthChart = {rookie: 1, squaddie: 2, sergeant: 3}



//creates initial board state.

  var ayyone = new Unit("alien", healthChart.rookie, 3, accChart.rookie, 3, "alien_1")
  var ayytwo = new Unit("alien", healthChart.rookie, 3, accChart.rookie, 3, "alien_2")
  var xone = Unit("human", healthChart.rookie, 3, accChart.rookie, 3, "human_1")
  var units = [[ayyone, ayytwo],[xone]]
var boardBuilder = function(){
  var ayythree = new Unit("alien", healthChart.rookie, 3, accChart.rookie, 3, "alienthree")
  var xtwo = Unit("human", healthChart.rookie, 3, accChart.rookie, 3, "humanone")
  var xthree = Unit("human", healthChart.rookie, 3, accChart.rookie, 3, "humanone")
  console.log(ayyone['health'])
  console.log(ayytwo)
  $('#11').append('<div class = alien id = '+ayyone.id+'>')
  $('#21').append('<div class = alien id = '+ayytwo.id+'>')
}
boardBuilder();

//dom -> js converter, returns unit object
var jsConvert = function (id){
  var split = id.split("_");
  var index = Number(split[1])-1;

  if (split[0]==="alien"){
    return units[0][index];
  }
  else{
    return units[1][index];
  }
}

//keeps track of turn, in string form for easier use with dom and js IDs.
var turnTrack = "alien";
var enemy = "human";

var alienSelector = $(".alien").on('click',function(){
  var sideCheck = $(this).attr('id');
  if (sideCheck.split("_")[0]===turnTrack){
    alienSelector = sideCheck;
  }
  else {
    alert("You can't command the enemy.")
  }
  console.log(alienSelector)
})

var attacking = false;

$('#attack').on('click', function(){
  if (attacking === false){
    attacking = true;
    var $location = $('#'+alienSelector).parent();
    var $idNum = Number($location.attr('id'))
    var attacker = jsConvert(alienSelector);
    var range = jsConvert(alienSelector)
    $('.tile').on('click',function(event){
      var $clickTarget = $(event.target);
      if ($clickTarget.hasClass(turnTrack)){
        var $targId = $clickTarget.attr('id')
        var target = jsConvert($targId)
        attacker.attack(target)
        //run attacker method here.
      }
      else {
        alert('Invalid target')
      }
      // var sideCheck = $(this).attr('id');
      // var location
      // if(sideCheck.split('_')[0]===attacker.side){
      //   alert('Friendly Fire!');
      // }
      // else if ($('#'+this+" > .alien").length===0){

      // }
    })
  }
  else {
    attacking = false;
    // to remove the event listeners if the attack is canceled
    // $('.tile').removeEventListener(name)
  }
})

$('#right').on('click',function(){
  var $currentLocation = $('#'+alienSelector).parent();
  var $newLocation = Number($currentLocation.attr("id")) + 10;
  console.log($newLocation)
  if($('#'+$newLocation+" > .alien").length!=0){

      }
  else{
  $('#'+alienSelector).appendTo("#"+$newLocation)
}
})

$('#left').on('click',function(){
  var $currentLocation = $('#'+alienSelector).parent();
  var $newLocation = Number($currentLocation.attr("id")) - 10;
  console.log($newLocation)
  if($('#'+$newLocation+" > .alien").length!=0){
      }
  else{
  $('#'+alienSelector).appendTo("#"+$newLocation)
}
})

$('#up').on('click',function(){
  var $currentLocation = $('#'+alienSelector).parent();
  var $newLocation = Number($currentLocation.attr("id")) - 1;
  console.log($newLocation)
  if($('#'+$newLocation+" > .alien").length!=0){
      }
  else{
  $('#'+alienSelector).appendTo("#"+$newLocation)
}
})

$('#down').on('click',function(){
  var $currentLocation = $('#'+alienSelector).parent();
  var $newLocation = Number($currentLocation.attr("id")) + 1;
  console.log($newLocation)
  if($('#'+$newLocation+" > .alien").length!=0){
    console.log('asdf')
      }
  else{
  $('#'+alienSelector).appendTo("#"+$newLocation)
}
})

})
