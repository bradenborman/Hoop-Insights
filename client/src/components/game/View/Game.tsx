import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Player {
    id: number;
    name: string;
}

interface Lineup {
    id: number; // Unique identifier for the lineup
    players: Player[]; // Array of players in the lineup
    plusMinus: number; // Plus-minus score for the lineup
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

    return (
        <div className="game-container">
            <div
                className={`control-panel ${activePlayers.length === 5 ? 'visible' : ''}`}
            >
                <div className="control-panel-group">
                    <div className="team-group">
                        <button className="control-btn">1</button>
                        <button className="control-btn">2</button>
                        <button className="control-btn">3</button>
                        <span className="group-title">Mizzou</span>
                    </div>
                    <div className="team-group">
                        <button className="control-btn">1</button>
                        <button className="control-btn">2</button>
                        <button className="control-btn">3</button>
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
                    {/* <div className="lineup">
                        <div className="players">J Crews, T Burns, M Allen, M Mitchell, A Shaw</div>
                        <div className="plus-minus positive">(12)</div>
                    </div>
                    <div className="lineup">
                        <div className="players">A Smith, B Davis, C Hill, D Young, E Lee</div>
                        <div className="plus-minus negative">(-5)</div>
                    </div> */}
                </div>
            </div>

        </div>
    );
};

export default Game;
