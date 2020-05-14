import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { 
    Platform, 
    StatusBar, 
    StyleSheet, 
    View,
    Text,
    TouchableOpacity,
    TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

    class App extends ReactL.Component {

    constructor(props) 
    {
        super(props)
        this.state = {altura:0, peso:0, resultadoimc:0}
        this.calculoimc = this.calculoimc.bind(this)
    }

    calculoimc() 
    {
        let valorimc = this.state.peso / (this.state.altura * this.state.altura)

        let atualizar = this.state
        atualizar.resultadoimc = valorimc
        this.setState(atualizar)
    }

    render() 
    {
        return (
        
            <View style={styles.container}>
            <View style={styles.valores}>
            <TextInput placeholder="Altura" keyboardType="numeric" style={styles.input} onChangeText={(altura)=>{this.setState({altura})}}/>
            <TextInput placeholder="Peso" keyboardType="numeric" style={styles.input} onChangeText={(peso)=>{this.setState({peso})}}/>
            </View>

            <TouchableOpacity style={styles.botao} onPress={this.calculoimc}><Text style={styles.textobotao}>Calcular</Text></TouchableOpacity>
            <Text style={styles.imc}>{this.state.resultadoimc}</Text>
            </View>
        
        )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    height: 75,
    textAlign: "center",
    width: "80%",
    fontSize: 50,
    marginTop: 24
  },
  botao: {
      backgroundColor: "#A9A9A9"
  },
  valores: {
      flexDirection: "row",
  },
  textobotao: {
      alignSelf: "center",
      padding: 30,
      fontSize: 25
  },
  resultado: {
      alignSelf: "center",
      fontSize: 50,
      padding: 15
  }

});
