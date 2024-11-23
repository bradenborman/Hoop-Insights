-- Create table for Game
CREATE TABLE IF NOT EXISTS game (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_played DATE NOT NULL,
    away_team VARCHAR(255) NOT NULL
);

-- Create table for PointsScored (to track scoring events and player lineups)
CREATE TABLE IF NOT EXISTS points_scored (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    players_on_court VARCHAR(255) NOT NULL,  -- Store sorted player IDs as comma-separated string
    result INT NOT NULL,                     -- The points scored or plus-minus (+/-)
    game_id BIGINT NOT NULL,                 -- Foreign key to game table
    FOREIGN KEY (game_id) REFERENCES game(id)
);

CREATE INDEX IF NOT EXISTS idx_game_id ON points_scored(game_id);
CREATE INDEX IF NOT EXISTS idx_players_on_court ON points_scored(players_on_court);