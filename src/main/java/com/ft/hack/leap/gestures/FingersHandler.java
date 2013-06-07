package com.ft.hack.leap.gestures;

import com.ft.hack.pusher.PusherClient;
import org.apache.log4j.Logger;

import java.util.List;

/**
 * @author: anuragkapur
 * @since: 06/06/2013
 */

public class FingersHandler {

    private static final Logger LOGGER = Logger.getLogger(FingersHandler.class);
    private static final String HOVER_EVENT = "hover";
    private static final int MOVEMENT_THRESHOLD = 10;
    private static int x = -999;
    private static int y = -999;

    public void handleEvent(Object eventData) {

        List<List<Integer>> fingersList = (List<List<Integer>>) eventData;

        // Only one finger supported at the moment
        if(fingersList.size() > 0) {
            List<Integer> fingerCoordinates = fingersList.get(0);
            int x = fingerCoordinates.get(0);
            int y = fingerCoordinates.get(1);

            boolean pushData = false;

            if(this.x == -999) {
                this.x = x;
                this.y = y;
            } else {
                float movementX = this.x - x;
                float movementY = this.y - y;

                // Check if there has been significant movement
                if(movementX > MOVEMENT_THRESHOLD || movementX < -MOVEMENT_THRESHOLD) {
                    LOGGER.debug("Movement factor x axis :: " + movementX);
                    this.x = x;
                    pushData = true;
                }
                if(movementY > MOVEMENT_THRESHOLD || movementY < -MOVEMENT_THRESHOLD) {
                    LOGGER.debug("Movement factor y axis :: " + movementY);
                    this.y = y;
                    pushData = true;
                }
            }

            if (pushData) {
                PusherClient.push(fingerCoordinates, HOVER_EVENT);
            }
        }
    }
}
