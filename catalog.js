const fs = require('fs');

fs.readFile('input.json', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading the file:", err);
        return;
    }
    
    try {
        const jsonData = JSON.parse(data);

        for (let key in jsonData) {
            if (key !== "keys") {
                console.log(`Key: ${key}, Base: ${jsonData[key].base}, Value: ${jsonData[key].value}`);
            }
        }
    } catch (err) {
        console.error("Error parsing JSON:", err);
    }
});
