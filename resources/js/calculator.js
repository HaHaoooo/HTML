function addElement(value) {
    document.getElementById("real-equation").innerHTML += value;
    if (value === "*") {
        document.getElementById("equation").innerHTML += "×";
    } else if (value === "/") {
        document.getElementById("equation").innerHTML += "÷";
    } else {
        document.getElementById("equation").innerHTML += value;
    }
}

function Delete() {
    document.getElementById("equation").innerHTML = "";
    document.getElementById("real-equation").innerHTML = "";
}

function calculate() {
    const part = document.getElementById("percent1");
    const sum = document.getElementById("percent2");
    const equation = document.getElementById("real-equation").innerHTML;

    if (part.style.display === "block" && sum.style.display === "block") {
        const partValue = parseFloat(part.value);
        const sumValue = parseFloat(sum.value);
        let result = (partValue / sumValue) * 100;
        document.getElementById("equation").innerHTML = result.toFixed(2) + "%";
        part.style.display = "none";
        sum.style.display = "none";
    } else {
        document.getElementById("real-equation").innerHTML = eval(equation);
        document.getElementById("equation").innerHTML = eval(equation);
    }
}

function square() {
    let result = eval(document.getElementById("real-equation").innerHTML);
    result *= result;
    document.getElementById("real-equation").innerHTML = result;
    document.getElementById("equation").innerHTML = result;
}

function sqrt() {
    const equation = eval(document.getElementById("real-equation").innerHTML);
    const result = parseFloat(equation);
    document.getElementById("real-equation").innerHTML = Math.sqrt(result).toString();
    document.getElementById("equation").innerHTML = Math.sqrt(result).toString();
}

function percent(){
    let percent1Style = document.getElementById("percent1").style.display;
    let percent2Style = document.getElementById("percent2").style.display;
    if (percent1Style === "none") {
        document.getElementById("percent1").style.display = "block";
        Delete();
    } else {
        document.getElementById("percent1").style.display = "none";
    }
    if (percent2Style === "none"){
        document.getElementById("percent2").style.display = "block";
        Delete();
    } else {
        document.getElementById("percent2").style.display = "none";
    }
}

function sin(){
    const equation = eval(document.getElementById("real-equation").innerHTML);
    const result = Math.sin(equation);
    document.getElementById("equation").innerHTML = result.toString();
    document.getElementById("real-equation").innerHTML = result.toString();
}

function cos(){
    const equation = eval(document.getElementById("real-equation").innerHTML);
    const result = Math.cos(equation);
    document.getElementById("equation").innerHTML = result.toString();
    document.getElementById("real-equation").innerHTML = result.toString();
}

function tan(){
    const equation = eval(document.getElementById("real-equation").innerHTML);
    const result = Math.tan(equation);
    document.getElementById("equation").innerHTML = result.toString();
    document.getElementById("real-equation").innerHTML = result.toString();
}