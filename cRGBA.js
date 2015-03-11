function cRGBA(nR_sRGBA, nG, nB, nA) {
  if (this.constructor != arguments.callee) return new arguments.callee(nR_sRGBA, nG, nB, nA);
  if (nR_sRGBA.constructor == String) {
    this.sRGBA = nR_sRGBA;
  } else {
    this.nR = nR_sRGBA; this.nG = nG; this.nB = nB; this.nA = nA == undefined ? 1 : nA;
  }
}
cRGBA.prototype.foClone = function() { return new cRGBA(this._nR, this._nG, this._nB, this._nA); };
cRGBA.prototype.foCopy = function(oOther) {
  if (oOther.constructor != cRGBA) oOther = oOther.foGetRGBA();
  this._nA = oOther.nA; this._nG = oOther.nG, this._nB = oOther.nB, this._nA = oOther.nA;
  return this;
}
cRGBA.prototype.foSetR = function (nR) { this.nR = nR; return this; }
cRGBA.prototype.foSetG = function (nG) { this.nG = nG; return this; }
cRGBA.prototype.foSetB = function (nB) { this.nB = nB; return this; }
cRGBA.prototype.foSetA = function (nA) { this.nA = nA; return this; }
cRGBA.prototype.foSetRGB = cRGBA.prototype.foSetRGBA = function (nR_sRGBA, nG, nB, nA) {
  if (nR_sRGBA.constructor == String) {
    this.sRGBA = nR_sRGBA;
  } else {
    this.nR = nR_sRGBA; this.nG = nG; this.nB = nB; this.nA = nA == undefined ? 1 : nA;
  }
  return this;
}
cRGBA.prototype.toString = function() { return 'cRGBA(' + this.sRGBA + ')'; };
Object.defineProperty(cRGBA.prototype, "nR", {
  "get": function cRGBA_get_nR() { return this._nR; },
  "set": function cRGBA_set_nR(nR) { this._nR = Math.max(0, Math.min(1, nR)); },
});
Object.defineProperty(cRGBA.prototype, "uR", {
  "get": function cRGBA_get_uR() { return Math.round(this._nR * 255); },
  "set": function cRGBA_set_uR(uR) { this.nR = uR / 255; },
});
Object.defineProperty(cRGBA.prototype, "sR", {
  "get": function cRGBA_get_sR() { return (this.uR < 0x10 ? "0" : "") + this.uR.toString(0x10); },
  "set": function cRGBA_set_sR(sR) { this.uR = parseInt(sR, 0x10); },
});
Object.defineProperty(cRGBA.prototype, "nG", {
  "get": function cRGBA_get_nG() { return this._nG; },
  "set": function cRGBA_set_nG(nG) { this._nG = Math.max(0, Math.min(1, nG)); },
});
Object.defineProperty(cRGBA.prototype, "uG", {
  "get": function cRGBA_get_uG() { return Math.round(this._nG * 255); },
  "set": function cRGBA_set_uG(uG) { this.nG = uG / 255; },
});
Object.defineProperty(cRGBA.prototype, "sG", {
  "get": function cRGBA_get_sG() { return (this.uG < 0x10 ? "0" : "") + this.uG.toString(0x10); },
  "set": function cRGBA_set_sG(sG) { this.uG = parseInt(sG, 0x10); },
});
Object.defineProperty(cRGBA.prototype, "nB", {
  "get": function cRGBA_get_nB() { return this._nB; },
  "set": function cRGBA_set_nB(nB) { this._nB = Math.max(0, Math.min(1, nB)); },
});
Object.defineProperty(cRGBA.prototype, "uB", {
  "get": function cRGBA_get_uB() { return Math.round(this._nB * 255); },
  "set": function cRGBA_set_uB(uB) { this.nB = uB / 255; },
});
Object.defineProperty(cRGBA.prototype, "sB", {
  "get": function cRGBA_get_sB() { return (this.uB < 0x10 ? "0" : "") + this.uB.toString(0x10); },
  "set": function cRGBA_set_sB(sB) { this.uB = parseInt(sB, 0x10); },
});
Object.defineProperty(cRGBA.prototype, "nA", {
  "get": function cRGBA_get_nA() { return this._nA; },
  "set": function cRGBA_set_nA(nA) { this._nA = Math.max(0, Math.min(1, nA)); },
});
Object.defineProperty(cRGBA.prototype, "uA", {
  "get": function cRGBA_get_uA() { return Math.round(this._nA * 255); },
  "set": function cRGBA_set_uA(uA) { this.nA = uA / 255; },
});
Object.defineProperty(cRGBA.prototype, "sA", {
  "get": function cRGBA_get_sA() { return (this.uA < 0x10 ? "0" : "") + this.uA.toString(0x10); },
  "set": function cRGBA_set_sA(sA) { this.uA = parseInt(sA, 0x10); },
});
Object.defineProperty(cRGBA.prototype, "sRGB", {
  "get": function cRGBA_get_sRGB() { return '#' + this.sR + this.sG + this.sB; },
  "set": function cRGBA_set_sRGB(sRGB) {
    var oMatch3 = sRGBA.match(/^#([0-9A-F])([0-9A-F])([0-9A-F])$/i);
    if (oMatch3) {
      this.sR = oMatch3[1] + oMatch3[1];
      this.sG = oMatch3[2] + oMatch3[2];
      this.sB = oMatch3[3] + oMatch3[3];
    } else {
      var oMatch6 = sRGBA.match(/^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i)
      if (oMatch6) {
        this.sR = oMatch6[1]; this.sG = oMatch6[2]; this.sB = oMatch6[3];
      } else {
        throw new Error("Expected \"#RGB\ or \"#RRGGBB\" hexadecimal color as argument");
      }
    }
  },
});
Object.defineProperty(cRGBA.prototype, "sRGBA", {
  "get": function cRGBA_get_sRGBA() { return '#' + this.sR + this.sG + this.sB + this.sA; },
  "set": function cRGBA_set_sRGBA(sRGBA) {
    var oMatch34 = sRGBA.match(/^#([0-9A-F])([0-9A-F])([0-9A-F])([0-9A-F])?$/i);
    if (oMatch34) {
      this.sR = oMatch34[1] + oMatch34[1];
      this.sG = oMatch34[2] + oMatch34[2];
      this.sB = oMatch34[3] + oMatch34[3];
      this.sA = oMatch34[4] ? oMatch34[4] + oMatch34[4] : "FF";
    } else {
      var oMatch68 = sRGBA.match(/^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})?$/i)
      if (oMatch68) {
        this.sR = oMatch68[1]; this.sG = oMatch68[2]; this.sB = oMatch68[3]; this.sA = oMatch68[4] || "FF";
      } else {
        throw new Error("Expected \"#RGB[A]\ or \"#RRGGBB[AA]\" hexadecimal color as argument");
      }
    }
  },
});
cRGBA.prototype.fsGetCSSRGB = function() {
  return 'rgb(' + this.uR + ',' + this.uG + ',' + this.uB + ')';
};
cRGBA.prototype.fsGetCSSRGBA = function() {
  return 'rgba(' + this.uR + ',' + this.uG + ',' + this.uB + ',' + this.uA + ')';
};
cRGBA.prototype.foOver = function(oOther) {
  if (oOther.constructor != cRGBA) oOther = oOther.foGetRGBA();
  this._nR = oOther._nR + (this._nR - oOther._nR) * this._nA;
  this._nG = oOther._nG + (this._nG - oOther._nG) * this._nA;
  this._nB = oOther._nB + (this._nB - oOther._nB) * this._nA;
  this._nA = oOther._nA + (1        -   this._nA) * this._nA;
  return this;
}
cRGBA.prototype.foUnder = function(oOther) {
  if (oOther.constructor != cRGBA) oOther = oOther.foGetRGBA();
  this._nR += (oOther._nR -   this._nR) * oOther._nA;
  this._nG += (oOther._nG -   this._nG) * oOther._nA;
  this._nB += (oOther._nB -   this._nB) * oOther._nA;
  this._nA += (1          - oOther._nA) * oOther._nA;
  return this;
}
cRGBA.prototype.foGetHSLA = function() {
  var cHSLA = require("./cHSLA");
  var nMin = Math.min(this._nR, this._nG, this._nB),
      nMax = Math.max(this._nR, this._nG, this._nB),
      nC = nMax - nMin,
      nL = (nMax + nMin) / 2;
  if (nC == 0) {
    var nH = 0, nS = 0;
  } else {
    nS = nL < 0.5 ? nC / (nMax + nMin) : nC / (2 - nMax - nMin);
    nH = (
      this._nR == nMax ? (this.nG - this.nB) / nC :
      this._nG == nMax ? (this.nB - this.nR) / nC + 2 :
                         (this.nR - this.nG) / nC + 4
    ) / 6;
  }
  return cHSLA(nH, nS, nL, this._nA);
}
cRGBA.foGetColorTemperature = function (uT, nTAlpha) {
  if (uT <= 6600) {
    return cRGBA(
      1,
      Math.max(0, Math.min(1, 0.390081578769020 * Math.log(uT / 100) - 0.63184144379)),
      Math.max(0, Math.min(1, 0.543206789110196 * Math.log(uT / 100 - 10) - 1.19625408914)),
      nTAlpha === undefined ? 1 : nTAlpha
    );
  }
  return cRGBA(
    Math.max(0, Math.min(1, 1.292936186062745 * Math.pow(uT / 100 - 60, -0.1332047592))),
    Math.max(0, Math.min(1, 1.129890860895294 * Math.pow(uT / 100 - 60, -0.0755148492))),
    1,
    nTAlpha === undefined ? 1 : nTAlpha
  );
};
cRGBA.prototype.foApplyColorTemperature = function (uT) {
  return this.foCopy(this.foGetHSLA().foApplyColorTemperature(uT));
}
module.exports = cRGBA;
