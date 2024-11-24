import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Player {
    id: number;
    name: string;
}

interface Lineup {
    playersOnCourt: Player[]; // Array of players currently on the court
    totalPlusMinus: number; // Plus-minus score for the lineup
    totalTimesScored: number; // Total times this lineup has scored
}

const Game: React.FC = () => {
    const { gameId } = useParams<{ gameId: string }>();
    const [players, setPlayers] = useState<Player[]>([]);
    const [activePlayers, setActivePlayers] = useState<Player[]>([]);
    const [lineups, setLineups] = useState<Lineup[]>([]); // Lineups returned from API
    const [awayTeamName, setAwayTeamName] = useState<string>();

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get('/api/players');
                setPlayers(response.data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        fetchPlayers();
    }, []);

    useEffect(() => {
        const fetchExsitingLinups = async () => {
            try {
                const response = await axios.get(`/api/game/${gameId}/lineups`);
                setLineups(response.data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        fetchExsitingLinups();
    }, []);

    useEffect(() => {
        const fetchAwayTeam = async () => {
            try {
                const response = await axios.get('/api/away-team', {
                    params: { gameId: gameId }
                });
                setAwayTeamName(response.data);
            } catch (error) {
                console.error('Error fetching away team name:', error);
            }
        };

        fetchAwayTeam();
    }, [gameId]);

    const togglePlayer = (player: Player) => {
        if (activePlayers.some((p) => p.id === player.id)) {
            setActivePlayers((prev) => prev.filter((p) => p.id !== player.id));
        } else if (activePlayers.length < 5) {
            setActivePlayers((prev) => [...prev, player]);
        }
    };

    const handleScore = async (points: number, isOurTeam: boolean) => {
        if (activePlayers.length !== 5) {
            alert("Exactly 5 players must be active to score.");
            return;
        }

        const playerIds = activePlayers.map((player) => player.id);
        try {
            const response = await axios.post('/api/game/score', null, {
                params: {
                    gameId: gameId,
                    playerIds: playerIds.join(','), // Join IDs as a comma-separated string
                    points: points,
                    isOurTeam: isOurTeam
                }
            });

            setLineups(response.data); // Overwrite the lineups state with fresh data
        } catch (error) {
            console.error('Error updating score:', error);
        }
    };

    return (
        <div className="game-container">
            <div
                className={`control-panel ${activePlayers.length === 5 ? 'visible' : ''}`}
            >
                <div className="control-panel-group">
                    <div className="team-group">
                        <button className="control-btn" onClick={() => handleScore(1, true)}>1</button>
                        <button className="control-btn" onClick={() => handleScore(2, true)}>2</button>
                        <button className="control-btn" onClick={() => handleScore(3, true)}>3</button>
                        <span className="group-title">Mizzou</span>
                    </div>
                    <div className="team-group">
                        <button className="control-btn" onClick={() => handleScore(1, false)}>1</button>
                        <button className="control-btn" onClick={() => handleScore(2, false)}>2</button>
                        <button className="control-btn" onClick={() => handleScore(3, false)}>3</button>
                        <span className="group-title">{awayTeamName || 'Away Team'}</span>
                    </div>
                </div>
            </div>

            <header className="game-header">
                <h1>
                    +/- Hoop Insights for Mizzou Basketball VS{' '}
                    {awayTeamName || 'Loading'}
                </h1>
            </header>

            <div className="game-layout">
                <div className="players-card">
                    <h2>Currently Playing</h2>
                    <ul className="players-list">
                        {players.map((player) => (
                            <li
                                key={player.id}
                                className={`player-item ${activePlayers.some((p) => p.id === player.id) ? 'active' : ''
                                    }`}
                                onClick={() => togglePlayer(player)}
                            >
                                {player.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lineup-stats">
                    {lineups.map((lineup, index) => (
                        <div key={index} className="lineup">
                            <div className="players">
                                {lineup.playersOnCourt.map((player) => (
                                    <span key={player.name} className="player-name">
                                        {player.name}
                                    </span>
                                ))}
                            </div>
                            <div className={`plus-minus ${lineup.totalPlusMinus >= 0 ? 'positive' : 'negative'}`}>
                                ({lineup.totalPlusMinus})
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Game;
