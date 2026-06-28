// Fonction serverless Netlify pour récupérer les résultats
// Pas de problème CORS car l'appel est fait côté serveur
exports.handler = async function(event, context) {
    const API_KEY = 'e9fecee5adfb40709d025c671c1e9d7a';
    const API_URL = 'https://api.football-data.org/v4/competitions/WC/matches';

    try {
        const response = await fetch(API_URL, {
            headers: { 'X-Auth-Token': API_KEY }
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: 'API error', status: response.status })
            };
        }

        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
