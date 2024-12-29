var html = document.getElementsByTagName('html')[0];
var input = document.getElementById('input');
var terminal = document.getElementById('output');
var term = document.getElementById('terminal');
var command = '';

function yearsSince(dateString) {
  const givenDate = new Date(dateString);
  const currentDate = new Date();
  let years = currentDate.getFullYear() - givenDate.getFullYear();

  // Adjust if the current date is before the anniversary of the given date this year
  const hasNotHadAnniversary = 
    currentDate.getMonth() < givenDate.getMonth() || 
    (currentDate.getMonth() === givenDate.getMonth() && currentDate.getDate() < givenDate.getDate());

  if (hasNotHadAnniversary) {
    years--;
  }

  return years;
}

var commands = {
  'notF':['Command not found. For a list of commands, type \'help\'.'],
  'ls':[
    'don\'t/ mind/ these/ folders/ secret.txt',
  ],
  'cat secret.txt':[
    '&nbsp',
    'What are you some kind of hacker ? 🧐',
    '&nbsp',
    '   ██░ ██  ▄▄▄      ▄████▄   ██ ▄█▀▓█████  ██▀███   ',
    '  ▓██░ ██▒▒████▄   ▒██▀ ▀█   ██▄█▒ ▓█   ▀ ▓██ ▒ ██▒ ',
    '  ▒██▀▀██░▒██  ▀█▄ ▒▓█    ▄ ▓███▄░ ▒███   ▓██ ░▄█ ▒ ',
    '  ░▓█ ░██ ░██▄▄▄▄██▒▓▓▄ ▄██▒▓██ █▄ ▒▓█  ▄ ▒██▀▀█▄   ',
    '  ░▓█▒░██▓ ▓█   ▓██▒ ▓███▀ ░▒██▒ █▄░▒████▒░██▓ ▒██▒ ',
    '   ▒ ░░▒░▒ ▒▒   ▓▒█░ ░▒ ▒  ░▒ ▒▒ ▓▒░░ ▒░ ░░ ▒▓ ░▒▓░ ',
    '   ▒ ░▒░ ░  ▒   ▒▒ ░ ░  ▒   ░ ░▒ ▒░ ░ ░  ░  ░▒ ░ ▒░ ',
    '   ░  ░░ ░  ░   ▒  ░        ░ ░░ ░    ░     ░░   ░  ',
    '   ░  ░  ░      ░  ░ ░      ░  ░      ░  ░   ░      ',
    '&nbsp',
  ],
  'help':[
    '&nbsp',
    ' help                  -> print all commands',
    ' cat                   -> cat what ?',
    ' banner                -> cool banner',
    ' whoami                -> info about me',
    ' social                -> get my contact info',
    ' projects              -> info about some of my projects',
    ' clear                 -> clear screen',
    ' matrix                -> Matrix ?!',
    '&nbsp',
  ],
  'clear':['cleared ;)'],
  'social':[
    '&nbsp',
    '    ┏┓┳┏┳┓┏┳┳┳┓       ┏┓┳┳┓┏┓┳┓       ┳┳┓┏┓┏┳┓┏┓┏┓┳┓┏┓┳┳┓  ',
    '    ┃┓┃ ┃┣┫┃┃┣┫       ┃┓┃┃┃┣┫┃┃       ┃┃┃┗┓ ┃ ┣┫┃┓┣┫┣┫┃┃┃  ',
    '    ┗┛┻ ┻┛┗┗┛┻┛       ┗┛┛ ┗┛┗┻┗┛      ┻┛┗┗┛ ┻ ┛┗┗┛┛┗┛┗┛ ┗  ',
    '&nbsp',
    ' -><a class="fancy-text" href=\'https://github.com/Heun11\' target="_blank" rel="noopener noreferrer">github@Heun11</a>   -><a class="fancy-text" href=\'mailto:marek.lamos16@gmail.com\' target="_blank" rel="noopener noreferrer">gmail@marek</a>  -><a class="fancy-text" href=\'https://www.instagram.com/mareklamos/\' target="_blank" rel="noopener noreferrer">instagram@mareklamos</a>',
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
    '<span class="line category">./</span>',
    ' ├─<span class="line category">Fully Finished Projects:</span>',
    ' │  ├─<span class="line title">Between Life & Darkness:</span>',
    ' │  │  └─ <a class="fancy-text" href=\'https://store.steampowered.com/app/3111020/Between_Life__Darkness/\' target="_blank" rel="noopener noreferrer">@steam</a> ─ story-driven puzzle game.',
    ' │  ├─<span class="line title">Asteroid Aeronaut:</span>',
    ' │  │  └─ <a class="fancy-text" href=\'https://heun.itch.io/asteroid-aeronaut\' target="_blank" rel="noopener noreferrer">@itch.io</a> ─ small arcade game.',
    ' │  ├─<span class="line title">Enguin:</span>',
    ' │  │  └─ <a class="fancy-text" href=\'https://github.com/Heun11/Enguin\' target="_blank" rel="noopener noreferrer">@github</a> ─ esoteric game engine based on terminal technology.',
    ' │  ├─<span class="line title">touchSliderJS:</span>',
    ' │  │  └─ <a class="fancy-text" href=\'https://github.com/Heun11/touchSliderJs\' target="_blank" rel="noopener noreferrer">@github</a> ─ touch slider library written in plain JS & CSS.',
    ' │  ├─<span class="line title">Filiposs Tale:</span>',
    ' │  │  └─ <a class="fancy-text" href=\'https://github.com/Heun11/filiposs-tale\' target="_blank" rel="noopener noreferrer">@github</a> ─ small platformer made for GameJam.',
    ' │  ├─<span class="line title">vloz.to:</span>',
    ' │  │  └─ <a class="fancy-text" href=\'https://vlozto.pythonanywhere.com/\' target="_blank" rel="noopener noreferrer">@deploy</a> ─ small website to store files (temporary).',
    ' │  │',
    ' ├─<span class="line category">Suspended Projects:</span>',
    ' │',
    ' │',
    ' │',
    ' │',
    '&nbsp',
  ],
  'whoami':[
    '&nbsp',
    '<p class="fancy-text"> ⚠️  WARNING: very boring text ⚠️ </p>',
    '&nbsp',
    ` Hi, my name is Marek and I\'m ${yearsSince("2007-01-16")} years old guy from slovakia 🇸🇰!`,
    ' What are you seeing is my best attempt to create interesting and fun portfolio. 🤓',
    ' My main focus is on developing games (mostly) from scratch using C and something like Raylib',
    ' or SDL2 (I know this isn\'t completely from scratch but I meant that I\'m not using any ',
    ' modern Game Engine that does everything for you). I am also a huge fan of embedded systems',
    ' and electronics. TBH I\'m not that big fan of web development but I think I like it more than',
    ' mobile app development (that is just real pain in the ass). 😒',
    '&nbsp',
    ' Anyway, feel free to explore this fun little web terminal and let me know what you think. 😉',
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
    '  ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═╝ ╚═╝',
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

const observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
    else{
      entry.target.classList.remove('show');
    }
  });
});
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el)=>observer.observe(el));
