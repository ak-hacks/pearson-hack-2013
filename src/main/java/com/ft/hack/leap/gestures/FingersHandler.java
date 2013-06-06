package com.ft.hack.leap.gestures;

import com.ft.hack.pusher.PusherClient;
import org.apache.log4j.Logger;

import java.util.List;

/**
 * @author: anuragkapur
 * @since: 06/06/2013
 */

public class FingersHandler {

    public static final Logger LOGGER = Logger.getLogger(FingersHandler.class);
    private static final float MOVEMENT_THRESHOLD = 20;
    private static float x = -999;
    private static float y = -999;

    private PusherClient pusherClient = new PusherClient();

    public void handleEvent(Object eventData) {

        List<List<Float>> fingersList = (List<List<Float>>) eventData;

        // Only one finger supported at the moment
        if(fingersList.size() > 0) {
            List<Float> fingerCoordinates = fingersList.get(0);
            float x = fingerCoordinates.get(0);
            float y = fingerCoordinates.get(1);

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
                pusherClient.push(fingerCoordinates);
            }
        }
    }
}
