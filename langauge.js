const https = require('https');

const data = JSON.stringify({
    text: ['Hello, world!'],
    target_lang: 'HIN'
});

let token = 'e3466a02-7984-4a1a-a561-e2d06374ada7:fx'

const options = {
    hostname: 'api-free.deepl.com',
    path: '/v2/translate',
    method: 'POST',
    headers: {
        'Authorization': `DeepL-Auth-Key ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    let responseBody = '';

    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    res.on('end', () => {
        console.log(JSON.parse(responseBody));
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
