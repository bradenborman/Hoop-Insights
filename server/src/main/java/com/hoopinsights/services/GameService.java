package com.hoopinsights.services;

import com.hoopinsights.daos.GameDao;
import com.hoopinsights.daos.PointsScoredDao;
import com.hoopinsights.models.Game;
import com.hoopinsights.models.Lineup;
import com.hoopinsights.models.Player;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Service
public class GameService {

    private final PointsScoredDao pointsScoredDao;
    private final GameDao gameDao;

    public GameService(PointsScoredDao pointsScoredDao, GameDao gameDao) {
        this.pointsScoredDao = pointsScoredDao;
        this.gameDao = gameDao;
    }

    public Game createGame(String awayTeam, LocalDate datePlayed) {
        return gameDao.createGame(datePlayed, awayTeam);
    }

    public void updateScoreAndLineup(Long gameId, Set<Integer> playerIds, int points, boolean isOurTeam) {
        if(playerIds.size() != 5)
            throw new IllegalStateException("Must be 5 players in request");

        int pointsToStore = isOurTeam ? points : -points;
        pointsScoredDao.insertScoringEvent(gameId, playerIds, pointsToStore);
    }

    public List<Lineup> getLineupsForGame(Long gameId) {
        return pointsScoredDao.getLineupsForGame(gameId);
    }

    public int calculateAwayTeamsScore(Long gameId) {
        return gameDao.calculateAwayTeamsScore(gameId);
    }


    public String getAwayTeam(String gameId) {
        return gameDao.getAwayTeam(gameId);
    }
}