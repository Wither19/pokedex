var i = 1;
const numberInput = document.querySelector("#no");

$(".prev").click(function() {
  i--;
});

$(".next").click(function() {
  i++;
});

$(document).keydown(function(e) {
  if (e.which == 37) {
    i--;
    pkmnLoad();
  } else if (e.which == 39) {
    i++;
    pkmnLoad();
  } else if (e.which == 38) {
    e.preventDefault();
    i -= 10;
    pkmnLoad();
  } else if (e.which == 40) {
    e.preventDefault();
    i += 10;
    pkmnLoad();
  }
});

function pkmnLoad() {
  if (i <= 0) {
    i = 1;
  } else if (i > 0 && i < 152) {
    $(".region").html('<img src="https://pfq-static.com/img/dex/flags/all.svg/t=1674162478#kanto"> Kanto')
  } else if (i > 151 && i < 252) {
    $(".region").html('<img src="https://pfq-static.com/img/dex/flags/all.svg/t=1674162478#johto"> Johto')
  } else if (i > 251 && i < 387) {
    $(".region").html('<img src="https://pfq-static.com/img/dex/flags/all.svg/t=1674162478#hoenn"> Hoenn')
  } else if (i > 386 && i < 494) {
    $(".region").html('<img src="https://pfq-static.com/img/dex/flags/all.svg/t=1674162478#sinnoh"> Sinnoh')
  } else if (i > 493 && i < 650) {
    $(".region").html('<img src="https://pfq-static.com/img/dex/flags/all.svg/t=1674162478#unova"> Unova')
  } else if (i > 649 && i < 722) {
    $(".region").html('<img src="https://pfq-static.com/img/dex/flags/all.svg/t=1674162478#kalos"> Kalos')
  } else if (i > 721 && i < 810) {
    $(".region").html('<img src="https://pfq-static.com/img/dex/flags/all.svg/t=1674162478#alola"> Alola')
  } else if (i > 809 && i < 899) {
    $(".region").html('<img src="https://pfq-static.com/img/dex/flags/all.svg/t=1674162478#galar"> Galar')
  } else if (i > 898 && i < 906) {
    $(".region").html('Hisui')
  } else if (i > 905 && i < 1026) {
    $(".region").html('<img src="https://pfq-static.com/img/dex/flags/all.svg/t=1674162478#paldea"> Paldea')
  }
  fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(response => response.json()).then(data => {
    // Getting Pokémon data from API, showing in markup
    $(".pokemon-name").html(`#${data.id} - ${data.name}`),

      $(".pokemon-sprite").attr("src", `https://raw.githubusercontent.com/Wither19/pokesprite/master/pokemon-gen8/regular/${data.name}.png`),

      $(".pokemon-artwork").attr("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i}.png`),

      $(".shiny-artwork").attr("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${i}.png`),

      $(".shiny-sprite").attr("src", `https://raw.githubusercontent.com/Wither19/pokesprite/master/pokemon-gen8/shiny/${data.name}.png`),

      $(".types").html(""),

      $(".types").prepend(`<span class="Type ${data.types[0].type.name}">${data.types[0].type.name}</span>`),

      $(".types").append(`<span class="Type ${data.types[1].type.name}">${data.types[1].type.name}</span>`),

	$(".stats").html("");

      $(".stats").append(`
	  <span class="hp">${data.stats[0].stat.name}: ${data.stats[0].base_stat}</span>
      <span class="atk">Atk: ${data.stats[1].base_stat}</span>
      <span class="def">Def: ${data.stats[3].base_stat}</span>
      <span class="sp-atk">Sp-Atk: ${data.stats[2].base_stat}</span>
      <span class="sp-def">Sp-Def: ${data.stats[4].base_stat}</span>
      <span class="spd">Spd: ${data.stats[5].base_stat}</span>`),

	$(".abilities").html(""),
	
	$(".abilities").append(`
	<span class="norm">${data.abilities[0].ability.name}</span>
      <span class="hidden"><span style="font-weight: bold">(H)</span> ${data.abilities[1].ability.name}</span>`),
	  
      $("audio").attr("src", data.cries.latest),
	  
	$(".tidbits").html(""),
	
	$(".tidbits").append(`
	<span class="height">${Math.floor(data.height / 3.048)} ft.</span>
	<span class="weight">${Math.floor(data.weight / 4.536)} lbs.</span>`)
  });

}

document.querySelector(".prev").addEventListener("click", pkmnLoad);

document.querySelector(".next").addEventListener("click", pkmnLoad);

function changeIToSomething() {
  let daValue = numberInput.value.toLowerCase();
  i = daValue;
  pkmnLoad();
}

$(document).keydown(function(e) {
  if (e.which == 67) {
    document.querySelector("audio").play();
  }
});

$("#no").keydown(function(e) {
  if (e.which == 13) {
    changeIToSomething();
  }
});

$(".stats-header").click(function() {
  $(".stats").toggleClass("show");
});

$(".abilities-header").click(function() {
  $(".abilities").toggleClass("show");
});

$(".tidbits-header").click(function() {
  $(".tidbits").toggleClass("show");
});

$(document).keydown(function(e) {
  if (e.which == 83) {
    $(".pokemon-artwork").toggleClass("hide");
    $(".pokemon-sprite").toggleClass("hide");
    $(".shiny-artwork").toggleClass("show");
    $(".shiny-sprite").toggleClass("show");
  }
});

$(".shinyToggle").click(function() {
  $(".pokemon-artwork").toggleClass("hide");
  $(".pokemon-sprite").toggleClass("hide");
  $(".shiny-artwork").toggleClass("show");
  $(".shiny-sprite").toggleClass("show");
});

$(document).keydown(function(e) {
  if (e.which == 77) {
    $(".sprite-wrapper").toggleClass("hide");
  }
});

$(".tinySprite").click(function() {
  $(".sprite-wrapper").toggleClass("hide");
});

$(document).keydown(function(e) {
  if (e.which == 82) {
    surprise();
  }
});

function surprise() {
  i = Math.floor(Math.random() * 1025) + 1;
  pkmnLoad();
}

$(document).keydown(function(e) {
  if (e.which == 86) {
    callVariants();
  }
});

$(".variantToggle").click(function() {
  callVariants();
});

function callVariants() {

  // Calling Alolan, Galarian, Hisuian, Paldean 'Mons and Megas when 'v' is pressed
  if (i == 3) {
    i = 10033;
  } else if (i == 6) {
    i = 10034;
  } else if (i == 10034) {
    i = 10035;
  } else if (i == 9) {
    i = 10036;
  } else if (i == 15) {
    i = 10090;
  } else if (i == 18) {
    i = 10073;
  } else if (i == 19) {
    i = 10091;
  } else if (i == 20) {
    i = 10092;
  } else if (i == 26) {
    i = 10100;
  } else if (i == 27) {
    i = 10101;
  } else if (i == 28) {
    i = 10102;
  } else if (i == 37) {
    i = 10103;
  } else if (i == 38) {
    i = 10104;
  } else if (i == 50) {
    i = 10105;
  } else if (i == 51) {
    i = 10106;
  } else if (i == 52) {
    i = 10107;
  } else if (i == 10107) {
    i = 10161;
  } else if (i == 53) {
    i = 10108;
  } else if (i == 58) {
    i = 10229;
  } else if (i == 59) {
    i = 10230;
  } else if (i == 65) {
    i = 10037;
  } else if (i == 74) {
    i = 10109;
  } else if (i == 75) {
    i = 10110;
  } else if (i == 76) {
    i = 10111;
  } else if (i == 77) {
    i = 10162;
  } else if (i == 78) {
    i = 10163;
  } else if (i == 79) {
    i = 10164;
  } else if (i == 80) {
    i = 10165;
  } else if (i == 10165) {
    i = 10071;
  } else if (i == 83) {
    i = 10166;
  } else if (i == 88) {
    i = 10112;
  } else if (i == 89) {
    i = 10113;
  } else if (i == 94) {
    i = 10038;
  } else if (i == 100) {
    i = 10231;
  } else if (i == 101) {
    i = 10232;
  } else if (i == 103) {
    i = 10114;
  } else if (i == 105) {
    i = 10115;
  } else if (i == 110) {
    i = 10167;
  } else if (i == 115) {
    i = 10039;
  } else if (i == 122) {
    i = 10168;
  } else if (i == 127) {
    i = 10040;
  } else if (i == 128) {
    i = 10250;
  } else if (i == 10250) {
    i = 10251;
  } else if (i == 10251) {
    i = 10252;
  } else if (i == 130) {
    i = 10041;
  } else if (i == 142) {
    i = 10042;
  } else if (i == 144) {
    i = 10169;
  } else if (i == 145) {
    i = 10170;
  } else if (i == 146) {
    i = 10171;
  } else if (i == 150) {
    i = 10043;
  } else if (i == 10043) {
    i = 10044;
  } else if (i == 157) {
    i = 10233;
  } else if (i == 181) {
    i = 10045;
  } else if (i == 194) {
    i = 10253;
  } else if (i == 199) {
    i = 10172;
  }

  // Toggling back to original 'Mon for endless cycling
  else if (i == 10033) {
    i = 3;
  } else if (i == 10035) {
    i = 6;
  } else if (i == 10036) {
    i = 9;
  } else if (i == 10090) {
    i = 15;
  } else if (i == 10073) {
    i = 18;
  } else if (i == 10091) {
    i = 19;
  } else if (i == 10092) {
    i = 20;
  } else if (i == 10100) {
    i = 26;
  } else if (i == 10101) {
    i = 27;
  } else if (i == 10102) {
    i = 28;
  } else if (i == 10103) {
    i = 37;
  } else if (i == 10104) {
    i = 38;
  } else if (i == 10105) {
    i = 50;
  } else if (i == 10106) {
    i = 51;
  } else if (i == 10161) {
    i = 52;
  } else if (i == 10108) {
    i = 53;
  } else if (i == 10229) {
    i = 58;
  } else if (i == 10230) {
    i = 59;
  } else if (i == 10037) {
    i = 65;
  } else if (i == 10109) {
    i = 74;
  } else if (i == 10110) {
    i = 75;
  } else if (i == 10111) {
    i = 76;
  } else if (i == 10162) {
    i = 77;
  } else if (i == 10163) {
    i = 78;
  } else if (i == 10164) {
    i = 79;
  } else if (i == 10071) {
    i = 80;
  } else if (i == 10166) {
    i = 83;
  } else if (i == 10112) {
    i = 88;
  } else if (i == 10113) {
    i = 89;
  } else if (i == 10038) {
    i = 94;
  } else if (i == 10231) {
    i = 100;
  } else if (i == 10232) {
    i = 101;
  } else if (i == 10114) {
    i = 103;
  } else if (i == 10115) {
    i = 105;
  } else if (i == 10167) {
    i = 110;
  } else if (i == 10039) {
    i = 115;
  } else if (i == 10168) {
    i = 122;
  } else if (i == 10040) {
    i = 127;
  } else if (i == 10252) {
    i = 128;
  } else if (i == 10041) {
    i = 130;
  } else if (i == 10042) {
    i = 142;
  } else if (i == 10169) {
    i = 144;
  } else if (i == 10170) {
    i = 145;
  } else if (i == 10171) {
    i = 146;
  } else if (i == 10044) {
    i = 150;
  } else if (i == 10233) {
    i = 157;
  } else if (i == 10045) {
    i = 181;
  } else if (i == 10253) {
    i = 194;
  } else if (i == 10172) {
    i = 199;
  } else {
    alert("This Pokémon does not have another variant!");
  }

  pkmnLoad();
}

