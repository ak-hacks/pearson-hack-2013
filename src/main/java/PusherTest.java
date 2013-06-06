import ch.mbae.pusher.PusherChannel;
import ch.mbae.pusher.PusherTransportException;
import ch.mbae.pusher.transport.HttpClientPusherTransport;

/**
 * @author anurag.kapur
 * 
 */
public class PusherTest {

	private static String activityContent = "{\"message\":\"hello world!\"}";
	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		PusherChannel pusherCh = new PusherChannel("test_channel", "45811", "f17a457dad3779afdba1",
				"62794722cbca8b8f1ef5", new HttpClientPusherTransport());
		try {
			pusherCh.pushEvent("my_event", activityContent);
		} catch (PusherTransportException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
