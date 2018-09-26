import React from 'react'
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native'
import { purple, white } from '../utils/colors'

class Result extends React.Component{
    static navigationOptions=({navigation})=>({
        title:'Result'
    })
    state={
        percentage:0
    }
    componentDidMount(){
        this.setState({
            percentage:this.props.navigation.state.params.score/this.props.navigation.state.params.cardcount * 100
        })
    }
    render(){
        console.log(this.props.navigation.state.params)
        return(
            <View style={styles.container}>
                <Text style={{textAlign:'center'}}> You have scored: </Text>
                <View style={styles.score}>
                    <Text style={{textAlign:'center',fontSize:24}}>{this.props.navigation.state.params.score} out of {this.props.navigation.state.params.cardcount}</Text>
                </View>
                <View>
                    <Text style={{textAlign:'center'}}>Percentage: {this.state.percentage} %</Text>
                </View>
                <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('Deck',{card:this.props.navigation.state.params.card,count:this.props.navigation.state.params.count})}
                    style={[styles.button,{backgroundColor:purple}]}
                >
                    <Text style={styles.buttonText}>Back to {this.props.navigation.state.params.card}</Text>
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