const menu = document.querySelector('.menu')
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
let resultReceived = false
const history = []
const memory = JSON.parse(localStorage.getItem('calculatorMemory')) || []

memory.forEach(mem => {
   resultReceived = true
   addHistoryOrMem('mem', mem.operands, mem.result)
   resultReceived = false
})

{
// history.forEach(hist => {
//    const calculation = document.createElement('div')
//    calculation.classList.add('calculation')
   
//    const operands = document.createElement('div')
//    operands.classList.add('operands')
//    operands.innerText = hist.operands
//    calculation.appendChild(operands)
   
//    const result = document.createElement('div')
//    result.classList.add('result')
//    result.innerText = hist.result
//    calculation.appendChild(result)

//    calculations1.appendChild(calculation)
// })
// addHistoryOrMem('hist', '90 + 60 =', '150')
}

let operators = ['+', '-', '*', '/']
const condition = op => op === '+' || op === '-' || op === '*' || op === '/' || op === '✖' || op === '÷'

const keys = {
   standard: [
      ['%', 'key dark', ''],
      ['CE', 'key dark clearCurr', clearCurr],
      ['C', 'key dark clearAll', clearAll],
      ['⌫', 'key dark del', del],
      ['¹/ₓ', 'key dark', ''],
      ['x²', 'key dark', square],
      ['√x', 'key dark', squareRoot],
      ['÷', 'key dark big operator', addOperator],
      [7, 'key num', addNum],
      [8, 'key num', addNum],
      [9, 'key num', addNum],
      ['✖', 'key dark operator', addOperator],
      [4, 'key num', addNum],
      [5, 'key num', addNum],
      [6, 'key num', addNum],
      ['-', 'key dark big operator', addOperator],
      [1, 'key num', addNum],
      [2, 'key num', addNum],
      [3, 'key num', addNum],
      ['+', 'key dark big operator', addOperator],
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
      menu.classList.remove('open')
   } else {
      calculatorType.classList.add('open')
      menuButton.classList.add('open')
      menu.classList.add('open')
   }
}

function addHistoryOrMem(histOrMem, operandsText, resultText) {
   if (resultReceived === false) return
   const calculation = document.createElement('div')
   calculation.classList.add('calculation')
   
   const operands = document.createElement('div')
   operands.classList.add('operands')
   operands.innerText = operandsText
   calculation.appendChild(operands)
   
   const result = document.createElement('div')
   result.classList.add('result')
   result.innerText = resultText
   calculation.appendChild(result)

   if (histOrMem === 'hist') {
      calculations1.appendChild(calculation)
   } else {
      calculations2.appendChild(calculation)
   }
}

function clearCurr() {
   currOperand.innerText = ''
}

function clearAll() {
   currOperand.innerText = ''
   prevOperand.innerText = ''
   resultReceived = false
}

function del() {
   currOperand.innerText = currOperand.innerText.slice(0, -1)
}

function squareRoot() {
   const num = Number(currOperand.innerText.trim())
   currOperand.innerText = Math.sqrt(num)
   if (resultReceived === true) {
      prevOperand.innerText = ''
   }
}

function square() {
   const num = Number(currOperand.innerText.trim())
   currOperand.innerText = Math.pow(num, 2)
   if (resultReceived === true) {
      prevOperand.innerText = ''
   }
}

function final() {
   const arrForCalculation = prevOperand.innerText.split(' ')
   if (arrForCalculation[0] === '' || arrForCalculation[1] === '' || currOperand.innerText === '') return
   let first, second, final
   if (currOperand.innerText !== '' && condition(prevOperand.innerText.slice(-1))) {
      first = Number(arrForCalculation[0])
      second = Number(currOperand.innerText)
      const vo = new VarOperator(arrForCalculation[1])
      final = vo.calculate(first, second)
      prevOperand.innerText = `${first} ${arrForCalculation[1]} ${second} = `
      currOperand.innerText = final
   }

   resultReceived = true

   addHistoryOrMem('hist', prevOperand.innerText, currOperand.innerText)
   history.push({ operands: prevOperand.innerText, result: currOperand.innerText })
   
   addHistoryOrMem('mem', prevOperand.innerText, currOperand.innerText)
   memory.push({ operands: prevOperand.innerText, result: currOperand.innerText })
   localStorage.setItem('calculatorMemory', JSON.stringify(memory))
}

function operate(currOperator) {
   prevOperand.innerText += ` ${currOperand.innerText} ${currOperator}`
   currOperand.innerText = ''
   const arrForCalculation = prevOperand.innerText.slice(0, -1).split(' ')
   if (condition(arrForCalculation[1]) && arrForCalculation[2] === '') {
      prevOperand.innerText = `${arrForCalculation[0]} ${currOperator}`
      return
   }
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
   if (e.key === '.' && currOperand.innerText.includes('.')) return
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
   if (e.key === '.' && currOperand.innerText === '') {
      currOperand.innerText = '0.'
   } else {
      currOperand.innerText += num
   }
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
   if (prevOperand.innerText === '' && currOperand.innerText === '') return
   if (e.type === 'click') {
      operator = e.target.innerText
      if (operator === '÷') {
         operator = '/'
      } else if (operator === '✖') {
         operator = '*'
      }
   } else if (e.type === 'keydown') {
      operator = e.key
   }
   if (!operator) return
   const prevIsOperator = condition(prevOperand.innerText.slice(-1))
   if (prevIsOperator) {
      operate(operator)
      return
   }
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
      if (resultReceived === true) clearAll()
      addNum(e)
   } else if (e.code === 'Backspace' || e.code === 'Delete') {
      if (resultReceived === true) return clearAll()
      del()
   } else if ((e.key === '+' && e.shiftKey) || (e.key === '-') || (e.key === '*' && e.shiftKey) || (e.key === '/')) {
      if (resultReceived === true) {
         let result = currOperand.innerText
         clearAll()
         prevOperand.innerText = result
      }
      addOperator(e)
   } else if (e.key === 'Escape') {
      clearAll()
   } else if (e.key === 'Enter') {
      if (resultReceived === true) return
      final()
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