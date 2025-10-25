/**
 * Automated Checker Script for ALX_Simple_Quiz
 * ---------------------------------------------
 * This script checks the following:
 * ✅ All requisite files exist and are not empty
 * ✅ The 'checkAnswer' function exists
 * ✅ The correct answer is retrieved
 * ✅ The user’s selected answer is retrieved
 * ✅ The user’s and correct answers are compared
 * ✅ Correct feedback is provided for correct and incorrect answers
 * ✅ Event listener is added for "submit-answer" button
 * ✅ Retrieval of the "submit-answer" button
 */

const fs = require('fs');

// Utility function
function checkFileExistsAndNotEmpty(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`❌ Missing file: ${filePath}`);
            return false;
        }
        const content = fs.readFileSync(filePath, 'utf8').trim();
        if (content.length === 0) {
            console.log(`❌ Empty file: ${filePath}`);
            return false;
        }
        console.log(`✅ ${filePath} exists and is not empty`);
        return true;
    } catch (err) {
        console.log(`❌ Error reading file ${filePath}: ${err.message}`);
        return false;
    }
}

// Check all required files
const filesOk =
    checkFileExistsAndNotEmpty('index.html') &
    checkFileExistsAndNotEmpty('styles.css') &
    checkFileExistsAndNotEmpty('quiz.js');

if (!filesOk) {
    console.log("\n⚠️  One or more required files are missing or empty. Fix this before proceeding.");
    process.exit(1);
}

// Read JS content
const jsContent = fs.readFileSync('quiz.js', 'utf8');

// --- Tests ---

let score = 0;
let total = 8;

// 1️⃣ Check if checkAnswer function exists
if (/function\s+checkAnswer\s*\(/.test(jsContent)) {
    console.log("✅ 'checkAnswer' function found.");
    score++;
} else {
    console.log("❌ 'checkAnswer' function not found.");
}

// 2️⃣ Check for correct answer retrieval
if (/const\s+correctAnswer\s*=\s*["'`]4["'`]/.test(jsContent)) {
    console.log("✅ Correct answer retrieval found.");
    score++;
} else {
    console.log("❌ Correct answer retrieval missing.");
}

// 3️⃣ Check for user’s selected answer retrieval
if (/document\.querySelector\(.*name=["']quiz["'].*checked/.test(jsContent)) {
    console.log("✅ Retrieval of user's selected answer found.");
    score++;
} else {
    console.log("❌ Retrieval of user's selected answer missing.");
}

// 4️⃣ Check for comparison of user’s and correct answers
if (/if\s*\(.*userAnswer.*===.*correctAnswer.*\)/.test(jsContent)) {
    console.log("✅ Comparison between user’s and correct answers found.");
    score++;
} else {
    console.log("❌ Comparison logic missing.");
}

// 5️⃣ Check for feedback for correct answer
if (/feedback\.textContent\s*=\s*["'`]Correct! Well done\.["'`]/.test(jsContent)) {
    console.log("✅ Feedback for correct answer found.");
    score++;
} else {
    console.log("❌ Feedback for correct answer missing.");
}

// 6️⃣ Check for feedback for incorrect answer
if (/feedback\.textContent\s*=\s*["'`]That's incorrect\. Try again!["'`]/.test(jsContent)) {
    console.log("✅ Feedback for incorrect answer found.");
    score++;
} else {
    console.log("❌ Feedback for incorrect answer missing.");
}

// 7️⃣ Check retrieval of submit-answer button
if (/document\.getElementById\(.*["']submit-answer["'].*\)/.test(jsContent)) {
    console.log("✅ Retrieval of 'submit-answer' button found.");
    score++;
} else {
    console.log("❌ Retrieval of 'submit-answer' button missing.");
}

// 8️⃣ Check event listener for the submit button
if (/addEventListener\s*\(\s*["']click["']\s*,\s*checkAnswer\s*\)/.test(jsContent)) {
    console.log("✅ Event listener for 'submit-answer' button found.");
    score++;
} else {
    console.log("❌ Event listener for 'submit-answer' button missing.");
}

// Final score
console.log(`\n✅ Final Score: ${(score / total * 100).toFixed(1)}% (${score}/${total})`);
