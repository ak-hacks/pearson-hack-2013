package com.ft.hack.leap.gestures;

import org.apache.log4j.Logger;

import java.util.List;

/**
 * @author: anuragkapur
 * @since: 06/06/2013
 */

public class FingersHandler {

    public static final Logger LOGGER = Logger.getLogger(FingersHandler.class);

    public void handleEvent(Object eventData) {
        List<List<Float>> fingersList = (List<List<Float>>) eventData;

        for(List<Float> fingerCoorinates : fingersList) {
            LOGGER.debug(fingerCoorinates.toString());
        }
    }
}
