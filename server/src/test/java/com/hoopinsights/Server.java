package com.hoopinsights;

import org.springframework.boot.builder.SpringApplicationBuilder;

public class Server extends HoopInsghtsApplication {

    public static void main(String[] args) {
        new Server().configure(new SpringApplicationBuilder())
                .initializers()
                .profiles("local")
                .run(args);
    }

}