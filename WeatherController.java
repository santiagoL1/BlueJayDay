package com.example.bluejayday;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @GetMapping("/")
    public String getWeatherData(
            @RequestParam(defaultValue = "New York") String city, Model model) {

        // Fetch the forecast from the service
        List<DayForecast> forecast = weatherService.get5DayForecast(city);

        // Add data to the model
        model.addAttribute("cityName", city);
        model.addAttribute("forecast", forecast);

        return "index";
    }
}
