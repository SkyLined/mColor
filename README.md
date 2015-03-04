mColor
===============

Manipulate RGB/HSL colors module.

Getting Started
---------------
1. Install mColor via NPM.
  
  `npm install mcolor`
  
  Optionally: rename `mcolor` to `mColor`: npm is unable to handle the
  complexity of uppercase characters in a module name. Node on Windows does not
  have this problem, so renaming the folder is not required for you to use the
  module.
  
2. Require mColor in your project.
  
  `var mColor=require("mColor");`

3. Create and modify colors using mColor.
  
  ```
  var oWhiteRGBA = new mColor.cRGBA("#FFFFFFFF"),
      oWhiteHSLA = new mColor.cHSLA(0, 0, 1, 1),
      oRedRGBA = new mColor.cRGBA(1, 0, 0, 1),
      oRedHSLA = new mColor.cHSLA(0, 1, 0.5, 1),
      oTransparentGreenRGBA = new mColor.cRGBA(0, 1, 0, 0.5),
      oTransparentGreenHSLA = new mColor.cHSLA(1/3, 1, 0.5, 0.5),
      oPinkRGBA = new mColor.cRGBA(1, 0.75, 1, 1),
      oPinkHSLA = new mColor.cHSLA(5/6, 1, 7/8, 1);
  
  // Create a copy of red and make it white
  var oWhiteHSLA = oRedHSLA.foClone().foSetL(1);
  // Create a copy of transparent green and have it overlaying opaque pink.
  var oGreenMix = oTransparentGreenHSLA.foClone().foOver(oPinkRGBA) 
  // Create a copy of transparent green and make it opaque and add red to make yellow.
  var oYellowRGBA = oTransparentGreenHSLA.foClone().foSetA(1).foGetRGBA().foSetR(1);
  ```
Notes
-----
This module has two classes, `cRGBA` and `cHSLA`, which respectively represent
colors based on the intensity values of the red, green, and blue color channels
and the hue, saturation and luminosity values. Instances of either class can be
converted to the other. Note that this may result in loss of information, eg.
converting the color white from `cHSLA` to `cRGBA` results in loss of the hue
value.

API
-----
### `class cRGBA`
Create color objects based on red, green, and blue color channel intensity
values, as well as alpha transparency. Internally the values are stored as
floating point numbers in the range [0, 1], resulting in very little risk of
rounding errors.

