const { statement: statement5 } = require('../../first-example/step5')
const { statement: statement4 } = require('../../first-example/step4')
const { statement: statement3 } = require('../../first-example/step3')
const { statement: statement2 } = require('../../first-example/step2')
const { statement: statement1 } = require('../../first-example/step1')
const plays = {
  hamlet: {
    name: 'hamlet',
    type: 'tragedy'
  },
  like: {
    name: 'As You Like It',
    type: 'comedy'
  },
  othello: {
    name: 'Othello',
    type: 'tragedy'
  },
}
const invoice = {
  customer: 'BigCo',
  performances: [
    {
    playID: 'hamlet',
    audience: 55
    },
    {
      playID: 'like',
      audience: 35
    },
    {
      playID: 'othello',
      audience: 40
    }
  ]
}

it('Should return statement result with correct', () => {
  expect(statement5(invoice, plays)).toEqual(`Statement for BigCo\nhamlet: 290.00 (11)As You Like It: 220.00 (7)Othello: 140.00 (8)Amount owed is 650.00\nYou earned 47 credits\n`)
  expect(statement4(invoice, plays)).toEqual(`Statement for BigCo\nhamlet: 290.00 (11)As You Like It: 220.00 (7)Othello: 140.00 (8)Amount owed is 650.00\nYou earned 47 credits\n`)
  expect(statement3(invoice, plays)).toEqual(`Statement for BigCo\nhamlet: 290.00 (11)As You Like It: 220.00 (7)Othello: 140.00 (8)Amount owed is 650.00\nYou earned 47 credits\n`)
  expect(statement2(invoice, plays)).toEqual(`Statement for BigCo\nhamlet: 290.00 (11)As You Like It: 220.00 (7)Othello: 140.00 (8)Amount owed is 650.00\nYou earned 47 credits\n`)
  expect(statement1(invoice, plays)).toEqual(`Statement for BigCo\nhamlet: 290.00 (11)As You Like It: 220.00 (7)Othello: 140.00 (8)Amount owed is 650.00\nYou earned 47 credits\n`)
})