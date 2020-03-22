import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
	apiKey: 'AIzaSyAQc03hjJerIPpiTNnvok8zpYm9Nz7OAIM',
	authDomain: 'vue-chat-27419.firebaseapp.com',
	databaseURL: 'https://vue-chat-27419.firebaseio.com',
	projectId: 'vue-chat-27419',
	storageBucket: 'vue-chat-27419.appspot.com',
	messagingSenderId: '226109763354',
	appId: '1:226109763354:web:6c8b884ed2aba08ce546a3'
}

export const db = firebase.initializeApp(firebaseConfig).firestore()
