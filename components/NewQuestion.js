import React from 'react'
import {Text,View,StyleSheet,TouchableOpacity,TextInput} from 'react-native'
import {addCardToDeck} from '../utils/api'
import { purple, white } from '../utils/colors'

class NewQuestion extends React.Component{
    static navigationOptions=({navigation})=>({
        title:`Add card to ${navigation.state.params.card}`
    })
    state={
        question:'',
        answer:''
    }
    render(){
        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Question'
                    value={this.state.question}
                    onChangeText={(text)=>{this.setState({question:text})}}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Answer'
                    value={this.state.answer}
                    onChangeText={(text)=>{this.setState({answer:text})}}
                />
                <TouchableOpacity
                    style={[styles.button,{backgroundColor:purple}]}
                    onPress={()=>{
                        addCardToDeck(this.props.navigation.state.params.card,this.state.question,this.state.answer)
                        this.props.navigation.navigate('Deck',{card:this.props.navigation.state.params.card,count:this.props.navigation.state.params.count+1})
                    }}
                >
                    <Text style={{color:white}}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles=StyleSheet.create({
    container:{
        flex:2,
        flexDirection:'column',
        alignItems:'center',
        padding:20
    },
    input:{
        width:200,
        padding:10
    },
    button:{
        padding: 10,
        backgroundColor: purple,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    }
})

export default NewQuestion