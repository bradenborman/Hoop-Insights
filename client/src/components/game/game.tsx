import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const Game: React.FC = () => {
    const { gameId } = useParams<{ gameId: string }>();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.phrase) {
            alert(`Phrase: ${location.state.phrase}`);
        }
    }, [location]);

    return (
        <div>
            <h1>Game {gameId}</h1>
        </div>
    );
};

export default Game;