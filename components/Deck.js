import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import {getDeck} from '../utils/api'
import { purple, white } from '../utils/colors'

class Deck extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.card}`
    })
    state={
                questions:[]
    }
    getDetails=()=>{
        getDeck(this.props.navigation.state.params.card).then((data)=>{
            this.setState({
                questions:data.questions
            })
        })
    }
    componentDidMount(){
        this.getDetails()
    }
    onRefresh=()=>{
        this.getDetails()
    }
    render() {
        return (
            <View style={styles.page}>
                <Text style={styles.title}>
                    {this.props.navigation.state.params.card}
                </Text>
                <Text>
                        {this.props.navigation.state.params.count} cards in the deck
                </Text>
                    <TouchableOpacity
                        style={[styles.button,{backgroundColor:purple}]}
                        onPress={()=>{this.props.navigation.navigate('NewQuestion',{card: this.props.navigation.state.params.card,count:this.state.questions.length})}}
                    >
                        <Text style={{color:'white'}}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button,{backgroundColor:purple}]}
                        onPress={() => this.props.navigation.navigate('Quiz', {card:this.props.navigation.state.params.card,count:this.state.questions.length})}
                    >
                        <Text style={{color:'white'}}>Start Quiz</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    page:{
        flex:1,
        alignItems:'center',
        flexDirection:'column'
    },
    title:{
        fontSize:24,
        textAlign:'center',
        marginTop:30
    },
    button:{
        padding: 10,
        backgroundColor: purple,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    },
    buttonText:{
        color:'white'
    }
})

export default Deck