function statement(invoice, plays) {
  const statementData = {}
  statementData.customer = invoice.customer
  statementData.performances = invoice.performances.map(enrichPerformance)
  return renderPlainText(statementData, invoice, plays)
  
  function enrichPerformance(aPerformacne){
    const result = Object.assign({}, aPerformacne)
    result.play = playFor(result)
    result.amount = amountFor(result)
    result.volumeCredits = volumeCreditsFor(result)
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
        throw new Error(`unknown type: ${playFor(perf).type}`)
        break;
    }
    return result
  }
}


function renderPlainText(data, invoice, plays) {
  let result = `Statement for ${data.customer}\n`
  for( let perf of data.performances ) {
    result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience / 5})`
  }
  result += `Amount owed is ${usd(totalAmount())}\n`
  result += `You earned ${totalVolumeCredits()} credits\n`
  return result


  function totalAmount() {
    let result = 0
    for( let perf of data.performances ) {
      result += perf.amount;
    }
    return result
  }
  function totalVolumeCredits() {
    let result = 0
    for( let perf of data.performances ) {
      result += perf.volumeCredits
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

}


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
module.exports = {
  statement
}
