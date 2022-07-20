let score = 100000000;
let clickMultiplier = 1;
let click = 1;
const brotherMaxLvl = 3;
const price = {
    multiply: 50,
    kuriboh: 50,
    winged: 200,
    kuriboo: 400,
    kuribee: 3200,
    kuribeh: 25600,
    kuribah: 204800,
    berserker: 100
};
let wingedMultiplier = 1;
let berserkerMultiplier = 1;
const banditMultiplier = 15;
const lvl = {
    kuriboh: 0,
    winged: 0,
    kuriboo: 0,
    kuribee: 0,
    kuribeh: 0,
    kuribah: 0,
    babylon: 0,
    bandit: 0
};

let timer = {
    berserker: 60,
}

const brother = ['kuriboh', 'kuriboo', 'kuribee', 'kuribeh', 'kuribah'];
let wingedAutoAcquired = false;
let wing10acquired = false;
const addBtn = document.getElementById("click");
const display = {
    score: document.getElementById("displayScore"),
    kps: document.getElementById("displayDps"),
    kpc: document.getElementById("displayClick"),
    wings: document.getElementById("wingsCost"),
    winged: document.getElementById("wingedCost"),
    kuriboh: document.getElementById("kuribohCost"),
    kuriboo: document.getElementById("kuribooCost"),
    kuribah: document.getElementById("kuribahCost"),
    kuribeh: document.getElementById("kuribehCost"),
    kuribee: document.getElementById("kuribeeCost"),
    babylon: document.getElementById("kuribabylonCost"),
    bandit: document.getElementById("kuribanditCost"),
    multiply: document.getElementById("multiplyCost"),
    berserker: document.getElementById("berserkCost")
};
const desc = {
    kuriboh: document.getElementById("kuribohDesc"),
    kuriboo: document.getElementById("kuribooDesc"),
    kuribah: document.getElementById("kuribahDesc"),
    kuribeh: document.getElementById("kuribehDesc"),
    kuribee: document.getElementById("kuribeeDesc"),
    winged: document.getElementById("wingedDesc"),
    berserker: document.getElementById("berserkDesc")
}
const upgradeButton = {
    wings: document.getElementById("wings"),
    winged: document.getElementById("winged"),
    kuriboh: document.getElementById("kuriboh"),
    kuriboo: document.getElementById("kuriboo"),
    kuribah: document.getElementById("kuribah"),
    kuribeh: document.getElementById("kuribeh"),
    kuribee: document.getElementById("kuribee"),
    babylon: document.getElementById("kuribabylon"),
    bandit: document.getElementById("kuribandit"),
    stars: document.getElementById("stars"),
    multiply: document.getElementById("multiply"),
    berserker: document.getElementById("berserk")
};

