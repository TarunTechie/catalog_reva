const fs = require('fs');

// Read JSON data from input.json
fs.readFile('input.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  const jsonData = JSON.parse(data);

  function decodeValue(value, base) {
    let decodedValue = BigInt(0);
    for (let i = 0; i < value.length; i++) {
      const digitValue = parseInt(value[i], base);
      decodedValue = decodedValue * BigInt(base) + BigInt(digitValue);
    }
    return decodedValue;
  }

  const decodedValues = Object.keys(jsonData)
    .filter(key => !key.startsWith('keys'))
    .map(key => {
      const base = parseInt(jsonData[key].base);
      const value = jsonData[key].value;
      return decodeValue(value, base);
    });

  function lagrangeInterpolation(xValues, yValues) {
    const n = yValues.length;
    let c = BigInt(0);

    for (let i = 0; i < n; i++) {
      let term = BigInt(yValues[i]);
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          term *= BigInt(-xValues[j]) / BigInt(xValues[i] - xValues[j]);
        }
      }
      c += term;
    }

    return c;
  }

  const xValues = Array.from({ length: decodedValues.length }, (_, i) => BigInt(i + 1));
  const constantTerm = lagrangeInterpolation(xValues, decodedValues);

  console.log("The constant term c is:", constantTerm.toString());
});
