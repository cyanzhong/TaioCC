const states = {};

$define({
  type: "KeyboardHeightTracker: NSObject",
  events: {
    "init": () => {
      self = self.$super().$init();
      const observer = self;
      const register = (selector, name) => $objc("NSNotificationCenter").$defaultCenter().$addObserver_selector_name_object(observer, selector, name, null);
      register("show:", "UIKeyboardWillShowNotification");
      register("show:", "UIKeyboardDidShowNotification");
      register("hide:", "UIKeyboardDidHideNotification");
      return self;
    },
    "show": notification => {
      const info = notification.$userInfo();
      const frame = info.$objectForKey("UIKeyboardFrameEndUserInfoKey");
      const rect = frame.$CGRectValue();
      notifyChange(rect.height);
    },
    "hide": _ => notifyChange(0)
  }
});

function notifyChange(height) {
  $app.notify({
    name: "keyboardHeightChanged",
    object: height
  });
}

module.exports = {
  startTracking: () => {
    states.tracker = $objc("KeyboardHeightTracker").$new();
  }
}