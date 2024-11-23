package com.hoopinsights.daos;

import com.hoopinsights.models.Game;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public class GameDao {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public GameDao(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Game createGame(LocalDate datePlayed, String awayTeam) {
        String sql = "INSERT INTO game (date_played, away_team) VALUES (:datePlayed, :awayTeam)";

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("datePlayed", datePlayed)
                .addValue("awayTeam", awayTeam);

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(sql, params, keyHolder);
        long generatedId = keyHolder.getKey().longValue();
        return new Game(generatedId, datePlayed, awayTeam);
    }

    public int calculateAwayTeamsScore(Long gameId) {
        String sql = "SELECT COALESCE(SUM(result), 0) AS away_score " +
                "FROM points_scored " +
                "WHERE game_id = :gameId AND result < 0";

        MapSqlParameterSource params = new MapSqlParameterSource()
                .addValue("gameId", gameId);

        return jdbcTemplate.queryForObject(sql, params, Integer.class);
    }

}
