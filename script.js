let score = 10000000000000000;
let clickMultiplier = 1;
let multiplyPrice = 50;
let wingedPrice = 200;
let wingedMultiplier = 1;
let wingedlvl = 0;
let wingedAutoAcquired = false;
let wing10acquired = false;
let addBtn = document.getElementById("click");
let scoreDisplay = document.getElementById("displayScore");
let multiply = document.getElementById("multiply");
let winged = document.getElementById("winged");
let dpsDisplay = document.getElementById("displayDps");
let clickDisplay = document.getElementById("displayClick");
let wings = document.getElementById("wings");

addBtn.onclick = addpoint;
multiply.onclick = addmultiply;
winged.onclick = addwinged;
wings.onclick = addwing10;

function addpoint()
{
    score += clickMultiplier;
    scoreDisplay.innerHTML = 'kuriboh: ' + score;
}

function addmultiply(){
    if(score>=multiplyPrice){
        score -= multiplyPrice;
        multiplyPrice *= 2;
        scoreDisplay.innerHTML = 'kuriboh: ' + score;
        clickMultiplier++;
        clickDisplay.innerHTML = 'kuriboh/click: ' + clickMultiplier
        document.getElementById("multiplyCost").innerHTML = "Multiplicateur </br>x" + clickMultiplier + "</br>coût: " + multiplyPrice + " kuriboh";
    }
}

function addwinged(){
    if(score>=wingedPrice && wingedlvl<9){
        score -= wingedPrice;
        wingedlvl ++;
        wingedPrice *= 1+wingedlvl;
        scoreDisplay.innerHTML = 'kuriboh: ' + score;
        wingedMultiplier += wingedMultiplier;
        if(wingedAutoAcquired == false){
            wingedAutoAcquired = true;
            setInterval(Autowinged,1000);
        }
        dpsDisplay.innerHTML = "kuriboh/s: " + wingedMultiplier; 
        if(wingedlvl == 9){
            document.getElementById("wingedImage").classList.replace('winged','winged9');
            wings.classList.remove('hidden');
            document.getElementById("wingedCost").innerHTML = "Kuriboh ailée (lvl " + wingedlvl + ")</br>"+ wingedMultiplier + " kuriboh/s";
        }else{
            document.getElementById("wingedCost").innerHTML = "Kuriboh ailée (lvl " + wingedlvl + ")</br>"+ wingedMultiplier + " kuriboh/s</br>coût: " + wingedPrice + " kuriboh";
        }
    }
}

function Autowinged(){
    score += wingedMultiplier;
    scoreDisplay.innerHTML = 'kuriboh: ' + score;
}

function addwing10(){
    if(score>=wingedPrice && wing10acquired == false){
        wingedMultiplier *= 10;
        dpsDisplay.innerHTML = "kuriboh/s: " + wingedMultiplier;
        wing10acquired = true;
        document.getElementById("wingedCost").innerHTML = "Kuriboh ailée (lvl " + wingedlvl + ")</br>"+ wingedMultiplier + " kuriboh/s";
        document.getElementById("wingedImage").classList.replace('winged9','winged10');
    }
}


// let score = 5000;
// let clickMultiplier = 1;
// let price = 50;
// let priceAuto = 500;
// let priceBonus = 5000;
// let acquired = false;
// let bonusActive = false;
// let seconds;
// let intervalId;
// let addBtn = document.getElementById("click");
// let display = document.getElementById("display");
// let multiplier = document.getElementById("multiply");
// let autoclic = document.getElementById("autoclicker");
// let bonus = document.getElementById("bonus");

// addBtn.onclick = addpoint;
// multiplier.onclick = augmentMultiplication;
// autoclic.onclick = addAuto;
// bonus.onclick = addBonus;

// function addpoint()
// {
//     if(bonusActive == true){
//         score += clickMultiplier*2;
//     }else{
//         score += clickMultiplier;
//     }
//     display.innerHTML = score;
// }

// function augmentMultiplication()
// {
//     if(score>=price){
//         score -= price;
//         price *= 2;
//         display.innerHTML = score;
//         clickMultiplier++
//         multiplier.innerHTML = 'x' + clickMultiplier +'</br>' + price + 'pts';
//     }
// }

// function addAuto()
// {
//     if(score>=priceAuto && acquired==false)
//     {
//         score -= priceAuto;
//         display.innerHTML = score;
//         autoclic.innerHTML = 'Acquired';
//         acquired = true;
//         setInterval(addpoint,1000);
//     }
// }

// function addBonus()
// {
//     if(score>=priceBonus && bonusActive==false)
//     {
//         score -= priceBonus;
//         display.innerHTML = score;
//         bonusActive = true;
//         seconds = 30;
//         intervalId=setInterval(countdown,1000);
//         setTimeout(bonusTimeout,30000);
//     }

// }

// function countdown()
// {
//     seconds -= 1;
//     bonus.innerHTML = seconds + 'sec';
// }

// function bonusTimeout()
// {
//     bonusActive=false;
//     clearInterval(intervalId);
//     bonus.innerHTML = 'bonus: </br> 5000pts';
// }
