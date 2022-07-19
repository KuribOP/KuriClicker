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
            kuriboh:1,
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
let display = {
                score:document.getElementById("displayScore"),
                kps:document.getElementById("displayDps"),
                kpc:document.getElementById("displayClick"),
                wings:document.getElementById("wingsCost"),
                winged:document.getElementById("wingedCost"),
                kuriboh:document.getElementById("kuribohCost"),
                kuriboo:document.getElementById("kuribooCost"),
                kuribah:document.getElementById("kuribahCost"),
                kuribeh:document.getElementById("kuribehCost"),
                kuribee:document.getElementById("kuribeeCost"),
                babylon:document.getElementById("kuribabylonCost"),
                bandit:document.getElementById("kuribanditCost"),
                multiply:document.getElementById("multiplyCost")
};
let upgradeButton = {
                    wings:document.getElementById("wings"),
                    winged:document.getElementById("winged"),
                    kuriboh:document.getElementById("kuriboh"),
                    kuriboo:document.getElementById("kuriboo"),
                    kuribah:document.getElementById("kuribah"),
                    kuribeh:document.getElementById("kuribeh"),
                    kuribee:document.getElementById("kuribee"),
                    babylon:document.getElementById("kuribabylon"),
                    bandit:document.getElementById("kuribandit"),
                    stars:document.getElementById("stars"),
                    multiply:document.getElementById("multiply")
};

let descContainer = {
                wings:document.getElementById("wingsClickable"),
                winged:document.getElementById("wingedClickable"),
                kuriboh:document.getElementById("kuribohClickable"),
                kuriboo:document.getElementById("kuribooClickable"),
                kuribah:document.getElementById("kuribahClickable"),
                kuribeh:document.getElementById("kuribehClickable"),
                kuribee:document.getElementById("kuribeeClickable"),
                babylon:document.getElementById("kuribabylonClickable"),
                bandit:document.getElementById("kuribanditClickable"),     
}
let container = document.getElementById("falling");
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;
let idnumber = 0;
let getid = false;
let obtainedKuribohKpc = ['kuribohTransp'];
let obtainedKuribohKps;

addBtn.onclick = addpoint;
upgradeButton['multiply'].onclick = addmultiply;
upgradeButton['winged'].onclick = addwinged;
upgradeButton['wings'].onclick = addwing10;
upgradeButton['stars'].onclick = addstars;
upgradeButton['kuriboh'].onclick = addkuriboh;
upgradeButton['kuribah'].onclick = addkuribah;
upgradeButton['kuribee'].onclick = addkuribee;
upgradeButton['kuribeh'].onclick = addkuribeh;
upgradeButton['kuriboo'].onclick = addkuriboo;


function addpoint()
{
    score += click*clickMultiplier;
    fallingkuriboh(false);
    displayScore();
}

function displayScore(){
    display['score'].innerHTML = 'kuriboh: ' + score;
}

function displayKpc(){
    display['kpc'].innerHTML = 'kuriboh/click: ' + click*clickMultiplier;
}

function displayKps(){
    display['kps'].innerHTML = "kuriboh/s: " + (wingedMultiplier + lvl['bandit']*15);
}

function fallingkuriboh(clickOrAuto)
{
    let newDiv = document.createElement("div");
    container.appendChild(newDiv);
    idnumber++;
    newDiv.id = idnumber + "fallingKuriboh";
    positionElement(clickOrAuto);
}

function positionElement(clickOrAuto)
{
    let randomKuriboh;
    if(clickOrAuto==true){
        randomKuriboh = obtainedKuribohKps[Math.floor(Math.random()*obtainedKuribohKps.length)];
    }else{
        randomKuriboh = obtainedKuribohKpc[Math.floor(Math.random()*obtainedKuribohKpc.length)];
    }
    let setLeftPos = Math.floor(Math.random() * (containerWidth-100));
    let Currentdiv = document.getElementById(idnumber + "fallingKuriboh");
    Currentdiv.style.position = "absolute";
    Currentdiv.style.top = -100 + 'px';
    Currentdiv.style.left = setLeftPos + 'px';
    Currentdiv.classList.add(randomKuriboh);
    Currentdiv.classList.add('transp');
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
        display['multiply'].innerHTML = "Multiplicateur </br>x" + clickMultiplier + "</br>coût: " + price['multiply'] + " kuriboh";
    }
}

