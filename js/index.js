document.getElementById("mainTitle").innerText = "Point and click adventure";

const offsetCharacter = 16;
const gameWindow = document.getElementById("gameWindow");

const sec = 1000;

let tempTimeOut;

const mainCharacter = document.getElementById("mainCharacter");
const characterAudio = document.getElementById("characterAudio");
const mainCharacterSpeech = document.getElementById("mainCharacterSpeech");

const counterSpeech = document.getElementById("counterSpeech");
const counterAudio = document.getElementById("counterAudio");
const counterPortrait = document.getElementById("counterCharacter");

let inventory = [];
const inventoryList = document.getElementById("inventoryList");

gameWindow.onclick = function (e) {

    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left; 
    var y = e.clientY - rect.top; 
    mainCharacter.style.left = x - offsetCharacter + "px";
    mainCharacter.style.top = y - offsetCharacter + "px";

    console.log(e.target.id);

    switch (e.target.id) {
        case "door1":
            if (checkItem("rusty key")) {
                showMessage(mainCharacterSpeech, characterAudio,"You found the key that fits, open the door now...");
            } else {
                showMessage(mainCharacterSpeech, characterAudio, "this is door one.<br> And it's locked you dumb...");

            }
            break;
        case "door2":
            showMessage(mainCharacterSpeech, characterAudio, "I am sorry noboby is home...<br> You can come back later..");
            break;
        case "statue":
            counterPortrait.style.opacity = 1;
            showMessage(mainCharacterSpeech, characterAudio, "What is this for awfull statue?");
            setTimeout(showMessage, 4 * sec, counterSpeech, counterAudio, "Finaly someone to talk to <br> but what did you say about me");
            setTimeout(showMessage, 9 * sec, mainCharacterSpeech, characterAudio, "I am so sorry you look beautifull? <br> Why are you talking, statues are not supose to talk anyway..");
            setTimeout(showMessage, 12 * sec, counterSpeech, counterAudio, "Oke maybe you should check one off the graves");
            setTimeout(function () { counterPortrait.style.opacity = 0; }, 16 * sec);
            setTimeout(showMessage, 16 * sec, mainCharacterSpeech, characterAudio, "Wait! What?");
            break;
        case "grave":
            if (!checkItem("rusty key")) {
                getItem("rusty key", "rustyKey");
                showMessage(mainCharacterSpeech, characterAudio, "Wow I found a rusty key!<br> But why at the grave..");
                setTimeout(hideMessage, 4 * sec, mainCharacterSpeech, characterAudio);
            } else {
                showMessage(mainCharacterSpeech, characterAudio, "fk nothing here...");
                setTimeout(hideMessage, 4 * sec, mainCharacterSpeech, characterAudio);
            }

            break;
        default:
            hideMessage(mainCharacterSpeech, characterAudio);
            hideMessage(counterSpeech, counterAudio);
            break;
    }
}

function showMessage(targetBalloon, targetSound, message) {
    targetSound.play();
    targetBalloon.style.opacity = "1";
    targetBalloon.innerHTML = message;
    setTimeout(hideMessage, 4 * sec, targetBalloon, targetSound);
}

function hideMessage(targetBalloon, targetSound) {
    targetSound.pause();
    targetBalloon.style.opacity = "0";
    targetBalloon.innerHTML = "...";
}

function getItem(itemName, itemId) {
    if (!checkItem(itemName)) {
        inventory.push(itemName);
        showItem(itemName, itemId);
    }

}

function checkItem(item) {
    return inventory.includes(item);
}

function showItem(itemName, itemId) {
    let listItem = document.createElement("li");

    listItem.id = itemId;

    listItem.appendChild(document.createTextNode(itemName));

    inventoryList.appendChild(listItem);
}

function removeItem(itemName, itemId) {
    inventory = inventory.filter(function (newInventory) {
        return newInventory !== itemName;
    });
    document.getElementById(itemId).remove();

}
