import WatchKit
import Foundation
import WatchConnectivity


class InterfaceController: WKInterfaceController, WCSessionDelegate {
  @IBOutlet weak var distance: WKInterfaceLabel!
  @IBOutlet weak var desc: WKInterfaceLabel!
  @IBOutlet weak var image: WKInterfaceImage!
  @IBOutlet weak var footer: WKInterfaceGroup!
  @IBOutlet weak var footerImg: WKInterfaceImage!
  
  var session: WCSession?

  // Initializes the interface controller with the specified context data
  override func awake(withContext context: Any?) {
    super.awake(withContext: context)
    if WCSession.isSupported() {
      self.session = WCSession.default
      self.session?.delegate = self
      self.session?.activate()
    }
  }
    
  override func willActivate() {
    // This method is called when watch view controller is about to be visible to user
  }
    
  override func didDeactivate() {
    // This method is called when watch view controller is no longer visible
  }
  
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
    print("Session activated successfully")
  }

  // Called when an immediate message arrives
  func session(_ session: WCSession, didReceiveMessage message: [String : Any], replyHandler: @escaping ([String : Any]) -> Void) {
    print("watch received message", message);
    let data = convertToJson(input: (message["message"] as? String)!)

    self.desc.setText(data["description"] as? String)
    self.distance.setText(data["distance"] as? String)
    self.image.setImageNamed(data["direction"] as? String)
    
    if data["next"] == nil {
      self.footer.setHidden(true)
    } else {
      self.footer.setHidden(false)
      self.footerImg.setImageNamed(data["next"] as? String)
    }
  }
  
  func convertToJson(input: String) -> [String : Any] {
    let data = input.data(using: .utf8)!
    
    do {
      if let json = try JSONSerialization.jsonObject(with: data, options: .allowFragments) as? [String : Any] {
        return json
      } else {
        return [:]
      }
    } catch let error as NSError {
      print(error)
      return [:]
    }
  }
}
