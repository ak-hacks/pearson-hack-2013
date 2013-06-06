package com.ft.hack.leap;

import com.ft.hack.leap.gestures.FingersHandler;
import com.ft.hack.leap.gestures.SwipeHandler;
import com.leapmotion.leap.*;
import org.apache.log4j.Logger;

import java.util.ArrayList;
import java.util.List;

/**
 * @author: anuragkapur
 * @since: 06/06/2013
 */

public class ClientListner extends Listener {

    private static final Logger LOGGER = Logger.getLogger(ClientListner.class);

    private static SwipeHandler swipeHandler = new SwipeHandler();
    private static FingersHandler fingersHandler = new FingersHandler();

    public void onInit(Controller controller) {
        System.out.println("Initialized");
        LOGGER.debug("Initialized");
    }

    public void onConnect(Controller controller) {
        LOGGER.debug("Connected");

        controller.enableGesture(Gesture.Type.TYPE_SWIPE);
        controller.enableGesture(Gesture.Type.TYPE_CIRCLE);
        controller.enableGesture(Gesture.Type.TYPE_SCREEN_TAP);
        controller.enableGesture(Gesture.Type.TYPE_KEY_TAP);
    }

    public void onDisconnect(Controller controller) {
        //Note: not dispatched when running in a debugger.
        LOGGER.debug("Disconnected");
    }

    public void onExit(Controller controller) {
        LOGGER.debug("Exited");
    }

    public void onFrame(Controller controller) {
        Frame frame = controller.frame();

        // Fingers
        if (!frame.hands().empty()) {
            Hand hand = frame.hands().get(0);

            // Check if the hand has any fingers
            FingerList fingers = hand.fingers();
            if (!fingers.empty()) {

                List<List<Float>> fingersList = new ArrayList<List<Float>>();

                for (Finger finger : fingers) {
                    Vector fingerTip = finger.tipPosition();
                    float x = fingerTip.getX();
                    float y = fingerTip.getY();
                    float z = fingerTip.getZ();

                    List<Float> fingerCoordinates = new ArrayList<Float>();
                    fingerCoordinates.add(Float.valueOf(x));
                    fingerCoordinates.add(Float.valueOf(y));
                    fingerCoordinates.add(Float.valueOf(z));

                    fingersList.add(fingerCoordinates);
                    LOGGER.debug("Finger tip :: " + fingerTip);
                }

                fingersHandler.handleEvent(fingersList);
            }
        }

        // Gestures
        GestureList gestures = frame.gestures();
        for (int i = 0; i < gestures.count(); i++) {

            Gesture gesture = gestures.get(i);

            switch (gesture.type()) {
                case TYPE_CIRCLE:
                    CircleGesture circle = new CircleGesture(gesture);

                    // Calculate clock direction using the angle between circle normal and pointable
                    String clockwiseness;
                    if (circle.pointable().direction().angleTo(circle.normal()) <= Math.PI/4) {
                        // Clockwise if angle is less than 90 degrees
                        clockwiseness = "clockwise";
                    } else {
                        clockwiseness = "counterclockwise";
                    }

                    // Calculate angle swept since last frame
                    double sweptAngle = 0;
                    if (circle.state() != Gesture.State.STATE_START) {
                        CircleGesture previousUpdate = new CircleGesture(controller.frame(1).gesture(circle.id()));
                        sweptAngle = (circle.progress() - previousUpdate.progress()) * 2 * Math.PI;
                    }

                    LOGGER.debug("Circle id: " + circle.id()
                            + ", " + circle.state()
                            + ", progress: " + circle.progress()
                            + ", radius: " + circle.radius()
                            + ", angle: " + Math.toDegrees(sweptAngle)
                            + ", " + clockwiseness);
                    break;
                case TYPE_SWIPE:
                    SwipeGesture swipe = new SwipeGesture(gesture);
                    swipeHandler.handleEvent(swipe);
                    LOGGER.debug("Swipe id: " + swipe.id()
                            + ", " + swipe.state()
                            + ", position: " + swipe.position()
                            + ", direction: " + swipe.direction()
                            + ", speed: " + swipe.speed());
                    break;
                case TYPE_SCREEN_TAP:
                    ScreenTapGesture screenTap = new ScreenTapGesture(gesture);
                    LOGGER.debug("Screen Tap id: " + screenTap.id()
                            + ", " + screenTap.state()
                            + ", position: " + screenTap.position()
                            + ", direction: " + screenTap.direction());
                    break;
                case TYPE_KEY_TAP:
                    KeyTapGesture keyTap = new KeyTapGesture(gesture);
                    LOGGER.debug("Key Tap id: " + keyTap.id()
                            + ", " + keyTap.state()
                            + ", position: " + keyTap.position()
                            + ", direction: " + keyTap.direction());
                    break;
                default:
                    LOGGER.debug("Unknown gesture type.");
                    break;
            }
        }
    }
}
