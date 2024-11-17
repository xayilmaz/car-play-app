import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CarPlay, GridTemplate, ListTemplate, NowPlayingTemplate, TabBarTemplate, VoiceControlTemplate } from 'react-native-carplay';

export default function App() {


  const [carPlayConnected, setCarPlayConnected] = useState(CarPlay.connected);
  
  useEffect(() => {
    
    // register connect and disconnect callbacks
    try {
      CarPlay.registerOnConnect(onConnect)
      CarPlay.registerOnDisconnect(onDisconnect);
      
    } catch (error) {
      
      console.log("🚀 ~ App ~ carPlayConnected:", error)
    }

    return () => {
      // unregister the callbacks in the return statement
      CarPlay.unregisterOnConnect(onConnect);
      CarPlay.unregisterOnDisconnect(onDisconnect);
    };
  }, []);

  const showRootView = () => {


    const audioTemplate = new NowPlayingTemplate({
      // buttons: [
      //     {
      //         id: 'foo',
      //         type: 'more',
      //     },
      //     {
      //         id: 'demo',
      //         type: 'playback',
      //     },
      //     {
      //         id: 'baz',
      //         type: 'image',
      //         image: require("@assets/images/avatarDefault.png"),
      //     },
      // ],
      albumArtistButtonEnabled: false,
      upNextButtonTitle: "Tester",
      upNextButtonEnabled: true,
      // tabImage: require("@assets/images/avatarDefault.png"),
      onUpNextButtonPressed() {
        console.log('up next was pressed');
      },
      onButtonPressed(e) {
        console.log(e);
      },
    });
    // CarPlay.enableNowPlaying(true);


    const template1 = new ListTemplate({
      sections: [
        {
          header: 'Test 1',
          items: [{ text: 'Hello world 1' }, { text: 'Hello world 2' }],

        },
      ],
      onItemSelect: (e) => {
        console.log(e);
        CarPlay.pushTemplate(audioTemplate);

      },
      title: 'AA',
    });
    const template2 = new ListTemplate({
      sections: [
        {
          header: 'Test 2',
          items: [{ text: 'Hello world 3', }, { text: 'Hello world 4' }],
        },
      ],
      title: 'BB',
    });

    const tabBarTemplate = new TabBarTemplate({
      templates: [template1, template2],
      onTemplateSelect(e) {
        console.log('selected', e);
      },
    });

    try {
      CarPlay.setRootTemplate(tabBarTemplate);
      
    } catch (error) {
      console.log("🚀 ~ showRootView ~ error:", error)
      
    }





    // // const template = new GridTemplate({
    // //     title: 'Hello, Worlddd',
    // // });

    // CarPlay.setRootTemplate(template)
  }
  const onConnect = () => {
    console.log('CarPlay Connected!');
    showRootView()
  }

  const onDisconnect = () => {
    console.log('CarPlay Disconnected!');
  }

  return (
    <View>
      <Text>App</Text>
    </View>
  )
}