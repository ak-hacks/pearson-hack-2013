package com.ft.hack.leap.gestures;

import com.leapmotion.leap.SwipeGesture;
import org.apache.log4j.Logger;

/**
 * @author: anuragkapur
 * @since: 06/06/2013
 */

public class SwipeHandler {

    private static final Logger LOGGER = Logger.getLogger(SwipeHandler.class);

    public void handleEvent(SwipeGesture swipe) {
        LOGGER.debug("Swipe id: " + swipe.id()
                + ", " + swipe.state()
                + ", position: " + swipe.position()
                + ", direction: " + swipe.direction()
                + ", speed: " + swipe.speed());
    }
}
