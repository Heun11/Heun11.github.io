var html = document.getElementsByTagName('html')[0];
var input = document.getElementById('input');
var terminal = document.getElementById('output');
var term = document.getElementById('terminal');
var command = '';
var runMatrix = false;
const fps = 30;
var matrixTable = undefined;
var matrixLengths = [];
var matrixCounts = [];

function yearsSince(dateString) 
{
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

function getCharacterWidth(div) 
{
  const divWidth = div.offsetWidth;
  const tempSpan = document.createElement('span');
  tempSpan.textContent = 'A'; // Use a single character
  tempSpan.style.font = getComputedStyle(div).font; // Match the font of the div
  tempSpan.style.visibility = 'hidden'; // Ensure it's not visible
  document.body.appendChild(tempSpan);
  const charWidth = tempSpan.offsetWidth;
  document.body.removeChild(tempSpan);
  return Math.floor(divWidth / charWidth);
}

function getCharacterHeight(div) 
{
  const tempSpan = document.createElement('span');
  tempSpan.textContent = 'A'; // Single character for measurement
  tempSpan.style.font = getComputedStyle(div).font; // Match the font
  tempSpan.style.lineHeight = getComputedStyle(div).lineHeight; // Match line-height
  tempSpan.style.visibility = 'hidden'; // Hide from view
  document.body.appendChild(tempSpan);
  const charHeight = tempSpan.offsetHeight;
  document.body.removeChild(tempSpan);
  return charHeight;
}

function calculateCSSValue(expression) 
{
  const tempElement = document.createElement('div');
  tempElement.style.position = 'absolute';
  tempElement.style.visibility = 'hidden'; // Ensure it's not visible
  tempElement.style.height = expression; // Set the expression as the height
  document.body.appendChild(tempElement);
  const computedValue = getComputedStyle(tempElement).height;
  document.body.removeChild(tempElement);
  return parseFloat(computedValue);
}

function getLinesInDiv(div) 
{
  const divHeight = calculateCSSValue("calc(90vh - 3rem)"); // Total height of the div
  const charHeight = getCharacterHeight(div); // Height of a single character line
  console.log((divHeight), charHeight);
  return Math.floor(divHeight / charHeight); // Calculate the number of lines
}

function generateRandomString(length) 
{
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*+=-[](){}.,;';
  const charactersLength = characters.length;
  var result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getRandomNumber(x, y) 
{
  return Math.floor(Math.random() * (y - x + 1)) + x;
}

function matrix()
{
  terminal.innerText = '';
  printLine('<span class="line matrix-text-first">-> Press ESC to exit matrix. Now, let it rain!</span>');
  var width = getCharacterWidth(terminal);
  var height = getLinesInDiv(terminal);
  if(!matrixTable || matrixTable.length!=width || matrixTable[0].length!=height){
    matrixTable = [];
    for(var i=0;i<width;i++){
      matrixTable[i] = generateRandomString(height);
      matrixCounts[i] = 0;
      matrixLengths[i] = getRandomNumber(5, 20);
    }
  }
  var line;
  let c;

  for(var i=0;i<height;i++){
    
    line = '';
    for(var j=0;j<width;j++){
      if(i==0){
        matrixCounts[j]++;
      }
      if(matrixCounts[j]>height+matrixLengths[j]){
        matrixTable[j] = generateRandomString(height);
        matrixCounts[j] = 0;
        matrixLengths[j] = getRandomNumber(5, 30);
      }
      if(matrixCounts[j]<height){
        c = `matrix-text${(i==matrixCounts[j])?'-first':''}`;
      }
      else{
        c = `matrix-text`;
      }

      if(i<matrixCounts[j] && i>matrixCounts[j]-matrixLengths[j]){
        c += ' matrix-text-in';
      }

      line+=`<span class="line ${c}">${matrixTable[j][i]}</span>`;
    }
    printLine(line);
  }
}

function startLoop()
{
  if(runMatrix===true){
    matrix();
    setTimeout(startLoop, 1000/fps);
  }
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
    '<span class="line title">help</span>',
    ' <span class="line fancy-text">└─></span> print all commands',
    '<span class="line title">cat</span>',
    ' <span class="line fancy-text">└─></span> cat what ?',
    '<span class="line title">banner</span>',
    ' <span class="line fancy-text">└─></span> cool banner',
    '<span class="line title">whoami</span>',
    ' <span class="line fancy-text">└─></span> info about me',
    '<span class="line title">social</span>',
    ' <span class="line fancy-text">└─></span> get my contact info',
    '<span class="line title">projects</span>',
    ' <span class="line fancy-text">└─></span> info about some of my projects',
    '<span class="line title">clear</span>',
    ' <span class="line fancy-text">└─></span> clear screen',
    '<span class="line title">matrix</span>',
    ' <span class="line fancy-text">└─></span> Matrix ?!',
    '&nbsp',
  ],
  'clear':['cleared ;)'],
  'matrix':['let it rain'],
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
    ' │  ├─<span class="line title">SlovenskeC:</span>',
    ' │  │  └─ <a class="fancy-text" href=\'https://github.com/Heun11/slovenskeC\' target="_blank" rel="noopener noreferrer">@github</a> ─ translator from Slovenské C to classic C.',
    ' │  ├─<span class="line title">Vloz2:</span>',
    ' │  │  └─ <a class="fancy-text" href=\'https://github.com/Heun11/Vloz2\' target="_blank" rel="noopener noreferrer">@github</a> ─ better vlozto, unfortunately I couldn\'t find a free way to host it.',
    ' │  │',
    ' ├─<span class="line category">Suspended, Abandoned & In Progress Projects:</span>',
    ' │  ├─<span class="line title">scapp:</span>',
    ' │  │  └─ <a class="fancy-text" href=\'https://scapp-utdl.vercel.app/about\' target="_blank" rel="noopener noreferrer">@deploy</a> ─ ultimate todo list.',
    ' │  ├─<span class="line title">smile:</span>',
    ' │  │  └─ <a class="fancy-text" href=\'https://github.com/Heun11/smile-ce\' target="_blank" rel="noopener noreferrer">@deploy</a> ─ simple chess engine.',
    ' │  ├─<span class="line title">YNTDTS:</span>',
    ' │  │  └─ <a class="fancy-text" href=\'https://github.com/Heun11/yntdts\' target="_blank" rel="noopener noreferrer">@deploy</a> ─ another shitty todo list.',
    ' │  ├─<span class="line title">RaycastingEngineJS:</span>',
    ' │  │  └─ <a class="fancy-text" href=\'https://github.com/Heun11/RaycastingEngineJS\' target="_blank" rel="noopener noreferrer">@deploy</a> ─ shitty basics for raycasting engine.',
    ' │  │',
    ' ├─<span class="line title">Any other secret project should remain in shadows.</span>',
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

html.addEventListener("keydown", (e)=>{
  if((e.key==='Escape' || e.code==='Escape') && runMatrix ){
    e.preventDefault();
    runMatrix = false;
    terminal.innerHTML = '';
  }
  if(e.key==='Enter'){
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
        if(command=='matrix'){
          runMatrix = true;
          startLoop();
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
