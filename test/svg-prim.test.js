const SVG = require('../lib/svg-prim');
describe('SVG', () => {
    describe('constructer', () => {
        it('should throw an error if any input is not type string', () => {
            expect(() => new SVG(1, 'white', 'circle', 'black', 'logo')).toThrowError(new Error('chars must be type string'));
            expect(() => new SVG('SVG', 1, 'circle', 'black', 'logo')).toThrowError(new Error('charsColor must be type string'));
            expect(() => new SVG('SVG', 'white', 1, 'black', 'logo')).toThrowError(new Error('shape must be type string'));
            expect(() => new SVG('SVG', 'white', 'circle', 1, 'logo')).toThrowError(new Error('shapeColor must be type string'));
            expect(() => new SVG('SVG', 'white', 'circle', 'black', 1)).toThrowError(new Error('filename must be type string'));
        })
        it('should throw an error given more than 3 chars', () => {
            expect(() => new SVG('1234','white','circle','black','logo')).toThrowError(new Error('SVG can only contain up to 3 chars'));
        });
        it('should throw an error given an incorrect hexcode or CSS basic color code', () => {
            expect(() => new SVG('SVG', '#wrong', 'circle', 'black', 'logo')).toThrowError(new Error('charsColor must be a valid hex code or color keyword'));
            expect(() => new SVG('SVG', 'white', 'circle', '#wrong', 'logo')).toThrowError(new Error('shapeColor must be a valid hex code or color keyword'));
        });
        it('should throw an error given an invalid shape', () => {
            expect(() => new SVG('SVG', 'white', 'pentagon', 'black', 'logo')).toThrowError(new Error('shape must be a valid shape'));
        });
        it('should contain all valid data passed to it', () => {
            let mySVG = new SVG('SVG', '#FFFFFF', 'circle', '#000000', 'logo');
            expect(mySVG.getDataPrim()).toEqual({chars: 'SVG', charsColor: '#FFFFFF', shape: 'circle', shapeColor: '#000000', filename: 'logo'});
        });
    });
    describe('getRawShape', () => {
        it('should throw an error if the shape is invalid', () => {
            let mySVG = new SVG('SVG', '#FFFFFF', 'circle', '#000000', 'logo');
            mySVG.shape = 'wrong';
            expect(() => mySVG.getRawShape()).toThrowError(new Error('--SVG.getRawShape() invalid shape'));
        });
        it('should return raw SVG of a shape given a valid shape', () => {
            let circle = new SVG('SVG', 'white', 'circle', 'black', 'logo');
            let triangle = new SVG('SVG', 'white', 'triangle', 'black', 'logo');
            let square = new SVG('SVG', 'white', 'square', 'black', 'logo');
            expect(circle.getRawShape()).toEqual(`<circle cx="150" cy="100" r="100" style="fill:black"/>`);
            expect(triangle.getRawShape()).toEqual(`<polygon points="0,200 300,200 150,0" style="fill:black"/>`);
            expect(square.getRawShape()).toEqual(`<rect x="50" y="0" width="200" height="200" style="fill:black"/>`);
        });
    });
    describe('getRawSVG', () => {
        it('should return an SVG using the given valid data', () => {
            let mySVG = new SVG('SVG', 'white', 'circle', 'black', 'logo');
            rawSVG =`
            <svg viewBox="0 0 300 200">
                ${mySVG.getRawShape()}
                <text>
                    <tspan 
                        x="150"
                        y="105"
                        text-anchor="middle"
                        alignment-baseline="middle"
                        style="fill:${mySVG.getDataPrim()['charsColor']}; font-size: 70px; font-family: sans-serif">
                        ${mySVG.getDataPrim()['chars']}
                    </tspan>
                </text>
            </svg>`
            expect(mySVG.getRawSVG()).toEqual(rawSVG);
        })
    })
})