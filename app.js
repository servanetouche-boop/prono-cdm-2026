// ============================================
// PRONO CDM 2026 - Phases éliminatoires uniquement
// ============================================

// ---- Configuration ----
const POINTS = {
    EXACT: 5,      // Score exact
    DIFF: 3,       // Bon écart de buts
    WINNER: 1      // Bon vainqueur (ou nul)
};

// Backend JSON pour partage multi-appareils (JSONBin.io - gratuit)
// Créer un compte sur https://jsonbin.io et remplacer ces valeurs
const JSONBIN_ID = '6a37b968f5f4af5e2917d8e3';
const JSONBIN_KEY = '$2a$10$eHmF63d7EIkK9iaVb.lofOHu8CbmlsrqChcr/1tHFk31jMS.l.v2i';
const USE_CLOUD = true;

// API pour les résultats en direct
const API_URL = 'https://api.football-data.org/v4/competitions/WC/matches';
const API_KEY = 'e9fecee5adfb40709d025c671c1e9d7a';

// ---- État de l'application ----
let currentUser = null;
let currentMatchId = null;

// ---- Matchs Phases Éliminatoires CDM 2026 ----
// (Les noms d'équipes seront mis à jour après la phase de groupes)
const MATCHES_DATA = [
    // Huitièmes de finale (16 matchs pour 48 équipes → 32 qualifiés)
    { id: 1, team1: "1A", team2: "2B", date: "2026-07-01T18:00:00", phase: "Huitièmes de finale", score1: null, score2: null },
    { id: 2, team1: "1B", team2: "2A", date: "2026-07-01T21:00:00", phase: "Huitièmes de finale", score1: null, score2: null },
    { id: 3, team1: "1C", team2: "2D", date: "2026-07-02T18:00:00", phase: "Huitièmes de finale", score1: null, score2: null },
    { id: 4, team1: "1D", team2: "2C", date: "2026-07-02T21:00:00", phase: "Huitièmes de finale", score1: null, score2: null },
    { id: 5, team1: "1E", team2: "2F", date: "2026-07-03T18:00:00", phase: "Huitièmes de finale", score1: null, score2: null },
    { id: 6, team1: "1F", team2: "2E", date: "2026-07-03T21:00:00", phase: "Huitièmes de finale", score1: null, score2: null },
    { id: 7, team1: "1G", team2: "2H", date: "2026-07-04T18:00:00", phase: "Huitièmes de finale", score1: null, score2: null },
    { id: 8, team1: "1H", team2: "2G", date: "2026-07-04T21:00:00", phase: "Huitièmes de finale", score1: null, score2: null },
    { id: 9, team1: "1I", team2: "2J", date: "2026-07-05T18:00:00", phase: "Huitièmes de finale", score1: null, score2: null },
    { id: 10, team1: "1J", team2: "2I", date: "2026-07-05T21:00:00", phase: "Huitièmes de finale", score1: null, score2: null },
    { id: 11, team1: "1K", team2: "2L", date: "2026-07-06T18:00:00", phase: "Huitièmes de finale", score1: null, score2: null },
    { id: 12, team1: "1L", team2: "2K", date: "2026-07-06T21:00:00", phase: "Huitièmes de finale", score1: null, score2: null },
    { id: 13, team1: "3e A/B/C", team2: "3e D/E/F", date: "2026-07-07T18:00:00", phase: "Huitièmes de finale", score1: null, score2: null },
    { id: 14, team1: "3e G/H/I", team2: "3e J/K/L", date: "2026-07-07T21:00:00", phase: "Huitièmes de finale", score1: null, score2: null },
    { id: 15, team1: "3e meilleurs", team2: "3e meilleurs", date: "2026-07-08T18:00:00", phase: "Huitièmes de finale", score1: null, score2: null },
    { id: 16, team1: "3e meilleurs", team2: "3e meilleurs", date: "2026-07-08T21:00:00", phase: "Huitièmes de finale", score1: null, score2: null },
    // Quarts de finale
    { id: 17, team1: "Vainqueur 8e #1", team2: "Vainqueur 8e #2", date: "2026-07-11T18:00:00", phase: "Quarts de finale", score1: null, score2: null },
    { id: 18, team1: "Vainqueur 8e #3", team2: "Vainqueur 8e #4", date: "2026-07-11T21:00:00", phase: "Quarts de finale", score1: null, score2: null },
    { id: 19, team1: "Vainqueur 8e #5", team2: "Vainqueur 8e #6", date: "2026-07-12T18:00:00", phase: "Quarts de finale", score1: null, score2: null },
    { id: 20, team1: "Vainqueur 8e #7", team2: "Vainqueur 8e #8", date: "2026-07-12T21:00:00", phase: "Quarts de finale", score1: null, score2: null },
    { id: 21, team1: "Vainqueur 8e #9", team2: "Vainqueur 8e #10", date: "2026-07-13T18:00:00", phase: "Quarts de finale", score1: null, score2: null },
    { id: 22, team1: "Vainqueur 8e #11", team2: "Vainqueur 8e #12", date: "2026-07-13T21:00:00", phase: "Quarts de finale", score1: null, score2: null },
    { id: 23, team1: "Vainqueur 8e #13", team2: "Vainqueur 8e #14", date: "2026-07-14T18:00:00", phase: "Quarts de finale", score1: null, score2: null },
    { id: 24, team1: "Vainqueur 8e #15", team2: "Vainqueur 8e #16", date: "2026-07-14T21:00:00", phase: "Quarts de finale", score1: null, score2: null },
    // Demi-finales
    { id: 25, team1: "Vainqueur QF1", team2: "Vainqueur QF2", date: "2026-07-15T21:00:00", phase: "Demi-finales", score1: null, score2: null },
    { id: 26, team1: "Vainqueur QF3", team2: "Vainqueur QF4", date: "2026-07-16T21:00:00", phase: "Demi-finales", score1: null, score2: null },
    // Match pour la 3e place
    { id: 27, team1: "Perdant DF1", team2: "Perdant DF2", date: "2026-07-18T21:00:00", phase: "Match pour la 3e place", score1: null, score2: null },
    // Finale
    { id: 28, team1: "Finaliste 1", team2: "Finaliste 2", date: "2026-07-19T21:00:00", phase: "Finale", score1: null, score2: null },
    // ===== MATCH TEST (à supprimer après) =====
    { id: 99, team1: "Espagne", team2: "Arabie Saoudite", date: "2026-06-21T18:00:00", phase: "TEST", score1: null, score2: null },
];

