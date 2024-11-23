import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from '../components/Game/View/Game';
import InitiateGame from '../components/Game/InititateGame/InitiateGame';

import './hoopinsights.scss';

const HoopInsights: React.FC = () => {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<InitiateGame />} />
                    <Route path="/game/:gameId" element={<Game />} />
                </Routes>
        </Router>
    );
};

export default HoopInsights;
