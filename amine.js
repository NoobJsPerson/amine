const einput = document.getElementById("input"),
	eoutput = document.getElementById("output");
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function interpret(){
	eoutput.value = "";
	let lines = einput.value.split("\n"),
		variables = new Map(),
		isUppercase = false;
	for(let i = 0; i < lines.length; i++){
		if(lines[i].startsWith("//")) continue;
		let words = lines[i].split(" ");
		switch(words[0]){
			case "amine":
				// SETLOWERCASE
				// sets isUppercase flag to false
				isUppercase = false;
				break;
			case "AMINE":
				// SETUPPERCASE
				// sets isUppercase flag to true
				isUppercase = true;
				break;
			case "Amine":
				// ASSIGN
				// Assign variable to a value
				isamine(words[1],words[2]);
				variables.set(words[1],amineToNumber(words[2]));
				break;
			case "aMine":
				// PRINTNUM
				// print number from variable
				isamine(words[1]);
				eoutput.value += variables.get(words[1]);
				break;
			case "AMine":
				// PRINTCHAR
				// print char from variable
				isamine(words[1]);
				eoutput.value = numberToamine(variables.get(words[1]));
				break;
			case "AmIne":
				// ADD
				// add two variables together and sets the third variable to the result
				isamine(words[1],words[2],words[3])
				const result = (variables.get(words[1]) + variables.get(words[2])) % 32
				variables.set(words[3], result);
				break;
			case "aMIne":
				// JUMPBY
				// jumps by the amount of line of code specified in the value of the first variable and uses the first bit of the second variable to determine whether to jump forwards or backwards 
				isamine(words[1], words[2]);
				i += (variables.get(words[1]) + 1) * ((variables.get(words[2]) % 1) ? -1 : 1)
				// sleep 10 milliseconds so the website doesn't crash
				await sleep(10);
				break;
			case "AmINE":
				// DELETE
				isamine(words[1]);
				variables.delete(words[1]);
				break;
			case "aMINE":
				// EXIT
				return;
		}
	}
}
function isamine(...strs){
	strs.forEach(str => {
		if(str.toLowerCase() != "amine"){
			let error = `${str} is not amine`;
			eoutput.value = error;
			throw Error(error);
		}
	})
}
function amineToNumber(amine){
	// converts an amine to a number
	// the first bit is on the right
	let number = 0,
		added = 1;
	for(let i = 0; i < 5; i++){
		if(amine.charCodeAt(i) < 91){
			number += added;
		}
		added *= 2;
	}
	return number
}
function numberToChar(number,isUppercase){
	// converts number to character the amine way
	number += isUppercase ? 65 : 97;
	return String.fromCharCode(number);
}
// for the debugger
function numberToamine(number){
	let amine = ["a","m","i","n","e"];
	for (var i = 0; i < 5 && number >= 1; i++) {
		if(~~(number%2)) amine[i] = amine[i].toUpperCase();
		number /= 2;
	}
	return amine.join("");
}
