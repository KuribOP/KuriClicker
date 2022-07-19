let score = 100000000000;
let clickMultiplier = 1;
let click = 1;
let price = {
            multiply:50,
            kuriboh:50,
            winged:200,
            kuriboo:400,
            kuribee:3200,
            kuribeh:25600,
            kuribah:204800};
let wingedMultiplier = 1;
let lvl = {
            kuriboh:0,
            winged:0,
            kuriboo:0,
            kuribee:0,
            kuribeh:0,
            kuribah:0,
            babylon:0,
            bandit:0};
let wingedAutoAcquired = false;
let wing10acquired = false;
let addBtn = document.getElementById("click");
let scoreDisplay = document.getElementById("displayScore");
let multiply = document.getElementById("multiply");
let winged = document.getElementById("winged");
let dpsDisplay = document.getElementById("displayDps");
let clickDisplay = document.getElementById("displayClick");
let wings = document.getElementById("wings");
let kuriboh = document.getElementById("kuriboh");
let kuriboo = document.getElementById("kuriboo");
let kuribah = document.getElementById("kuribah");
let kuribeh = document.getElementById("kuribeh");
let kuribee = document.getElementById("kuribee");
let stars = document.getElementById("stars");
let container = document.getElementById("falling");
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;
let idnumber = 0;
let getid = false;

addBtn.onclick = addpoint;
multiply.onclick = addmultiply;
winged.onclick = addwinged;
wings.onclick = addwing10;
stars.onclick = addstars
kuriboh.onclick = addkuriboh;
kuribah.onclick = addkuribah;
kuribee.onclick = addkuribee;
kuribeh.onclick = addkuribeh;
kuriboo.onclick = addkuriboo;


function addpoint()
{
    score += click*clickMultiplier;
    fallingkuriboh();
    displayScore();
}

function displayScore(){
    scoreDisplay.innerHTML = 'kuriboh: ' + score;
}

function displayKpc(){
    clickDisplay.innerHTML = 'kuriboh/click: ' + click*clickMultiplier;
}

function displayKps(){
    dpsDisplay.innerHTML = "kuriboh/s: " + (wingedMultiplier + lvl['bandit']*15);
}

function fallingkuriboh()
{
    let newDiv = document.createElement("div");
    container.appendChild(newDiv);
    idnumber++;
    newDiv.id = idnumber + "fallingKuriboh";
    positionElement();
}

function positionElement()
{
    let sideContainer = document.getElementById("sideContainer");
    let setLeftPos = Math.floor(Math.random() * (containerWidth-100));
    let Currentdiv = document.getElementById(idnumber + "fallingKuriboh");
    Currentdiv.style.position = "absolute";
    Currentdiv.style.top = -100 + 'px';
    Currentdiv.style.left = setLeftPos + 'px';
    Currentdiv.classList.add("kuribohtransp");
    Currentdiv.style.width = "100px";
    Currentdiv.style.height = "100px";


    let intervalId;
    let pos = -100;
    let rot = Math.floor(Math.random() * 360) ;

    intervalId = setInterval(frame, 10);
    function frame(){
        if (pos == containerHeight){
            Currentdiv.remove();
            clearInterval(intervalId);
        }else{
            pos++
            rot++
            Currentdiv.style.top = pos + 'px';
            Currentdiv.style.transform = ("rotate(" + rot + "deg)");
        }
    }
}




function addmultiply(){
    if(score>=price['multiply']){
        score -= price['multiply'];
        price['multiply'] *= 2;
        displayScore();
        clickMultiplier++;
        displayKpc();
        document.getElementById("multiplyCost").innerHTML = "Multiplicateur </br>x" + clickMultiplier + "</br>coût: " + price['multiply'] + " kuriboh";
    }
}

