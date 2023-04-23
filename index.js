const inquirer = require("inquirer");
const SVG = require('./lib/svg-prim');
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
    {message: "Color for that shape, either hexcode or CSS basic color codes (3 character codes not supported", name:"shapeColor",type:'input',default:'black'},
]
function init(){
    // directions for the user
    console.log('Answer the following prompts to generate your SVG logo');
    // intialize inquirer with our given questions.
    inquirer.prompt(questions)
    .then(response => {
        // hold our response
        let res;
        try {
            // try creating an SVG instance using the given data from inquirer
            res = new SVG(response['chars'], response['charsColor'], response['shape'], response['shapeColor'], response['filename']);
        } catch (err) {
            // if creating this instance threw an error, create an SVG using default params
            res = new SVG('SVG', 'white', 'square', 'black', 'logo');
            console.error('An error occured generating your SVG. A default "logo.svg" will be generated instead.');
        }
        return res;
    })
    .then(svg => {
        // create an SVG of that class
        svg.writeToFile();
        // confirm to user that the file was created.
        console.log(`Wrote to ${svg.filename}.svg succesfully`);
    })
}
init();