#### Constructors:
##### `oRGBA = [new] cRGBA(string sRGBA);`
Where `sRGBA` is a [hex triplet](http://en.wikipedia.org/wiki/Web_colors#Hex_triplet)
or quadruplet. If a quadruplet is provided, the last digits provide the alpha
transparency value. Otherwise, the color will be fully opaque. Shorthand forms
are accepted, so "#FFF", "#FFFF", "#FFFFFF", and "#FFFFFFFF" are all opaque
white.
##### `oRGBA = [new] cRGBA(number nR, number nG, number nB [, number nA]);`
Where `nR`, `nG`, `nB`, and `nA` are numbers in the range [0, 1], which provide
intensity values for the red(`nR`), green(`nG`) and blue(`nB`) color channels
and the alpha transparency(`nA`). If `nA` is not provided, it is set to 1 and
the color will be fully opaque. Values outside the valid range will be capped
to fall within it.

#### Properties:
##### number `oRGBA.nR`, `oRGBA.nG`, `oRGBA.nB`, `oRGBA.nA` (read, write)
Values in the range [0, 1], which represent the intensity values for the
red(`nR`), green(`nG`) and blue(`nB`) color channels and the alpha
transparency(`nA`). When setting these properties to values outside the valid
range, they will be capped to fall within it.
##### number `oRGBA.uR`, `oRGBA.uG`, `oRGBA.uB`, `oRGBA.uA` (read, write)
Values are integers in the range [0, 255], which represent the intensity values
for the red(`uR`), green(`uG`) and blue(`uB`) color channels and the alpha
transparency(`uA`) of the color. When setting these properties to values outside
the valid range or floating point values, they will be capped to fall within it
and rounded to the nearest integer.
##### string `oRGBA.sR`, `oRGBA.sG`, `oRGBA.sB`, `oRGBA.sA` (read, write)
Values are hexadecimal number strings in the range ["00", "FF"], which represent
the intensity values for the red(`sR`), green(`sG`) and blue(`uB`) color
channels and the alpha transparency(`sA`) of the color. When setting these
properties to values outside the valid range, they will be capped to fall
within it. When reading these values, they are padded to always be two
characters long (eg. "0F" instead of "F").
##### string `oRGBA.sRGB`, `oRGBA.sRGBA` (read, write)
Values are hexadecimal number strings in the range ["000000", "FFFFFFF"], or
for `sRGBA` optionally ["00000000", "FFFFFFFFF"], representing a
[hex triplet](http://en.wikipedia.org/wiki/Web_colors#Hex_triplet) or
quadruplet. If a quadruplet is provided, the last digits provide the alpha
transparency value. Otherwise, the color will be fully opaque. Shorthand forms
are accepted when setting these properties, so "#FFF", "#FFFF", "#FFFFFF", and
"#FFFFFFFF" are all opaque white.

#### Methods:
##### `cRGBA oRGBA.foClone()`
Create and return a new cRGBA instance that has the same color as the object on
which the method is called.
##### `cRGBA oRGBA.foCopy(cRGBA oOther)` or `cRGBA oRGBA.foCopy(cHSLA oOther)`
Copy the color and transparencty from the given cRGBA or cHSLA instance into
the object on which the method is called. The object on which the method is
called is returned, allowing you to "chain" multiple method calls.
##### `cRGBA oRGBA.foSetR(number nR)`
Set the `nR` property and return the object on which the method is called,
allowing you to "chain" multiple method calls.
##### `cRGBA oRGBA.foSetG(number nG)`
Set the `nG` property and return the object on which the method is called,
allowing you to "chain" multiple method calls.
##### `cRGBA oRGBA.foSetB(number nB)`
Set the `nB` property and return the object on which the method is called,
allowing you to "chain" multiple method calls.
##### `cRGBA oRGBA.foSetA(number nA)`
Set the `nA` property and return the object on which the method is called,
allowing you to "chain" multiple method calls.
##### `cRGBA oRGBA.foSetRGB(string sRGB)`
Set the `sRGB` property and return the object on which the method is called,
allowing you to "chain" multiple method calls.
##### `cRGBA oRGBA.foSetRGBA(string sRGBA)`
Set the `sRGBA` property and return the object on which the method is called,
allowing you to "chain" multiple method calls.
##### `cRGBA oRGBA.foSetRGB(number nR, number nG, number nB)`
Set the `nR`, `nG`, and `nB` properties and return the object on which the
method is called, allowing you to "chain" multiple method calls.
##### `cRGBA oRGBA.foSetRGBA(number nR, number nG, number nB, number nA)`
Set the `nR`, `nG`, `nB`, and `nA` properties and return the object on which the
method is called, allowing you to "chain" multiple method calls.
##### `string oRGBA.fsGetCSSRGB()`
Return a string representation of the color in the form "rgb(number, number,
number)" that can be used in Cascading Style Sheets.
##### `string oRGBA.fsGetCSSRGBA()`
Return a string representation of the color in the form "rgba(number, number,
number, number)" that can be used in Cascading Style Sheets.
##### `cRGBA oRGBA.foOver(cRGBA oOther)` or `cRGBA oRGBA.foOver(cHSLA oOther)`
Modify the color as if it was shown over another color (`oOther`). For instance,
if the color is transparent red, and the `oOther` color is opaque white, the
color will become opaque pink. If the `oOther` color is transparent white, the
color will become less transparent pink. If the color is opaque, the color will
not change. The object on which the method is called is returned, allowing you
to "chain" multiple method calls.
##### `cRGBA oRGBA.foUnder(cRGBA oOther)` or `cRGBA oRGBA.foUnder(cHSLA oOther)`
Modify the color as if the color was shown under another color (`oOther`).
`oOne.foUnder(oOther)` results in the same color as `oOther.foOver(oOne)`, but
the result is store in `oOne` in the former and `oOther` in the later. The
object on which the method is called is returned, allowing you to "chain"
multiple method calls.
##### `cHSLA oRGBA.foGetHSLA()`
Create and return a `cHSLA` instance that represents the same color.

