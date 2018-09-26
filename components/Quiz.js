import React from 'react'
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native'
import {getDeck} from '../utils/api'
import { purple, white } from '../utils/colors'

class Quiz extends React.Component{
    static navigationOptions=({navigation})=>({
        title:'Quiz'
    })
    constructor(props){
        super(props)
        this.state={
            questions:[],
            currentQuestion:1,
            showAnswer:false,
            correct:0,
            showFinish:false
        }
    }
    componentDidMount(){
        getDeck(this.props.navigation.state.params.card).then((data)=>{
            this.setState({
                questions:data.questions
            })
        })
    }
    navigateToFinish=()=>{
        this.setState({
            showFinish:false
        },()=>{
            this.props.navigation.navigate('Result',{score:this.state.correct,maximum:this.state.questions.length,card:this.props.navigation.state.params.card,count:this.props.navigation.state.params.count})
        })
    }
    render(){
        console.log(this.state)
        const {currentQuestion,questions} = this.state
        return(
            <View style={styles.container}>
                <Text>
                    {currentQuestion + '/' + questions.length}
                </Text>
                <Text style={styles.question}>
                    {(!this.state.showAnswer)?
                        (questions.length>0)&&
                        questions[currentQuestion-1].question
                        :questions[currentQuestion-1].answer

                    }
                </Text>
                {(this.state.showAnswer)?
                    <TouchableOpacity
                        onPress={()=>{this.setState({showAnswer:false})}}
                    >
                        <Text>Question</Text>
                    </TouchableOpacity>:
                    <TouchableOpacity
                        onPress={()=>{this.setState({showAnswer:true})}}
                    >
                        <Text>Answer</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity
                    style={[styles.button,{backgroundColor:'green'}]}
                    onPress={()=>{
                        if(questions.length>currentQuestion){
                            this.setState({
                                correct:this.state.correct+1,
                                currentQuestion:this.state.currentQuestion+1
                            })
                        }
                        else{
                            this.setState({
                                correct:this.state.correct+1,
                                showFinish:true
                            })
                            this.navigateToFinish()
                        }
                    }}
                >
                    <Text
                        style={styles.buttonText}
                    >
                        Correct
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button,{backgroundColor:'red'}]}
                    onPress={()=>{
                        if(questions.length>currentQuestion){
                            this.setState({
                                currentQuestion:this.state.currentQuestion+1
                            })
                        }
                        else{
                            this.setState({
                                showFinish:true
                            })
                            this.navigateToFinish()
                        }
                    }}
                >
                    <Text
                        style={styles.buttonText}
                    >
                        Incorrect
                    </Text>
                </TouchableOpacity>
                {(questions.length>currentQuestion)&&
                    <TouchableOpacity
                        onPress={()=>{this.setState({currentQuestion:this.state.currentQuestion+1})}}
                    >
                        <Text>Next</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems:'center'
    },
    question:{
        fontSize:24,
        padding:20,
        textAlign:'center'
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

export default Quiz