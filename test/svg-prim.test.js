const {SVG, Square, Circle, Triangle} = require('../lib/svg-prim');

describe('Shapes', () => {
    describe('constructer', () => {
        it('should throw an error if color is not type string', () => {
            expect(() => new Circle(1)).toThrowError(new Error('color must be type string'))
            expect(() => new Triangle(1)).toThrowError(new Error('color must be type string'))
            expect(() => new Square(1)).toThrowError(new Error('color must be type string'))
        });
        it('should throw an error given an invalid hexcode or basic color keyword', () => {
            expect(() => new Circle('#wrong')).toThrowError(new Error('color must be a valid hex code or color keyword'))
            expect(() => new Triangle('#wrong')).toThrowError(new Error('color must be a valid hex code or color keyword'))
            expect(() => new Square('#wrong')).toThrowError(new Error('color must be a valid hex code or color keyword'))
        });
        it('should contain all valid data passed to them', () => {
            circle = new Circle('black');
            triangle = new Triangle('green');
            square = new Square('blue');
            expect(circle.color).toEqual('black');
            expect(triangle.color).toEqual('green');
            expect(square.color).toEqual('blue');
        });
    });
    describe('getColor', () => {
        it('should throw an error if color is undefined', () => {
            circle = new Circle();
            triangle = new Triangle();
            square = new Square();
            expect(() => circle.getColor()).toThrowError(new Error('color has not been initialized'));
            expect(() => triangle.getColor()).toThrowError(new Error('color has not been initialized'));
            expect(() => square.getColor()).toThrowError(new Error('color has not been initialized'));
        })
        it('should return the color passed to it', () => {
            circle = new Circle('black');
            triangle = new Triangle('green');
            square = new Square('blue');
            expect(circle.getColor()).toEqual('black');
            expect(triangle.getColor()).toEqual('green');
            expect(square.getColor()).toEqual('blue');
        })
    })
    describe('render', () => {
        it('should return a raw SVG element containing all valid data', () => {
            circle = new Circle('black');
            triangle = new Triangle('green');
            square = new Square('blue');
            expect(circle.render()).toEqual('<circle cx="150" cy="100" r="100" style="fill:black"/>');
            expect(triangle.render()).toEqual('<polygon points="0,200 300,200 150,0" style="fill:green"/>');
            expect(square.render()).toEqual('<rect x="50" y="0" width="200" height="200" style="fill:blue"/>');
        });
    });
});

describe('SVG', () => {
    describe('constructer', () => {
        it('should throw an error if any input is not the correct type', () => {
            shape = new Circle('black');
            expect(() => new SVG(1, 'white', shape, 'logo')).toThrowError(new Error('chars must be type string'));
            expect(() => new SVG('SVG', 1, shape, 'logo')).toThrowError(new Error('charsColor must be type string'));
            expect(() => new SVG('SVG', 'white', 1, 'logo')).toThrowError(new Error('shape must be instance of Shape'));
            expect(() => new SVG('SVG', 'white', shape, 1)).toThrowError(new Error('filename must be type string'));
        })
        it('should throw an error given more than 3 chars', () => {
            shape = new Circle('black')
            expect(() => new SVG('1234','white', shape,'logo')).toThrowError(new Error('SVG can only contain up to 3 chars'));
        });
        it('should throw an error given an incorrect hexcode or CSS basic color code', () => {
            shape = new Circle('black')
            expect(() => new SVG('SVG', '#wrong', shape, 'logo')).toThrowError(new Error('charsColor must be a valid hex code or color keyword'));
        });
        it('should contain all valid data passed to it', () => {
            shape = new Circle('black');
            let mySVG = new SVG('SVG', '#FFFFFF', shape, 'logo');
            expect(mySVG.getDataPrim()).toEqual({chars: 'SVG', charsColor: '#FFFFFF', shape: shape, filename: 'logo'});
        });
    });
    describe('render', () => {
        it('should return an SVG containing all valid data', () => {
            shape = new Circle('black');
            let mySVG = new SVG('SVG', 'white', shape, 'logo');
            rawSVG =`
            <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                ${mySVG.getDataPrim()['shape'].render()}
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
            expect(mySVG.render()).toEqual(rawSVG);
        });
    });
});