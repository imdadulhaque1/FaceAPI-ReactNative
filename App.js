import React, { Component } from 'react'
import { StyleSheet, View, Button, Text, Image, TouchableHighlight, Alert } from 'react-native';
import FaceSDK, { Enum, FaceCaptureResponse, LivenessResponse, MatchFacesResponse, MatchFacesRequest, Image as FaceImage } from '@regulaforensics/react-native-face-api'

var image1 = new FaceImage()
var image2 = new FaceImage()

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      img1: require('./images/imdadulHaque.jpg'),
      img2: require('./images/imdadulHaque.jpg'),
    }
  }

  setImage(first, base64, type){
    if (base64 == null) return
    if (first) {
      image1.bitmap = base64
      image1.imageType = type
      this.setState({ img1: { uri: "data:image/imdadulHaque.jpg," + base64 } })
      this.setState({ liveness: "NULL" })
    } else {
      image2.bitmap = base64
      image2.imageType = type
      this.setState({ img2: { uri: "data:image/imdadulHaque.jpg," + base64 } })
    }
  }

  // clearResults() {
  //   this.setState({ 
  //     img1: require('./images/portrait.png'), 
  //     img2: require('./images/portrait.png'),
  //     similarity: "NULL",
  //     liveness: "NULL"
  //    })
  //   image1 = new FaceImage()
  //   image2 = new FaceImage()
  // }


  liveness() {
    FaceSDK.startLiveness(result => {
      result = LivenessResponse.fromJson(JSON.parse(result))
      
      this.setImage(false, result.bitmap, Enum.ImageType.IMAGE_TYPE_LIVE)
      if(result.bitmap != null)
        this.setState({ liveness: result["liveness"] == 0 
          ? <Text style={{color: "#25b315", fontWeight:"bold", fontSize:20}}>Matched!</Text>
          : <Text style={{color: "red", fontWeight:"bold", fontSize:20}}>Not Match, Please try again!</Text> })
    }, e => { })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'column', width: "100%", alignItems: "center" }}>
            <View style={{ padding: 3, width: "75%" }}>
              <Button color="#4285F4"
                onPress={() => {
                  this.liveness()
                }}
                title="Liveness"
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginLeft: 20 }}>{this.state.liveness}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginBottom: 12,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  resultsScreenBackButton: {
    position: 'absolute',
    bottom: 0,
    right: 20
  }
})
