package com.ft.hack.pusher;

import ch.mbae.pusher.PusherChannel;
import ch.mbae.pusher.transport.HttpClientPusherTransport;
import com.google.gson.Gson;
import org.apache.log4j.Logger;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: anuragkapur
 * @since: 06/06/2013
 */

public class PusherClient {

    private static final Logger LOGGER = Logger.getLogger(PusherClient.class);
    private static final String HOVER_EVENT = "hover";
    private static final String SWIPE_EVENT = "swipe";
    private static final String SELECT_EVENT = "open";
    private static final String CLOSE_EVENT = "close";

    private static final String CHANNEL_NAME = "leap_pearson";
    private static final String APP_ID = "45811";
    private static final String KEY = "f17a457dad3779afdba1";
    private static final String SECRET = "62794722cbca8b8f1ef5";

    private static final boolean pusherEnabled = true;

    private static PusherChannel pusherCh = new PusherChannel(CHANNEL_NAME, APP_ID, KEY, SECRET,
            new HttpClientPusherTransport());

    public static void push(Object data, String type) {
        if(type.equalsIgnoreCase("hover")) {
            pushHover(data);
        }else if(type.equalsIgnoreCase("swipe")) {
            pushSwipe(data);
        }else if(type.equalsIgnoreCase("select")) {
            pushSelect((Map<String, String>)data);
        }else if(type.equalsIgnoreCase("close")) {
            pushClose();
        }
    }

    private static void pushHover(Object data) {
        try {
            List<Float> dataToPush = (List<Float>) data;
            Gson gson = new Gson();
            String json = gson.toJson(dataToPush);

            LOGGER.debug("Will push json :: " + json);
            if(pusherEnabled) {
                pusherCh.pushEvent(HOVER_EVENT, json);
            }
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error(e);
        }
    }

    private static void pushSwipe(Object data) {
         try {
             Map<String, String> dataToPush = (Map<String, String>) data;
             Gson gson = new Gson();
             String json = gson.toJson(dataToPush);

             LOGGER.debug("Will push json :: " + json);

             if(pusherEnabled) {
                 pusherCh.pushEvent(SWIPE_EVENT, json);
             }
         }catch(Exception e) {
             e.printStackTrace();
             LOGGER.error(e);
         }
    }

    private static void pushSelect(Map<String, String> data) {
        try {
            Map<String, String> dataToPush = new HashMap<String, String>();
            dataToPush.put("action",SELECT_EVENT);
            dataToPush.put("x",data.get("x"));
            dataToPush.put("y",data.get("y"));

            Gson gson = new Gson();
            String json = gson.toJson(dataToPush);

            LOGGER.debug("Will push json :: " + json);
            if(pusherEnabled) {
                pusherCh.pushEvent(SELECT_EVENT,json);
            }
        }catch(Exception e) {
            e.printStackTrace();
            LOGGER.error(e);
        }
    }

    private static void pushClose() {
        try {
            Map<String, String> dataToPush = new HashMap<String, String>();
            dataToPush.put("action",CLOSE_EVENT);

            Gson gson = new Gson();
            String json = gson.toJson(dataToPush);

            LOGGER.debug("Will push json :: " + json);
            if(pusherEnabled) {
                pusherCh.pushEvent(CLOSE_EVENT,json);
            }
        }catch(Exception e) {
            e.printStackTrace();
            LOGGER.error(e);
        }
    }
}