const fs = require('fs');
// Include CSS basic color keywords to confirm against later. SVG supports the full list of CSS color codes, but adding any more is outside scope
const CSSBasicColorsKeywords = ['black','silver','gray','white','maroon','red','purple','fuchsia','green','lime','olive','yellow','navy','blue','teal','aqua'];
// a shape object to help render SVG data
class Shape{
    constructor(color){
        // use the set color method to set to the param and handle errors
        this.setColor(color);
    }
    setColor(color){
        // if the color is undefined, we set the property to undefined to prevent weird js things
        if(typeof color === 'undefined'){
            this.color = undefined;
            return;
        }
        // otherwise, ensure color is a string
        if(typeof color !== 'string') throw new Error('color must be type string');
        // ensure the string is a valid hexcode or is member to the CSS basic color codes
        if(!/^#[0-9A-F]{6}$/i.test(color) && (!CSSBasicColorsKeywords.includes(color.toLowerCase()))) 
            throw new Error('color must be a valid hex code or color keyword');
        // set to property to the param
        this.color = color;
    }
    getColor(){
        // if color is undefined, throw an error
        if(!this.color) throw new Error('color has not been initialized');
        // return color property
        return this.color;
    }
}
class Square extends Shape{
    constructor(color){
        // use the shape class to construct this class
        super(color);
    }
    getSVG(){
        // return SVG element of the corresponding shape using the getColor method inherited from Shape
        return `<rect x="50" y="0" width="200" height="200" style="fill:${this.getColor()}"/>`;
    }
}
class Circle extends Shape{
    constructor(color){
        // use the shape class to construct this class
        super(color);
    }
    getSVG(){
         // return SVG element of the corresponding shape using the getColor method inherited from Shape
        return `<circle cx="150" cy="100" r="100" style="fill:${this.getColor()}"/>`;
    }
}
class Triangle extends Shape{
    constructor(color){
        // use the shape class to construct this class
        super(color);
    }
    getSVG(){
         // return SVG element of the corresponding shape using the getColor method inherited from Shape
        return `<polygon points="0,200 300,200 150,0" style="fill:${this.getColor()}"/>`;
    }
}
class SVG{
    // cosntruct an SVG instance
    constructor(chars, charsColor, shape, filename){
        // check that each param is type string
        if(typeof chars !== 'string') throw new Error('chars must be type string');
        if(typeof charsColor !== 'string') throw new Error('charsColor must be type string');
        if(typeof filename !== 'string') throw new Error('filename must be type string');
        // check that shape param is an instance of shape class
        if(!(shape instanceof Shape)) throw new Error('shape must be instance of Shape');

        // there can only be three characters in the logo
        if(chars.length > 3) throw new Error('SVG can only contain up to 3 chars');

        // check that the color params are either hexcodes with a regex test, or are included in the CSS basic color codes
        if(!/^#[0-9A-F]{6}$/i.test(charsColor) && (!CSSBasicColorsKeywords.includes(charsColor.toLowerCase()))) 
            throw new Error('charsColor must be a valid hex code or color keyword');

        // if no errors have been thrown then assign each param.
        this.chars = chars;
        this.charsColor = charsColor;
        this.shape = shape;
        this.filename = filename;
    }
    getDataPrim(){
        // return the vals of the instance as a primitive object
        return {chars: this.chars, charsColor: this.charsColor, shape: this.shape, filename: this.filename};
    }
    getRawSVG(){
        // return the raw SVG data using this instance's shape SVG, character code, and characters.
        return `
            <svg viewBox="0 0 300 200">
                ${this.getDataPrim()['shape'].getSVG()}
                <text>
                    <tspan 
                        x="150"
                        y="105"
                        text-anchor="middle"
                        alignment-baseline="middle"
                        style="fill:${this.charsColor}; font-size: 70px; font-family: sans-serif">
                        ${this.chars}
                    </tspan>
                </text>
            </svg>`
    }
    writeToFile(){
        // use fs to write to a file using the provided filename and raw SVG data.
        fs.writeFile(`./${this.filename}.svg`,this.getRawSVG(),'utf-8',(err) => {
            // log error if one is thrown.
            if(err) console.error(err);
        });
    }
}
module.exports = {SVG, Square, Circle, Triangle}