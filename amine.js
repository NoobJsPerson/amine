const einput = document.getElementById("input"),
	eoutput = document.getElementById("output");
function interpret(){
	eoutput.value = "";
	let lines = einput.value.split("\n"),
		variables = new Map(),
		isUppercase = false;
	for(let i = 0; i < lines.length; i++){
		let words = lines[i].split(" ");
		switch(words[0]){
			case "amine":
				// sets isUppercase flag to false
				isUppercase = false;
				break;
			case "AMINE":
				// sets isUppercase flag to true
				isUppercase = true;
				break;
			case "Amine":
				// Assign variable to a value
				isamine(words[1],words[2]);
				variables.set(words[1],amineToNumber(words[2]));
				break;
			case "amiNe":
				// print number from argument (might be useful for debugging)
				isamine(words[1]);
				eoutput.value += amineToNumber(words[1]);
				break;
			case "aminE":
				// prints character from argument (might be useful for debugging)
				isamine(words[1]);
				eoutput.value += numberToChar(amineToNumber(words[1]),isUppercase);
				break;
			case "AmiNe":
				// print number from variable
				isamine(words[1]);
				eoutput.value += variables.get(words[1]);
				break;
			case "AminE":
				// print char from variable
				isamine(words[1]);
				eoutput.value = numberToamine(variables.get(words[1]));
				break;
			case "AMIne":
				// add to variables together and sets the third variable to the result
				isamine(words[1],words[2],words[3])
				variables.set(word[3],variables.get(words[1])+variables.get(words[2]));
				break;
			
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