// ---- Stockage : Cloud (JSONBin) + Local fallback ----
// Le cloud permet à tous les téléphones d'accéder aux mêmes données
async function cloudGet() {
    if (!USE_CLOUD || !JSONBIN_ID || !JSONBIN_KEY) return null;
    try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}/latest`, {
            headers: { 'X-Master-Key': JSONBIN_KEY }
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.record;
    } catch (e) {
        console.warn('Cloud indisponible, utilisation locale', e);
        return null;
    }
}

async function cloudSave(data) {
    if (!USE_CLOUD || !JSONBIN_ID || !JSONBIN_KEY) return;
    try {
        await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_KEY
            },
            body: JSON.stringify(data)
        });
    } catch (e) {
        console.warn('Erreur sauvegarde cloud', e);
    }
}

// Synchronisation périodique
async function syncFromCloud() {
    const cloudData = await cloudGet();
    if (cloudData) {
        if (cloudData.users && Object.keys(cloudData.users).length > 0) {
            localStorage.setItem('cdm2026_users', JSON.stringify(cloudData.users));
        }
        // Ne pas écraser les matchs locaux avec un tableau vide du cloud
        if (cloudData.matches && cloudData.matches.length > 0) {
            localStorage.setItem('cdm2026_matches', JSON.stringify(cloudData.matches));
        }
        if (cloudData.predictions && Object.keys(cloudData.predictions).length > 0) {
            localStorage.setItem('cdm2026_predictions', JSON.stringify(cloudData.predictions));
        }
    }
}

async function syncToCloud() {
    const data = {
        users: getUsers(),
        matches: getMatches(),
        predictions: getPredictions()
    };
    // Ne pas envoyer si les matchs sont vides (protection)
    if (data.matches.length === 0) data.matches = MATCHES_DATA;
    await cloudSave(data);
}

// ---- Gestion du stockage local ----
function getUsers() {
    return JSON.parse(localStorage.getItem('cdm2026_users') || '{}');
}

function saveUsers(users) {
    localStorage.setItem('cdm2026_users', JSON.stringify(users));
    syncToCloud();
}

function getMatches() {
    // Versionner les matchs : si la liste du code change, on force la mise à jour
    const currentVersion = MATCHES_DATA.length + '_' + MATCHES_DATA[MATCHES_DATA.length - 1].id;
    const storedVersion = localStorage.getItem('cdm2026_matches_version');

    if (storedVersion !== currentVersion) {
        // Nouvelle version détectée, on réinitialise
        localStorage.setItem('cdm2026_matches', JSON.stringify(MATCHES_DATA));
        localStorage.setItem('cdm2026_matches_version', currentVersion);
        return [...MATCHES_DATA];
    }

    const stored = localStorage.getItem('cdm2026_matches');
    if (stored) return JSON.parse(stored);
    localStorage.setItem('cdm2026_matches', JSON.stringify(MATCHES_DATA));
    localStorage.setItem('cdm2026_matches_version', currentVersion);
    return [...MATCHES_DATA];
}

function saveMatches(matches) {
    localStorage.setItem('cdm2026_matches', JSON.stringify(matches));
    syncToCloud();
}

function getPredictions() {
    return JSON.parse(localStorage.getItem('cdm2026_predictions') || '{}');
}

function savePredictions(predictions) {
    localStorage.setItem('cdm2026_predictions', JSON.stringify(predictions));
    syncToCloud();
}

// ---- Authentification ----
function showRegister() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
}

function register() {
    const username = document.getElementById('reg-username').value.trim();
    const password = document.getElementById('reg-password').value;
    const password2 = document.getElementById('reg-password2').value;

    if (!username || !password) {
        showToast('Veuillez remplir tous les champs', 'error');
        return;
    }
    if (password !== password2) {
        showToast('Les mots de passe ne correspondent pas', 'error');
        return;
    }
    if (username.length < 3) {
        showToast('Le nom doit faire au moins 3 caractères', 'error');
        return;
    }

    const users = getUsers();
    if (users[username]) {
        showToast('Ce nom d\'utilisateur existe déjà', 'error');
        return;
    }

    users[username] = { password: btoa(password), createdAt: new Date().toISOString() };
    saveUsers(users);
    showToast('Inscription réussie ! Connectez-vous', 'success');
    showLogin();
}

function login() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        showToast('Veuillez remplir tous les champs', 'error');
        return;
    }

    const users = getUsers();
    if (!users[username] || atob(users[username].password) !== password) {
        showToast('Identifiants incorrects', 'error');
        return;
    }

    currentUser = username;
    localStorage.setItem('cdm2026_currentUser', username);
    showApp();
}

function logout() {
    currentUser = null;
    localStorage.removeItem('cdm2026_currentUser');
    document.getElementById('app-screen').classList.remove('active');
    document.getElementById('auth-screen').classList.add('active');
}

function showApp() {
    document.getElementById('auth-screen').classList.remove('active');
    document.getElementById('app-screen').classList.add('active');
    document.getElementById('nav-username').textContent = currentUser;
    renderMatches();
    updateResults();
    renderRanking();
}

// ---- Navigation ----
function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    document.getElementById(`tab-${tab}`).classList.add('active');

    if (tab === 'results') updateResults();
    if (tab === 'ranking') renderRanking();
}

// ---- Rendu des matchs ----
function renderMatches() {
    const matches = getMatches();
    const predictions = getPredictions();
    const container = document.getElementById('matches-list');
    const filterPhase = document.getElementById('filter-group').value;
    const filterStatus = document.getElementById('filter-status').value;

    let filtered = matches;
    if (filterPhase !== 'all') {
        filtered = filtered.filter(m => m.phase === filterPhase);
    }
    if (filterStatus === 'upcoming') {
        filtered = filtered.filter(m => m.score1 === null);
    } else if (filterStatus === 'finished') {
        filtered = filtered.filter(m => m.score1 !== null);
    }

    // Tri par date
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

    if (filtered.length === 0) {
        container.innerHTML = '<p class="empty-msg">Aucun match pour ce filtre</p>';
        return;
    }

    container.innerHTML = filtered.map(match => {
        const isFinished = match.score1 !== null;
        const matchDate = new Date(match.date);
        const now = new Date();
        const isLocked = matchDate <= now && !isFinished;
        const userPred = predictions[currentUser] && predictions[currentUser][match.id];

        let statusClass = isFinished ? 'finished' : (isLocked ? 'locked' : '');
        let predictionHtml = '';

        if (userPred) {
            let badge = '';
            if (isFinished) {
                const pts = calculatePoints(userPred, match);
                if (pts === POINTS.EXACT) badge = '<span class="prediction-badge badge-exact">Score exact +5</span>';
                else if (pts === POINTS.DIFF) badge = '<span class="prediction-badge badge-diff">Bon écart +3</span>';
                else if (pts === POINTS.WINNER) badge = '<span class="prediction-badge badge-winner">Bon vainqueur +1</span>';
                else badge = '<span class="prediction-badge badge-wrong">Raté 0pt</span>';
            } else {
                badge = '<span class="prediction-badge badge-pending">✓ Pronostic enregistré</span>';
            }
            predictionHtml = `
                <div class="match-prediction">
                    <span>Mon prono : ${userPred.score1} - ${userPred.score2}</span>
                    ${badge}
                </div>`;
        } else if (!isFinished && !isLocked) {
            predictionHtml = `<div class="match-prediction"><span style="color:var(--accent)">⚠️ Cliquez pour pronostiquer</span></div>`;
        }

        return `
        <div class="match-card ${statusClass}" onclick="${!isFinished && !isLocked ? `openPrediction(${match.id})` : ''}">
            <div class="match-header">
                <span class="match-phase">${match.phase}</span>
                <span>${isFinished ? '✓ Terminé' : (isLocked ? '🔒 En cours' : formatDate(matchDate))}</span>
            </div>
            <div class="match-teams">
                <div class="team">${match.team1}</div>
                <div class="match-score">${isFinished ? match.score1 + ' - ' + match.score2 : 'VS'}</div>
                <div class="team">${match.team2}</div>
            </div>
            ${predictionHtml}
        </div>`;
    }).join('');
}

function filterMatches() {
    renderMatches();
}

// ---- Pronostics ----
function openPrediction(matchId) {
    const matches = getMatches();
    const match = matches.find(m => m.id === matchId);
    if (!match) return;

    const matchDate = new Date(match.date);
    if (matchDate <= new Date()) {
        showToast('Le match a déjà commencé !', 'error');
        return;
    }

    currentMatchId = matchId;
    document.getElementById('modal-team1').textContent = match.team1;
    document.getElementById('modal-team2').textContent = match.team2;
    document.getElementById('modal-match-info').textContent =
        `${match.phase} — ${formatDate(matchDate)}`;

    const predictions = getPredictions();
    const existing = predictions[currentUser] && predictions[currentUser][matchId];
    document.getElementById('pred-score1').value = existing ? existing.score1 : 0;
    document.getElementById('pred-score2').value = existing ? existing.score2 : 0;

    document.getElementById('prediction-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('prediction-modal').classList.remove('active');
    currentMatchId = null;
}

function savePrediction() {
    const score1 = parseInt(document.getElementById('pred-score1').value);
    const score2 = parseInt(document.getElementById('pred-score2').value);

    if (isNaN(score1) || isNaN(score2) || score1 < 0 || score2 < 0) {
        showToast('Scores invalides', 'error');
        return;
    }

    const predictions = getPredictions();
    if (!predictions[currentUser]) predictions[currentUser] = {};
    predictions[currentUser][currentMatchId] = {
        score1, score2, savedAt: new Date().toISOString()
    };
    savePredictions(predictions);

    showToast('Pronostic enregistré ✓', 'success');
    closeModal();
    renderMatches();
}

// ---- Calcul des points ----
function calculatePoints(prediction, match) {
    if (match.score1 === null || match.score2 === null) return 0;

    const predS1 = prediction.score1;
    const predS2 = prediction.score2;
    const realS1 = match.score1;
    const realS2 = match.score2;

    // Score exact → 5 pts
    if (predS1 === realS1 && predS2 === realS2) return POINTS.EXACT;

    // Bon écart (même différence de buts)
    if ((predS1 - predS2) === (realS1 - realS2)) return POINTS.DIFF;

    // Bon vainqueur (ou bon match nul)
    const predWinner = predS1 > predS2 ? 1 : (predS1 < predS2 ? 2 : 0);
    const realWinner = realS1 > realS2 ? 1 : (realS1 < realS2 ? 2 : 0);
    if (predWinner === realWinner) return POINTS.WINNER;

    return 0;
}

// ---- Résultats individuels ----
function updateResults() {
    const matches = getMatches();
    const predictions = getPredictions();
    const userPreds = predictions[currentUser] || {};

    let totalPoints = 0, exactCount = 0, diffCount = 0, winnerCount = 0;
    const resultItems = [];

    matches.forEach(match => {
        if (match.score1 === null) return;
        const pred = userPreds[match.id];
        if (!pred) return;

        const pts = calculatePoints(pred, match);
        totalPoints += pts;
        if (pts === POINTS.EXACT) exactCount++;
        else if (pts === POINTS.DIFF) diffCount++;
        else if (pts === POINTS.WINNER) winnerCount++;

        resultItems.push({ match, pred, pts });
    });

    document.getElementById('stat-points').textContent = totalPoints;
    document.getElementById('stat-exact').textContent = exactCount;
    document.getElementById('stat-diff').textContent = diffCount;
    document.getElementById('stat-winner').textContent = winnerCount;

    const container = document.getElementById('results-list');
    container.innerHTML = resultItems.map(({ match, pred, pts }) => {
        let badgeClass = 'badge-wrong', badgeText = 'Raté (0 pt)';
        if (pts === POINTS.EXACT) { badgeClass = 'badge-exact'; badgeText = 'Score exact (+5)'; }
        else if (pts === POINTS.DIFF) { badgeClass = 'badge-diff'; badgeText = 'Bon écart (+3)'; }
        else if (pts === POINTS.WINNER) { badgeClass = 'badge-winner'; badgeText = 'Bon vainqueur (+1)'; }

        return `
        <div class="match-card finished">
            <div class="match-header">
                <span class="match-phase">${match.phase}</span>
                <span class="prediction-badge ${badgeClass}">${badgeText}</span>
            </div>
            <div class="match-teams">
                <div class="team">${match.team1}</div>
                <div class="match-score">${match.score1} - ${match.score2}</div>
                <div class="team">${match.team2}</div>
            </div>
            <div class="match-prediction">
                <span>Mon prono : ${pred.score1} - ${pred.score2}</span>
            </div>
        </div>`;
    }).join('') || '<p class="empty-msg">Aucun résultat pour le moment. Les points apparaîtront quand les matchs seront terminés.</p>';
}

// ---- Classement général ----
function renderRanking() {
    const matches = getMatches();
    const predictions = getPredictions();
    const users = getUsers();
    const rankings = [];

    Object.keys(users).forEach(username => {
        const userPreds = predictions[username] || {};
        let totalPoints = 0, exactCount = 0, diffCount = 0, winnerCount = 0;

        matches.forEach(match => {
            if (match.score1 === null) return;
            const pred = userPreds[match.id];
            if (!pred) return;
            const pts = calculatePoints(pred, match);
            totalPoints += pts;
            if (pts === POINTS.EXACT) exactCount++;
            else if (pts === POINTS.DIFF) diffCount++;
            else if (pts === POINTS.WINNER) winnerCount++;
        });

        rankings.push({ username, points: totalPoints, exact: exactCount, diff: diffCount, winner: winnerCount });
    });

    rankings.sort((a, b) => b.points - a.points || b.exact - a.exact);

    const container = document.getElementById('ranking-list');
    container.innerHTML = rankings.map((r, i) => {
        const posClass = i === 0 ? 'gold' : (i === 1 ? 'silver' : (i === 2 ? 'bronze' : ''));
        const isMe = r.username === currentUser ? 'current-user' : '';
        const medal = i === 0 ? '🥇' : (i === 1 ? '🥈' : (i === 2 ? '🥉' : `${i + 1}`));
        return `
        <div class="ranking-item ${isMe}">
            <div class="rank-position ${posClass}">${medal}</div>
            <div class="rank-name">${r.username}${r.username === currentUser ? ' (moi)' : ''}</div>
            <div class="rank-stats">
                <span title="Scores exacts">🎯${r.exact}</span>
                <span title="Bons écarts">📐${r.diff}</span>
                <span title="Bons vainqueurs">✓${r.winner}</span>
            </div>
            <div class="rank-points">${r.points} pts</div>
        </div>`;
    }).join('') || '<p class="empty-msg">Aucun participant inscrit pour le moment</p>';
}

// ---- Traduction des noms d'équipes (API anglais → affichage français) ----
const TEAM_NAMES = {
    "Spain": "Espagne", "Saudi Arabia": "Arabie Saoudite",
    "France": "France", "Germany": "Allemagne", "Brazil": "Brésil",
    "Argentina": "Argentine", "England": "Angleterre", "Belgium": "Belgique",
    "Netherlands": "Pays-Bas", "Portugal": "Portugal", "Italy": "Italie",
    "United States": "États-Unis", "USA": "États-Unis", "Mexico": "Mexique",
    "Canada": "Canada", "Japan": "Japon", "South Korea": "Corée du Sud",
    "Korea Republic": "Corée du Sud", "Australia": "Australie",
    "Morocco": "Maroc", "Senegal": "Sénégal", "Nigeria": "Nigeria",
    "Cameroon": "Cameroun", "Ghana": "Ghana", "Egypt": "Égypte",
    "Tunisia": "Tunisie", "Algeria": "Algérie", "Ivory Coast": "Côte d'Ivoire",
    "Côte d'Ivoire": "Côte d'Ivoire",
    "Croatia": "Croatie", "Serbia": "Serbie", "Switzerland": "Suisse",
    "Denmark": "Danemark", "Sweden": "Suède", "Norway": "Norvège",
    "Poland": "Pologne", "Ukraine": "Ukraine", "Czech Republic": "Tchéquie",
    "Austria": "Autriche", "Hungary": "Hongrie", "Romania": "Roumanie",
    "Greece": "Grèce", "Turkey": "Turquie", "Scotland": "Écosse",
    "Wales": "Pays de Galles", "Ireland": "Irlande",
    "Colombia": "Colombie", "Chile": "Chili", "Peru": "Pérou",
    "Uruguay": "Uruguay", "Ecuador": "Équateur", "Paraguay": "Paraguay",
    "Venezuela": "Venezuela", "Bolivia": "Bolivie",
    "Costa Rica": "Costa Rica", "Panama": "Panama", "Honduras": "Honduras",
    "Jamaica": "Jamaïque", "Trinidad and Tobago": "Trinité-et-Tobago",
    "Iran": "Iran", "Qatar": "Qatar", "China PR": "Chine",
    "India": "Inde", "Indonesia": "Indonésie",
    "New Zealand": "Nouvelle-Zélande", "Cape Verde": "Cap-Vert",
    "Curaçao": "Curaçao", "Mali": "Mali", "Congo DR": "RD Congo",
    "South Africa": "Afrique du Sud", "Bahrain": "Bahreïn",
    "Uzbekistan": "Ouzbékistan", "Iraq": "Irak", "Jordan": "Jordanie",
    "Palestine": "Palestine", "Oman": "Oman",
    "Slovenia": "Slovénie", "Slovakia": "Slovaquie",
    "Albania": "Albanie", "Georgia": "Géorgie",
    "Iceland": "Islande", "Finland": "Finlande",
    "Russia": "Russie", "Israel": "Israël"
};

// Convertir nom anglais API → français
function translateTeam(englishName) {
    return TEAM_NAMES[englishName] || englishName;
}

// Trouver le nom anglais à partir du français (pour matching API)
function findEnglishName(frenchName) {
    const entry = Object.entries(TEAM_NAMES).find(([en, fr]) => fr === frenchName);
    return entry ? entry[0] : frenchName;
}

// ---- Mise à jour automatique des résultats ----
async function fetchLiveResults() {
    if (!API_KEY) {
        console.log('Pas de clé API - mode manuel. Utilisez enterScore() dans la console.');
        return;
    }
    try {
        const response = await fetch(API_URL, {
            headers: { 'X-Auth-Token': API_KEY }
        });
        if (!response.ok) {
            console.warn('API réponse:', response.status);
            return;
        }
        const data = await response.json();
        const matches = getMatches();
        let updated = false;

        data.matches.forEach(apiMatch => {
            if (apiMatch.status === 'FINISHED') {
                const apiHome = apiMatch.homeTeam.name || apiMatch.homeTeam.shortName || '';
                const apiAway = apiMatch.awayTeam.name || apiMatch.awayTeam.shortName || '';
                // Traduire en français pour comparer avec nos matchs
                const apiHomeFr = translateTeam(apiHome).toLowerCase();
                const apiAwayFr = translateTeam(apiAway).toLowerCase();

                const localMatch = matches.find(m => {
                    if (m.score1 !== null) return false;
                    const t1 = m.team1.toLowerCase();
                    const t2 = m.team2.toLowerCase();
                    // Match direct en français
                    const homeMatch = t1 === apiHomeFr || t1.includes(apiHomeFr) || apiHomeFr.includes(t1);
                    const awayMatch = t2 === apiAwayFr || t2.includes(apiAwayFr) || apiAwayFr.includes(t2);
                    // Aussi tester en anglais au cas où
                    const hEn = apiHome.toLowerCase();
                    const aEn = apiAway.toLowerCase();
                    const homeMatchEn = t1.includes(hEn) || hEn.includes(t1);
                    const awayMatchEn = t2.includes(aEn) || aEn.includes(t2);
                    return (homeMatch && awayMatch) || (homeMatchEn && awayMatchEn);
                });

                if (localMatch) {
                    localMatch.score1 = apiMatch.score.fullTime.home;
                    localMatch.score2 = apiMatch.score.fullTime.away;
                    updated = true;
                    console.log(`✓ Score mis à jour : ${localMatch.team1} ${localMatch.score1} - ${localMatch.score2} ${localMatch.team2}`);
                }
            }
        });

        if (updated) {
            saveMatches(matches);
            if (currentUser) {
                renderMatches();
                updateResults();
                renderRanking();
            }
            showToast('Résultats mis à jour !', 'success');
        }
    } catch (err) {
        console.error('Erreur récupération résultats:', err);
    }
}

// Rafraîchir toutes les 5 minutes
setInterval(fetchLiveResults, 5 * 60 * 1000);
// Synchroniser depuis le cloud toutes les 2 minutes
setInterval(async () => {
    await syncFromCloud();
    if (currentUser) {
        renderMatches();
        updateResults();
        renderRanking();
    }
}, 2 * 60 * 1000);

// ---- Utilitaires ----
function formatDate(date) {
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
    });
}

function showToast(message, type = '') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ---- QR Code (l'URL de l'appli déployée) ----
function generateQRCode() {
    const qrContainer = document.getElementById('qr-code');
    // Utiliser l'URL d'origine sans /index.html ni paramètres
    let url = window.location.origin + window.location.pathname;
    // Nettoyer : enlever index.html si présent
    url = url.replace(/\/index\.html$/, '/');
    // S'assurer que ça finit par /
    if (!url.endsWith('/')) url += '/';
    // API gratuite pour générer le QR code
    qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}" alt="QR Code d'accès" width="150" height="150">`;
}

