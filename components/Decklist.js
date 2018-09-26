import React from 'react'
import {Text,StyleSheet,TouchableOpacity,ScrollView,RefreshControl,View} from 'react-native'
import {getDecks} from '../utils/api'
import {AppLoading} from 'expo'

class Decklist extends React.Component{
    constructor(props){
        super(props)
        this.state={
            cards:[{title:'',questions:[]}]
        }
    }
    fetchDecks=()=>{
        getDecks().then(data=>{
            //console.log(data)
            this.setState({
                cards:Object.keys(data).map((key)=>(data[key]))
            })
        }).catch(err=>console.error(err))
    }
    componentWillMount(){
        this.fetchDecks()
    }
    componentDidUpdate(){
        this.fetchDecks()
    }
    render(){
        const {cards}=this.state
        //console.log(this.state)
            return(
                <ScrollView>
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
                </ScrollView>
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