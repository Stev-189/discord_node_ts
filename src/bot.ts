import {config} from 'dotenv';
import { Client, Message } from 'discord.js'
import {prefix} from './config.json'
config();

const client:Client= new Client()

client.on('ready', ()=>{
    console.log('Bot is Ready');
})

client.on('message', async (message: Message)=>{
    // console.log(message.content);
    if(message.content.startsWith(`${prefix}ping`)){
        // console.log('pong');
        // message.channel.send('pong')//Para el canal
        // message.reply('Pong')// solo al usuario que envio el emensaje
    }
    if(message.content.startsWith(`${prefix}kick`)){
        if(message.member?.hasPermission(['KICK_MEMBERS'])){
            const menber = message.mentions.members?.first();
            if(menber){
                const kickedMenber=await menber.kick()
                console.log(kickedMenber.user.username);
                return message.channel.send(`${kickedMenber} fue expulsado`)
            }
        }
        return message.reply('Tu no tines loa permisos')
    }
    if(message.content.startsWith(`${prefix}deletemessages`)){
        await message.channel.messages.fetchPinned()
        .then(()=>{
            message.channel.delete()
        })
        .catch((error)=>console.log(error))
        
    }
    
})


client.login(process.env.DISCORD_TOKEN)