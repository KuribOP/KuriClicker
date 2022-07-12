let score = 5000;
let clickMultiplier = 1;
let price = 50;
let priceAuto = 500;
let priceBonus = 5000;
let acquired = false;
let bonusActive = false;
let seconds;
let intervalId;
let addBtn = document.getElementById("click");
let display = document.getElementById("display");
let multiplier = document.getElementById("multiply");
let autoclic = document.getElementById("autoclicker");
let bonus = document.getElementById("bonus");

addBtn.onclick = addpoint;
multiplier.onclick = augmentMultiplication;
autoclic.onclick = addAuto;
bonus.onclick = addBonus;

function addpoint()
{
    if(bonusActive == true){
        score += clickMultiplier*2;
    }else{
        score += clickMultiplier;
    }
    display.innerHTML = score;
}

function augmentMultiplication()
{
    if(score>=price){
        score -= price;
        price *= 2;
        display.innerHTML = score;
        clickMultiplier++
        multiplier.innerHTML = 'x' + clickMultiplier +'</br>' + price + 'pts';
    }
}

function addAuto()
{
    if(score>=priceAuto && acquired==false)
    {
        score -= priceAuto;
        display.innerHTML = score;
        autoclic.innerHTML = 'Acquired';
        acquired = true;
        setInterval(addpoint,1000);
    }
}

function addBonus()
{
    if(score>=priceBonus && bonusActive==false)
    {
        score -= priceBonus;
        display.innerHTML = score;
        bonusActive = true;
        seconds = 30;
        intervalId=setInterval(countdown,1000);
        setTimeout(bonusTimeout,30000);
    }

}

function countdown()
{
    seconds -= 1;
    bonus.innerHTML = seconds + 'sec';
}

function bonusTimeout()
{
    bonusActive=false;
    clearInterval(intervalId);
    bonus.innerHTML = 'bonus: </br> 5000pts';
}