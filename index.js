const previewOperationText = document.querySelector("#preview-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previewOperationText, currentOperationText) {
    this.previewOperationText = previewOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // Adicionar um número na calculadora
  addDigit(digit) {
    // Verifique se a operação atual já possui ponto
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // Processar o calculo da operação
  processOperation(operation) {
    // Verificar se a operação atual é vázia
    if (this.currentOperationText.innerText === "" && operation !== "C"){
                    // Trocar operação
        if(this.previewOperationText.innerText !== ""){
            this.changeOperation(operation)
        }
        return;
    }


    // Pegar operação atual e anterior
    let operationValue;
    let preview = +this.previewOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = preview + current;
        this.updateScreen(operationValue, operation, current, preview);
        break;
      case "-":
        operationValue = preview - current;
        this.updateScreen(operationValue, operation, current, preview);
        break;
      case "/":
        operationValue = preview / current;
        this.updateScreen(operationValue, operation, current, preview);
        break;
      case "*":
        operationValue = preview * current;
        this.updateScreen(operationValue, operation, current, preview);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurentOperator();
        break;
       case "C":
        this.processClearAllOperation();
        break;
       case "=":
        this.processEqualOperation();
        break;
      default:
        return;
    }
  }

  // Trocar o valor da calculadora
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    preview = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // Verifique se o valor é zero, se for apenas adicione o valor atual
      if (preview === 0) {
        operationValue = current;
      }

      // Adicionar valor atual na preview
      this.previewOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // Trocar operações matemáticas
  changeOperation(operation){
    
    const mathOperation = ["*", "/", "+", "-"]

    if (!mathOperation.includes(operation)) {
        return;
    }

    this.previewOperationText.innerText = this.previewOperationText.innerText.slice(0, -1) + operation;
  }

  // Deletar digito
  processDelOperator(){
    this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
  }

  // Deletar operação atual
  processClearCurentOperator(){
    this.currentOperationText.innerText = "";
  }

  // Deletar todas as operaçãp
  processClearAllOperation(){
    this.currentOperationText.innerText = "";
    this.previewOperationText.innerText = "";
  }

  // Processar operação
  processEqualOperation(){
    const operation = previewOperationText.innerText.split(" ")[1]

    this.processOperation(operation)
  }


}

const calc = new Calculator(previewOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    const value = evt.target.innerText;

    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});
