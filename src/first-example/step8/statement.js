
function htmlStatement (invoice, plays) {
  return renderHTML(createStatementData(invoice, plays))
}

function renderHTML(data) {
  let result = `Statement for ${data.customer}</br>`
  for( let perf of data.performances ) {
    result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience / 5})`
  }
  result += `Amount owed is ${usd(data.totalAmount)}</br>`
  result += `You earned ${data.totalVolumeCredits} credits</br>`
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