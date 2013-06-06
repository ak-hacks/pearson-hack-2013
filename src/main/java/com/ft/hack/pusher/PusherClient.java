package com.ft.hack.pusher;

import ch.mbae.pusher.PusherChannel;
import ch.mbae.pusher.transport.HttpClientPusherTransport;
import com.google.gson.Gson;
import org.apache.log4j.Logger;

import java.util.List;

/**
 * @author: anuragkapur
 * @since: 06/06/2013
 */

public class PusherClient {

    private static final Logger LOGGER = Logger.getLogger(PusherClient.class);

    private static final String CHANNEL_NAME = "leap_pearson";
    private static final String APP_ID = "45811";
    private static final String KEY = "f17a457dad3779afdba1";
    private static final String SECRET = "62794722cbca8b8f1ef5";

    PusherChannel pusherCh = new PusherChannel(CHANNEL_NAME, APP_ID, KEY, SECRET,
            new HttpClientPusherTransport());

    public void push(Object data) {
        try {
            List<Float> dataToPush = (List<Float>) data;
            Gson gson = new Gson();
            String json = gson.toJson(dataToPush);

            LOGGER.debug("Will push json :: " + json);

            //pusherCh.pushEvent("leap_pearson_event", data);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error(e);
        }
    }
}