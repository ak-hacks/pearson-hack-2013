package com.ft.hack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;

/**
 * @author: anuragkapur
 * @since: 06/06/2013
 */

@Controller
@RequestMapping("/helloworld")
public class HelloWorld {

    @Autowired
    private View jsonView;

    @RequestMapping(value = "/greet/{name}", method = RequestMethod.GET)
    public ModelAndView getRecommendationsForUser(@PathVariable("name") String name) {
        return new ModelAndView(jsonView, "message", "Hello " + name);
    }

}
