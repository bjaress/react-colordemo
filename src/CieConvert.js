const space = require('color-space');
const tinycolor = require("tinycolor2");

class CieConvert {

    labRange() {
        return {min: space.lab.min, max: space.lab.max};
    }

    colorToLab(color) {
        const rgb = color.toRgb();
        const rgbArray = [rgb.r, rgb.g, rgb.b];
        const labArray = space.rgb.lab(rgbArray);
        return {l: labArray[0], a: labArray[1], b: labArray[2]};
    }

    labToColor(lab) {
        const labArray = [lab.l, lab.a, lab.b];
        const rgbArray = space.lab.rgb(labArray);
        return tinycolor({
            r: Math.round(rgbArray[0]),
            g: Math.round(rgbArray[1]),
            b: Math.round(rgbArray[2])
        });
    }


    luvRange() {
        return {min: space.luv.min, max: space.luv.max};
    }

    colorToLuv(color) {
        const rgb = color.toRgb();
        const rgbArray = [rgb.r, rgb.g, rgb.b];
        const luvArray = space.rgb.luv(rgbArray);
        return {l: luvArray[0], u: luvArray[1], v: luvArray[2]};
    }

    luvToColor(luv) {
        const luvArray = [luv.l, luv.u, luv.v];
        const rgbArray = space.luv.rgb(luvArray);
        return tinycolor({
            r: Math.round(rgbArray[0]),
            g: Math.round(rgbArray[1]),
            b: Math.round(rgbArray[2])
        });
    }
}

export default CieConvert
