var html = document.getElementsByTagName('html')[0];
var input = document.getElementById('input');
var terminal = document.getElementById('output');
var term = document.getElementById('terminal');
var command = '';

var commands = {
  'notF':['Command not found. For a list of commands, type \'help\'.'],
  'help':[
    '&nbsp',
    ' help                  -> print all commands',
    ' banner                -> cool banner',
    ' whoami                -> info about me',
    ' social                -> get my contact info',
    ' projects              -> info about some of my projects',
    ' clear                 -> clear screen',
    '&nbsp',
  ],
  'clear':['cleared ;)'],
  'social':[
    '&nbsp',
    ' github                -> <a href=\'https://github.com/Heun11\'>github@Heun11</a>',
    ' instagram             -> <a href=\'https://www.instagram.com/mareklamos/\'>instagram@mareklamos</a>',
    ' mail                  -> <a href=\'mailto:marek.lamos16@gmail.com\'>gmail@marek</a>',
    '&nbsp',
  ],
  'projects':[
    '&nbsp',
    ' Portfolio Web         -> <a href=\'https://heun11.github.io/\'>Heun11@portfolio</a>',
    ' Enguin                -> <a href=\'https://github.com/Heun11/Enguin\'>Heun11@Enguin</a>',
    ' Vloz2                 -> <a href=\'https://github.com/Heun11/Vloz2\'>Heun11@Vloz2</a>',
    ' TouchSliderjs         -> <a href=\'https://github.com/Heun11/touchSliderJS\'>Heun11@touchSliderJS</a>',
    ' slovenskeC            -> <a href=\'https://github.com/Heun11/slovenskeC\'>Heun11@SlovenskeC</a>',
    ' RayCastingEngineJS    -> <a href=\'https://github.com/Heun11/RayCastingEngineJS\'>Heun11@RayCastingEngineJS</a>',
    ' Filipos\'s Tale        -> <a href=\'https://github.com/Heun11/filiposs-tale\'>Heun11@filiposs-tale</a>',
    ' Brainf*ck interpreter -> <a href=\'https://github.com/Heun11/brainf_ck-interpreter\'>Heun11@brainf_ck-interpreter</a>',
    ' Minimax TicTacToe     -> <a href=\'https://github.com/Heun11/minimax-ticttactoe\'>Heun11@minimax-ticttactoe</a>',
    '&nbsp',
  ],
  'whoami':[
    '&nbsp',
    ' Hello there, my name is Marek and I\'m young student from slovakia 🇸🇰!',
    ' What you see is my best try to create interesting and kinda original portfolio 😀.',
    '&nbsp',
    ' I\'m interested in: -> Web Development',
    '                    -> Game Development',
    '                    -> Tools Development',
    '                    -> Electronics',
    '&nbsp',
    ' I would now give you my honest opinion: \'C is GOAT!\'',
    '&nbsp',
  ],
  'banner':[
    ' Heun11 (H11) Not A Corporation. All chars reserved.',
    '&nbsp',
    '  ██╗  ██╗███████╗██╗   ██╗███╗   ██╗ ██╗ ██╗',
    '  ██║  ██║██╔════╝██║   ██║████╗  ██║███║███║',
    '  ███████║█████╗  ██║   ██║██╔██╗ ██║╚██║╚██║',
    '  ██╔══██║██╔══╝  ██║   ██║██║╚██╗██║ ██║ ██║',
    '  ██║  ██║███████╗╚██████╔╝██║ ╚████║ ██║ ██║',
    '  ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═╝ ╚═ ',
    '&nbsp',
    ' Welcome to my portfolio web terminal.',
    ' For a list of available commands, type \'help\'.'
  ]
}

input.addEventListener("input", (e) => {
  input.style.width = 1+getTextWidth(input.value, '1.25rem monospace')+'px';
  // console.log(input.style.width, getTextWidth(input.value, '1.25rem monospace'));
});

html.addEventListener("keypress", (e)=>{
  if(e.keyCode === 13){
    e.preventDefault();
    // console.log(input.value)
    command = input.value;
    input.value = '';
    input.style.width = 1+getTextWidth(input.value, '1.25rem monospace')+'px';

    printLine(`<span style='color:#aafaaa;'>marek@Heun11:~ </span>${command}`);
   
    if(commands[command]!==undefined){
      commands[command].forEach(line=>{
        printLine(line);
        if(command=='clear'){
          terminal.innerHTML = '';
        }
      })
    }
    else{
      commands['notF'].forEach(line=>{
        printLine(line); 
      });
    }
  }
  else{
    input.focus();
    
  }


  term.scrollTop = term.scrollHeight;
});



function printLine(line)
{
  html = `<p class='line'>${line}</p>` 
  terminal.innerHTML += html;
}

function getTextWidth(text, font)
{
  let canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  let context = canvas.getContext("2d");
  context.font = font;
  let metrics = context.measureText(text);
  return metrics.width;
}
