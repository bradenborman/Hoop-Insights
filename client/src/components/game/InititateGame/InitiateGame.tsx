import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InitiateGame: React.FC = () => {
    const [awayTeamName, setAwayTeamName] = useState<string>('');
    const navigate = useNavigate();

    const handleAwayTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAwayTeamName(e.target.value);
    };

    const handleStartGame = () => {
        if (awayTeamName.trim()) {
            const gameId = 1;  // Example gameId; you can dynamically generate this as needed
            navigate(`/game/${gameId}`, {
                state: { phrase: 'lemon' }  // Passing the state with the "phrase" property
            });
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
                    autoComplete='off'
                />
            </div>
            <button onClick={handleStartGame} className="start-game-btn">
                Start Game
            </button>
        </div>
    );
};

export default InitiateGame;
