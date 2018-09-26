import React from 'react'
import {Text,StyleSheet,TouchableOpacity,ScrollView,RefreshControl,View} from 'react-native'
import {getDecks} from '../utils/api'
import {AppLoading} from 'expo'

class Decklist extends React.Component{
        state={
            cards:[{title:'',questions:[]}]
        }

        retrieveDecks=()=>{
            getDecks().then(data=>{
                //console.log(data)
                this.setState({
                    cards:Object.keys(data).map((key)=>(data[key]))
                })
            }).catch(err=>console.error(err))
        }
    componentDidMount(){
       this.retrieveDecks()
    }
    componentDidUpdate(){
        this.retrieveDecks()
    }
    render(){
        const {cards}=this.state
            return(
                <View>
                    {cards.map(card=>(
                        <TouchableOpacity
                            style={styles.card}
                            onPress={()=>this.props.navigation.navigate('Deck',{card:card.title,count:card.questions.length})}
                            key={card.title}
                        >
                            <Text style={styles.title}>{card.title}</Text>
                            <Text>{card.questions.length} {(card.questions.length>1)?'cards':'card'}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )


    }
}

const styles=StyleSheet.create({
    card:{
        borderBottomWidth:2,
        borderBottomColor:'grey',
        alignItems:'center',
        padding:15,
        margin:5
    },
    title:{
        fontWeight:'bold'
    }
})

export default Decklist