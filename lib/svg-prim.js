const fs = require('fs');
// Include CSS basic color keywords to confirm against later. SVG supports the full list of CSS color codes, but adding any more is outside scope
const CSSBasicColorsKeywords = ['black','silver','gray','white','maroon','red','purple','fuchsia','green','lime','olive','yellow','navy','blue','teal','aqua'];
// an SVG class that can take in some parameters, modify them, and create a corresponding svg file
class SVG{
    // cosntruct an SVG instance
    constructor(chars, charsColor, shape, shapeColor, filename){
        // check that each param is type string
        if(typeof chars !== 'string') throw new Error('chars must be type string');
        if(typeof charsColor !== 'string') throw new Error('charsColor must be type string');
        if(typeof shape !== 'string') throw new Error('shape must be type string');
        if(typeof shapeColor !== 'string') throw new Error('shapeColor must be type string');
        if(typeof filename !== 'string') throw new Error('filename must be type string');

        // there can only be three characters in the logo
        if(chars.length > 3) throw new Error('SVG can only contain up to 3 chars');

        // check that the color params are either hexcodes with a regex test, or are included in the CSS basic color codes
        if(!/^#[0-9A-F]{6}$/i.test(charsColor) && (!CSSBasicColorsKeywords.includes(charsColor.toLowerCase()))) 
            throw new Error('charsColor must be a valid hex code or color keyword');
        if(!/^#[0-9A-F]{6}$/i.test(shapeColor) && !CSSBasicColorsKeywords.includes(shapeColor.toLowerCase()))
            throw new Error('shapeColor must be a valid hex code or color keyword');
        if(!['circle', 'square', 'triangle'].includes(shape.toLowerCase())) throw new Error('shape must be a valid shape');

        // if no errors have been thrown then assign each param.
        this.chars = chars;
        this.charsColor = charsColor;
        this.shape = shape;
        this.shapeColor = shapeColor;
        this.filename = filename;
    }
    getDataPrim(){
        // return the vals of the instance as a primitive object
        return {chars: this.chars, charsColor: this.charsColor, shape: this.shape, shapeColor: this.shapeColor, filename: this.filename};
    }
    getRawShape(){
        // given the 'shape' value is a valid shape, we return an SVG object containing the nesccary content to display center and give it the required color.
        if(this.shape.toLowerCase() === 'circle') return `<circle cx="150" cy="100" r="100" style="fill:${this.shapeColor}"/>`;
        else if(this.shape.toLowerCase() === 'square') return `<rect x="50" y="0" width="200" height="200" style="fill:${this.shapeColor}"/>`;
        else if(this.shape.toLowerCase() === 'triangle') return `<polygon points="0,200 300,200 150,0" style="fill:${this.shapeColor}"/>`;
        // if the shape is not valid, we specify it as no during construction
        else throw new Error('--SVG.getRawShape() invalid shape');
    }
    getRawSVG(){
        // return the raw SVG data using this instance's shape SVG, character code, and characters.
        return `
            <svg viewBox="0 0 300 200">
                ${this.getRawShape()}
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
module.exports = SVG;