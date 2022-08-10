const menuButton = document.querySelector('.menu-button')
const calculatorType = document.querySelector('.calculator-type')
const calculator = document.querySelector('.calculator')
const historyBtn = document.querySelector('.historyBtn')
const memoryBtn = document.querySelector('.memoryBtn')
const calculations1 = document.querySelector('.calculations1')
const calculations2 = document.querySelector('.calculations2')
const prevOperand = document.querySelector('.prev-operand')
const currOperand = document.querySelector('.current-operand')

let calcType = 'Standard'
let result
let operators = ['+', '-', '*', '/']
const condition = op => op === '+' || op === '-' || op === '*' || op === '/' || op === '✖' || op === '÷'

const keys = {
   standard: [
      ['%', 'key dark', ''],
      ['CE', 'key dark clearCurr', clearCurr],
      ['C', 'key dark clearAll', clearAll],
      ['⌫', 'key dark del', del],
      ['¹/ₓ', 'key dark', ''],
      ['x²', 'key dark', ''],
      ['√x', 'key dark', ''],
      ['÷', 'key dark big operator', ''],
      [7, 'key num', addNum],
      [8, 'key num', addNum],
      [9, 'key num', addNum],
      ['✖', 'key dark operator', ''],
      [4, 'key num', addNum],
      [5, 'key num', addNum],
      [6, 'key num', addNum],
      ['-', 'key dark big operator', ''],
      [1, 'key num', addNum],
      [2, 'key num', addNum],
      [3, 'key num', addNum],
      ['+', 'key dark big operator', ''],
      ['+/-', 'key', ''],
      [0, 'key num', addNum],
      ['.', 'key dot num', addNum],
      ['=', 'key blue equal', '']
   ]
}

class VarOperator {
   constructor(operator) {
      this.op = operator
   }

   calculate = (op1, op2) => {
      switch (this.op) {
         case '+':
            return Number(op1) + Number(op2)
         case '-':
            return Number(op1) - Number(op2)
         case '*':
            return Number(op1) * Number(op2)
         case '/':
            return Number(op1) / Number(op2)
      }
   }
}

const openMenu = () => {
   if (menuButton.classList.contains('open')) {
      calculatorType.classList.remove('open')
      menuButton.classList.remove('open')
   } else {
      calculatorType.classList.add('open')
      menuButton.classList.add('open')
   }
}

function clearCurr() {
   currOperand.innerText = ''
}

function clearAll() {
   currOperand.innerText = ''
   prevOperand.innerText = ''
}

function del() {
   currOperand.innerText = currOperand.innerText.slice(0, -1)
}

function operate(currOperator) {
   const arrForCalculation = prevOperand.innerText.slice(0, -1).split(' ')
   // CONDITION BEFORE USED - prevOperand.innerText.match(/\d+/g) && prevOperand.innerText.match(/\d+/g).length >= 2
   if (arrForCalculation.length > 3) {
      // REGEX VERSION NOT WORKING PROPERLY
      // const operator = prevOperand.innerText.slice(0, -1).replace(/\d+/g, '').replace(/ /g, '').slice(0, 1);
      // let numbers = prevOperand.innerText.match(/\d+/g)
      const operator = arrForCalculation[1]
      const vo = new VarOperator(operator)
      const sum = vo.calculate(arrForCalculation[0], arrForCalculation[2])
      prevOperand.innerText = `${sum} ${currOperator}`
   }
}

function addNum(e) {
   let num
   if (e.type === 'click') {
      num = e.target.innerText
   } else if (e.type === 'keydown') {
      num = e.key
      const respectiveEl = document.querySelectorAll('.num')[indexForNum(num)]
      respectiveEl.classList.add('animate')
      respectiveEl.addEventListener('animationend', () => {
         respectiveEl.classList.remove('animate')
      })
   }
   if (!num) return
   currOperand.innerText += num
}

function indexForNum(num) {
   switch (num) {
      case '7':
         return 0
      case '8':
         return 1
      case '9':
         return 2
      case '4':
         return 3
      case '5':
         return 4
      case '6':
         return 5
      case '1':
         return 6
      case '2':
         return 7
      case '3':
         return 8
      case '0':
         return 9
      case '.':
         return 10
   }
}

function addOperator(e) {
   let operator
   if (e.type === 'click') {
      operator = e.target.innerText
   } else if (e.type === 'keydown') {
      operator = e.key
   }
   if (!operator) return
   const prevIsOperator = condition(prevOperand.innerText.slice(-1))
   console.log(prevIsOperator)
   if (prevIsOperator) return
   prevOperand.innerText += ` ${currOperand.innerText} ${operator}`
   currOperand.innerText = ''
   operate(operator)
}

menuButton.addEventListener('click', openMenu)

keys.standard.forEach(key => {
   let btn = document.createElement('div')
   btn.classList.value = key[1]
   btn.innerText = key[0]
   btn.addEventListener('click', e => key[2](e))
   calculator.append(btn)
})

document.addEventListener('keydown', e => {
   if ((e.code.includes('Digit') && !e.shiftKey) || e.key === '.') {
      addNum(e)
   } else if (e.code === 'Backspace') {
      // When result is received clearAll else del
      // Do Later
      del()
   } else if ((e.key === '+' && e.shiftKey) || (e.key === '-') || (e.key === '*' && e.shiftKey) || (e.key === '/')) {
      addOperator(e)
   }
})

historyBtn.addEventListener('click', e => {
   e.target.classList.value = 'title historyBtn active'
   memoryBtn.classList.value = 'title memoryBtn'
   calculations1.classList.value = 'calculations1 historyVersion'
   calculations2.classList.value = 'calculations2 historyVersion'
})

memoryBtn.addEventListener('click', e => {
   e.target.classList.value = 'title memoryBtn active'
   historyBtn.classList.value = 'title historyBtn'
   calculations1.classList.value = 'calculations1 memoryVersion'
   calculations2.classList.value = 'calculations2 memoryVersion'
})