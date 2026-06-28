const https = require('https');

exports.handler = async function(event, context) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'api.football-data.org',
            path: '/v4/competitions/WC/matches',
            method: 'GET',
            headers: {
                'X-Auth-Token': 'e9fecee5adfb40709d025c671c1e9d7a'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: data
                });
            });
        });

        req.on('error', (error) => {
            resolve({
                statusCode: 500,
                body: JSON.stringify({ error: error.message })
            });
        });

        req.end();
    });
};