const descContainer = {
    wings: document.getElementById("wingsClickable"),
    winged: document.getElementById("wingedClickable"),
    kuriboh: document.getElementById("kuribohClickable"),
    kuriboo: document.getElementById("kuribooClickable"),
    kuribah: document.getElementById("kuribahClickable"),
    kuribeh: document.getElementById("kuribehClickable"),
    kuribee: document.getElementById("kuribeeClickable"),
    babylon: document.getElementById("kuribabylonClickable"),
    bandit: document.getElementById("kuribanditClickable"),
    berserker: document.getElementById("berserkClickable")
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
upgradeButton['berserker'].onclick = addBerserker;

setInterval(refresh, 1000);

function addpoint() {
    score += click * clickMultiplier;
    fallingkuriboh(false);
}

function refresh() {
    display['kps'].innerHTML = "kuriboh/s: " + getKps();
    display['kpc'].innerHTML = 'kuriboh/click: ' + click * clickMultiplier;
    display['score'].innerHTML = 'kuriboh: ' + score;
}

function getKps() {
    return (wingedMultiplier * berserkerMultiplier + lvl['bandit'] * banditMultiplier);
}

function addClass(typeName, className) {
    typeName.classList.add(className);
}

function removeClass(typeName, className) {
    typeName.classList.remove(className);
}

function fallingkuriboh(clickOrAuto) {
    let newDiv = document.createElement("div");
    container.appendChild(newDiv);
    idnumber++;
    newDiv.id = idnumber + "fallingKuriboh";
    positionElement(clickOrAuto);
}

function positionElement(clickOrAuto) {
    let randomKuriboh;
    if (clickOrAuto == true) {
        randomKuriboh = obtainedKuribohKps[Math.floor(Math.random() * obtainedKuribohKps.length)];
    } else {
        randomKuriboh = obtainedKuribohKpc[Math.floor(Math.random() * obtainedKuribohKpc.length)];
    }
    let setLeftPos = Math.floor(Math.random() * (containerWidth - 100));
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
    let rot = Math.floor(Math.random() * 360);

    intervalId = setInterval(frame, 10);
    function frame() {
        if (pos == containerHeight) {
            Currentdiv.remove();
            clearInterval(intervalId);
        } else {
            pos++
            rot++
            Currentdiv.style.top = pos + 'px';
            Currentdiv.style.transform = ("rotate(" + rot + "deg)");
        }
    }
}




function addmultiply() {
    if (canPay(price['multiply'])) {
        score -= price['multiply'];
        price['multiply'] *= 2;
        clickMultiplier++;
        display['multiply'].innerHTML = "Multiplicateur </br>x" + clickMultiplier + "</br>coût: " + price['multiply'] + " kuriboh";
    }
}

function canPay(amount) {
    return score >= amount;
}
function addwinged() {
    if (canPay(price['winged']) && lvl['winged'] < 9) {
        score -= price['winged'];
        if (lvl['winged'] == 0 && lvl['bandit'] == 0) {
            obtainedKuribohKps = ['wingedTransp'];
        } else if (lvl['winged'] == 0) {
            obtainedKuribohKps.push('wingedTransp');
        }
        if (lvl['winged'] == 0) { removeClass(upgradeButton['berserker'], 'hidden'); }
        lvl['winged']++;
        price['berserker'] *= lvl[winged];
        desc['berserker'].innerHTML = "coût: " + price['berserker'] + " => " + (price['berserker'] * lvl['winged']);
        price['winged'] *= 2;
        wingedMultiplier += wingedMultiplier;
        if (wingedAutoAcquired == false) {
            wingedAutoAcquired = true;
            setInterval(Autowinged, 1000);
        }
        if (lvl['winged'] == 9) {
            obtainedKuribohKps.push('winged9Transp');
            removeValueFromArrayKps('wingedTransp');
            document.getElementById("wingedImage").classList.replace('winged', 'winged9');
            display['wings'].innerHTML = "Ailes transcendantes</br>cost: " + price['winged'];
            removeClass(descContainer['winged'], 'clickable');
            removeClass(upgradeButton['wings'], 'hidden');
            display['winged'].innerHTML = "Kuriboh ailée (lvl " + lvl['winged'] + ")</br>";
            desc['winged'].innerHTML = wingedMultiplier + " Kp/s";
        } else {
            display['winged'].innerHTML = "Kuriboh ailée (lvl " + lvl['winged'] + ")</br>" + price['winged'] + " kuriboh";
            desc['winged'].innerHTML = wingedMultiplier + " Kp/s => " + (wingedMultiplier * 2) + " Kp/s";
        }
    }
}

function Autowinged() {
    score += getKps();
    fallingkuriboh(true);
}

function addwing10() {
    if (canPay(price['winged']) && wing10acquired == false) {
        wingedMultiplier *= 10;
        obtainedKuribohKps.push('winged10Transp');
        removeValueFromArrayKps('winged9Transp');
        wing10acquired = true;
        display['winged'].innerHTML = "Kuriboh ailée (lvl 10)</br>" + wingedMultiplier + " kuriboh/s";
        document.getElementById("wingedImage").classList.replace('winged9', 'winged10');
        removeClass(descContainer['wings'], 'clickable');
        display['wings'].innerHTML = "Ailes transcendantes</br>Obtenue";
    }
}

function addClick(value) {
    click += value;
}

function addBrother(kuribohName) {
    if (canPay(price[kuribohName]) && lvl[kuribohName] < brotherMaxLvl) {
        if (lvl[kuribohName] == 0 && kuribohName != 'kuriboh') {
            obtainedKuribohKpc.push(kuribohName + 'Transp');
        }
        lvl[kuribohName]++;
        score -= price[kuribohName];
        price[kuribohName] *= 2;
        addClick(1);
        const nextKuriboh = {
            kuriboh: 'kuriboo',
            kuriboo: 'kuribee',
            kuribee: 'kuribeh',
            kuribeh: 'kuribah',
            kuribah: 'none'
        }
        if (lvl[kuribohName] == brotherMaxLvl) {
            removeClass(descContainer[kuribohName], 'clickable');
            display[kuribohName].innerHTML = kuribohName + " x" + lvl[kuribohName] + " max";
            desc[kuribohName].innerHTML = lvl[kuribohName] + " Kp/c";
            if (nextKuriboh[kuribohName] == 'none') {
                removeClass(upgradeButton['stars'], 'hidden');
            } else {
                removeClass(upgradeButton[nextKuriboh[kuribohName]], 'hidden');
                if (lvl[nextKuriboh[kuribohName]] < brotherMaxLvl) {
                    display[nextKuriboh[kuribohName]].innerHTML = nextKuriboh[kuribohName] + " x" + lvl[nextKuriboh[kuribohName]] + "<br>coût: " + price[nextKuriboh[kuribohName]] + " kuriboh";
                }
            }
        } else {
            display[kuribohName].innerHTML = kuribohName + " x" + lvl[kuribohName] + "</br>coût: " + price[kuribohName] + " kuriboh";
            desc[kuribohName].innerHTML = lvl[kuribohName] + " Kp/c => " + (lvl[kuribohName] + 1) + " Kp/c";
        }
    }
}


function addkuriboh() {
    addBrother('kuriboh');
}

function addkuriboo() {
    addBrother('kuriboo');
}

function addkuribee() {
    addBrother('kuribee');
}

function addkuribeh() {
    addBrother('kuribeh');
}

function addkuribah() {
    addBrother('kuribah');
}

function addstars() {
    if (lvl['kuriboh'] == brotherMaxLvl && lvl['kuribee'] == brotherMaxLvl && lvl['kuribah'] == brotherMaxLvl && lvl['kuriboo'] == brotherMaxLvl && lvl['kuribeh'] == brotherMaxLvl) {
        let r = Math.random();
        if (r < 0.5) {
            upgradeButton['babylon'].classList.remove('hidden');
            if (lvl['babylon'] == 0) {
                obtainedKuribohKpc.push('kuribabylonTransp');
            }
            lvl['babylon']++;
            addClick(-10);
            display['babylon'].innerHTML = "Kuribabylon x" + lvl['babylon'] + "</br>kuriboh/click: " + lvl['babylon'] * 5;
        } else {
            upgradeButton['bandit'].classList.remove('hidden');
            if (lvl['winged'] == 0 && lvl['bandit'] == 0) {
                obtainedKuribohKps = ['kuribanditTransp'];
            } else if (lvl['bandit'] == 0) {
                obtainedKuribohKps.push('kuribanditTransp');
            }
            lvl['bandit']++;
            addClick(-banditMultiplier);
            if (wingedAutoAcquired == false) {
                wingedAutoAcquired = true;
                setInterval(Autowinged, 1000);
            }
            display['bandit'].innerHTML = "Kuribandit x" + lvl['bandit'] + "</br>kuriboh/s: " + lvl['bandit'] * banditMultiplier;
        }
        brother.forEach(resetBrother);
    }
}

function resetBrother(kuribohName) {
    lvl[kuribohName] = 0;
    if (kuribohName != 'kuriboh') {
        removeValueFromArrayKpc(kuribohName + 'Transp');
    }
    addClass(descContainer[kuribohName], 'clickable');
    display[kuribohName].innerHTML = kuribohName + " x" + lvl[kuribohName] + "</br>coût: " + price[kuribohName] + " kuriboh";
    desc[kuribohName].innerHTML = lvl[kuribohName] + " Kp/c => " + (lvl[kuribohName] + 1) + " Kp/c"
}

function removeValueFromArrayKpc(value) {
    let index = obtainedKuribohKpc.indexOf(value);
    if (index !== -1) {
        obtainedKuribohKpc.splice(index, 1);
    }
}

function removeValueFromArrayKps(value) {
    let index = obtainedKuribohKps.indexOf(value);
    if (index !== -1) {
        obtainedKuribohKps.splice(index, 1);
    }
}

function addBerserker() {
    if (canPay(price['berserker']) && berserkerMultiplier < 5) {
        berserkerMultiplier = 5;
        score -= price['berserker'];
        price['berserker'] *= lvl[winged];
        desc['berserker'].innerHTML = timer['berserker'];
        let countdownBerserker = setInterval(countdown, 1000, 'berserker');
        removeClass(descContainer['berserker'], 'clickable');
        setTimeout(() => {
            berserkerMultiplier = 1;
            clearInterval(countdownBerserker);
            timer['berserker'] = 60;
            desc['berserker'].innerHTML = "coût: " + price['berserker'] + " => " + (price['berserker'] * lvl['winged']);
            addClass(descContainer['berserker'], 'clickable');
        }, 60000);
    }
}

function countdown(upgradeName) {
    timer[upgradeName] -= 1;
    desc[upgradeName].innerHTML = timer[upgradeName];
}