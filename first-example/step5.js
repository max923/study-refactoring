function statement(invoice, plays) {
  let result = `Statement for ${invoice.customer}\n`
  for( let perf of invoice.performances ) {
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience / 5})`
  }
  result += `Amount owed is ${usd(totalAmount())}\n`
  result += `You earned ${totalVolumeCredits()} credits\n`
  return result


  function totalAmount() {
    let result = 0
    for( let perf of invoice.performances ) {
      result += amountFor(perf);
    }
    return result
  }
  function totalVolumeCredits() {
    let result = 0
    for( let perf of invoice.performances ) {
      result += volumeCreditsFor(perf)
    }
    return result
  }
  function usd(aNumber) {
    return (
      new Intl.NumberFormat('en-US', {
        stlye: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      }).format(aNumber/100)
    )
  }
  function playFor(aPerformacne) {
    return plays[aPerformacne.playID]
  }
  function volumeCreditsFor(aPerformacne) {
    let result = 0
    result += Math.max(aPerformacne.audience - 30, 0)
    if ('comedy' === playFor(aPerformacne).type) result += Math.floor(aPerformacne.audience / 5)
    return result
  }
  function amountFor(aPerformacne) {
    let result = 0
    switch (playFor(aPerformacne).type) {
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
        throw new Error(`unknown type: ${playFor(perf).type}`)
        break;
    }
    return result
  }
}

module.exports = {
  statement
}