
function decodeBase(value, base) {
    let decimalValue = 0;
    for (let i = 0; i < value.length; i++) {
        const digit = value[i];
        let digitValue;
        
        // Handle both numeric and alphabetic digits
        if (digit >= '0' && digit <= '9') {
            digitValue = digit.charCodeAt(0) - '0'.charCodeAt(0);
        } else {
            digitValue = digit.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
        }
        
        decimalValue = decimalValue * base + digitValue;
    }
    return decimalValue;
}

function lagrangeInterpolation(x, y, k) {
    let result = 0;

    for (let i = 0; i < k; i++) {
        let term = y[i];
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= (0 - x[j]) / (x[i] - x[j]); // Evaluate at x = 0
            }
        }
        result += term;
    }

    return result;
}


function calculateSecret(jsonInput) {

    const jsonObject = JSON.parse(jsonInput);

    const n = jsonObject.keys.n;
    const k = jsonObject.keys.k;

    const x = [];
    const y = [];

    for (let i = 1; i <= k; i++) {
        const key = i.toString();
        const base = parseInt(jsonObject[key].base);
        const value = jsonObject[key].value;
        
        x.push(i);  // Use the key index as x
        y.push(decodeBase(value, base));
    }

    const c = lagrangeInterpolation(x, y, k);
    
    return Math.floor(c);
}

function calculateSecretsForTestCases(testCases) {
    testCases.forEach((testCase, index) => {
        console.log(`Secret for Test Case ${index + 1}: ${calculateSecret(testCase)}`);
    });
}

const testCase1 = `{
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
}`;

const testCase2 = `{
    "keys": {
        "n": 10,
        "k": 7
    },
    "1": {
        "base": "6",
        "value": "13444211440455345511"
    },
    "2": {
        "base": "15",
        "value": "aed7015a346d63"
    },
    "3": {
        "base": "15",
        "value": "6aeeb69631c227c"
    },
    "4": {
        "base": "16",
        "value": "e1b5e05623d881f"
    },
    "5": {
        "base": "8",
        "value": "316034514573652620673"
    },
    "6": {
        "base": "3",
        "value": "2122212201122002221120200210011020220200"
    },
    "7": {
        "base": "3",
        "value": "20120221122211000100210021102001201112121"
    },
    "8": {
        "base": "6",
        "value": "20220554335330240002224253"
    },
    "9": {
        "base": "12",
        "value": "45153788322a1255483"
    },
    "10": {
        "base": "7",
        "value": "1101613130313526312514143"
    }
}`;

calculateSecretsForTestCases([testCase1, testCase2]);


OUTPUT:
Secret for Test Case 1: 3
Secret for Test Case 2: 79836264046592