function addwinged(){
    if(score>=price['winged'] && lvl['winged']<9){
        score -= price['multiply'];
        if(lvl['winged']==0){
            obtainedKuribohKps = ['wingedTransp'];
        }else if(lvl['winged']==0){
            obtainedKuribohKps.push('wingedTransp');
        }
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
            obtainedKuribohKps.push('winged9Transp');
            removeValueFromArrayKps('wingedTransp');
            document.getElementById("wingedImage").classList.replace('winged','winged9');
            display['wings'].innerHTML = "Ailes transcendantes</br>cost: " + price['multiply'];
            descContainer['winged'].classList.remove('clickable');
            wings.classList.remove('hidden');
            display['winged'].innerHTML = "Kuriboh ailée (lvl " + lvl['winged'] + ")</br>"+ wingedMultiplier + " kuriboh/s";
        }else{
            display['winged'].innerHTML = "Kuriboh ailée (lvl " + lvl['winged'] + ")</br>"+ wingedMultiplier + " kuriboh/s</br>coût: " + price['multiply'] + " kuriboh";
        }
    }
}

function Autowinged(){
    score += wingedMultiplier + lvl['bandit']*15;
    displayScore();
    for(i=0;i<1;i++){
        fallingkuriboh(true);
    }
}

function addwing10(){
    if(score>=price['multiply'] && wing10acquired == false){
        wingedMultiplier *= 10;
        obtainedKuribohKps.push('winged10Transp');
        removeValueFromArrayKps('winged9Transp');
        displayKps();
        wing10acquired = true;
        display['winged'].innerHTML = "Kuriboh ailée (lvl 10)</br>"+ wingedMultiplier + " kuriboh/s";
        document.getElementById("wingedImage").classList.replace('winged9','winged10');
        descContainer['wings'].classList.remove('clickable');
        display['wings'].innerHTML = "Ailes transcendantes</br>Obtenue";
    }
}

function addClick(value){
    click += value;
    displayKpc();
    displayScore();
}

function addkuriboh(){
    if(score>=price['kuriboh'] && lvl['kuriboh']<3){
        lvl['kuriboh'] ++;
        score -= price['kuriboh'];
        price['kuriboh'] *= 2;
        addClick(1);
        if(lvl['kuriboh'] == 3){
            descContainer['kuriboh'].classList.remove('clickable');
            display['kuriboh'].innerHTML = "Kuriboh x" + lvl['kuriboh'] + " max";
            kuriboo.classList.remove('hidden');
            if(lvl['kuriboo']<3){
                display['kuriboo'].innerHTML = "Kuriboo x" + lvl['kuriboo'] + "</br>coût: " +  price['kuriboo'] + " kuriboh";
            }
        }else{
            display['kuriboh'].innerHTML = "Kuriboh x" + lvl['kuriboh'] + "</br>coût: " +  price['kuriboh'] + " kuriboh";
        }
    }
}

function addkuriboo(){
    if(score>=price['kuriboo'] && lvl['kuriboo']<3){
        if(lvl['kuriboo']==0)
        {
            obtainedKuribohKpc.push('kuribooTransp');
        }
        lvl['kuriboo'] ++;
        score -= price['kuriboo'];
        price['kuriboo'] *=2
        addClick(1);
        if(lvl['kuriboo'] == 3){
            descContainer['kuriboo'].classList.remove('clickable');
            display['kuriboo'].innerHTML = "Kuriboo x" + lvl['kuriboo'] + " max";
            kuribee.classList.remove('hidden');
            if(lvl['kuribee']<3){
                display['kuribee'].innerHTML = "Kuribee x" + lvl['kuribee'] + "</br>coût: " +  price['kuribee'] + " kuriboh";
            }
        }else{
            display['kuriboo'].innerHTML = "Kuriboo x" + lvl['kuriboo'] + "</br>coût: " +  price['kuriboo'] + " kuriboh";
        }
    }
}

function addkuribee(){
    if(score>=price['kuribee'] && lvl['kuribee']<3){
        if(lvl['kuribee']==0)
        {
            obtainedKuribohKpc.push('kuribeeTransp');
        }
        lvl['kuribee'] ++;
        score -= price['kuribee'];
        price['kuribee'] *= 2;
        addClick(1);
        if(lvl['kuribee'] == 3){
            descContainer['kuribee'].classList.remove('clickable');
            display['kuribee'].innerHTML = "Kuribee x" + lvl['kuribee'] + " max";
            kuribeh.classList.remove('hidden');
            if(lvl['kuribeh']<3){
                display['kuribeh'].innerHTML = "Kuribeh x" + lvl['kuribeh'] + "</br>coût: " +  price['kuribeh'] + " kuriboh";
            }
        }else{
            display['kuribee'].innerHTML = "Kuribee x" + lvl['kuribee'] + "</br>coût: " +  price['kuribee'] + " kuriboh";
        }
    }
}

