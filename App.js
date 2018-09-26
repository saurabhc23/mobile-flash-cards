import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import {TabNavigator,StackNavigator} from 'react-navigation'
import Decklist from './components/Decklist'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import {Constants} from 'expo'
import Result from './components/Result'
import NewQuestion from './components/NewQuestion'
import { purple, white } from './utils/colors'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'

const Tabs=TabNavigator({
    Decklist:{
        screen:Decklist,
        navigationOptions:{
            tabBarLabel:'Decks',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
        }
    },
    NewDeck:{
        screen:NewDeck,
        navigationOptions:{
            tabBarLabel:'New Deck',
            tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-variant' size={30} color={tintColor} />
        }
    }
},{
    tabBarOptions:{
        activeTintColor:white,
        style: {
            height: 56,
            backgroundColor: purple,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
          }
    }
})

const MainNavigator=StackNavigator({
    Home:{
        screen:Tabs,
        navigationOptions:{
            headerTintColor:white,
            headerStyle:{
                backgroundColor:purple
            },
            title:'UdaciCards'
        },
        animationEnabled:true
    },
    Deck:{
        screen:Deck,
        navigationOptions:{
            headerTintColor:white,
            headerStyle:{
                backgroundColor:purple
            }
        }
    },
    Quiz:{
        screen:Quiz,
        navigationOptions:{
            headerTintColor:white,
            headerStyle:{
                backgroundColor:purple
            }
        }
    },
    Result:{
        screen:Result,
        navigationOptions:{
            headerTintColor:white,
            headerStyle:{
                backgroundColor:purple
            }
        }
    },
    NewQuestion:{
        screen:NewQuestion,
        navigationOptions:{
            headerTintColor:white,
            headerStyle:{
                backgroundColor:purple
            }
        }
    }
})

function UdaciStatusBar({backgroundColor,...props}) {
    return(
        <View style={{backgroundColor:backgroundColor,height:Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}

export default class App extends React.Component {
    // componentDidMount(){
    //     console.log('Component Did Mount')
    //     setLocalNotification()
    // }
    render(){
        return (
            <View style={{flex:1}}>
                <UdaciStatusBar backgroundColor={purple} barStyle="light-content"/>
                <MainNavigator/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
