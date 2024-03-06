var i = 1;

fetch(`https://pokeapi.co/api/v2/pokemon?limit=10228`).then(response => response.json()).then(data => {
  let dexHead = document.createElement("h2");
  dexHead.innerHTML = "National Pokédex";
  dexHead.style.flexBasis = "100%";
  dexHead.style.textAlign = "center";
  dexHead.style.fontSize = "48px";
  document.querySelector(".wrapper").appendChild(dexHead);
  for (let i = 1; i <= 898; i++) {
    let entry = document.createElement("div");
    entry.setAttribute("id", i);
    entry.setAttribute("tabindex", i)
    entry.classList.add("entry");
    entry.addEventListener("click", preSelect);
    document.querySelector(".wrapper").appendChild(entry);
    entry.innerHTML = `<img class="sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${i}.png"><br>${data.results[i - 1].name}`;
  }
  setTimeout(vars, 1500);

  function vars() {
    let varHead = document.createElement("h2");
    varHead.innerHTML = "Variants";
    varHead.style.flexBasis = "100%";
    varHead.style.textAlign = "center";
    varHead.style.fontSize = "48px";
    document.querySelector(".wrapper").appendChild(varHead);
    for (let v = 10001; v <= 10090; v++) {
      let entry = document.createElement("div");
      entry.setAttribute("id", v);
      entry.setAttribute("tabindex", v)
      entry.classList.add("entry");
      entry.addEventListener("click", preSelect);
      document.querySelector(".wrapper").appendChild(entry);
      entry.innerHTML = `<img class="sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${v}.png"><br>${data.results[v - 8976].name}`;

    }
  }
});

function pkmnLoad(event) {
  if (i < 1) {
    i = 1;
  } else if (i > 898 && i < 9999) {
    i = 898;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(response => response.json()).then(data => {
    var r = Math.floor(Math.random() * data.moves.length);

    $("h1").html(`<img class="sprite" src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${data.name}.png"> #${data.id} - ${data.name}`);

    $("img.artwork").attr("src", data.sprites.other["official-artwork"].front_default);

    $("img.artwork.shiny").attr("src", data.sprites.other["official-artwork"].front_shiny);

    $(".stats").html("");
	$(".abilities").html("");

    $(".stats").append(`
	  <span class="hp">HP: <span style="font-weight: bold;">${data.stats[0].base_stat}</span></span><br>
      <span class="atk">Atk: <span style="font-weight: bold;">${data.stats[1].base_stat}</span></span><br>
      <span class="def">Def: <span style="font-weight: bold;">${data.stats[3].base_stat}</span></span><br>
      <span class="sp-atk">Sp-Atk: <span style="font-weight: bold;">${data.stats[2].base_stat}</span></span><br>
      <span class="sp-def">Sp-Def: <span style="font-weight: bold;">${data.stats[4].base_stat}</span></span><br>
      <span class="spd">Spd: <span style="font-weight: bold;">${data.stats[5].base_stat}</span></span>`);

    $(".types").html("");

    $(".types").prepend(`<span class="Type ${data.types[0].type.name}"><img src="https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/5781623f147f1bf850f426cfe1874ba56a9b75ee/icons/${data.types[0].type.name}.svg">${data.types[0].type.name}</span>`);

    $(".types").append(`<span class="Type ${data.types[1].type.name}"><img src="https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/5781623f147f1bf850f426cfe1874ba56a9b75ee/icons/${data.types[1].type.name}.svg">${data.types[1].type.name}</span>`);

    $(".abilities").html("");
	
    $(".abilities").append(`
	<span class="norm"><a title="View ${data.abilities[0].ability.name.replace("-", " ")} on Smogon" href="https://www.smogon.com/dex/sv/abilities/${data.abilities[0].ability.name}" target="_blank">${data.abilities[0].ability.name.replace("-", " ")}</a></span>`);

    $(".abilities").append(`
	 / <span class="norm"><a title="View ${data.abilities[1].ability.name.replace("-", " ")} on Smogon" href="https://www.smogon.com/dex/sv/abilities/${data.abilities[1].ability.name}" target="_blank">${data.abilities[1].ability.name.replace("-", " ")}</a></span>`);

    $(".abilities").append(`
	 / <span class="norm"><a title="View ${data.abilities[2].ability.name.replace("-", " ")} on Smogon" href="https://www.smogon.com/dex/sv/abilities/${data.abilities[2].ability.name}" target="_blank">${data.abilities[2].ability.name.replace("-", " ")}</a></span>`);

    $(".tidbits").html("");

    $(".tidbits").append(`
	<span class="height">${(data.height / 3.048).toFixed(2)} ft.</span> /
	<span class="weight">${(data.weight / 4.536).toFixed(2)} lbs.</span>`);
  });

  fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`).then(response => response.json()).then(data => {


    $(".jp").html("");

    $(".genus").html("");

    $(".actual").html("");

    $(".capture").html("");

    let falseSwiped = ((data.capture_rate / 2.55) * 1.5).toFixed() + "%";

    if (data.capture_rate <= 25) {
      $(".capture").html(`Catch Rate: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png">`);

    } else if (data.capture_rate <= 84) {
      $(".capture").html(`Catch Rate: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png">`);
    } else if (data.capture_rate <= 168) {
      $(".capture").html(`Catch Rate: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png">`);
    } else if (data.capture_rate <= 255) {
      $(".capture").html(`Catch Rate: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png">`);
    }

    $(".jp").html(data.names[0].name);

    for (let f = 0; f <= data.flavor_text_entries.length; f++) {
      var langMatch = data.flavor_text_entries[f].language.name.lastIndexOf("en");

      if (langMatch == 0) {
        $(".actual").html(`${data.flavor_text_entries[f].flavor_text}<br><br><sub>From Pokémon <span style="text-transform: capitalize;">${data.flavor_text_entries[f].version.name.replace("-", " ")}</span></sub>`);
      }
    }

    for (let g = 0; g <= data.genera.length; g++) {
      var genusMatch = data.genera[g].language.name.lastIndexOf("en");

      if (genusMatch == 0) {
        $(".genus").html(data.genera[g].genus);
        console.log(genusMatch);
      }
    }
  });

}

