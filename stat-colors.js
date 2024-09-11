const poor = 62.8;
const average = 102.05;
const good = 125.6;
const great = 164.85;
const excellent = 266.9;

const pogoAtkMax = Math.round(450 * 0.94);
const pogoDefMax = Math.round(400 * 1.01);
const pogoStaMax = Math.round(500 * 0.82);
const pogoCPMax = Math.round(6700 * 0.06);

const pogoAtkPoor = (4 / 20) * pogoAtkMax;
const pogoAtkAverage = (6 / 20) * pogoAtkMax;
const pogoAtkGood = (8 / 20) * pogoAtkMax;
const pogoAtkGreat = (10 / 20) * pogoAtkMax;
const pogoAtkExcellent = (15 / 20) * pogoAtkMax;

const pogoDefPoor = (4 / 20) * pogoDefMax;
const pogoDefAverage = (6 / 20) * pogoDefMax;
const pogoDefGood = (8 / 20) * pogoDefMax;
const pogoDefGreat = (10 / 20) * pogoDefMax;
const pogoDefExcellent = (15 / 20) * pogoDefMax;

const pogoStaPoor = (4 / 20) * pogoStaMax;
const pogoStaAverage = (6 / 20) * pogoStaMax;
const pogoStaGood = (8 / 20) * pogoStaMax;
const pogoStaGreat = (10 / 20) * pogoStaMax;
const pogoStaExcellent = (15 / 20) * pogoStaMax;

const pogoCPPoor = (4 / 20) * pogoCPMax;
const pogoCPAverage = (6 / 20) * pogoCPMax;
const pogoCPGood = (8 / 20) * pogoCPMax;
const pogoCPGreat = (10 / 20) * pogoCPMax;
const pogoCPExcellent = (15 / 20) * pogoCPMax;

const poorColor = "red";
const averageColor = "orange";
const goodColor = "yellow";
const greatColor = "lime";
const excellentColor = "#71e1b3";

