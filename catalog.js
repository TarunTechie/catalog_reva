const fs = require("fs");

function decodeValue(base, value) {
  return parseInt(value, base);
}

// Function to find the constant term using Lagrange Interpolation
function findConstantTerm(points) {
  let result = 0;

  // Apply Lagrange interpolation for f(0)
  for (let i = 0; i < points.length; i++) {
    const [xi, yi] = points[i];
    let term = yi;

    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        const [xj, _] = points[j];
        term *= (0 - xj) / (xi - xj);
      }
    }
    result += term;
  }
  return Math.round(result); 
}


function main() {
  
  const data = JSON.parse(fs.readFileSync("input.json", "utf-8"));

  const n = data.keys.n;
  const k = data.keys.k;

  
  const points = [];
  for (const key in data) {
    if (key !== "keys") {
      const pointData = data[key];
      const base = parseInt(pointData.base);
      const value = pointData.value;

      
      const x = parseInt(key);
      const y = decodeValue(base, value);
      points.push([x, y]);
    }
  }

  
  const selectedPoints = points.slice(0, k);

  
  const constantTerm = findConstantTerm(selectedPoints);
  console.log("The constant term c is:", constantTerm);
}


main();
