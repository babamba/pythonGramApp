import React, {Component} from "react";
import { View, Text, CameraRoll} from "react-native";
import LibraryScreen from "./presenter";

//const LibraryScreen = props => <Text>LibraryScreen</Text>;

class Container extends Component {
     state = {
          photo:null,
          pickedPhoto: null,
          isFetching : false
     }

     componentWillMount = async() => {
          const cameraPhotos = await CameraRoll.getPhotos({
               first:20,
               groupTypes:"SavedPhotos",
               assetType:"Photos"
          })
          console.log(cameraPhotos);
          this.setState({
               photos: cameraPhotos.edges,
               pickedPhoto:cameraPhotos.edges[0]
          });
     }

     render() {
          return <LibraryScreen {...this.state} pickPhoto={this._pickPhoto} approvePhoto={this._approvePhoto}refresh={this._refresh}/>;
     }

     _pickPhoto = (photo) => {
          console.log(photo)
          this.setState({
               pickedPhoto:photo
          })
     }

     _refresh = async () => {
          const cameraPhotos = await CameraRoll.getPhotos({
               first:20,
               groupTypes:"SavedPhotos",
               assetType:"Photos"
          })
          console.log("refresh");
          this.setState({
               photos: cameraPhotos.edges,
               pickedPhoto:cameraPhotos.edges[0]
          });
     };
     
     _approvePhoto = () =>{
          const { navigation: {navigate} } = this.props;
          const { pickedPhoto } = this.state;
          navigate("UploadPhoto", { uri : pickedPhoto.node.image.uri });
     }

}


export default Container;