function addkuribeh(){
    if(score>=price['kuribeh'] && lvl['kuribeh']<3){
        if(lvl['kuribeh']==0)
        {
            obtainedKuribohKpc.push('kuribehTransp');
        }
        lvl['kuribeh'] ++;
        score -= price['kuribeh'];
        price['kuribeh'] *= 2;
        addClick(1);
        if(lvl['kuribeh'] == 3){
            descContainer['kuribeh'].classList.remove('clickable');
            display['kuribeh'].innerHTML = "Kuribeh x" + lvl['kuribeh'] + " max";
            kuribah.classList.remove('hidden');
            if(lvl['kuribah']<3){
                display['kuribah'].innerHTML = "Kuribah x" + lvl['kuribah'] + "</br>coût: " +  price['kuribah'] + " kuriboh";
            }
        }else{
            display['kuribeh'].innerHTML = "Kuribeh x" + lvl['kuribeh'] + "</br>coût: " +  price['kuribeh'] + " kuriboh";
        }
    }
}

function addkuribah(){
    if(score>=price['kuribah'] && lvl['kuribah']<3){
        if(lvl['kuribah']==0)
        {
            obtainedKuribohKpc.push('kuribahTransp');
        }
        lvl['kuribah'] ++;
        score -= price['kuribah'];
        price['kuribah'] *= 2;
        addClick(1);
        if(lvl['kuribah'] == 3){
            descContainer['kuribah'].classList.remove('clickable');
            display['kuribah'].innerHTML = "Kuribah x" + lvl['kuribah'] + " max";
            if(lvl['babylon'] == 0){
                upgradeButton['stars'].classList.remove('hidden');
            }
        }else{
            display['kuribah'].innerHTML = "Kuribah x" + lvl['kuribah'] + "</br>coût: " +  price['kuribah'] + " kuriboh";
        }
    }
}

function addstars(){
    if(lvl['kuriboh'] == 3 && lvl['kuribee'] == 3 && lvl['kuribah'] == 3 && lvl['kuriboo'] == 3 && lvl['kuribeh'] == 3){
        let r = Math.random();
        if(r < 0.5){
            upgradeButton['babylon'].classList.remove('hidden');
            if(lvl['babylon']==0){
                obtainedKuribohKpc.push('kuribabylonTransp');
            }
            lvl['babylon'] ++;
            addClick(-10);
            display['babylon'].innerHTML = "Kuribabylon x" + lvl['babylon'] + "</br>kuriboh/click: " + lvl['babylon']*5;
        }else{
            upgradeButton['bandit'].classList.remove('hidden');
            if(lvl['winged']==0 && lvl['bandit']==0){
                obtainedKuribohKps = ['kuribanditTransp'];
            }else if(lvl['bandit']==0){
                obtainedKuribohKps.push('kuribanditTransp');;
            }
            lvl['bandit'] ++;
            addClick(-15);
            if(wingedAutoAcquired == false){
                wingedAutoAcquired = true;
                setInterval(Autowinged,1000);
            }
            displayKps();
            display['bandit'].innerHTML = "Kuribandit x" + lvl['bandit'] + "</br>kuriboh/s: " + lvl['bandit']*15;
        }
        lvl['kuriboh'] = 0;
        lvl['kuribee'] = 0;
        lvl['kuriboo'] = 0;
        lvl['kuribeh'] = 0;
        lvl['kuribah'] = 0;
        removeValueFromArrayKpc('kuribeeTransp');
        removeValueFromArrayKpc('kuribooTransp');
        removeValueFromArrayKpc('kuribehTransp');
        removeValueFromArrayKpc('kuribahTransp');
        descContainer['kuriboh'].classList.add('clickable');
        descContainer['kuriboo'].classList.add('clickable');
        descContainer['kuribee'].classList.add('clickable');
        descContainer['kuribeh'].classList.add('clickable');
        descContainer['kuribah'].classList.add('clickable');
        displayKpc();
        display['kuriboh'].innerHTML = "Kuriboh x" + lvl['kuriboh'] + "</br>coût: " +  price['kuriboh'] + " kuriboh";
        display['kuriboo'].innerHTML = "Kuriboo x" + lvl['kuriboo'] + "</br>coût: " +  price['kuriboo'] + " kuriboh";
        display['kuribee'].innerHTML = "Kuribee x" + lvl['kuribee'] + "</br>coût: " +  price['kuribee'] + " kuriboh";
        display['kuribeh'].innerHTML = "Kuribeh x" + lvl['kuribeh'] + "</br>coût: " +  price['kuribeh'] + " kuriboh";
        display['kuribah'].innerHTML = "Kuribah x" + lvl['kuribah'] + "</br>coût: " +  price['kuribah'] + " kuriboh";
    }
}

function removeValueFromArrayKpc(value){
    let index = obtainedKuribohKpc.indexOf(value);
    if (index !== -1) {
        obtainedKuribohKpc.splice(index, 1);
    }
}

function removeValueFromArrayKps(value){
    let index = obtainedKuribohKps.indexOf(value);
    if (index !== -1) {
        obtainedKuribohKps.splice(index, 1);
    }
}