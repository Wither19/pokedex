var cpm = [
  0.094, 0.16639787, 0.21573247, 0.25572005, 0.29024988, 0.3210876, 0.34921268,
  0.3752356, 0.39956728, 0.4225, 0.44310755, 0.4627984, 0.48168495, 0.49985844,
  0.51739395, 0.5343543, 0.5507927, 0.5667545, 0.5822789, 0.5974, 0.6121573,
  0.6265671, 0.64065295, 0.65443563, 0.667934, 0.6811649, 0.69414365, 0.7068842,
  0.7193991, 0.7317, 0.7377695, 0.74378943, 0.74976104, 0.7556855, 0.76156384,
  0.76739717, 0.7731865, 0.77893275, 0.784637, 0.7903, 0.7953, 0.8003, 0.8053,
  0.8103, 0.8153, 0.8203, 0.8253, 0.8303, 0.8353, 0.8403,
];

var p = 870;

var hp = "";
var atk = "";
var def = "";
var spAtk = "";
var spDef = "";
var spd = "";

var perfect = 15;

function grab() {
  fetch(`https://pokeapi.co/api/v2/pokemon/${p}`)
    .then((response) => response.json())
    .then((data) => {
      $("h1").text(`#${data.id} ${data.name}`);

      hp = data.stats[0].base_stat;
      atk = data.stats[1].base_stat;
      def = data.stats[2].base_stat;
      spAtk = data.stats[3].base_stat;
      spDef = data.stats[4].base_stat;
      spd = data.stats[5].base_stat;
    });
}

function cpCalculate() {
  var higherAtk = Math.max(atk, spAtk);
  var lowerAtk = Math.min(atk, spAtk);
  var higherDef = Math.max(def, spDef);
  var lowerDef = Math.min(def, spDef);

  var scaledAtk = Math.round(2 * ((7 / 8) * higherAtk + (1 / 8) * lowerAtk));
  var scaledDef = Math.round(2 * ((5 / 8) * higherDef + (3 / 8) * lowerDef));
  var speedMod = 1 + (spd - 75) / 500;

  var baseAtk = Math.round(scaledAtk * speedMod);
  var baseDef = Math.round(scaledDef * speedMod);
  var baseSta = Math.floor(hp * 1.75 + 50);

  var lvlValue = Number($("#lvl").val());
  var atkValue = Number($("#atk").val());
  var defValue = Number($("#def").val());
  var staValue = Number($("#sta").val());

  var maxCP = Math.floor(
    Math.max(
      10,
      ((baseAtk + atkValue) *
        Math.pow(baseDef + defValue, 0.5) *
        Math.pow(baseSta + staValue, 0.5) *
        Math.pow(cpm[lvlValue - 1], 2)) /
        10
    )
  );

  var nerfCP = Math.floor(
    Math.max(
      10,
      (baseAtk *
        Math.pow(baseDef, 0.5) *
        Math.pow(baseSta, 0.5) *
        Math.pow(cpm[39], 2)) /
        10
    )
  );

  if (nerfCP >= 4000) {
    baseAtk = Math.round(baseAtk * 0.91);
    baseDef = Math.round(baseDef * 0.91);
    baseSta = Math.round(baseSta * 0.91);
    maxCP = Math.floor(
      Math.max(
        10,
        ((baseAtk + atkValue) *
          Math.pow(baseDef + defValue, 0.5) *
          Math.pow(baseSta + staValue, 0.5) *
          Math.pow(cpm[lvlValue - 1], 2)) /
          10
      )
    );
  }

  $("h2").text(maxCP + " CP");
  if (atkValue === 0) {
    $(".stat#atk").css({
      backgroundColor: "lightgray",
    });
  }
  if (defValue === 0) {
    $(".stat#def").css({
      backgroundColor: "lightgray",
    });
  }
  if (staValue === 0) {
    $(".stat#sta").css({
      backgroundColor: "lightgray",
    });
  }
  if (atkValue < 15) {
    $(".stat#atk").css({
      backgroundColor: "#d49831",
    });
  }
  if (defValue < 15) {
    $(".stat#def").css({
      backgroundColor: "#d49831",
    });
  }
  if (staValue < 15) {
    $(".stat#sta").css({
      backgroundColor: "#d49831",
    });
  }
  if (atkValue === 15) {
    $(".stat#atk").css({
      backgroundColor: "#ba3838",
    });
  }
  if (defValue === 15) {
    $(".stat#def").css({
      backgroundColor: "#ba3838",
    });
  }
  if (staValue === 15) {
    $(".stat#sta").css({
      backgroundColor: "#ba3838",
    });
  }
  $(".atkLabel").text(`${baseAtk} + ${atkValue} IVs = ${baseAtk + atkValue}`);
  $(".defLabel").text(`${baseDef} + ${defValue} IVs = ${baseDef + defValue}`);
  $(".staLabel").text(`${baseSta} + ${staValue} IVs = ${baseSta + staValue}`);

  if (lvlValue === 15) {
    $(".methodObtained").text("Research");
    $(".methodObtained").css({
      opacity: "1",
    });
  } else if (lvlValue === 20) {
    $(".methodObtained").text("Raid / Egg");
    $(".methodObtained").css({
      opacity: "1",
    });
  } else {
    $(".methodObtained").css({
      opacity: "0",
    });
  }
}

$("body").keydown(function (e) {
  if (e.altKey && e.key === "r") {
    p = Math.round(Math.random() * 1025 + 1);
    grab();
    setTimeout(cpCalculate, 500);
  } else if (e.altKey && e.which === 38) {
    p -= 1;
    grab();
    setTimeout(cpCalculate, 500);
  } else if (e.altKey && e.which === 40) {
    p += 1;
    grab();
    setTimeout(cpCalculate, 500);
  }
});
