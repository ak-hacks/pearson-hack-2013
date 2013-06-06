package com.ft.hack.leap.gestures;

import com.ft.hack.pusher.PusherClient;
import org.apache.log4j.Logger;

import java.util.Map;

/**
 * @author: anuragkapur
 * @since: 06/06/2013
 */

public class CircleHandler {

    private static final Logger LOGGER = Logger.getLogger(CircleHandler.class);

    public void handleEvent(Object eventData) {
        Map<String, String> circleData = (Map<String, String>) eventData;
        String direction = circleData.get("direction");

        if(direction.equalsIgnoreCase("clockwise")) {
            // push data on select channel
            PusherClient.push(circleData,"select");
        } else {
            // push data to close channel
            PusherClient.push(circleData,"close");
        }
    }
}
