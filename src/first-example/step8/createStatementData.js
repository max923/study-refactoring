function createStatementData(invoice, plays){
  const statementData = {}
  statementData.customer = invoice.customer
  statementData.performances = invoice.performances.map(enrichPerformance)
  statementData.totalAmount = totalAmount(statementData)
  statementData.totalVolumeCredits = totalVolumeCredits(statementData)
  return statementData
  function totalAmount(data) {
    let result = 0
    for( let perf of data.performances ) {
      result += perf.amount;
    }
    return result
  }
  function totalVolumeCredits(data) {
    let result = 0
    for( let perf of data.performances ) {
      result += perf.volumeCredits
    }
    return result
  }
  function playFor(aPerformacne) {
    return plays[aPerformacne.playID]
  }
  function volumeCreditsFor(aPerformacne) {
    let result = 0
    result += Math.max(aPerformacne.audience - 30, 0)
    if ('comedy' === aPerformacne.play.type) result += Math.floor(aPerformacne.audience / 5)
    return result
  }
  function amountFor(aPerformacne) {
    let result = 0
    switch (aPerformacne.play.type) {
      case 'tragedy':
        result = 4000
        if(aPerformacne.audience > 30) {
          result += 1000 * (aPerformacne.audience - 30)
        }
        break;
      case 'comedy':
        result = 3000
        if(aPerformacne.audience > 20) {
          result += 1000 + 500 * (aPerformacne.audience - 20)
        }
        result += 300 * aPerformacne.audience
        break;
      default:
        throw new Error(`unknown type: ${aPerformacne.play.type}`)
        break;
    }
    return result
  }
  function enrichPerformance(aPerformacne) {
    const result = Object.assign({}, aPerformacne)
    result.play = playFor(result)
    result.amount = amountFor(result)
    result.volumeCredits = volumeCreditsFor(result)
    result
    return result
  }
}