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

        List<Integer> data = new ArrayList<Integer>();
        data.add(Integer.valueOf(1));
        data.add(Integer.valueOf(2));

        pusherClient.push(data,"hover");
    }
}
