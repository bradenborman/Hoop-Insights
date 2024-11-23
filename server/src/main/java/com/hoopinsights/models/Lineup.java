package com.hoopinsights.models;

import java.util.Set;

public class Lineup {

    private Set<Player> playersOnCourt;
    private int totalPlusMinus;
    private int totalTimesScored;

    public Lineup(Set<Player> playersOnCourt, int totalPlusMinus, int totalTimesScored) {
        this.playersOnCourt = playersOnCourt;
        this.totalPlusMinus = totalPlusMinus;
        this.totalTimesScored = totalTimesScored;
    }

    public Set<Player> getPlayersOnCourt() {
        return playersOnCourt;
    }

    public void setPlayersOnCourt(Set<Player> playersOnCourt) {
        this.playersOnCourt = playersOnCourt;
    }
    public int getTotalPlusMinus() {
        return totalPlusMinus;
    }

    public void setTotalPlusMinus(int totalPlusMinus) {
        this.totalPlusMinus = totalPlusMinus;
    }

    public int getTotalTimesScored() {
        return totalTimesScored;
    }

    public void setTotalTimesScored(int totalTimesScored) {
        this.totalTimesScored = totalTimesScored;
    }
}