fetch('https://raw.githubusercontent.com/harrisono132123/tradeProj/main/tradeData.csv')
  .then(res => res.text())
  .then((data) => {
  const tradesObj = parseCsv(data);
  
  let currentBalance = 100;
  let winner = 101;
  let winnerSsl;
  let winnerStp;
  let winnerSl;
  let tradesLen = tradesObj.length;
  
  
  //variables
  let sell = {'leverage': 1, 'stopLoss': 0.000, 'takeProfit': 0.000}
  let buy = {'leverage': 1, 'stopLoss': 0.000, 'takeProfit': 0.000}
  
  //calculation function
  const stepOne = (j) => {
  return tradesObj[j]['type'] === 'SELL'
         ? tradesObj[j]['drawDown'] <= sell['stopLoss'] 
         ? 1 + (sell['stopLoss'] * sell['leverage'])
         : tradesObj[j]['runUp'] >= sell['takeProfit']
         ? 1 + (sell['takeProfit']  * sell['leverage'])
         : 1 + (tradesObj[j]['profit'] * sell['leverage'])
         : tradesObj[j]['drawDown'] <= buy['stopLoss'] 
         ? 1 + (buy['stopLoss'] * buy['leverage'])
         : tradesObj[j]['runUp'] >= buy['takeProfit']
         ? 1 + (buy['takeProfit']  * buy['leverage'])
         : 1 + (tradesObj[j]['profit'] * buy['leverage'])
  }
   while(buay['stopLoss'] >= -0.3) {
    while(sell['leverage'] <= 30) {
      while(sell['takeProfit'] <= 0.3) {
        while(sell['stopLoss'] >= -0.3) {
          for (let i = 0; i < tradesObj.length; i++) {
            currentBalance *= stepOne(i)
          }
          if (currentBalance > winner) {
           winner = currentBalance
           winnerSsl = sell['stopLoss'];
           winnerStp = sell['takeProfit'];
           winnerSl = sell['leverage'];
          } else {
           ''
         }
          currentBalance = 100
          sell['stopLoss'] -= 0.001
        }

      sell['stopLoss'] = 0.000
      sell['takeProfit'] += 0.001
      }
      sell['takeProfit'] = 0.000
      sell['leverage'] += 1
    }
     sell['leverage'] = 1
     buy['stopLoss'] -= 0.001
   }
  
  
  console.log(winner)
  

  })

let parseCsv = (data) => {
  let type = 0;

  let arr = data.replace(/\s\n/g, ',');
  arr = arr.split(',')
  
  let newObj = [];
 
  for(let i = 0; i < arr.length; i++) {
    if (i !== '') {
      if(i % 4 === 0 && !isNaN(arr[i+1])) {
        newObj.push({'type': arr[i], 'profit': parseFloat(arr[i+1]), 'runUp': parseFloat(arr[i+2]), 'drawDown': parseFloat(arr[i+3])})
      }
    }
  }
  return newObj
}
