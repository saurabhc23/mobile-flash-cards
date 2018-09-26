import React from 'react'
import {View,Text,StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import {saveDeckTitle} from '../utils/api'
import {Constants} from 'expo'
import { purple, white } from '../utils/colors'

class NewDeck extends React.Component{
    state={
        title:''
    }
    render(){
        return(
            <View style={styles.container}>
                <Text>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Title'
                    value={this.state.title}
                    onChangeText={(text)=>{this.setState({title:text})}}
                />
                <TouchableOpacity
                    style={[styles.button,{backgroundColor:purple}]}
                    onPress={()=>{
                        saveDeckTitle(this.state.title).then(()=>{
                            this.props.navigation.navigate('Deck',{card:this.state.title,count:0})
                        })
                    }}
                >
                    <Text style={{color:'white'}}>Submit</Text>
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
        padding:10,
        alignSelf:'stretch'
    },
    button:{
        padding: 10,
        backgroundColor: purple,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    }
})

export default NewDeck