let score = 0;
let clickMultiplier = 1;
let click = 1;
let multiplyPrice = 50;
let wingedPrice = 200;
let kuribohPrice = 50;
let kuribeePrice = 3200;
let kuribooPrice = 400;
let kuribahPrice = 204800;
let kuribehPrice = 25600;
let wingedMultiplier = 1;
let wingedlvl = 0;
let kuribohlvl = 0;
let kuriboolvl = 0;
let kuribeelvl = 0;
let kuribahlvl = 0;
let kuribehlvl = 0;
let babylonlvl = 0;
let banditlvl = 0;
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
let containerWidth = container.clientWidth;
let containerHeight = container.clientHeight;
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
    scoreDisplay.innerHTML = 'kuriboh: ' + score;
    fallingkuriboh();
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
    let sideContainerWidth = sideContainer.clientWidth;
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
    if(score>=multiplyPrice){
        score -= multiplyPrice;
        multiplyPrice *= 2;
        scoreDisplay.innerHTML = 'kuriboh: ' + score;
        clickMultiplier++;
        clickDisplay.innerHTML = 'kuriboh/click: ' + click*clickMultiplier;
        document.getElementById("multiplyCost").innerHTML = "Multiplicateur </br>x" + clickMultiplier + "</br>coût: " + multiplyPrice + " kuriboh";
    }
}

function addwinged(){
    if(score>=wingedPrice && wingedlvl<9){
        score -= wingedPrice;
        wingedlvl ++;
        wingedPrice *= 2;
        scoreDisplay.innerHTML = 'kuriboh: ' + score;
        wingedMultiplier += wingedMultiplier;
        if(wingedAutoAcquired == false){
            wingedAutoAcquired = true;
            setInterval(Autowinged,1000);
        }
        dpsDisplay.innerHTML = "kuriboh/s: " + (wingedMultiplier + banditlvl*15); 
        if(wingedlvl == 9){
            document.getElementById("wingedImage").classList.replace('winged','winged9');
            document.getElementById("wingsCost").innerHTML = "Ailes transcendantes</br>cost: " + wingedPrice;
            document.getElementById("wingedClickable").classList.remove('clickable');
            wings.classList.remove('hidden');
            document.getElementById("wingedCost").innerHTML = "Kuriboh ailée (lvl " + wingedlvl + ")</br>"+ wingedMultiplier + " kuriboh/s";
        }else{
            document.getElementById("wingedCost").innerHTML = "Kuriboh ailée (lvl " + wingedlvl + ")</br>"+ wingedMultiplier + " kuriboh/s</br>coût: " + wingedPrice + " kuriboh";
        }
    }
}

function Autowinged(){
    score += wingedMultiplier + banditlvl*15;
    scoreDisplay.innerHTML = 'kuriboh: ' + score;
}

