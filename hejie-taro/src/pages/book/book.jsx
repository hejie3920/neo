import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class Index extends Component {
  
  componentWillMount () { }


  componentDidMount () { 
    Taro.showLoading()
  }

  componentWillUnmount () { }
  
  config = {
    navigationBarTitleText: '首页'
  }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    let name='hejie'
    return (
      <View className='index'>
        <Text>{name}</Text>
      </View>
    )
  }
}
