-- Insert a game record with a default date and "Team A"
--INSERT INTO game (date_played, away_team)
--VALUES ('2024-11-22', 'Team A');
--
---- Insert 10 point-scored records with various player combinations and points
---- Format for players_on_court is sorted, i.e., "1,2,3,4,5" and result is the points scored or negative.
--
---- Lineup 1: Players 1, 2, 3, 4, 5 with +2 points
--INSERT INTO points_scored (players_on_court, result, game_id)
--VALUES ('1,2,3,4,5', 2, 1);
--
---- Lineup 2: Players 1, 2, 3, 6, 7 with -2 points
--INSERT INTO points_scored (players_on_court, result, game_id)
--VALUES ('1,2,3,6,7', -2, 1);
--
---- Lineup 3: Players 3, 4, 5, 6, 7 with +3 points
--INSERT INTO points_scored (players_on_court, result, game_id)
--VALUES ('3,4,5,6,7', 3, 1);
--
---- Lineup 4: Players 1, 2, 4, 5, 6 with -3 points
--INSERT INTO points_scored (players_on_court, result, game_id)
--VALUES ('1,2,4,5,6', -3, 1);
--
---- Lineup 5: Players 2, 3, 5, 6, 8 with +2 points
--INSERT INTO points_scored (players_on_court, result, game_id)
--VALUES ('2,3,5,6,8', 2, 1);
--
---- Lineup 6: Players 4, 5, 6, 7, 8 with +3 points
--INSERT INTO points_scored (players_on_court, result, game_id)
--VALUES ('4,5,6,7,8', 3, 1);
--
---- Lineup 7: Players 1, 2, 3, 7, 8 with -2 points
--INSERT INTO points_scored (players_on_court, result, game_id)
--VALUES ('1,2,3,7,8', -2, 1);
--
---- Lineup 8: Players 2, 4, 5, 6, 7 with +1 point
--INSERT INTO points_scored (players_on_court, result, game_id)
--VALUES ('2,4,5,6,7', 1, 1);
--
---- Lineup 9: Players 1, 3, 5, 6, 9 with -1 point (e.g., free throw)
--INSERT INTO points_scored (players_on_court, result, game_id)
--VALUES ('1,3,5,6,9', -1, 1);
--
---- Lineup 10: Players 3, 4, 6, 7, 9 with +2 points
--INSERT INTO points_scored (players_on_court, result, game_id)
--VALUES ('3,4,6,7,9', 2, 1);
--
---- Repeated Lineup 1: Players 1, 2, 3, 4, 5 with +2 points
--INSERT INTO points_scored (players_on_court, result, game_id)
--VALUES ('1,2,3,4,5', 2, 1);
--
---- Repeated Lineup 2: Players 1, 2, 3, 6, 7 with -2 points
--INSERT INTO points_scored (players_on_court, result, game_id)
--VALUES ('1,2,3,6,7', -2, 1);
--
---- Repeated Lineup 3: Players 3, 4, 5, 6, 7 with +3 points
--INSERT INTO points_scored (players_on_court, result, game_id)
--VALUES ('3,4,5,6,7', 3, 1);
--
---- Repeated Lineup 6: Players 4, 5, 6, 7, 8 with +3 points
--INSERT INTO points_scored (players_on_court, result, game_id)
--VALUES ('4,5,6,7,8', 3, 1);
--
---- Repeated Lineup 8: Players 2, 4, 5, 6, 7 with +1 point
--INSERT INTO points_scored (players_on_court, result, game_id)
--VALUES ('2,4,5,6,7', 1, 1);

-- Insert roster data into the player table
INSERT INTO player (name) VALUES
('Anthony Robinson'),
('Marcus Allen'),
('Mark Mitchell'),
('Caleb Grill'),
('Tamar Bates'),
('Annor Boateng'),
('Josh Gray'),
('Marques Warrick'),
('Trent Pierce'),
('Jacob Crews'),
('Peyton Marshall'),
('T.O. Barrett'),
('Aidan Shaw'),
('Trent Burns'),
('Tony Perkins'),
('Jeremy Sanchez'),
('JV Brown'),
('Danny Stephens');