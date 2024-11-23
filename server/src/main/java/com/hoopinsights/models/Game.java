package com.hoopinsights.models;

import java.time.LocalDate;

public class Game {

    private Long id;
    private LocalDate datePlayed;
    private String awayTeam;

    public Game(Long id, LocalDate datePlayed, String awayTeam) {
        this.id = id;
        this.datePlayed = datePlayed;
        this.awayTeam = awayTeam;
    }

    public Game(LocalDate datePlayed, String awayTeam) {
        this.datePlayed = datePlayed;
        this.awayTeam = awayTeam;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDatePlayed() {
        return datePlayed;
    }

    public void setDatePlayed(LocalDate datePlayed) {
        this.datePlayed = datePlayed;
    }

    public String getAwayTeam() {
        return awayTeam;
    }

    public void setAwayTeam(String awayTeam) {
        this.awayTeam = awayTeam;
    }

    @Override
    public String toString() {
        return "Game{" +
                "id=" + id +
                ", datePlayed=" + datePlayed +
                ", awayTeam='" + awayTeam + '\'' +
                '}';
    }

}