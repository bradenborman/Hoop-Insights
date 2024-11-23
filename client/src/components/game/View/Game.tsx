import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Define the Player interface
interface Player {
    id: number;
    name: string;
}

const Game: React.FC = () => {
    const { gameId } = useParams<{ gameId: string }>();
    const [players, setPlayers] = useState<Player[]>([]);
    const [activePlayers, setActivePlayers] = useState<Player[]>([]);
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
        const fetchPlayers = async () => {
            try {
                const response = await axios.get('/api/away-team', {
                    params: { gameId: gameId }
                });
                setAwayTeamName(response.data);
            } catch (error) {
                console.error('Error fetching away team name:', error);
            }
        };

        fetchPlayers();
    }, []);

    const togglePlayer = (player: Player) => {
        if (activePlayers.some((p) => p.id === player.id)) {
            setActivePlayers((prev) => prev.filter((p) => p.id !== player.id));
        } else if (activePlayers.length < 5) {
            setActivePlayers((prev) => [...prev, player]);
        }
    };

    return (
        <div className="game-container">
            <header className="game-header">
                <h1>+/- Hoop Insights for Mizzou Basketball VS {awayTeamName || "Loading"}</h1>
            </header>

            <div className="game-layout">
                {/* Player selection card */}
                <div className="players-card">
                    <h2>Currently Playing</h2>
                    <ul className="players-list">
                        {players.map((player) => (
                            <li
                                key={player.id}
                                className={`player-item ${activePlayers.some((p) => p.id === player.id)
                                    ? 'active'
                                    : ''
                                    }`}
                                onClick={() => togglePlayer(player)}
                            >
                                {player.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="control-panel">
                    {activePlayers.length === 5 ? (
                        <button className="proceed-btn">Proceed to Control Panel</button>
                    ) : (
                        <p className="selection-info">
                            Select {5 - activePlayers.length} more players to continue.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Game;
