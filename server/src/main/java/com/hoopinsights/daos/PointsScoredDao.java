package com.hoopinsights.daos;

import com.hoopinsights.models.Lineup;
import com.hoopinsights.models.Player;
import com.hoopinsights.models.PointsScored;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Repository
public class PointsScoredDao {

    private final JdbcTemplate jdbcTemplate;

    public PointsScoredDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void insertScoringEvent(Long gameId, Set<Integer> playerIds, int points) {
        Set<Integer> sortedPlayerIds = playerIds.stream()
                .sorted()
                .collect(Collectors.toCollection(LinkedHashSet::new));

        String playersOnCourt = sortedPlayerIds.stream()
                .map(String::valueOf)
                .collect(Collectors.joining(","));

        String sql = "INSERT INTO points_scored (players_on_court, result, game_id) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, playersOnCourt, points, gameId);
    }

    public List<PointsScored> getPointsForGame(Long gameId) {
        String sql = "SELECT id, players_on_court, result, game_id FROM points_scored WHERE game_id = ?";
        return jdbcTemplate.query(sql, (rs, rowNum) -> new PointsScored(
                rs.getLong("id"),
                Arrays.stream(rs.getString("players_on_court").split(","))
                        .map(Integer::parseInt)
                        .collect(Collectors.toSet()),
                rs.getInt("result"),
                rs.getLong("game_id")
        ), gameId);
    }

    public List<Lineup> getLineupsForGame(Long gameId) {
        String sql = """
        SELECT ps.players_on_court, SUM(ps.result) AS total_plus_minus, COUNT(*) AS total_times_scored
        FROM points_scored ps
        WHERE ps.game_id = ?
        GROUP BY ps.players_on_court
        ORDER BY total_plus_minus DESC
        """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            // Get the comma-separated player IDs
            String playersOnCourtString = rs.getString("players_on_court");

            // Split and map each ID to a Player object using a separate query
            Set<Player> playersOnCourt = Arrays.stream(playersOnCourtString.split(","))
                    .map(playerId -> jdbcTemplate.queryForObject(
                            "SELECT id, name FROM player WHERE id = ?",
                            (playerRs, playerRowNum) -> new Player(
                                    playerRs.getInt("id"),
                                    playerRs.getString("name")
                            ),
                            Integer.parseInt(playerId)
                    ))
                    .collect(Collectors.toSet());

            int totalPlusMinus = rs.getInt("total_plus_minus");
            int totalTimesScored = rs.getInt("total_times_scored");

            // Return the new Lineup object
            return new Lineup(playersOnCourt, totalPlusMinus, totalTimesScored);
        }, gameId);
    }


}