import CieConvert from './CieConvert'
const tinycolor = require("tinycolor2");

it('matches known cases', () => {
    const convert = new CieConvert();
    expect(tinycolor.equals(
        convert.luvToColor({l:0, u:0, v:0}),
        tinycolor({r:0, g:0, b:0})))
        .toBe(true);

    expect(tinycolor.equals(
        convert.luvToColor({l:100, u:0, v:0}),
        tinycolor({r:255, g:255, b:255})))
        .toBe(true);

    expect(tinycolor.equals(
        convert.luvToColor({l:50, u:0, v:0}),
        tinycolor({r:119, g:119, b:119})))
        .toBe(true);

    expect(tinycolor.equals(
        convert.luvToColor({l:50, u:-100, v:0}),
        tinycolor({r:0, g:153, b:130})))
        .toBe(true);

    expect(tinycolor.equals(
        convert.luvToColor({l:50, u:0, v:-100}),
        tinycolor({r:120, g:99, b:227})))
        .toBe(true);


    expect(tinycolor.equals(
        convert.luvToColor({l:75, u:50, v:50}),
        tinycolor({r:237, g:171, b:105})))
        .toBe(true);

    expect(tinycolor.equals(
        convert.luvToColor({l:75, u:50, v:-50}),
        tinycolor({r:248, g:152, b:235})))
        .toBe(true);

    expect(tinycolor.equals(
        convert.luvToColor({l:75, u:-50, v:50}),
        tinycolor({r:95, g:206, b:125})))
        .toBe(true);


    expect(tinycolor.equals(
        convert.luvToColor({l:50, u:-50, v:-100}),
        tinycolor({r:0, g:130, b:231})))
        .toBe(true);

    expect(tinycolor.equals(
        convert.luvToColor({l:50, u:-50, v:50}),
        tinycolor({r:0, g:139, b:51})))
        .toBe(true);
});


it('it consistently converts between RGB and CIELUV', () => {
    const convert = new CieConvert();
    for (let i = 0; i < 1000; i++) {
        const color = tinycolor.random()
        const roundTrip = convert.luvToColor(convert.colorToLuv(color));
        expect(tinycolor.equals(color, roundTrip))
            .toBe(true);
    }
});
