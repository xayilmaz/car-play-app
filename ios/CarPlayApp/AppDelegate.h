#import <React/RCTBridgeDelegate.h>
#import <React/RCTRootView.h>
#import <UIKit/UIKit.h>
#import <CarPlay/CarPlay.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, CPApplicationDelegate>

@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, strong) RCTRootView* rootView;
@property (nonatomic, strong) RCTBridge *bridge;

@end
