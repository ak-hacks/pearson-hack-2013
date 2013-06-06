package com.ft.hack.leap;

import com.leapmotion.leap.Controller;

import java.io.IOException;

/**
 * @author: anuragkapur
 * @since: 06/06/2013
 */

public class Client {

    public static void main(String[] args) {
        // Create a sample listener and controller
        ClientListner listener = new ClientListner();
        Controller controller = new Controller();

        // Have the sample listener receive events from the controller
        controller.addListener(listener);

        // Keep this process running until Enter is pressed
        System.out.println("Press Enter to quit...");
        try {
            System.in.read();
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Remove the sample listener when done
        controller.removeListener(listener);
    }
}
