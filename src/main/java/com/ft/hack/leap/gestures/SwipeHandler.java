package com.ft.hack.leap.gestures;

import com.ft.hack.pusher.PusherClient;
import com.leapmotion.leap.SwipeGesture;
import org.apache.log4j.Logger;

import java.util.HashMap;
import java.util.Map;

/**
 * @author: anuragkapur
 * @since: 06/06/2013
 */
public class SwipeHandler {

    private static final Logger LOGGER = Logger.getLogger(SwipeHandler.class);
    private static final String SWIPE_EVENT = "swipe";

    public void handleEvent(SwipeGesture swipe) {

        String segment = "";
        String direction = "";
        Map<String, String> swipeGesture = new HashMap<String, String>();

        if(swipe.state().name().equalsIgnoreCase("STATE_STOP")) {

            if(swipe.position().getY() < 170) {
                // bottom segment
                segment = "bottom";
            }else {
                // top segment
                segment = "top";
            }

            if(swipe.direction().getX() < 0) {
                direction = "left";
                LOGGER.debug("Left swipe :: position :: " + swipe.position());
            }else {
                direction = "right";
                LOGGER.debug("Right Swipe :: position :: " + swipe.position());
            }

            swipeGesture.put("direction", direction);
            swipeGesture.put("segment", segment);

            PusherClient.push(swipeGesture,SWIPE_EVENT);
        }
    }
}
