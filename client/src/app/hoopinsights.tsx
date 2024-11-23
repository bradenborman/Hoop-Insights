import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Game from '../components/Game/Game';
import InitiateGame from '../components/Game/InititateGame/InitiateGame';

import './hoopinsights.scss';

const HoopInsights: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<InitiateGame />} />
                    <Route path="/game/:gameId" element={<Game />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default HoopInsights;
