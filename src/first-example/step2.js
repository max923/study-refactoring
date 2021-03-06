function statement(invoice, plays) {
  let totalAmount = 0
  let volumeCredits = 0
  let result = `Statement for ${invoice.customer}\n`
  const format = new Intl.NumberFormat('en-US', {
    stlye: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format
  for( let perf of invoice.performances ) {
    // const play = playFor(perf)
    let thisAmount = amountFor(perf)
     // add volume creadits
    volumeCredits += Math.max(perf.audience - 30, 0)
    // add extra credit for every ten comedy attendees
    if ('comedy' === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5)
    // print line for this order
    result += `${playFor(perf).name}: ${format(thisAmount/100)} (${perf.audience / 5})`
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount/100)}\n`
  result += `You earned ${volumeCredits} credits\n`

 
  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }
  
  function amountFor(aPerformance) {
    let result = 0
    // It executed one become to thrice and how interplay of refactoring and performance
    switch (playFor(aPerformance).type) {
      case 'tragedy':
        result = 4000
        if(aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30)
        }
        break;
      case 'comedy':
        result = 3000
        if(aPerformance.audience > 20) {
          result += 1000 + 500 * (aPerformance.audience - 20)
        }
        result += 300 * aPerformance.audience
        break;
      default:
        throw new Error(`unknown type: ${play.type}`)
        break;
    }
    return result
  }
  return result
}

module.exports = {
  statement
}