// ---- Fonctions Admin (console du navigateur) ----

// Entrer le score d'un match : enterScore(1, 2, 1)
window.enterScore = function(matchId, score1, score2) {
    const matches = getMatches();
    const match = matches.find(m => m.id === matchId);
    if (!match) { console.error('Match non trouvé'); return; }
    match.score1 = score1;
    match.score2 = score2;
    saveMatches(matches);
    console.log(`✓ ${match.team1} ${score1} - ${score2} ${match.team2}`);
    if (currentUser) { renderMatches(); updateResults(); renderRanking(); }
};

// Mettre à jour les noms d'équipes : updateTeam(1, "France", "Allemagne")
window.updateTeam = function(matchId, team1, team2) {
    const matches = getMatches();
    const match = matches.find(m => m.id === matchId);
    if (!match) { console.error('Match non trouvé'); return; }
    if (team1) match.team1 = team1;
    if (team2) match.team2 = team2;
    saveMatches(matches);
    console.log(`✓ Match ${matchId} : ${match.team1} vs ${match.team2}`);
    if (currentUser) renderMatches();
};

// Voir tous les matchs : listMatches()
window.listMatches = function() {
    const matches = getMatches();
    console.table(matches.map(m => ({
        id: m.id, phase: m.phase,
        match: `${m.team1} vs ${m.team2}`,
        score: m.score1 !== null ? `${m.score1}-${m.score2}` : '-',
        date: new Date(m.date).toLocaleDateString('fr-FR')
    })));
};

