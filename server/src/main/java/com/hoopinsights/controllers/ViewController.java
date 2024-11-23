package com.hoopinsights.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping(value = {
            "/",
            "/game/*"
    })
    public String getView() {
        return "index";
    }

}