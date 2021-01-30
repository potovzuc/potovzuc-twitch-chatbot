import tmi from 'tmi.js'
import { BOT_USERNAME , OAUTH_TOKEN, CHANNEL_NAME, BLOCKED_WORDS } from './constants'

const options = {
	options: { debug: true },
	connection: {
    reconnect: true,
    secure: true,
    timeout: 180000,
    reconnectDecay: 1.4,
    reconnectInterval: 1000,
	},
	identity: {
		username: BOT_USERNAME,
		password: OAUTH_TOKEN
	},
	channels: [ CHANNEL_NAME ]
}

const client = new tmi.Client(options)

client.connect()

// events
client.on('disconnected', (reason) => {
  onDisconnectedHandler(reason)
})

client.on('connected', (address, port) => {
  onConnectedHandler(address, port)
})

client.on('hosted', (channel, username, viewers, autohost) => {
  onHostedHandler(channel, username, viewers, autohost)
})

client.on('subscription', (channel, username, method, message, userstate) => {
  onSubscriptionHandler(channel, username, method, message, userstate)
})

client.on('raided', (channel, username, viewers) => {
  onRaidedHandler(channel, username, viewers)
})

client.on('cheer', (channel, userstate, message) => {
  onCheerHandler(channel, userstate, message)
})

client.on('giftpaidupgrade', (channel, username, sender, userstate) => {
  onGiftPaidUpgradeHandler(channel, username, sender, userstate)
})

client.on('hosting', (channel, target, viewers) => {
  onHostingHandler(channel, target, viewers)
})

client.on('reconnect', () => {
  reconnectHandler()
})

client.on('resub', (channel, username, months, message, userstate, methods) => {
  resubHandler(channel, username, months, message, userstate, methods)
})

client.on('subgift', (channel, username, streakMonths, recipient, methods, userstate) => {
  subGiftHandler(channel, username, streakMonths, recipient, methods, userstate)
})

// event handlers

client.on('message', (channel, userstate, message, self) => {
  if(self) {
    return
  }

  if (userstate.username === BOT_USERNAME) {
    console.log(`Not checking bot's messages.`)
    return
  }

	if(message.toLowerCase() === 'madzzyZz Gaijin madzzyZz Fred madzzyZz Nirenu madzzyZz VCan madzzyZz Yankas madzzyZz Gaijin madzzyZz Fred madzzyZz Nirenu madzzyZz VCan madzzyZz Yankas madzzyZz Gaijin madzzyZz Fred madzzyZz Nirenu madzzyZz VCan madzzyZz Gaijin madzzyZz Fred madzzyZz Nirenu madzzyZz VCan madzzyZz Yankas madzzyZz Gaijin madzzyZz Fred madzzyZz Nirenu madzzyZz VCan madzzyZz Yankas madzzyZz Gaijin madzzyZz Fred madzzyZz Nirenu madzzyZz VCan') {
    hello(channel, userstate)
    return
  }

  onMessageHandler(channel, userstate, message, self)
})

function onMessageHandler (channel, userstate, message, self) {
  checkTwitchChat(userstate, message, channel)
}

function onDisconnectedHandler(reason) {
  console.log(`Disconnected: ${reason}`)
}

function onConnectedHandler(address, port) {
  console.log(`Connected: ${address}:${port}`)
}


//Bize host
/*function onHostedHandler (channel, username, viewers, autohost) {
  client.say(channel,
    `@${username} ${viewers} kişi ile bizi onurlandırdı`
  )
}*/


//Raid
/*function onRaidedHandler(channel, username, viewers) {
  client.say(channel,
    `@${username} bize ${viewers} kişi ile savaş açtı Kappa`
  )
}*/


//Abone olma
function onSubscriptionHandler(channel, username, method, message, userstate) {
  client.say(channel,
    `madzzyHelal madzzyHelal madzzyHelal @${username} madzzyHelal madzzyHelal madzzyHelal`
  )
}


//Bit gönderimi
/*function onCheerHandler(channel, userstate, message)  {
  client.say(channel,
    `${userstate.username} ${userstate.bits} bit ne madzzyKalp`
  )
}*/

//Sub gift
/*function onGiftPaidUpgradeHandler(channel, username, sender, userstate) {
  client.say(channel,
    `${username} Hediye aboneliğinine devam etti madzzyKalp`
  )
}*/

//Host
function onHostingHandler(channel, target, viewers) {
  client.say(channel,
    `${viewers} kişi ile ${target}'a hostlanıyoruz madzzyKalp`
  )
}

function reconnectHandler () {
  console.log('Reconnecting...')
}

/*function resubHandler(channel, username, months, message, userstate, methods) {
  const cumulativeMonths = userstate['msg-param-cumulative-months']
  client.say(channel,
    `@${username} ${cumulativeMonths} milyar milyor yıl ne madzzyHelal`
  )
}*/


//Sub gift
/*function subGiftHandler(channel, username, streakMonths, recipient, methods, userstate) {

  client.say(channel,
    `${username} ${recipient} 'a abonelik hediye etmiş madzzyKalp madzzyHelal `
  )
}*/

// commands

function hello (channel, userstate) {
  client.say(channel, `madzzyZz Gaijin madzzyZz Fred madzzyZz Nirenu madzzyZz VCan madzzyZz Yankas madzzyZz Gaijin madzzyZz Fred madzzyZz Nirenu madzzyZz VCan madzzyZz Yankas madzzyZz Gaijin madzzyZz Fred madzzyZz Nirenu madzzyZz VCan madzzyZz Gaijin madzzyZz Fred madzzyZz Nirenu madzzyZz VCan madzzyZz Yankas madzzyZz Gaijin madzzyZz Fred madzzyZz Nirenu madzzyZz VCan madzzyZz Yankas madzzyZz Gaijin madzzyZz Fred madzzyZz Nirenu madzzyZz VCan`)
}

/*function checkTwitchChat(userstate, message, channel) {
  console.log(message)
  message = message.toLowerCase()
  let shouldSendMessage = false
  shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLowerCase()))
  if (shouldSendMessage) {
    // tell user
    client.say(channel, `@${userstate.username}, afedersiniz! Mesajınız silindi.`)
    // delete message
    client.deletemessage(channel, userstate.id)
  }
}
*/