function addwinged(){
    if(score>=price['winged'] && lvl['winged']<9){
        score -= price['multiply'];
        lvl['winged'] ++;
        price['multiply'] *= 2;
        displayScore(score);
        wingedMultiplier += wingedMultiplier;
        if(wingedAutoAcquired == false){
            wingedAutoAcquired = true;
            setInterval(Autowinged,1000);
        }
        displayKps(); 
        if(lvl['winged'] == 9){
            document.getElementById("wingedImage").classList.replace('winged','winged9');
            document.getElementById("wingsCost").innerHTML = "Ailes transcendantes</br>cost: " + price['multiply'];
            document.getElementById("wingedClickable").classList.remove('clickable');
            wings.classList.remove('hidden');
            document.getElementById("wingedCost").innerHTML = "Kuriboh ailée (lvl " + lvl['winged'] + ")</br>"+ wingedMultiplier + " kuriboh/s";
        }else{
            document.getElementById("wingedCost").innerHTML = "Kuriboh ailée (lvl " + lvl['winged'] + ")</br>"+ wingedMultiplier + " kuriboh/s</br>coût: " + price['multiply'] + " kuriboh";
        }
    }
}

function Autowinged(){
    score += wingedMultiplier + lvl['bandit']*15;
    displayScore();
}

function addwing10(){
    if(score>=price['multiply'] && wing10acquired == false){
        wingedMultiplier *= 10;
        dpsDisplay.innerHTML = "kuriboh/s: " + wingedMultiplier;
        wing10acquired = true;
        document.getElementById("wingedCost").innerHTML = "Kuriboh ailée (lvl 10)</br>"+ wingedMultiplier + " kuriboh/s";
        document.getElementById("wingedImage").classList.replace('winged9','winged10');
        document.getElementById("wing10Clickable").classList.remove('clickable');
        document.getElementById("wingsCost").innerHTML = "Ailes transcendantes</br>Obtenue";
    }
}

function addClick(){
    click += 1;
    clickDisplay.innerHTML = 'kuriboh/clicks: ' + click*clickMultiplier;
    displayScore(score);
}

function addkuriboh(){
    if(score>=price['kuriboh'] && lvl['kuriboh']<3){
        lvl['kuriboh'] ++;
        score -= price['kuriboh'];
        price['kuriboh'] *= 2;
        addClick();
        if(lvl['kuriboh'] == 3){
            document.getElementById("kuribohClickable").classList.remove('clickable');
            document.getElementById("kuribohCost").innerHTML = "Kuriboh x" + lvl['kuriboh'] + " max";
            kuriboo.classList.remove('hidden');
            document.getElementById("kuribooCost").innerHTML = "Kuriboo x" + lvl['kuriboo'] + "</br>coût: " +  price['kuriboo'] + " kuriboh";
        }else{
            document.getElementById("kuribohCost").innerHTML = "Kuriboh x" + lvl['kuriboh'] + "</br>coût: " +  price['kuriboh'] + " kuriboh";
        }
    }
}

function addkuriboo(){
    if(score>=price['kuriboo'] && lvl['kuriboo']<3){
        lvl['kuriboo'] ++;
        score -= price['kuriboo'];
        price['kuriboo'] *=2
        addClick();
        if(lvl['kuriboo'] == 3){
            document.getElementById("kuribooClickable").classList.remove('clickable');
            document.getElementById("kuribooCost").innerHTML = "Kuriboo x" + lvl['kuriboo'] + " max";
            kuribee.classList.remove('hidden');
            document.getElementById("kuribeeCost").innerHTML = "Kuribee x" + lvl['kuribee'] + "</br>coût: " +  price['kuribee'] + " kuriboh";
        }else{
            document.getElementById("kuribooCost").innerHTML = "Kuriboo x" + lvl['kuriboo'] + "</br>coût: " +  price['kuriboo'] + " kuriboh";
        }
    }
}

function addkuribee(){
    if(score>=price['kuribee'] && lvl['kuribee']<3){
        lvl['kuribee'] ++;
        score -= price['kuribee'];
        price['kuribee'] *= 2;
        addClick();
        if(lvl['kuribee'] == 3){
            document.getElementById("kuribeeClickable").classList.remove('clickable');
            document.getElementById("kuribeeCost").innerHTML = "Kuribee x" + lvl['kuribee'] + " max";
            kuribeh.classList.remove('hidden');
            document.getElementById("kuribehCost").innerHTML = "Kuribeh x" + lvl['kuribeh'] + "</br>coût: " +  price['kuribeh'] + " kuriboh";
        }else{
        document.getElementById("kuribeeCost").innerHTML = "Kuribee x" + lvl['kuribee'] + "</br>coût: " +  price['kuribee'] + " kuriboh";
        }
    }
}

