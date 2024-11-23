package com.hoopinsights.models;



import java.util.Set;

public class PointsScored {
    private Long id;
    private Set<Integer> playersOnCourt;
    private int result;
    private Long gameId;

    public PointsScored() {}

    public PointsScored(Long id, Set<Integer> playersOnCourt, int result, Long gameId) {
        this.id = id;
        this.playersOnCourt = playersOnCourt;
        this.result = result;
        this.gameId = gameId;
    }

    public Long getId() {
        return id;
    }

    public Set<Integer> getPlayersOnCourt() {
        return playersOnCourt;
    }

    public void setPlayersOnCourt(Set<Integer> playersOnCourt) {
        this.playersOnCourt = playersOnCourt;
    }

    public int getResult() {
        return result;
    }

    public void setResult(int result) {
        this.result = result;
    }

    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }
}