function preSelect(event) {
  i = event.currentTarget.id;
  window.scroll(0, 65);
  pkmnLoad(event);
}

$("i").click(function() {
  $(".wrapper").toggleClass("shown");
});

document.querySelector("body").onkeydown = function(e) {
  if (e.key == "p") {
    e.stopPropagation();
    $(".wrapper").toggleClass("shown");
    window.scroll(0, 0);
  } else if (e.which == 37) {
    i--;
    pkmnLoad();
  } else if (e.which == 39) {
    i++;
    pkmnLoad();
  } else if (e.key == "r") {
    e.stopPropagation();
    i = Math.floor(Math.random() * 898 + 1);
    pkmnLoad();
  } else if (e.key == "s") {
    e.stopPropagation();
    $(".regular").toggleClass("hide");
    $(".shiny").toggleClass("hide");
  } else if (e.key == " " || e.which == 13) {
    document.querySelector(".entry:focus").click();
  } else if (e.key == "i") {
    e.stopPropagation();
    document.querySelector(".flavor").classList.add("shown");
    $("i").css({
      "left": "290px"
    });
  } else if (e.key == "h") {
    document.querySelector(".flavor").classList.remove("shown");
    $("i").css({
      "left": "40px"
    });
  }
};

$(".wrapper").click(function() {
  $(".wrapper").toggleClass("shown");
});

$(".setStartup").click(function() {
  localStorage.setItem("startupMon", i);
  localStorage.setItem("startupMonName", document.querySelector("h1").textContent);
  alert(`${startupMonName} will now display when the page is opened/refreshed!`);
  setTimeout(locInput, 10);
});

function locInput() {
  document.querySelector(".current").value = localStorage.getItem("startupMonName");
}

function localCall() {
  i = localStorage.getItem("startupMon");
  pkmnLoad();
  document.querySelector(".current").value = localStorage.getItem("startupMonName");
}

function input() {
  fetch("https://pokeapi.com/api/v2/pokemon?limit=1025").then(pkmn => pkmn.json()).then(list => {
    console.log(list);
  });
}
