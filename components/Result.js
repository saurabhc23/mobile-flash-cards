import React from 'react'
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native'
import { purple, white } from '../utils/colors'

class Result extends React.Component{
    static navigationOptions=({navigation})=>({
        title:'Result'
    })
    render(){
        const { navigation } = this.props
        const { state, navigate } = navigation
        return(
            <View style={styles.container}>
                <Text style={{textAlign:'center'}}> You have scored: </Text>
                <View style={styles.score}>
                    <Text style={{textAlign:'center',fontSize:24}}>{state.params.score} out of {state.params.cardcount}</Text>
                </View>
                <View>
                    <Text style={{textAlign:'center'}}>Percentage: {state.params.score/state.params.cardcount * 100} %</Text>
                </View>
                <TouchableOpacity
                    onPress={()=>navigation.navigate('Quiz',{card:state.params.card})}
                    style={[styles.button,{backgroundColor:purple}]}
                >
                    <Text style={styles.buttonText}>Start Over</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>navigation.navigate('Deck',{card:state.params.card,count:state.params.count})}
                    style={[styles.button,{backgroundColor:purple}]}
                >
                    <Text style={styles.buttonText}>Back to {state.params.card}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        padding:20
    },
    score:{

    },
    button:{
        padding: 10,
        backgroundColor: purple,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    },
    buttonText:{
        color: white
    }
})

export default Result