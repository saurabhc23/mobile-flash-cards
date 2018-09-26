import {AsyncStorage} from 'react-native'
const CARDS_STORE_KEY='cardsstorekey:cards'
let decks={
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }



export function getDecks() {
    return AsyncStorage.getItem(CARDS_STORE_KEY).then((data) => {
        if(JSON.parse(data)!==null) {
            return JSON.parse(data)
        }
        else{
            AsyncStorage.setItem(CARDS_STORE_KEY,JSON.stringify(decks))
            return AsyncStorage.getItem(CARDS_STORE_KEY).then((data)=>{
                return JSON.parse(data)
            })
        }
    })
}

export function getDeck(title){
    return getDecks().then((data)=>{
        return data[title];
    })
}


export function saveDeckTitle(title){
    return AsyncStorage.mergeItem(
        CARDS_STORE_KEY,
        JSON.stringify({[title]:{
            title,
            questions:[]
        }})
    )
}



export function addCardToDeck(title, question,answer){
    getDeck(title).then(data=>{
        if(data.questions.length>0){
            AsyncStorage.mergeItem(
                CARDS_STORE_KEY,
                JSON.stringify({
                    [title]:{
                        title,
                        questions:[...data.questions,{question,answer}]
                    }
                })
            )
        }
        else{
            AsyncStorage.mergeItem(
                CARDS_STORE_KEY,
                JSON.stringify({
                    [title]:{
                        title,
                        questions:[{question,answer}]
                    }
                })
            )
        }
    })
}