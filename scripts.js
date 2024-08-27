var p = 1;
var shinyForm = false;
var cpm = [
  0.094, 0.16639787, 0.21573247, 0.25572005, 0.29024988, 0.3210876, 0.34921268,
  0.3752356, 0.39956728, 0.4225, 0.44310755, 0.4627984, 0.48168495, 0.49985844,
  0.51739395, 0.5343543, 0.5507927, 0.5667545, 0.5822789, 0.5974, 0.6121573,
  0.6265671, 0.64065295, 0.65443563, 0.667934, 0.6811649, 0.69414365, 0.7068842,
  0.7193991, 0.7317, 0.7377695, 0.74378943, 0.74976104, 0.7556855, 0.76156384,
  0.76739717, 0.7731865, 0.77893275, 0.784637, 0.7903, 0.7953, 0.8003, 0.8053,
  0.8103, 0.8153, 0.8203, 0.8253, 0.8303, 0.8353, 0.8403,
];

function getNationalDex() {
  fetch("https://pokeapi.co/api/v2/pokedex/1")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 1; i <= data.pokemon_entries.length; i++) {
        let leadingZero = i.toString().padStart(4, "0");
        $("ul").append(
          `<li onclick="setMon(event);" id="${i}">
          <img src="https://raw.githubusercontent.com/Wither19/pokerogue/main/public/images/pokemon/icons/${i}.png">
          #${leadingZero} - ${data.pokemon_entries[i - 1].pokemon_species.name}
          </li>`
        );
      }
    });
  setTimeout(getVariants, 500);
}

function getVariants() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=300&offset=1025")
    .then((response) => response.json())
    .then((data) => {
      for (let v = 10001; v <= 10277; v++) {
        $("ul").append(
          `<li class="variant" onclick="setMon(event);" id="${v}">
          ${data.results[v - 10001].name}
          </li>`
        );
      }
    });
}

function setMon(event) {
  if (p > 1025 && p < 10001) {
    p = 10001;
  } else if (p === 10000) {
    p = 1025;
  } else {
    p = event.currentTarget.id;
  }
  fetchMonFromDex();
  $(".pkmnList").addClass("hidden");
  $(".pkmnInfo").removeClass("hidden");
}