function addkuribeh(){
    if(score>=price['kuribeh'] && lvl['kuribeh']<3){
        lvl['kuribeh'] ++;
        score -= price['kuribeh'];
        price['kuribeh'] *= 2;
        addClick();
        if(lvl['kuribeh'] == 3){
            document.getElementById("kuribehClickable").classList.remove('clickable');
            document.getElementById("kuribehCost").innerHTML = "Kuribeh x" + lvl['kuribeh'] + " max";
            kuribah.classList.remove('hidden');
            document.getElementById("kuribahCost").innerHTML = "Kuribah x" + lvl['kuribah'] + "</br>coût: " +  price['kuribah'] + " kuriboh";
        }else{
        document.getElementById("kuribehCost").innerHTML = "Kuribeh x" + lvl['kuribeh'] + "</br>coût: " +  price['kuribeh'] + " kuriboh";
        }
    }
}

function addkuribah(){
    if(score>=price['kuribah'] && lvl['kuribah']<3){
        lvl['kuribah'] ++;
        score -= price['kuribah'];
        price['kuribah'] *= 2;
        addClick();
        if(lvl['kuribah'] == 3){
            document.getElementById("kuribahClickable").classList.remove('clickable');
            document.getElementById("kuribahCost").innerHTML = "Kuribah x" + lvl['kuribah'] + " max";
            if(lvl['babylon'] == 0){
                stars.classList.remove('hidden');
            }
        }else{
            document.getElementById("kuribahCost").innerHTML = "Kuribah x" + lvl['kuribah'] + "</br>coût: " +  price['kuribah'] + " kuriboh";
        }
    }
}

function addstars(){
    if(lvl['kuriboh'] == 3 && lvl['kuribee'] == 3 && lvl['kuribah'] == 3 && lvl['kuriboo'] == 3 && lvl['kuribeh'] == 3){
        let r = Math.random();
        if(r < 0.5){
            document.getElementById("kuribabylon").classList.remove('hidden');
            lvl['babylon'] ++;
            click -= 10;
            document.getElementById("kuribabylonCost").innerHTML = "Kuribabylon x" + lvl['babylon'] + "</br>kuriboh/click: " + lvl['babylon']*5;
        }else{
            document.getElementById("kuribandit").classList.remove('hidden');
            lvl['bandit'] ++;
            click -=15;
            if(wingedAutoAcquired == false){
                wingedAutoAcquired = true;
                setInterval(Autowinged,1000);
            }
            displayKps();
            document.getElementById("kuribanditCost").innerHTML = "Kuribandit x" + lvl['bandit'] + "</br>kuriboh/s: " + lvl['bandit']*15;
        }
        lvl['kuriboh'] = 0;
        lvl['kuribee'] = 0;
        lvl['kuriboo'] = 0;
        lvl['kuribeh'] = 0;
        lvl['kuribah'] = 0;
        document.getElementById("kuribohClickable").classList.add('clickable');
        document.getElementById("kuribooClickable").classList.add('clickable');
        document.getElementById("kuribeeClickable").classList.add('clickable');
        document.getElementById("kuribehClickable").classList.add('clickable');
        document.getElementById("kuribahClickable").classList.add('clickable');
        clickDisplay.innerHTML = 'kuriboh/clicks: ' + click*clickMultiplier;
        document.getElementById("kuribohCost").innerHTML = "Kuriboh x" + lvl['kuriboh'] + "</br>coût: " +  price['kuriboh'] + " kuriboh";
        document.getElementById("kuribooCost").innerHTML = "Kuriboo x" + lvl['kuriboo'] + "</br>coût: " +  price['kuriboo'] + " kuriboh";
        document.getElementById("kuribeeCost").innerHTML = "Kuribee x" + lvl['kuribee'] + "</br>coût: " +  price['kuribee'] + " kuriboh";
        document.getElementById("kuribehCost").innerHTML = "Kuribeh x" + lvl['kuribeh'] + "</br>coût: " +  price['kuribeh'] + " kuriboh";
        document.getElementById("kuribahCost").innerHTML = "Kuribah x" + lvl['kuribah'] + "</br>coût: " +  price['kuribah'] + " kuriboh";
    }
}
