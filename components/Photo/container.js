import React, {Component } from "react";
import PropTypes from "prop-types";
import Photo from "./presenter";

class Container extends Component {
     // 컨테이너 객체 생성 시점에 넘어온 props를 가지고 state로 지정 해준다
     // 내부 자제 이벤트를 위한 작업
     constructor(props){
          super(props)
          this.state = {
               isLiked : props.is_liked,
               likeCount : props.like_count
          }
     }
     static propTypes = {
          dispatchLike : PropTypes.func.isRequired
     };
     render(){
          //console.log(this.props.creator);
          return (
                    <Photo handlePress = {this._handlePress} {...this.props} {...this.state} />
                 )
     }
     // 생성시점에 지정해준 state 값을 가지고 내부 이벤트 관리
     //_handlePress = async() => { 승인으로 관리할떄 
     _handlePress = () => {
          const { dispatchLike } = this.props;
          const { isLiked } = this.state;
          // 해당 함수의 결과값(실행시점에 결과값을 가지고 객체생성시 지정해둔 state 값이 변하면 자동 렌더링)
          // 승인을 기다리고 승인처리를 하는 함수 결과는 true false; 
          // await 의 경우 해당 함수가 끝나기전까지는 아무것도 실행하지 않음.(동기작업) 이런방법도 있다.
          //const result = await dispatchLike(isLiked);

          // 승인없이 그냥 실행
          dispatchLike(isLiked)
          // 승인이 완료되면 
          // 컨테이너가 state 와 함꼐 디스패치 return 
          // send API
          //if(result){
               if(isLiked){
                    this.setState(prevState => {
                         //likeCount : this.state.likeCount = 1
                         return {
                              isLiked: false,
                              likeCount: prevState.likeCount - 1
                         }
                    });
               }else{
                    this.setState(prevState => {
                         return {
                              isLiked: true,
                              likeCount: prevState.likeCount + 1
                         }
                    })
               }
          //}else{
          //     console.log("like action : error " , result)
          //}
     }
}

export default Container;