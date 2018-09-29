const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
	token:'xoxb-441698061667-441620863940-17WR03OjN8GO74YhVupAhX1l',
	name:'JokeBot',	
});
//Presonal Details

var P_Details={"Name":"praneeth","School":"KRRS"}
const matcher = require('./matcher');
//start Handler
bot.on('start',()=>{
	const params={
	icon_emoji:':smiley'
	}
	bot.postMessageToChannel('general','Get Ready to Laugh with @JokeBot!',params);
});

// Error Handler
bot.on('error', err => console.log(err));

//Message Hangler
bot.on('message',(data)=>{
	if(data.type!=='message'){
		return;
	}
	handleMessage(data.text);
});



//Response to data
function handleMessage(message){
if(message.includes(' c')){

	chuckJoke();
}
else if(message.includes(' y')){
yomamaJoke();
	
}	
else if(message.includes(' r')){
	randomJoke();
}
else if(message.includes(' help')){
	runHelp();
}else if(message.includes(' Details')){
	matcher(message,data=>{
			const params={
			icon_emoji:':laughing:'
			}
			const Detail = data.entities.Detail;
			bot.postMessageToChannel('general',`${P_Details[Detail]}`,params);
	})

}
}


//Tell a Chucl Norris Joke
function chuckJoke(){
	axios.get('http://api.icndb.com/jokes/random').then(res=>{
	const joke=res.data.value.joke;
		const params={
	icon_emoji:':laughing:'
	}
	bot.postMessageToChannel('general',`Chuck Norris: ${joke}`,params);
	})
}

//Tell a Yomama Joke
function yomamaJoke(){
	axios.get('https://api.yomomma.info/').then(res=>{
	const joke=res.data.joke;
		const params={
	icon_emoji:':laughing:'
	}
	bot.postMessageToChannel('general',`Yo Mamma: ${joke}`,params);
	})
}

//Tell a random Joke
function randomJoke(){
	const rand = Math.floor(Math.random()*2)+1;
	if(rand===1){
	chuckJoke();
	}
	else if(rand===2){
		yomamaJoke();
	}
}


//Show help Text


function runHelp(){
	const params={
	icon_emoji:':question:'
	}
	bot.postMessageToChannel('general',` Type @jokebot with either 'c' or 'y' or 'r'`,params);
}