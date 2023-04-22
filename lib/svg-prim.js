// create an SVG class to store raw data and a method to create a file from this data
const fs = require('fs');
const CSSBasicColorsKeywords = ['black','silver','gray','white','maroon','red','purple','fuchsia','green','lime','olive','yellow','navy','blue','teal','aqua'];
class SVG{
    constructor(chars, charsColor, shape, shapeColor, filename){
        if(typeof chars !== 'string') throw new Error('chars must be type string');
        if(chars.length > 3) throw new Error('SVG can only contain up to 3 chars');
        if(typeof charsColor !== 'string') throw new Error('charsColor must be type string');
        if(!/^#[0-9A-F]{6}$/i.test(charsColor) && (!CSSBasicColorsKeywords.includes(charsColor))) 
            throw new Error('charsColor must be a valid hex code or color keyword (10)');
        if(typeof shape !== 'string') throw new Error('charsColor must be type string');
        if(!['circle', 'square', 'triangle'].includes(shape)) throw new Error('shape must be a valid shape');
        if(typeof shapeColor !== 'string') throw new Error('shapeColor must be type string');
        if(!/^#[0-9A-F]{6}$/i.test(shapeColor) && !CSSBasicColorsKeywords.includes(shapeColor))
            throw new Error('shapeColor must be a valid hex code or color keyword');
        if(typeof filename !== 'string') throw new Error('filename must be type string');
        this.chars = chars;
        this.charsColor = charsColor;
        this.shape = shape;
        this.shapeColor = shapeColor;
        this.filename = filename;
    }
    getDataPrim(){
        return {chars: this.chars, charsColor: this.charsColor, shape: this.shape, shapeColor: this.shapeColor};
    }
    getRawShape(){
        if(this.shape === 'circle') return `<circle cx="150" cy="100" r="100" style="fill:${this.shapeColor}"/>`;
        else if(this.shape === 'square') return `<rect x="50" y="0" width="200" height="200" style="fill:${this.shapeColor}"/>`;
        else if(this.shape === 'triangle') return `<polygon points="0,200 300,200 150,0" style="fill:${this.shapeColor}"/>`;
        else throw new Error('--SVG.getRawShape() invalid shape')
    }
    getRawSVG(){
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
            </svg>
        `
    }
    writeToFile(){
        fs.writeFile(`./${this.filename}.svg`,this.getRawSVG(),'utf-8',(err) => {
            if(err) console.error(err);
            else console.log(`Wrote to ${this.filename}.svg succesfully`);
        });
    }
}
module.exports = SVG;