// Réinitialiser les données
window.resetAll = function() {
    if (confirm('Tout supprimer ? (utilisateurs, pronos, scores)')) {
        localStorage.removeItem('cdm2026_users');
        localStorage.removeItem('cdm2026_matches');
        localStorage.removeItem('cdm2026_predictions');
        localStorage.removeItem('cdm2026_currentUser');
        location.reload();
    }
};

window.resetMatches = function() {
    localStorage.removeItem('cdm2026_matches');
    console.log('Matchs réinitialisés');
    if (currentUser) renderMatches();
};

// ---- Initialisation ----
document.addEventListener('DOMContentLoaded', async () => {
    // QR Code
    generateQRCode();

    // Initialiser matchs en local d'abord (garantit qu'ils existent)
    getMatches();

    // Synchro cloud au démarrage
    await syncFromCloud();

    // Pousser les matchs vers le cloud s'ils n'y sont pas encore
    const cloudData = await cloudGet();
    if (!cloudData || !cloudData.matches || cloudData.matches.length === 0) {
        await syncToCloud();
    }

    // Session persistante
    const savedUser = localStorage.getItem('cdm2026_currentUser');
    if (savedUser) {
        const users = getUsers();
        if (users[savedUser]) {
            currentUser = savedUser;
            showApp();
        }
    }

    // Résultats en direct
    fetchLiveResults();

    // Fermer modal clic extérieur
    document.getElementById('prediction-modal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('prediction-modal')) closeModal();
    });

    // Entrée = valider
    document.getElementById('login-password').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') login();
    });
    document.getElementById('reg-password2').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') register();
    });
});
