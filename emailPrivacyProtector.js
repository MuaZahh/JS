const { userInfo } = require('os');
const { use } = require('react');

const prompt = require('prompt-sync')();

function basic(email) {
    let atIndex = email.indexOf("@");
    
    let userName = email.slice(0, atIndex);
    let domain = email.slice(atIndex + 1);
    let dotIndex = userName.indexOf(".")
    
    let maskedUserName;  // Declare before if/else
    
    if (dotIndex !== -1) {
        let firstPart = userName.slice(0, dotIndex)
        let secondPart = userName.slice(dotIndex + 1)

        let maskedFirst = firstPart[0] + "*".repeat(firstPart.length - 1)
        let maskedSecond = secondPart[0] + "*".repeat(secondPart.length - 1)

        maskedUserName = maskedFirst + "." + maskedSecond;
    }
    else {
        maskedUserName = userName[0] + "*".repeat(userName.length - 1);
    }
    return maskedUserName + "@" + domain
}

function partial(email) {
    let atIndex = email.indexOf("@")
    let userName = email.slice(0, atIndex);
    let domain = email.slice(atIndex + 1);

    if (userName.length > 3) {
        let visible = userName.slice(0, 3)
        let hidden = "*".repeat(userName.length - 3)

        return visible + hidden + "@" + domain;
    }
    else {
        return email;
    }
}

function domainOnly(email) {
    let atIndex = email.indexOf("@")
    let userName = email.slice(0, atIndex);
    let domain = email.slice(atIndex + 1);
    let asterisks = "*".repeat(userName.length)

    return asterisks + "@" + domain

    /*Easier method
    let atIndex = email.indexOf("@");
    let domain = email.slice(atIndex + 1);
    
    return "[hidden]@" + domain;
    */
}

function secure(email) {
    let [userName, domain] = email.split("@")
    let firstPart = userName[0] + "*".repeat(userName.length - 1)
    let secondPart;
    let domainName;
    let extension;
    let dotIndex = domain.indexOf(".");
    if (dotIndex !== 1) {
        domainName = domain.slice(0, dotIndex);  // "gmail" from "gmail.com"
        extension = domain.slice(dotIndex);
        secondPart = domainName[0] + "*".repeat(domainName.length - 1)
    }
    return firstPart + "@" + secondPart + extension;
}

console.log("=".repeat(40))
console.log( "   Email Privacy Protector   ")
console.log("=".repeat(40))

console.log("Select a choice")
console.log("1. Basic")
console.log("2. Partial")
console.log("3. Domain only")
console.log("4. Secure")

let isValid = false;
let choice;
while (!isValid) {
    choice = prompt("Enter your choice (1-4): ")  // No 'let' here
    if (Number(choice) < 1 || Number(choice) > 4) {
        console.log("Enter a number between 1 and 4: ")
    }
    else {
        isValid = true;
    }
}

let email = prompt("Enter the email you would like to protect: ");

if (Number(choice) == 1) {
    console.log("Masked email: " + basic(email));
}
if (Number(choice) == 2) {
    console.log("Masked email: " + partial(email));
}
if (Number(choice) == 3) {
    console.log("Masked email: " + domainOnly(email));
}
if (Number(choice) == 4) {
    console.log("Masked email: " + secure(email));
}