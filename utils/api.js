import {AsyncStorage} from 'react-native'
import {Notifications,Permissions} from 'expo'
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

const NOTIFICATION_KEY='cardsstorekey:notifications'

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification() {
    return{
        title:"Take your dose of cards for today!",
        body:"You haven't taken even one Quiz today!",
        android:{
            sound:true,
            priority:'high',
            sticky:false,
            vibrate:true
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data=>{
            if(data===null){
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status})=>{
                        if(status==='granted'){
                            Notifications.cancelAllScheduledNotificationsAsync()
                            let tomorrow=new Date()
                            //tomorrow.setSeconds(tomorrow.getSeconds() + 10)
                            tomorrow.setDate(tomorrow.getDate()+1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time:tomorrow,
                                    repeat:'day'
                                }
                            )
                            AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(true))
                        }
                    })
            }
        })
    }