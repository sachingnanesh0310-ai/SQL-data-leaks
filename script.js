// script.js

// ----------------------------
// Fake Database
// ----------------------------
const users = [
    {
        username: encryptData("sachin"),
        password: encryptData("admin123")
    }
];

// ----------------------------
// AES-256 Style Encryption Simulation
// ----------------------------
// (Frontend demo version)

function encryptData(data) {
    return btoa(data + "_AES256");
}

function decryptData(data) {
    return atob(data).replace("_AES256", "");
}

// ----------------------------
// Capability Code Mechanism
// ----------------------------

const capabilityCode = "SECURE_ACCESS_2026";

// ----------------------------
// SQL Injection Detection
// ----------------------------

const sqlPatterns = [
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
    /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
    /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
    /((\%27)|(\'))union/i,
    /exec(\s|\+)+(s|x)p\w+/i,
    /UNION(.*?)SELECT/i,
    /DROP TABLE/i,
    /OR 1=1/i
];

// ----------------------------
// Double Layer Security
// ----------------------------

function validateInput(input) {

    // Layer 1: SQL Pattern Detection
    for(let pattern of sqlPatterns){
        if(pattern.test(input)){
            return false;
        }
    }

    // Layer 2: Special Character Filtering
    const blockedChars = ["'", '"', ";", "--"];

    for(let char of blockedChars){
        if(input.includes(char)){
            return false;
        }
    }

    return true;
}

// ----------------------------
// Logging Attack Attempts
// ----------------------------

function logAttack(input){
    const logList = document.getElementById("logList");

    const li = document.createElement("li");
    li.textContent = `⚠ SQL Injection Attempt Detected: ${input}`;

    logList.appendChild(li);
}

// ----------------------------
// Secure Login
// ----------------------------

function secureLogin(){

    const username = document.getElementById("sachin").value;
    const password = document.getElementById("password").value;

    const result = document.getElementById("result");

    // Check SQL Injection
    if(!validateInput(username) || !validateInput(password)){

        result.style.color = "red";
        result.innerHTML = "SQL Injection Attempt Blocked!";

        logAttack(username + " | " + password);

        return;
    }

    // Capability Code Validation
    const providedCapability = capabilityCode;

    if(providedCapability !== capabilityCode){
        result.style.color = "red";
        result.innerHTML = "Invalid Capability Code!";
        return;
    }

    // Encrypted Validation
    const encryptedUsername = encryptData(username);
    const encryptedPassword = encryptData(password);

    const validUser = users.find(user =>
        user.username === encryptedUsername &&
        user.password === encryptedPassword
    );

    if(validUser){

        result.style.color = "lightgreen";
        result.innerHTML = "Secure Login Successful!";
    }
    else{

        result.style.color = "orange";
        result.innerHTML = "Invalid Credentials!";
    }
}