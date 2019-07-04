// const { statement } = require('../index')
const { statement } = require('../first-example/step2')
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
  const message = statement(invoice, plays)
  expect(message).toEqual(`Statement for BigCo\nhamlet: 290.00 (11)As You Like It: 220.00 (7)Othello: 140.00 (8)Amount owed is 650.00\nYou earned 47 credits\n`)
})