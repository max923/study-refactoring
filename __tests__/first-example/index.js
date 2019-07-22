const { createStatementData } = require('../../src/first-example/html/createStatementData')
const plays = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  asLike: { name: "As You Like It", type: "comedy" },
  othello: { name:  "Othello", type: "tragedy" },
}

const invoices = [{
  customer: "BigCo", performances:
  [
    { playID: "hamlet", audience: 55 },
    { playID: "asLike", audience: 35 },
    { playID: "othello", audience: 40  }
  ]
}]
test('createStatementData function result', () => {
  expect(createStatementData(invoices[0], plays).customer).toEqual('BigCo')
  expect(createStatementData(invoices[0], plays).totalAmount).toEqual(173000)
  expect(createStatementData(invoices[0], plays).totalVolumeCredits).toEqual(47)
  expect(createStatementData(invoices[0], plays).performances[0]).toMatchObject({
    playID: 'hamlet',
    audience: 55,
    play: { name: 'Hamlet', type: 'tragedy' },
    amount: 65000,
    volumeCredits: 25
  })
  expect(createStatementData(invoices[0], plays).performances[1]).toMatchObject({
    playID: 'asLike',
    audience: 35,
    play: { name: 'As You Like It', type: 'comedy' },
    amount: 58000,
    volumeCredits: 12
  })
  expect(createStatementData(invoices[0], plays).performances[2]).toMatchObject({
    playID: 'othello',
    audience: 40,
    play: { name: 'Othello', type: 'tragedy' },
    amount: 50000,
    volumeCredits: 10
  })
})
