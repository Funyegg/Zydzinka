//Initialize the bot
const discord = require("discord.js-selfbot");
const bot = new discord.Client();
bot.login("self bot token");
bot.on("ready",()=>{
    bot.user.setActivity("with your mother in bed")
})

//Initialize the variables
var going = false;
var cooldown = false;
var sent = false;
var owner = "your id";
var responses = ["Add me and check my bio","Come see my bio (add me)","Link in my bio (add me!)","Server in bio, add me","Friend me + check my bio for slav server","Join the fune gang (my bio + friend me)"];
var prefix = "us!";
var torespond = "247283454440374274"; //Respond to yggdrasil
var keys = ["userphone","userphone."]; //Which messages from the userphone bot trigger it

//Commands
var commands = {
help:function(details,params){
details.channel.send("```\nŻydzinka VERSION 0.6.0 BETA\n\nCommands:\n"+prefix+"help\n"+prefix+"test\n"+prefix+"spam\n\nCredits to Fune!\n```");
},
test:function(details,params){
details.channel.send("Bot is online");
},
spam:function(details,params){
if(details.author.id !== owner) return;
going ? going=false : going=true
going ? details.channel.send("Activated!") : details.channel.send("Dectivated!")
target = details.channel
},
restart:function(details,params){
if(details.author.id !== owner) return;
details.channel.send("Goodnight!")
process.kill()
},
}

//Message Handler
bot.on("message",msg=>{
    //Command Handler
    if(msg.content.startsWith(prefix)){
        if(msg.content.includes(" ")){
            comd=msg.content.substring(prefix.length,msg.content.indexOf(" "))
            params = msg.content.substring(msg.content.indexOf(" ")+1,msg.content.lenght).split(" ")
        }else{
            comd=msg.content.substring(prefix.length,msg.content.length)
            params = [""];
        }
        try{
            commands[comd](msg,params)
        }catch(exc){
            msg.channel.send("Command doesn't exist");
        }
    }

    if(going && msg.author.id == torespond){
        if(msg.content.includes(keys[0]) && msg.content.includes(keys[1]) == false){
            setTimeout(()=>{
                if(sent) return
                cooldown = true;
                msg.channel.send(responses[Math.floor(Math.random()*responses.length)])
                sent = true;
                setTimeout(()=>{
                   cooldown = false;
                },12500)
                setTimeout(()=>{
                    msg.channel.send("--hangup")
                    setTimeout(()=>{
                    sent = false;
                    },1000)
                },1000)
            },1000)
        }
    }
})

setInterval(()=>{
    if(going && cooldown == false && sent == false){
        target.send("--userphone")
        cooldown = true;
    }
},1000)
