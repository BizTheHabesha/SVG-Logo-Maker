const inquirer = require("inquirer");
const SVGPrims = require('./lib/svg-prim');
// questions array for inquirer to use later
const questions = [
    {message: "File to write to, not including file extension:",name:"filename", type:'input',default:'logo'},
    {message: "Up to 3 characters to add to logo:",name:'chars',type:'input', default:'SVG'},
    {message: "Color for those characters, either hexcode or CSS basic color codes (3 character codes not supported):",name:'charsColor',type:'input',default:'white'},
    {message: "A shape to put in the background:",name:'shape',type:'list',choices:[
        'Square',
        'Triangle',
        'Circle'
    ], default: 'Square'},
    {message: "Color for that shape, either hexcode or CSS basic color codes (3 character codes not supported):", name:"shapeColor",type:'input',default:'black'},
]
function init(){
    // directions for the user
    console.log('Answer the following prompts to generate your SVG logo');
    // intialize inquirer with our given questions.
    inquirer.prompt(questions)
    .then(response => {
        // hold our classes
        let svg;
        let shape;
        try {
            // try creating the Shape instance using the shape color from inquirer
            if(response['shape'] === 'Circle') shape = new SVGPrims.Circle(response['shapeColor']);
            if(response['shape'] === 'Triangle') shape = new SVGPrims.Triangle(response['shapeColor']);
            if(response['shape'] === 'Square') shape = new SVGPrims.Square(response['shapeColor']);
        } catch (err) {
            // if creating this instance threw an error, create a Shape using default params
            shape = new SVGPrims.Square('black');
            console.error('An error occured creating your Shape. A default black square will be used instead.');
        }
        try {
            // try creating an SVG instance using the given data from inquirer
            svg = new SVGPrims.SVG(response['chars'], response['charsColor'], shape, response['filename']);
        } catch (err) {
            // if creating this instance threw an error, create an SVG using default params
            svg = new SVGPrims.SVG('SVG', 'white', shape, response['filename']);
            console.error('An error occured generating your SVG. A default SVG will be generated instead.');
        }
        return svg;
    })
    .then(svg => {
        try{
            // create the SVG file if it doesn't exist and write to it.
            svg.writeToFile();
        } catch (err){
            // if we encounter an error while writing, we throw the error.
            console.error('An error occured writing to your SVG.');
            throw err;
        } 
        // confirm to user that the file was created.
        console.log(`Wrote to ${svg.getDataPrim()['filename']}.svg succesfully`);
    })
    .catch(err => {
        // any uncaught exceptions should be thrown.
        console.error('An exception occured.');
        throw err;
    });
}
init();