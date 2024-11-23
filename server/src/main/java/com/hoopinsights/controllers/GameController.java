package com.hoopinsights.controllers;

import com.hoopinsights.daos.PlayerDao;
import com.hoopinsights.models.Game;
import com.hoopinsights.models.Lineup;
import com.hoopinsights.models.Player;
import com.hoopinsights.services.GameService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class GameController {

    private GameService gameService;
    private PlayerDao playerDao;

    public GameController(GameService gameService, PlayerDao playerDao) {
        this.gameService = gameService;
        this.playerDao = playerDao;
    }

    @PostMapping("/game")
    public Game createGame(@RequestParam String awayTeam, @RequestParam(required = false) String datePlayed) {
        return gameService.createGame(awayTeam, datePlayed != null ? LocalDate.parse(datePlayed) : LocalDate.now());
    }

    @PostMapping("/game/score")
    public List<Lineup> updateScore(
            @RequestParam Long gameId,
            @RequestParam Set<Integer> playerIds,
            @RequestParam int points,
            @RequestParam boolean isOurTeam) {
        gameService.updateScoreAndLineup(gameId, playerIds, points, isOurTeam);
        return gameService.getLineupsForGame(gameId);
    }

    @GetMapping("/game/{gameId}/lineups")
    public List<Lineup> getLineupsForGame(@PathVariable Long gameId) {
        return gameService.getLineupsForGame(gameId);
    }


    @GetMapping("/away-team")
    public String getAwayTeam(@RequestParam String gameId) {
        return gameService.getAwayTeam(gameId);
    }

    @GetMapping("/players")
    public List<Player> getAllPlayers() {
        return playerDao.getAllPlayers();
    }

}

/*
        http://localhost:8080/h2-console/login.do?jsessionid=1c1a79809227bb133fbed663a43af088

        http://localhost:8080/api/game/1/lineups

 */