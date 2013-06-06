package com.ft.hack.pusher;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * @author: anuragkapur
 * @since: 06/06/2013
 */

public class PusherClientTest {

    @Test
    public void testPush() throws Exception {
        PusherClient pusherClient = new PusherClient();

        List<Float> data = new ArrayList<Float>();
        data.add(Float.valueOf(1));
        data.add(Float.valueOf(2));
        data.add(Float.valueOf(3));

        pusherClient.push(data);
    }
}
