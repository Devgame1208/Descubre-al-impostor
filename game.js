// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDCjW-hV99_kxEhdxJ_9_3R5NfZsW4WAq0",
  authDomain: "descubre-al-impostor.firebaseapp.com",
  databaseURL: "https://descubre-al-impostor-default-rtdb.firebaseio.com",
  projectId: "descubre-al-impostor",
  storageBucket: "descubre-al-impostor.firebasestorage.app",
  messagingSenderId: "178562891534",
  appId: "1:178562891534:web:55a777565884e4d459e15f",
  measurementId: "G-SF35RSYW6V"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Iconos SVG (Lucide Icons simplificados)
const Icons = {
  Users: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Crown: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12l10-9 10 9"/><path d="M2 12v10h20V12"/></svg>,
  Play: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Home: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Copy: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  Check: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
  Bot: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>,
  Vote: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  Mic: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
  AlertCircle: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Clock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
};

const WORDS_DATABASE = {
  animales: ['perro', 'gato', 'elefante', 'león', 'tigre', 'panda', 'koala', 'delfín', 'ballena', 'águila'],
  comida: ['pizza', 'hamburguesa', 'sushi', 'tacos', 'pasta', 'helado', 'ensalada', 'sandwich', 'paella', 'ramen'],
  objetos: ['teléfono', 'computadora', 'reloj', 'llave', 'libro', 'guitarra', 'pelota', 'silla', 'lámpara', 'teclado'],
  lugares: ['playa', 'montaña', 'ciudad', 'bosque', 'desierto', 'museo', 'parque', 'restaurante', 'aeropuerto', 'hospital'],
  colores: ['rojo', 'azul', 'verde', 'amarillo', 'morado', 'naranja', 'rosa', 'negro', 'blanco', 'gris'],
  musica: ['guitarra', 'piano', 'batería', 'violín', 'trompeta', 'flauta', 'saxofón', 'arpa', 'bajo', 'micrófono'],
  juegos: ['minecraft', 'fortnite', 'valorant', 'league of legends', 'counter strike', 'gta', 'zelda', 'pokemon', 'mario', 'sonic'],
  variada: []
};

WORDS_DATABASE.variada = Object.values(WORDS_DATABASE).flat();

const CATEGORY_HINTS = {
  animales: 'Animal',
  comida: 'Comida',
  objetos: 'Objeto',
  lugares: 'Lugar',
  colores: 'Color',
  musica: 'Música/Instrumento',
  juegos: 'Videojuego',
  variada: 'Palabra variada'
};

const BOT_NAMES = ['Alex', 'Sam', 'Taylor', 'Jordan', 'Riley'];

