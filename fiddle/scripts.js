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
  }
});

function pkmnLoad() {
  fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .then(response => response.json())
    .then(data => {
        $(".pokemon-name").html(`#${data.id} - ${data.name}`),
        $(".pokemon-sprite").attr("src", `https://raw.githubusercontent.com/Wither19/pokesprite/master/pokemon-gen8/regular/${data.name}.png`),

        $(".pokemon-artwork").attr("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i}.png`),

        $(".shiny-artwork").attr("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${i}.png`),

        $(".shiny-sprite").attr("src", `https://raw.githubusercontent.com/Wither19/pokesprite/master/pokemon-gen8/shiny/${data.name}.png`),

        $(".types").html(""),

        $(".types").prepend(`<span class="Type ${data.types[0].type.name}">${data.types[0].type.name}</span>`),

        $(".types").append(`<span class="Type ${data.types[1].type.name}">${data.types[1].type.name}</span>`),

        $(".hp").html(`${data.stats[0].stat.name}: ${data.stats[0].base_stat}`),

        $(".atk").html(`Atk: ${data.stats[1].base_stat}`),

        $(".sp-atk").html(`Sp-Atk: ${data.stats[2].base_stat}`),

        $(".def").html(`Def: ${data.stats[3].base_stat}`),

        $(".sp-def").html(`Sp-Def: ${data.stats[4].base_stat}`),

        $(".spd").html(`Spd: ${data.stats[5].base_stat}`),

        $(".normal").html(`${data.abilities[0].ability.name}`),

        $(".hidden").html(`<span style="font-weight: bold">(H)</span> ${data.abilities[1].ability.name}`)
      if (data.types.length == 1) {
        alert("pootis");
      }

    });

}

document.querySelector(".prev").addEventListener("click", pkmnLoad);

document.querySelector(".next").addEventListener("click", pkmnLoad);

function changeIToSomething() {
  let daValue = numberInput.value.toLowerCase();
  i = daValue;
  pkmnLoad();
}

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

$(document).keydown(function(e) {
  if (e.which == 83) {
    $(".pokemon-artwork").toggleClass("hide");
    $(".pokemon-sprite").toggleClass("hide");
    $(".shiny-artwork").toggleClass("show");
    $(".shiny-sprite").toggleClass("show");
  }
});

$(document).keydown(function(e) {
  if (e.which == 77) {
    $(".sprite-wrapper").toggleClass("hide");
  }
});

$(document).keydown(function(e) {
  if (e.which == 82) {
    surprise();
  }
});

function surprise() {
  i = Math.floor(Math.random() * 898) + 1;
  pkmnLoad();
}
