import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InitiateGame: React.FC = () => {
    const [awayTeamName, setAwayTeamName] = useState<string>('');
    const navigate = useNavigate();

    const handleAwayTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAwayTeamName(e.target.value);
    };

    const handleStartGame = async () => {
        if (awayTeamName.trim()) {
            try {
                const response = await axios.post('/api/game', null, {
                    params: { awayTeam: awayTeamName }
                });

                const gameId = response.data.id;

                navigate(`/game/${gameId}`, {
                    state: { phrase: 'lemon' }
                });
            } catch (error) {
                console.error('Error starting the game:', error);
            }
        }
    };

    return (
        <div className="initiate-game">
            <div className="form-group">
                <label htmlFor="awayTeam">Away Team Name</label>
                <input
                    type="text"
                    id="awayTeam"
                    value={awayTeamName}
                    onChange={handleAwayTeamChange}
                    placeholder="Enter away team name"
                    autoComplete="off"
                />
            </div>
            <button onClick={handleStartGame} className="start-game-btn">
                Start Game
            </button>
        </div>
    );
};

export default InitiateGame;