function addwing10(){
    if(score>=wingedPrice && wing10acquired == false){
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
    scoreDisplay.innerHTML = 'kuriboh: ' + score;
}

function addkuriboh(){
    if(score>=kuribohPrice && kuribohlvl<3){
        kuribohlvl ++;
        score -= kuribohPrice;
        kuribohPrice *= 2;
        addClick();
        if(kuribohlvl == 3){
            document.getElementById("kuribohClickable").classList.remove('clickable');
            document.getElementById("kuribohCost").innerHTML = "Kuriboh x" + kuribohlvl + " max";
            kuriboo.classList.remove('hidden');
            document.getElementById("kuribooCost").innerHTML = "Kuriboo x" + kuriboolvl + "</br>coût: " +  kuribooPrice + " kuriboh";
        }else{
            document.getElementById("kuribohCost").innerHTML = "Kuriboh x" + kuribohlvl + "</br>coût: " +  kuribohPrice + " kuriboh";
        }
    }
}

function addkuriboo(){
    if(score>=kuribooPrice && kuriboolvl<3){
        kuriboolvl ++;
        score -= kuribooPrice;
        kuribooPrice *=2
        addClick();
        if(kuriboolvl == 3){
            document.getElementById("kuribooClickable").classList.remove('clickable');
            document.getElementById("kuribooCost").innerHTML = "Kuriboo x" + kuriboolvl + " max";
            kuribee.classList.remove('hidden');
            document.getElementById("kuribeeCost").innerHTML = "Kuribee x" + kuribeelvl + "</br>coût: " +  kuribeePrice + " kuriboh";
        }else{
            document.getElementById("kuribooCost").innerHTML = "Kuriboo x" + kuriboolvl + "</br>coût: " +  kuribooPrice + " kuriboh";
        }
    }
}

function addkuribee(){
    if(score>=kuribeePrice && kuribeelvl<3){
        kuribeelvl ++;
        score -= kuribeePrice;
        kuribeePrice *= 2;
        addClick();
        if(kuribeelvl == 3){
            document.getElementById("kuribeeClickable").classList.remove('clickable');
            document.getElementById("kuribeeCost").innerHTML = "Kuribee x" + kuribeelvl + " max";
            kuribeh.classList.remove('hidden');
            document.getElementById("kuribehCost").innerHTML = "Kuribeh x" + kuribehlvl + "</br>coût: " +  kuribehPrice + " kuriboh";
        }else{
        document.getElementById("kuribeeCost").innerHTML = "Kuribee x" + kuribeelvl + "</br>coût: " +  kuribeePrice + " kuriboh";
        }
    }
}

function addkuribeh(){
    if(score>=kuribehPrice && kuribehlvl<3){
        kuribehlvl ++;
        score -= kuribehPrice;
        kuribehPrice *= 2;
        addClick();
        if(kuribehlvl == 3){
            document.getElementById("kuribehClickable").classList.remove('clickable');
            document.getElementById("kuribehCost").innerHTML = "Kuribeh x" + kuribehlvl + " max";
            kuribah.classList.remove('hidden');
            document.getElementById("kuribahCost").innerHTML = "Kuribah x" + kuribahlvl + "</br>coût: " +  kuribahPrice + " kuriboh";
        }else{
        document.getElementById("kuribehCost").innerHTML = "Kuribeh x" + kuribehlvl + "</br>coût: " +  kuribehPrice + " kuriboh";
        }
    }
}

function addkuribah(){
    if(score>=kuribahPrice && kuribahlvl<3){
        kuribahlvl ++;
        score -= kuribahPrice;
        kuribahPrice *= 2;
        addClick();
        if(kuribahlvl == 3){
            document.getElementById("kuribahClickable").classList.remove('clickable');
            document.getElementById("kuribahCost").innerHTML = "Kuribah x" + kuribahlvl + " max";
            if(babylonlvl == 0){
                stars.classList.remove('hidden');
            }
        }else{
            document.getElementById("kuribahCost").innerHTML = "Kuribah x" + kuribahlvl + "</br>coût: " +  kuribahPrice + " kuriboh";
        }
    }
}

function addstars(){
    if(kuribohlvl == 3 && kuribeelvl == 3 && kuribahlvl == 3 && kuriboolvl == 3 && kuribehlvl == 3){
        let r = Math.random();
        if(r < 0.5){
            document.getElementById("kuribabylon").classList.remove('hidden');
            babylonlvl ++;
            click -= 10;
            document.getElementById("kuribabylonCost").innerHTML = "Kuribabylon x" + babylonlvl + "</br>kuriboh/click: " + babylonlvl*5;
        }else{
            document.getElementById("kuribandit").classList.remove('hidden');
            banditlvl ++;
            click -=15;
            if(wingedAutoAcquired == false){
                wingedAutoAcquired = true;
                setInterval(Autowinged,1000);
            }
            dpsDisplay.innerHTML = "kuriboh/s: " + (wingedMultiplier + banditlvl*15);
            document.getElementById("kuribanditCost").innerHTML = "Kuribandit x" + banditlvl + "</br>kuriboh/s: " + banditlvl*15;
        }
        kuribohlvl = 0;
        kuribeelvl = 0;
        kuriboolvl = 0;
        kuribehlvl = 0;
        kuribahlvl = 0;
        document.getElementById("kuribohClickable").classList.add('clickable');
        document.getElementById("kuribooClickable").classList.add('clickable');
        document.getElementById("kuribeeClickable").classList.add('clickable');
        document.getElementById("kuribehClickable").classList.add('clickable');
        document.getElementById("kuribahClickable").classList.add('clickable');
        clickDisplay.innerHTML = 'kuriboh/clicks: ' + click*clickMultiplier;
        document.getElementById("kuribohCost").innerHTML = "Kuriboh x" + kuribohlvl + "</br>coût: " +  kuribohPrice + " kuriboh";
        document.getElementById("kuribooCost").innerHTML = "Kuriboo x" + kuriboolvl + "</br>coût: " +  kuribooPrice + " kuriboh";
        document.getElementById("kuribeeCost").innerHTML = "Kuribee x" + kuribeelvl + "</br>coût: " +  kuribeePrice + " kuriboh";
        document.getElementById("kuribehCost").innerHTML = "Kuribeh x" + kuribehlvl + "</br>coût: " +  kuribehPrice + " kuriboh";
        document.getElementById("kuribahCost").innerHTML = "Kuribah x" + kuribahlvl + "</br>coût: " +  kuribahPrice + " kuriboh";
    }
}