function statColors() {
  var hpWidth = $(".hp").width();
  var atkWidth = $(".atk").width();
  var defWidth = $(".def").width();
  var spAtkWidth = $(".spatk").width();
  var spDefWidth = $(".spdef").width();
  var spdWidth = $(".spd").width();
  var pogoAtkWidth = $(".pogoAtk").width();
  var pogoDefWidth = $(".pogoDef").width();
  var pogoStaWidth = $(".pogoSta").width();
  var pogoMaxCPWidth = $(".maxCP").width();

  if (hpWidth < poor) {
    $(".hp").css({
      background: poorColor,
    });
  } else if (hpWidth < average) {
    $(".hp").css({
      background: averageColor,
    });
  } else if (hpWidth < good) {
    $(".hp").css({
      background: goodColor,
    });
  } else if (hpWidth < great) {
    $(".hp").css({
      background: greatColor,
    });
  } else if (hpWidth < excellent || hpWidth >= excellent) {
    $(".hp").css({
      background: excellentColor,
    });
  }

  if (atkWidth < poor) {
    $(".atk").css({
      background: poorColor,
    });
  } else if (atkWidth < average) {
    $(".atk").css({
      background: averageColor,
    });
  } else if (atkWidth < good) {
    $(".atk").css({
      background: goodColor,
    });
  } else if (atkWidth < great) {
    $(".atk").css({
      background: greatColor,
    });
  } else if (atkWidth < excellent || atkWidth >= excellent) {
    $(".atk").css({
      background: excellentColor,
    });
  }

  if (defWidth < poor) {
    $(".def").css({
      background: poorColor,
    });
  } else if (defWidth < average) {
    $(".def").css({
      background: averageColor,
    });
  } else if (defWidth < good) {
    $(".def").css({
      background: goodColor,
    });
  } else if (defWidth < great) {
    $(".def").css({
      background: greatColor,
    });
  } else if (defWidth < excellent || defWidth >= excellent) {
    $(".def").css({
      background: excellentColor,
    });
  }

  if (spAtkWidth < poor) {
    $(".spatk").css({
      background: poorColor,
    });
  } else if (spAtkWidth < average) {
    $(".spatk").css({
      background: averageColor,
    });
  } else if (spAtkWidth < good) {
    $(".spatk").css({
      background: goodColor,
    });
  } else if (spAtkWidth < great) {
    $(".spatk").css({
      background: greatColor,
    });
  } else if (spAtkWidth < excellent || spAtkWidth >= excellent) {
    $(".spatk").css({
      background: excellentColor,
    });
  }

  if (spDefWidth < poor) {
    $(".spdef").css({
      background: poorColor,
    });
  } else if (spDefWidth < average) {
    $(".spdef").css({
      background: averageColor,
    });
  } else if (spDefWidth < good) {
    $(".spdef").css({
      background: goodColor,
    });
  } else if (spDefWidth < great) {
    $(".spdef").css({
      background: greatColor,
    });
  } else if (spDefWidth < excellent || spDefWidth >= excellent) {
    $(".spdef").css({
      background: excellentColor,
    });
  }

  if (spdWidth < poor) {
    $(".spd").css({
      background: poorColor,
    });
  } else if (spdWidth < average) {
    $(".spd").css({
      background: averageColor,
    });
  } else if (spdWidth < good) {
    $(".spd").css({
      background: goodColor,
    });
  } else if (spdWidth < great) {
    $(".spd").css({
      background: greatColor,
    });
  } else if (spdWidth < excellent || spdWidth >= excellent) {
    $(".spd").css({
      background: excellentColor,
    });
  }

  if (pogoAtkWidth < pogoAtkPoor) {
    $(".pogoAtk").css({
      background: poorColor,
    });
  } else if (pogoAtkWidth < pogoAtkAverage) {
    $(".pogoAtk").css({
      background: averageColor,
    });
  } else if (pogoAtkWidth < pogoAtkGood) {
    $(".pogoAtk").css({
      background: goodColor,
    });
  } else if (pogoAtkWidth < pogoAtkGreat) {
    $(".pogoAtk").css({
      background: greatColor,
    });
  } else if (
    pogoAtkWidth < pogoAtkExcellent ||
    pogoAtkWidth >= pogoAtkExcellent
  ) {
    $(".pogoAtk").css({
      background: excellentColor,
    });
  }

  if (pogoDefWidth < pogoDefPoor) {
    $(".pogoDef").css({
      background: poorColor,
    });
  } else if (pogoDefWidth < pogoDefAverage) {
    $(".pogoDef").css({
      background: averageColor,
    });
  } else if (pogoDefWidth < pogoDefGood) {
    $(".pogoDef").css({
      background: goodColor,
    });
  } else if (pogoDefWidth < pogoDefGreat) {
    $(".pogoDef").css({
      background: greatColor,
    });
  } else if (
    pogoDefWidth < pogoDefExcellent ||
    pogoDefWidth >= pogoDefExcellent
  ) {
    $(".pogoDef").css({
      background: excellentColor,
    });
  }

  if (pogoStaWidth < pogoStaPoor) {
    $(".pogoSta").css({
      background: poorColor,
    });
  } else if (pogoStaWidth < pogoStaAverage) {
    $(".pogoSta").css({
      background: averageColor,
    });
  } else if (pogoStaWidth < pogoStaGood) {
    $(".pogoSta").css({
      background: goodColor,
    });
  } else if (pogoStaWidth < pogoStaGreat) {
    $(".pogoSta").css({
      background: greatColor,
    });
  } else if (
    pogoStaWidth < pogoStaExcellent ||
    pogoStaWidth >= pogoStaExcellent
  ) {
    $(".pogoSta").css({
      background: excellentColor,
    });
  }

  if (pogoMaxCPWidth < pogoCPPoor) {
    $(".maxCP").css({
      background: poorColor,
    });
  } else if (pogoMaxCPWidth < pogoCPAverage) {
    $(".maxCP").css({
      background: averageColor,
    });
  } else if (pogoMaxCPWidth < pogoCPGood) {
    $(".maxCP").css({
      background: goodColor,
    });
  } else if (pogoMaxCPWidth < pogoCPGreat) {
    $(".maxCP").css({
      background: greatColor,
    });
  } else if (
    pogoMaxCPWidth < pogoCPExcellent ||
    pogoMaxCPWidth >= pogoCPExcellent
  ) {
    $(".maxCP").css({
      background: excellentColor,
    });
  }
}
