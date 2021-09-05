class Calculator{
    constructor(prevOperandText,currOperandText){
        this.prevOperandText = prevOperandText;
        this.currOperandText = currOperandText;
        this.clear();
    }
    clear(){
        this.currOperand='';
        this.prevOperand='';
        this.operation=undefined;
    }

    delete(){
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.currOperand==='')return
        
        if(this.prevOperand!==''){
            this.compute();
        }
        this.operation=operation;
        this.prevOperand=this.currOperand;
        this.currOperand='';
    }
    compute(){
        let computation
        const prev=parseFloat(this.prevOperand)
        const curr=parseFloat(this.currOperand)
        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operation){
            case '+':
                computation=prev+curr;
                break;
            case '-':
                computation=prev-curr;
                break;
            case '*':
                computation=prev*curr;
                break;
            case '÷':
                computation=prev/curr;
                break;
            default:
                return;         
        }
        this.currOperand = computation
        this.operation = undefined
        this.prevOperand = ''
    }

    updateDisplay(){
        this.currOperandText.innerText = this.currOperand
        if(this.operation!= null){
            this.prevOperandText.innerText = `${this.prevOperand} ${this.operation}`
        }
        else{
            this.prevOperandText.innerText =''
        }

    }
}





const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const ACButton = document.querySelector('[data-allclear]')
const prevOperandText = document.querySelector('[data-previous-operand]')
const currOperandText = document.querySelector('[data-current-operand]')


const calculator = new Calculator(prevOperandText,currOperandText)

numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click',()=>{
    calculator.compute()
    calculator.updateDisplay()
})

ACButton.addEventListener('click',()=>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click',()=>{
    calculator.delete()
    calculator.updateDisplay()
})
