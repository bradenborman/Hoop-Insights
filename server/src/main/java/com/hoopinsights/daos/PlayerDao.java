package com.hoopinsights.daos;

import com.hoopinsights.models.Player;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PlayerDao {
    private final JdbcTemplate jdbcTemplate;

    public PlayerDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Player> getAllPlayers() {
        String sql = "SELECT id, name FROM player";
        return jdbcTemplate.query(sql, (rs, rowNum) ->
                new Player(rs.getInt("id"), rs.getString("name"))
        );
    }

}