function fetchMonFromDex() {
  fetch(`https://pokeapi.co/api/v2/pokemon/${p}`)
    .then((response) => response.json())
    .then((data) => {
      var hp = data.stats[0].base_stat;
      var atk = data.stats[1].base_stat;
      var def = data.stats[2].base_stat;
      var spAtk = data.stats[3].base_stat;
      var spDef = data.stats[4].base_stat;
      var spd = data.stats[5].base_stat;
      let leadingZero = data.id.toString().padStart(4, "0");

      $("h1").text(`#${leadingZero} - ${data.name}`);
      $(".art.reg").attr("src", data.sprites.other.home.front_default);
      $(".art.shiny").attr("src", data.sprites.other.home.front_shiny);
      $(`li#${p}`).addClass("selected");
      $(`li:not(#${p})`).removeClass("selected");
      $(".types").html("");
      if (data.types.length === 1) {
        $(".types").append(
          `<div class="icon ${data.types[0].type.name}">
          <img src="https://duiker101.github.io/pokemon-type-svg-icons/icons/${data.types[0].type.name}.svg">
          </div>`
        );
      } else {
        $(".types").append(
          `<div class="icon ${data.types[0].type.name}">
          <img src="https://duiker101.github.io/pokemon-type-svg-icons/icons/${data.types[0].type.name}.svg">
          </div>
          <div class="icon ${data.types[1].type.name}">
          <img src="https://duiker101.github.io/pokemon-type-svg-icons/icons/${data.types[1].type.name}.svg">
          </div>`
        );
      }
      $("#hp").text(data.stats[0].base_stat);
      $(".hp").css({
        width: `${data.stats[0].base_stat * 1.57}px`,
      });
      $("#atk").text(data.stats[1].base_stat);
      $(".atk").css({
        width: `${data.stats[1].base_stat * 1.57}px`,
      });
      $("#def").text(data.stats[2].base_stat);
      $(".def").css({
        width: `${data.stats[2].base_stat * 1.57}px`,
      });
      $("#spatk").text(data.stats[3].base_stat);
      $(".spatk").css({
        width: `${data.stats[3].base_stat * 1.57}px`,
      });
      $("#spdef").text(data.stats[4].base_stat);
      $(".spdef").css({
        width: `${data.stats[4].base_stat * 1.57}px`,
      });
      $("#spd").text(data.stats[5].base_stat);
      $(".spd").css({
        width: `${data.stats[5].base_stat * 1.57}px`,
      });

      var higherAtk = Math.max(atk, spAtk);
      var lowerAtk = Math.min(atk, spAtk);
      var higherDef = Math.max(def, spDef);
      var lowerDef = Math.min(def, spDef);

      var scaledAtk = Math.round(
        2 * ((7 / 8) * higherAtk + (1 / 8) * lowerAtk)
      );

      var scaledDef = Math.round(
        2 * ((5 / 8) * higherDef + (3 / 8) * lowerDef)
      );

      var speedMod = 1 + (spd - 75) / 500;

      var baseAtk = Math.round(scaledAtk * speedMod);
      var baseDef = Math.round(scaledDef * speedMod);
      var baseSta = Math.floor(hp * 1.75 + 50);
      var nerfedAtk = Math.round(baseAtk * 0.91);
      var nerfedDef = Math.round(baseDef * 0.91);
      var nerfedSta = Math.round(baseSta * 0.91);
      var hundoAtk = baseAtk + 15;
      var hundoDef = baseDef + 15;
      var hundoSta = baseSta + 15;

      var lvl40 = Math.floor(
        Math.max(
          10,
          (hundoAtk *
            Math.pow(hundoDef, 0.5) *
            Math.pow(hundoSta, 0.5) *
            Math.pow(cpm[39], 2)) /
            10
        )
      );

      var maxCP = Math.floor(
        Math.max(
          10,
          (hundoAtk *
            Math.pow(hundoDef, 0.5) *
            Math.pow(hundoSta, 0.5) *
            Math.pow(cpm[49], 2)) /
            10
        )
      );

      var nerfedMaxCP = Math.floor(
        Math.max(
          10,
          (hundoAtk *
            Math.pow(hundoDef, 0.5) *
            Math.pow(hundoSta, 0.5) *
            Math.pow(cpm[49], 2)) /
            10
        ) * 0.9435
      );

      if (lvl40 > 4000) {
        $("#pogoAtk").text(nerfedAtk);
        $(".pogoAtk").css({
          width: `${nerfedAtk * 0.94}px`,
        });
        $("#pogoDef").text(nerfedDef);
        $(".pogoDef").css({
          width: `${nerfedDef * 1.01}px`,
        });
        $("#pogoSta").text(nerfedSta);
        $(".pogoSta").css({
          width: `${nerfedAtk * 0.82}px`,
        });
        $("#maxCP").text(nerfedMaxCP);
        $(".maxCP").css({
          width: `${nerfedMaxCP * 0.06}px`,
        });
      } else {
        $("#pogoAtk").text(baseAtk);
        $(".pogoAtk").css({
          width: `${baseAtk * 0.94}px`,
        });
        $("#pogoDef").text(baseDef);
        $(".pogoDef").css({
          width: `${baseDef * 1.01}px`,
        });
        $("#pogoSta").text(baseSta);
        $(".pogoSta").css({
          width: `${nerfedSta * 0.81}px`,
        });
        $("#maxCP").text(maxCP);
        $(".maxCP").css({
          width: `${maxCP * 0.06}px`,
        });
      }
    });

  setTimeout(statColors, 500);
}

function shinyToggle() {
  $(".art").toggleClass("hidden");
  $("#shinyButton").toggleClass("true");
}

$("#shinyButton").click(function () {
  shinyToggle();
});

$(".statToggle").click(function () {
  $(".statToggle").toggleClass("hidden");
  $(".statPage").toggleClass("hidden");
});

$(document).keydown(function (e) {
  if (e.altKey && e.key === "r") {
    p = Math.floor(Math.random() * 1025 + 1);
    fetchMonFromDex();
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    p++;
    fetchMonFromDex();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    p--;
    fetchMonFromDex();
  } else if (e.altKey && e.key === "s") {
    shinyToggle();
  } else if (e.altKey && e.key === "p") {
    $(".pkmnList").toggleClass("hidden");
    $(".pkmnInfo").toggleClass("hidden");
  }
});

$("#listOpen").click(function () {
  $(".pkmnList").toggleClass("hidden");
  $(".pkmnInfo").toggleClass("hidden");
});
