const axios = require('axios');

// Mapeo de regiones a plataformas
const regionMap = {
    'LA1': 'americas',
    'LA2': 'americas',
    'NA1': 'americas',
    'BR1': 'americas',
    'EUW1': 'europe',
    'EUNE1': 'europe',
    'RU': 'europe',
    'KR': 'asia',
    'JP1': 'asia',
    'SG2': 'sea',
    'PH2': 'sea',
    'TW2': 'sea',
    'TH2': 'sea',
    'VN2': 'sea',
};

// Para Vercel: leer API Key desde variables de entorno
const RIOT_API_KEY = process.env.RIOT_API_KEY || "RGAPI-cf1cacbe-b568-41a1-9941-b0442e8b8127";
const RIOT_API_BASE = "https://americas.api.riotgames.com";

// Función serverless para Vercel
export default async function handler(req, res) {
    // Permitir CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const { summonerName, region } = req.query;

        if (!summonerName || !region) {
            return res.status(400).json({
                success: false,
                error: 'Se requieren summonerName y region'
            });
        }

        const platform = regionMap[region] || 'americas';

        console.log(`📊 Obteniendo datos de ${summonerName} en región ${region}...`);

        // Obtener datos del invocador
        const summonerUrl = `${RIOT_API_BASE}/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`;
        const summonerResponse = await axios.get(summonerUrl, {
            params: { api_key: RIOT_API_KEY }
        });

        const summonerData = summonerResponse.data;
        console.log(`✅ Invocador encontrado: ${summonerData.name}`);

        // Obtener datos de ligas
        const leagueUrl = `${RIOT_API_BASE}/lol/league/v4/entries/by-summoner/${summonerData.id}`;
        const leagueResponse = await axios.get(leagueUrl, {
            params: { api_key: RIOT_API_KEY }
        });

        const leagueData = leagueResponse.data;
        
        // Procesar datos de SoloQ y Flex
        let soloQ = {
            rank: 'Sin jugar',
            tier: 'Desconocido',
            lp: 0,
            wins: 0,
            losses: 0,
            wr: 0
        };

        let flex = {
            rank: 'Sin jugar',
            tier: 'Desconocido',
            lp: 0,
            wins: 0,
            losses: 0,
            wr: 0
        };

        if (Array.isArray(leagueData)) {
            leagueData.forEach(queue => {
                if (queue.queueType === 'RANKED_SOLO_5x5') {
                    const totalGames = queue.wins + queue.losses;
                    soloQ = {
                        rank: `${queue.tier} ${queue.rank}`,
                        tier: queue.tier,
                        lp: queue.leaguePoints,
                        wins: queue.wins,
                        losses: queue.losses,
                        wr: totalGames > 0 ? Math.round((queue.wins / totalGames) * 100) : 0
                    };
                } else if (queue.queueType === 'RANKED_FLEX_SR') {
                    const totalGames = queue.wins + queue.losses;
                    flex = {
                        rank: `${queue.tier} ${queue.rank}`,
                        tier: queue.tier,
                        lp: queue.leaguePoints,
                        wins: queue.wins,
                        losses: queue.losses,
                        wr: totalGames > 0 ? Math.round((queue.wins / totalGames) * 100) : 0
                    };
                }
            });
        }

        console.log(`📈 SoloQ: ${soloQ.rank} | Flex: ${flex.rank}`);

        return res.status(200).json({
            success: true,
            summoner: {
                name: summonerData.name,
                id: summonerData.id,
                level: summonerData.summonerLevel
            },
            soloQ,
            flex,
            lastUpdated: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Error:', error.message);
        
        if (error.response?.status === 404) {
            return res.status(404).json({
                success: false,
                error: 'Invocador no encontrado'
            });
        } else if (error.response?.status === 429) {
            return res.status(429).json({
                success: false,
                error: 'Demasiadas solicitudes. Intenta en un momento.'
            });
        } else if (error.response?.status === 401) {
            return res.status(401).json({
                success: false,
                error: 'Error de autenticación con Riot API. Verifica la API Key.'
            });
        } else {
            return res.status(500).json({
                success: false,
                error: error.message || 'Error del servidor'
            });
        }
    }
}