function ImpostorGame() {
  const [screen, setScreen] = React.useState('home');
  const [roomCode, setRoomCode] = React.useState('');
  const [playerName, setPlayerName] = React.useState('');
  const [currentPlayerId, setCurrentPlayerId] = React.useState(null);
  const [roomData, setRoomData] = React.useState(null);
  const [copied, setCopied] = React.useState(false);
  const [showInstructions, setShowInstructions] = React.useState(false);
  const [clueInput, setClueInput] = React.useState('');

  React.useEffect(() => {
    if (roomCode) {
      const roomRef = database.ref(`rooms/${roomCode}`);
      roomRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setRoomData(data);
        }
      });

      return () => roomRef.off();
    }
  }, [roomCode]);

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const createRoom = async () => {
    if (!playerName.trim()) return;
    
    const code = generateRoomCode();
    const playerId = Date.now().toString();
    
    const initialRoomData = {
      host: playerId,
      players: {
        [playerId]: {
          id: playerId,
          name: playerName,
          isHost: true,
          isBot: false,
          joinedAt: Date.now()
        }
      },
      config: {
        category: '',
        impostorCount: 1
      },
      game: {
        started: false,
        phase: 'lobby'
      },
      createdAt: Date.now()
    };

    await database.ref(`rooms/${code}`).set(initialRoomData);
    
    setRoomCode(code);
    setCurrentPlayerId(playerId);
    setScreen('lobby');
  };

  const joinRoom = async () => {
    if (!playerName.trim() || !roomCode.trim()) return;
    
    const roomRef = database.ref(`rooms/${roomCode}`);
    const snapshot = await roomRef.once('value');
    
    const roomExists = snapshot.val();
    if (!roomExists) {
      alert('Sala no encontrada');
      return;
    }

    const playerId = Date.now().toString();
    
    await database.ref(`rooms/${roomCode}/players/${playerId}`).set({
      id: playerId,
      name: playerName,
      isHost: false,
      isBot: false,
      joinedAt: Date.now()
    });

    setCurrentPlayerId(playerId);
    setScreen('lobby');
  };

  const updateConfig = async (updates) => {
    await database.ref(`rooms/${roomCode}/config`).update(updates);
  };

  const addBot = async () => {
    const players = roomData?.players || {};
    const usedNames = new Set(Object.values(players).map(p => p.name));
    
    let botName;
    do {
      botName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
    } while (usedNames.has(`${botName} (Bot)`));

    const botId = `bot_${Date.now()}`;
    await database.ref(`rooms/${roomCode}/players/${botId}`).set({
      id: botId,
      name: `${botName} (Bot)`,
      isHost: false,
      isBot: true,
      joinedAt: Date.now()
    });
  };

  const startGame = async () => {
    const players = roomData?.players || {};
    const playersList = Object.values(players);
    
    if (playersList.length < 3) return;

    const category = roomData?.config?.category;
    if (!category) return;

    const categoryWords = WORDS_DATABASE[category];
    const word = categoryWords[Math.floor(Math.random() * categoryWords.length)];
    
    const shuffled = [...playersList].sort(() => Math.random() - 0.5);
    const impostorCount = roomData?.config?.impostorCount || 1;
    const impostorIds = shuffled.slice(0, impostorCount).map(p => p.id);

    await database.ref(`rooms/${roomCode}/game`).update({
      started: true,
      phase: 'playing',
      word: word,
      impostorIds: impostorIds,
      currentTurnIndex: 0,
      totalTurns: playersList.length * 3,
      responses: {},
      votes: {},
      startedAt: Date.now()
    });
  };

  const submitClue = async (clue) => {
    if (!clue.trim()) return;

    const players = Object.values(roomData?.players || {});
    const currentIndex = roomData?.game?.currentTurnIndex || 0;
    const currentPlayer = players[currentIndex % players.length];
    const currentRound = Math.floor(currentIndex / players.length) + 1;

    await database.ref(`rooms/${roomCode}/game/responses/${currentPlayer.id}/${currentRound}`).set({
      round: currentRound,
      clue: clue,
      timestamp: Date.now()
    });

    const nextIndex = currentIndex + 1;
    const totalTurns = roomData?.game?.totalTurns || 0;

    if (nextIndex >= totalTurns) {
      await database.ref(`rooms/${roomCode}/game`).update({
        phase: 'voting',
        currentTurnIndex: nextIndex
      });
    } else {
      await database.ref(`rooms/${roomCode}/game`).update({
        currentTurnIndex: nextIndex
      });
    }
  };

  const submitVote = async (votedPlayerId) => {
    await database.ref(`rooms/${roomCode}/game/votes/${currentPlayerId}`).set(votedPlayerId);
  };

  const finishVoting = async () => {
    const votes = roomData?.game?.votes || {};
    const impostorIds = roomData?.game?.impostorIds || [];

    const voteCounts = {};
    Object.values(votes).forEach(vote => {
      voteCounts[vote] = (voteCounts[vote] || 0) + 1;
    });

    const sortedVotes = Object.entries(voteCounts).sort((a, b) => b[1] - a[1]);
    const mostVoted = sortedVotes[0];
    
    const playersWon = mostVoted && impostorIds.includes(mostVoted[0]);

    await database.ref(`rooms/${roomCode}/game`).update({
      phase: 'finished',
      winner: playersWon ? 'players' : 'impostors'
    });
  };

  const resetGame = async () => {
    await database.ref(`rooms/${roomCode}/game`).update({
      started: false,
      phase: 'lobby',
      word: null,
      impostorIds: null,
      currentTurnIndex: 0,
      responses: {},
      votes: {},
      winner: null
    });
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const goHome = async () => {
    if (roomCode && currentPlayerId) {
      await database.ref(`rooms/${roomCode}/players/${currentPlayerId}`).remove();
    }
    setScreen('home');
    setRoomCode('');
    setPlayerName('');
    setCurrentPlayerId(null);
    setRoomData(null);
  };

  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">ImpostorWho</h1>
            <p className="text-gray-600">¿Quién es el impostor?</p>
          </div>

          {showInstructions ? (
            <div className="mb-6 p-4 bg-blue-50 rounded-xl text-sm space-y-2">
              <h3 className="font-bold text-blue-900 mb-2">📋 Cómo Jugar:</h3>
              <p><strong>1.</strong> Un jugador crea una sala y comparte el código</p>
              <p><strong>2.</strong> Todos se unen con el código de sala</p>
              <p><strong>3.</strong> El host elige categoría e inicia el juego</p>
              <p><strong>4.</strong> Todos reciben una palabra EXCEPTO el impostor</p>
              <p><strong>5.</strong> Por turnos dan pistas sobre su palabra</p>
              <p><strong>6.</strong> Al final, votan quién es el impostor</p>
              <p className="text-red-600 font-semibold mt-3">🎯 Objetivo: Los jugadores deben encontrar al impostor</p>
              <button
                onClick={() => setShowInstructions(false)}
                className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg"
              >
                Entendido
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowInstructions(true)}
              className="w-full mb-4 bg-blue-100 text-blue-700 py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <Icons.AlertCircle />
              ¿Cómo jugar?
            </button>
          )}
          
          <input
            type="text"
            placeholder="Tu nombre"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl mb-4 focus:border-purple-500 focus:outline-none"
          />
          
          <button
            onClick={createRoom}
            disabled={!playerName.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl mb-3 transition"
          >
            Crear Sala
          </button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">o</span>
            </div>
          </div>
          
          <input
            type="text"
            placeholder="Código de sala"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl mb-4 focus:border-pink-500 focus:outline-none"
          />
          
          <button
            onClick={joinRoom}
            disabled={!playerName.trim() || !roomCode.trim()}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition"
          >
            Unirse a Sala
          </button>
        </div>
      </div>
    );
  }

  const players = Object.values(roomData?.players || {});
  const isHost = roomData?.host === currentPlayerId;
  const gameStarted = roomData?.game?.started;
  const gamePhase = roomData?.game?.phase;

  if (screen === 'lobby' && !gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Sala de Espera</h2>
              <button onClick={goHome} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Icons.Home />
              </button>
            </div>
            
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Código de Sala</p>
                <p className="text-2xl font-bold text-purple-600">{roomCode}</p>
              </div>
              <button onClick={copyRoomCode} className="p-3 bg-white rounded-lg hover:bg-gray-50 transition">
                {copied ? <Icons.Check /> : <Icons.Copy />}
              </button>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-6 flex items-center gap-2">
              <Icons.Mic />
              <p className="text-sm text-gray-700">
                <strong>Tip:</strong> Usa Discord o llamada para hablar mientras juegan. ¡El tono de voz revela mucho!
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Icons.Users />
                Jugadores ({players.length}/10)
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {players.map(player => (
                  <div key={player.id} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {player.isHost && <Icons.Crown />}
                      {player.isBot && <Icons.Bot />}
                      <span className={`font-medium ${player.isBot ? 'text-gray-600' : ''}`}>
                        {player.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {isHost && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Categoría</label>
                  <select
                    value={roomData?.config?.category || ''}
                    onChange={(e) => updateConfig({ category: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                  >
                    <option value="">-- Selecciona --</option>
                    {Object.keys(WORDS_DATABASE).map(cat => (
                      <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Número de Impostores: {roomData?.config?.impostorCount || 1}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max={Math.min(3, Math.floor(players.length / 2))}
                    value={roomData?.config?.impostorCount || 1}
                    onChange={(e) => updateConfig({ impostorCount: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
                
                <button
                  onClick={startGame}
                  disabled={players.length < 3 || !roomData?.config?.category}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <Icons.Play />
                  Iniciar Juego
                </button>
                
                <button
                  onClick={addBot}
                  disabled={players.length >= 10}
                  className="w-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Icons.Bot />
                  Agregar Bot
                </button>
              </div>
            )}
            
            {!isHost && (
              <div className="text-center text-gray-600">
                Esperando a que el host inicie el juego...
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameStarted && gamePhase === 'playing') {
    const currentIndex = roomData?.game?.currentTurnIndex || 0;
    const currentPlayerIndex = currentIndex % players.length;
    const currentPlayer = players[currentPlayerIndex];
    const isMyTurn = currentPlayer?.id === currentPlayerId;
    const currentRound = Math.floor(currentIndex / players.length) + 1;
    const impostorIds = roomData?.game?.impostorIds || [];
    const isImpostor = impostorIds.includes(currentPlayerId);
    const word = roomData?.game?.word;
    const myWord = isImpostor ? CATEGORY_HINTS[roomData?.config?.category] : word;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 rounded-full px-4 py-2">
                  <span className="font-bold text-purple-600">Ronda {currentRound}/3</span>
                </div>
                <div className="bg-green-100 rounded-full px-4 py-2">
                  <span className="font-bold text-green-600">Turno {currentIndex + 1}/{roomData?.game?.totalTurns}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Tu palabra/pista:</p>
              <p className="text-3xl font-bold text-orange-600">{myWord}</p>
              {isImpostor && (
                <p className="text-sm text-red-600 mt-2">¡Eres el impostor! Solo tienes la categoría.</p>
              )}
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <p className="text-center font-semibold text-lg">
                Turno de: <span className="text-blue-600">{currentPlayer?.name}</span>
              </p>
            </div>
            
            {isMyTurn ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={clueInput}
                  onChange={(e) => setClueInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && clueInput.trim()) {
                      submitClue(clueInput);
                      setClueInput('');
                    }
                  }}
                  placeholder="Escribe tu pista..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
                />
                <button
                  onClick={() => {
                    submitClue(clueInput);
                    setClueInput('');
                  }}
                  disabled={!clueInput.trim()}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition"
                >
                  Enviar Pista
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-600 py-6">
                Esperando a que {currentPlayer?.name} dé su pista...
              </div>
            )}
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Pistas de la ronda {currentRound}:</h3>
              <div className="space-y-2">
                {players.map(player => {
                  const responses = roomData?.game?.responses?.[player.id] || {};
                  const roundResponse = responses[currentRound];
                  return (
                    <div key={player.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <span className="font-medium">{player.name}</span>
                      <span className="text-gray-600">
                        {roundResponse?.clue || '...'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gamePhase === 'voting') {
    const votes = roomData?.game?.votes || {};
    const hasVoted = votes[currentPlayerId];
    const allVoted = Object.keys(votes).length === players.length;
    
    const voteCount = {};
    Object.values(votes).forEach(votedId => {
      voteCount[votedId] = (voteCount[votedId] || 0) + 1;
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-500 to-pink-500 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
              <Icons.Vote />
              Fase de Votación
            </h2>
            
            <p className="text-center text-gray-600 mb-6">
              ¡Es hora de votar! ¿Quién crees que es el impostor?
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {players.map(player => (
                <button
                  key={player.id}
                  onClick={() => submitVote(player.id)}
                  disabled={hasVoted || player.id === currentPlayerId}
                  className={`p-4 rounded-xl font-semibold transition ${
                    votes[currentPlayerId] === player.id
                      ? 'bg-red-500 text-white'
                      : player.id === currentPlayerId
                      ? 'bg-gray-200 text-gray-400'
                      : 'bg-gray-100 hover:bg-red-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{player.name}</span>
                    <span className="text-sm font-bold ml-2">
                      {voteCount[player.id] ? `(${voteCount[player.id]})` : ''}
                    </span>
                  </div>
                  {votes[currentPlayerId] === player.id && <span className="text-xs">✓ Votado</span>}
                </button>
              ))}
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <p className="text-center font-medium">
                Votos: {Object.keys(votes).length} / {players.length}
              </p>
            </div>
            
            {isHost && allVoted && (
              <button
                onClick={finishVoting}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition"
              >
                Revelar Resultado
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gamePhase === 'finished') {
    const impostorIds = roomData?.game?.impostorIds || [];
    const winner = roomData?.game?.winner;
    const word = roomData?.game?.word;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 via-blue-500 to-purple-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
          <h2 className="text-4xl font-bold text-center mb-6">
            {winner === 'players' ? '🎉 ¡Ganaron los Jugadores!' : '😈 ¡Ganaron los Impostores!'}
          </h2>
          
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 mb-6">
            <p className="text-lg mb-2">
              <strong>La palabra era:</strong> <span className="text-2xl font-bold text-orange-600">{word}</span>
            </p>
            <p className="text-lg">
              <strong>El/Los impostor(es):</strong>
              {impostorIds.map((id, idx) => {
                const impostor = players.find(p => p.id === id);
                return (
                  <span key={id} className="text-xl font-semibold text-red-600">
                    {idx > 0 && ', '}
                    {' '}{impostor?.name}
                  </span>
                );
              })}
            </p>
          </div>
          
          <div className="mb-6 max-h-96 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-3">Historial de pistas:</h3>
            {players.map(player => {
              const responses = roomData?.game?.responses?.[player.id] || {};
              const isImpostor = impostorIds.includes(player.id);
              return (
                <div key={player.id} className="mb-4 bg-gray-50 rounded-lg p-4">
                  <p className="font-semibold mb-2 flex items-center gap-2">
                    {player.name}
                    {isImpostor && <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">IMPOSTOR</span>}
                  </p>
                  <div className="space-y-1">
                    {Object.entries(responses).map(([round, data]) => (
                      <p key={round} className="text-sm text-gray-700">
                        Ronda {round}: <span className="font-medium">{data.clue}</span>
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          
          {isHost && (
            <div className="flex gap-3">
              <button
                onClick={resetGame}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition"
              >
                Nueva Partida
              </button>
              <button
                onClick={goHome}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition"
              >
                Salir
              </button>
            </div>
          )}
          
          {!isHost && (
            <div className="text-center text-gray-600">
              Esperando a que el host inicie una nueva partida...
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}

// Renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ImpostorGame />);