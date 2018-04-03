//initial

function Player(player_number){

  this.total = function(){
    return this.level + this.gear;
  }

  this.reset = function(){
    this.level = 1;
    this.gear = 0;
    this.name = "Player" + player_number;
    this.total();

    $(".player_name")[player_number-1].innerHTML = this.name;
    $(".editable_name")[player_number-1].innerHTML = this.name;
    $(".level")[player_number-1].innerHTML = 1;
    $(".gear")[player_number-1].innerHTML = 0;
    $(".level_value")[player_number-1].innerHTML = 1;
    $(".gear_value")[player_number-1].innerHTML = 0;
    $(".strength")[player_number-1].innerHTML = 1;
  }

  this.reset();

}

var players = [];
var count_current_players = 0;
for(i=0;i<6;i++){
  var player = new Player(i+1);
  players[i] = player;
}

/*add player*/

$(".add-player-card")[0].onclick =  function(){add_player();}

function add_player(){

  count_current_players += 1;

  for(i = 5;i >= 0;i--){

    if(!$(".player")[i].style.display){
      var add = i;
    }

  }

  if(count_current_players === 6){
    $(".add-player-card")[0].style.display = "none";
  }

  $(".player")[add].style.display = "inline-flex";

}

/*delete player*/

function delete_player(player_number){
  if($(".add-player-card")[0].style.display === "none"){
    $(".add-player-card")[0].style.display = "inline-flex";
  }
  players[player_number].reset();
  count_current_players -= 1;

  $(".player")[player_number].style.display = "";

}

///player name

function edit_player_name(player_number){
  $(".editable_name")[player_number].innerHTML =
  '<input  class = "edit_input" id = "edit'+player_number+'" type = "text" value = "' + players[player_number].name + '" maxlength = "25">' +
  '<button class = "edit_name_button" onclick ="change_player_name('+player_number+')"><i class = "icon-level-up"></i></button>'
  ;
}

function change_player_name(player_number){
  var new_name = document.getElementById("edit"+player_number).value;
  new_name = new_name.replace(/<[\w\d\/]{1,}>|[^\wąęćóśńłźż]/g,"").trim();
  if (new_name){
    players[player_number ].name = new_name;
    $(".editable_name")[player_number ].innerHTML = players[player_number ].name;
    $(".player_name")[player_number ].innerHTML = players[player_number ].name;
  }
}


//stats changing


function plus(player_number,stat_type){

  if(stat_type === 'level'){
    players[player_number].level += 1;
    $(".level")[player_number].innerHTML = players[player_number].level;
    $(".level_value")[player_number].innerHTML = players[player_number].level;

    if (players[player_number].level === 9){
      for(i=player_number*4;i<player_number*4+4;i++){
        $(".alert-target")[i].classList.add("alert");
      }
    }
    else if(players[player_number].level === 10){
      for(i=player_number*4;i<player_number*4+4;i++){
        $(".alert-target")[i].classList.remove("alert");
      }
    }
  }

  else{
    players[player_number].gear += 1;

    $(".gear")[player_number].innerHTML = players[player_number].gear;
    $(".gear_value")[player_number].innerHTML = players[player_number].gear;
  }

  $(".strength")[player_number].innerHTML = players[player_number].total();
}

function minus(player_number,stat_type){
  if(stat_type === 'level'){
    if(players[player_number].level >1){
      if (players[player_number].level === 9){
        for(i=player_number*4;i<player_number*4+4;i++){
          $(".alert-target")[i].classList.remove("alert");
        }
      }

      players[player_number].level -= 1;

      $(".level")[player_number].innerHTML = players[player_number].level;
      $(".level_value")[player_number].innerHTML = players[player_number].level;
    }
  }
  else{
    if(players[player_number].gear>0){
      players[player_number].gear -= 1;
      $(".gear")[player_number].innerHTML = players[player_number].gear;
      $(".gear_value")[player_number].innerHTML = players[player_number].gear;
    }
  }

  $(".strength")[player_number].innerHTML = players[player_number].total();
}