### `class cHSLA`
Create color objects based on red, green, and blue color channel intensity
values, as well as alpha transparency. Internally the values are stored as
floatinS point numbers in the range [0, 1], resultinS in very little risk of
roundinS errors.

#### Constructors:
##### `oHSLA = [new] cHSLA(number nH, number nS, number nL [, number nA]);`
Where `nH`, `nS`, `nL`, and `nA` are numbers in the range [0, 1], which provide
values for the hue(`nH`), saturation(`nS`) and luminosity(`nL`) of the color
and the alpha transparency(`nA`). If `nA` is not provided, it is set to 1 and
the color will be fully opaque. Values outside the valid range will be capped
to fall within it. A hue value of 0 or 1 represents red, 1/6 yellow, 1/3 green,
1/2 cyan, 2/3 blue and 5/6 purple.
#### Properties:
##### number `oHSLA.nH`, `oHSLA.nS`, `oHSLA.nL`, `oHSLA.nA` (read, write)
Values in the range [0, 1], which represent the hue(`nH`), saturation(`nS`) and
luminosity(`nL`) of the color and the alpha transparency(`nA`). When setting
these properties to values outside the valid range, they will be capped to fall
within it.

#### Methods:
##### `cHSLA oHSLA.foClone()`
Create and return a new cHSLA instance that has the same color as the object on
which the method is called.
##### `cHSLA oHSLA.foCopy(cHSLA oOther)` or `cHSLA oHSLA.foCopy(cRGBA oOther)`
Copy the color and transparencty from the given cHSLA or cRGBA instance into
the object on which the method is called. The object on which the method is
called is returned, allowing you to "chain" multiple method calls.
##### `cHSLA oHSLA.foSetH(number nH)`
Set the `nH` property and return the object on which the method is called,
allowing you to "chain" multiple method calls.
##### `cHSLA oHSLA.foSetS(number nS)`
Set the `nS` property and return the object on which the method is called,
allowing you to "chain" multiple method calls.
##### `cHSLA oHSLA.foSetL(number nL)`
Set the `nL` property and return the object on which the method is called,
allowing you to "chain" multiple method calls.
##### `cHSLA oHSLA.foSetA(number nA)`
Set the `nA` property and return the object on which the method is called,
allowing you to "chain" multiple method calls.
##### `cHSLA oHSLA.foLighten(number nAmount)`
Increase the luminosity by nAmount (where values <=0 mean the color does not
change, 0.5 means the color becomes 50% closer to white and >=1 means the color
becomes white). The object on which the method is called is returned, allowing
you to "chain" multiple method calls. 
##### `cHSLA oHSLA.foDarken(number nAmount)`
Decrease the luminosity by nAmount (where values <=0 mean the color does not
change, 0.5 means the color becomes 50% closer to black and >=1 means the color
becomes black). The object on which the method is called is returned, allowing
you to "chain" multiple method calls. 
##### `cHSLA oHSLA.foOver(cHSLA oOther)` or `cHSLA oHSLA.foOver(cHSLA oOther)`
Modify the color as if it was shown over another color (`oOther`). For instance,
if the color is transparent red, and the `oOther` color is opaque white, the
color will become opaque pink. If the `oOther` color is transparent white, the
color will become less transparent pink. If the color is opaque, the color will
not change. The object on which the method is called is returned, allowing you
to "chain" multiple method calls.
##### `cHSLA oHSLA.foUnder(cHSLA oOther)` or `cHSLA oHSLA.foUnder(cHSLA oOther)`
Modify the color as if the color was shown under another color (`oOther`).
`oOne.foUnder(oOther)` results in the same color as `oOther.foOver(oOne)`, but
the result is store in `oOne` in the former and `oOther` in the later. The
object on which the method is called is returned, allowing you to "chain"
multiple method calls.
##### `cRGBA oHSLA.foGetRGBA()`
Create and return a `cRGBA` instance that represents the same color.
--------------------------------------------------------------------------------

### License
This code is licensed under [CC0 v1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/).
