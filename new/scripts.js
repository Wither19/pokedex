var i = 1;

fetch(`https://pokeapi.co/api/v2/pokedex/1`).then(response => response.json()).then(data => {
  for (let i = 1; i <= 898; i++) {
    let entry = document.createElement("div");
    entry.setAttribute("id", i);
    entry.setAttribute("tabindex", i)
    entry.classList.add("entry");
    entry.addEventListener("click", preSelect);
    document.querySelector(".wrapper").appendChild(entry);
    entry.innerHTML = `<img class="sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${i}.png"> #${data.pokemon_entries[i - 1].entry_number} - ${data.pokemon_entries[i - 1].pokemon_species.name}`;
  }
});

function pkmnLoad(event) {

  if (i < 1) {
    i = 1;
  } else if (i > 898 && i < 9999) {
    i = 898;
  }
  fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(response => response.json()).then(data => {

    $("h1").html(`<img class="sprite" style="position: relative; top: -16px;" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${i}.png"> #${data.id} - ${data.name}`);

    $("img.artwork").attr("src", data.sprites.other["official-artwork"].front_default);

    $("img.artwork.shiny").attr("src", data.sprites.other["official-artwork"].front_shiny);

    $(".stats").html("");

    $(".abilities").html("");

    $(".tidbits").html("");

    $(".stats").append(`
	  <span class="hp">${data.stats[0].stat.name}: ${data.stats[0].base_stat}</span><br>
      <span class="atk">Atk: ${data.stats[1].base_stat}</span><br>
      <span class="def">Def: ${data.stats[3].base_stat}</span><br>
      <span class="sp-atk">Sp-Atk: ${data.stats[2].base_stat}</span><br>
      <span class="sp-def">Sp-Def: ${data.stats[4].base_stat}</span><br>
      <span class="spd">Spd: ${data.stats[5].base_stat}</span>`);

    $(".types").html("");

    $(".types").prepend(`<span class="Type ${data.types[0].type.name}"><img src="https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/5781623f147f1bf850f426cfe1874ba56a9b75ee/icons/${data.types[0].type.name}.svg">${data.types[0].type.name}</span>`);

    $(".types").append(`<span class="Type ${data.types[1].type.name}"><img src="https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/5781623f147f1bf850f426cfe1874ba56a9b75ee/icons/${data.types[1].type.name}.svg">${data.types[1].type.name}</span>`);

    $(".abilities").html("");

    $(".abilities").append(`
	<span class="norm"><a title="View ${data.abilities[0].ability.name} on Smogon" href="https://www.smogon.com/dex/sv/abilities/${data.abilities[0].ability.name}" target="_blank">${data.abilities[0].ability.name}</a></span> /
      <span class="hidden"><a title="View ${data.abilities[1].ability.name} on Smogon" href="https://www.smogon.com/dex/sv/abilities/${data.abilities[1].ability.name}" target="_blank"><span style="font-weight: bold">(H)</span> ${data.abilities[1].ability.name}</a></span>`);

    $(".tidbits").html("");

    $(".tidbits").append(`
	<span class="height">${(data.height / 3.048).toFixed(2)} ft.</span>
	<span class="weight">${(data.weight / 4.536).toFixed(2)} lbs.</span>`);
  });
}

function preSelect(event) {
  i = event.currentTarget.id;
  pkmnLoad(event);
}

$("i").click(function() {
  $(".wrapper").toggleClass("shown");
});

document.querySelector("body").onkeydown = function(e) {
  if (e.key == "p") {
    $(".wrapper").toggleClass("shown");
  } else if (e.which == 37) {
    i--;
    pkmnLoad();
  } else if (e.which == 39) {
    i++;
    pkmnLoad();
  } else if (e.key == "r") {
    i = Math.floor(Math.random() * 898 + 1);
    pkmnLoad();
  } else if (e.key == "s") {
    $(".regular").toggleClass("hide");
    $(".shiny").toggleClass("hide");
  } else if (e.key == " " || e.which == 13) {
    document.querySelector(".entry:focus").click();
  }
};

$(".wrapper").click(function() {
  $(".wrapper").toggleClass("shown");
});

$(".setStartup").click(function() {
  localStorage.setItem("startupMon", i);
  localStorage.setItem("startupMonName", document.querySelector("h1").textContent);
  alert(`${startupMonName} will now display when the page is opened/refreshed!`);
  setTimeout(locInput, 250);
});

function locInput() {
	document.querySelector(".current").value = localStorage.getItem("startupMonName");
}

function localCall() {
  i = localStorage.getItem("startupMon");
  pkmnLoad();
  document.querySelector(".current").value = localStorage.getItem("startupMonName");
}
