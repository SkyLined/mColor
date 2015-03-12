var dsRGB_by_sName = require("./dsRGB_by_sName.js");

function cHSLA(nH_sName, nS, nL, nA) {
  if (this.constructor != cHSLA) return new cHSLA(nH_sName, nS, nL, nA);
  if (nH_sName in dsRGB_by_sName) {
    var cRGBA = require("./cRGBA");
    this.foCopy(new cRGBA(dsRGB_by_sName[nH_sName]));
  } else {
    this.nH = nH_sName; this.nS = nS; this.nL = nL; this.nA = nA === undefined ? 1 : nA;
  }
};
cHSLA.prototype.foClone = function() { return new cHSLA(this._nH, this._nS, this._nL, this._nA); }
cHSLA.prototype.foCopy = function(oOther) {
  if (oOther.constructor != cHSLA) oOther = oOther.foGetHSLA();
  this._nH = oOther.nH; this._nS = oOther.nS, this._nL = oOther.nL, this._nA = oOther.nA;
  return this;
}
cHSLA.prototype.foSetH = function (nH) { this.nH = nH; return this; }
cHSLA.prototype.foSetS = function (nS) { this.nS = nS; return this; }
cHSLA.prototype.foSetL = function (nL) { this.nL = nL; return this; }
cHSLA.prototype.foSetA = function (nA) { this.nA = nA; return this; }
cHSLA.prototype.foSetHSL = cHSLA.prototype.foSetHSLA = function (nH, nS, nL, nA) {
  this.nH = nH; this.nS = nS; this.nL = nL; this.nA = nA === undefined ? 1 : nA;
  return this;
}
cHSLA.prototype.toString = function() {
  return 'cHSLA(' + this.nH + ',' + this.nS + ',' + this.nL + ',' + this.nA + ')';
}
Object.defineProperty(cHSLA.prototype, "nH", {
  "get": function cHSLA_get_nH() { return this._nH; },
  "set": function cHSLA_set_nH(nH) { this._nH = (nH % 1 + 1) % 1 },
});
Object.defineProperty(cHSLA.prototype, "nS", {
  "get": function cHSLA_get_nS() { return this._nS; },
  "set": function cHSLA_set_nS(nS) { this._nS = Math.max(0, Math.min(1, nS)); },
});
Object.defineProperty(cHSLA.prototype, "nL", {
  "get": function cHSLA_get_nL() { return this._nL; },
  "set": function cHSLA_set_nL(nL) { this._nL = Math.max(0, Math.min(1, nL)); },
});
Object.defineProperty(cHSLA.prototype, "nA", {
  "get": function cHSLA_get_nA() { return this._nA; },
  "set": function cHSLA_set_nA(nA) { this._nA = Math.max(0, Math.min(1, nA)); },
});
Object.defineProperty(cRGBA.prototype, "sRGB", {
  "get": function cRGBA_get_sRGB() {
    var oRGBA = this.foGetRGBA();
    return '#' + oRGBA.sR + oRGBA.sG + oRGBA.sB;
  },
});
Object.defineProperty(cRGBA.prototype, "sRGBA", {
  "get": function cRGBA_get_sRGB() {
    var oRGBA = this.foGetRGBA();
    return '#' + oRGBA.sR + oRGBA.sG + oRGBA.sB + oRGBA.sA;
  },
});

cHSLA.prototype.foLighten = function (nAmount) { // oHSLA.lighten(0.5) makes it 50% lighter
  this._nL += (1 - this._nL) * Math.max(0, Math.min(1, nAmount));
  return this;
}
cHSLA.prototype.foDarken = function(nAmount) { // oHSLA.lighten(0.5) makes it 50% darker
  this._nL -= this._nL * Math.max(0, Math.min(1, nAmount));
  return this;
}
cHSLA.prototype.foOver = function(oOther) { return this.foCopy(this.foGetRGBA().foOver(oOther)); };
cHSLA.prototype.foUnder = function(oOther) { return this.foCopy(this.foGetRGBA().foUnder(oOther)); };

cHSLA.prototype.foGetRGBA = function() {
  var cRGBA = require("./cRGBA");
  if(this._nL==0) {
    var nR = 0, nG = 0, nB = 0;
  } else if(this.nS == 0) {
    nR = nG = nB = this._nL;
  } else {
    var nT2 = (
      this.nL < 0.5 ? this.nL * (1 + this.nS) :
                      this.nL + this.nS - this.nL * this.nS
    );
    var nT1 = 2 * this.nL - nT2;
    function hueToColor(nT3) {
      nT3 = (nT3 % 1 + 1) % 1;
      if (6 * nT3 < 1) return nT1 + (nT2 - nT1) * nT3 * 6;
      if (2 * nT3 < 1) return nT2;
      if (3 * nT3 < 2) return nT1 + (nT2 - nT1) * (2/3 - nT3) * 6;
                       return nT1;
    }
    nR = hueToColor(this.nH + 1/3);
    nG = hueToColor(this.nH);
    nB = hueToColor(this.nH - 1/3);
  }
  return new cRGBA(nR, nG, nB, this._nA);
}
cHSLA.foGetColorTemperature = function (uT, nTAlpha) {
  return require("./cRGBA").foGetColorTemperature(uT, nTAlpha).foGetHSLA();
}

cHSLA.prototype.foApplyColorTemperature = function (uT) {
  // algorithm based on http://www.tannerhelland.com/4435/convert-temperature-rgb-algorithm-code/
  var nTColorAmount = 1/3, nTLuminosityAmount = 3/4;
  var nL = this.nL;
  this.foUnder(cHSLA.foGetColorTemperature(uT, nTColorAmount));
  this.nL += (nL - this.nL) * nTLuminosityAmount;
  return this;
}

module.exports = cHSLA;