import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import COLORS from '../../consts/colors';
const OnBoardScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/welcome.jpg')}>
        <View style={style.details}>
          <Text style={{color: COLORS.white, fontSize: 35, fontWeight: 'bold'}}>
            Discover
          </Text>
          <Text style={{color: COLORS.white, fontSize: 35, fontWeight: 'bold'}}>
            Maharashtra
          </Text>
          <Text style={{color: COLORS.white, lineHeight: 25, marginTop: 15}}>
          "From the majestic Western Ghats to the vibrant city streets – experience Maharashtra like never before."
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('LoginScreen')}>
            <View style={style.btn}>
              <Text style={{fontWeight: 'bold'}}>Get Started</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  details: {
    height: '50%',
    bottom: 0,
    position: 'absolute',
    paddingHorizontal: 40,
  },
  btn: {
    height: 50,
    width: 120,
    backgroundColor: COLORS.white,
    marginTop: 20,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default OnBoardScreen;
