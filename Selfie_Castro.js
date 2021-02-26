/*
    Dedezin SelfieBOT v0.2A
    Selfizin Brabo
    https://discord.gg/dkzada
*/
console.log('=========================================================');
console.log('   Castro Selfbot ');
console.log('        ');
console.log('        ');
console.log('  Quer nitro gratis?   ');
console.log('  Brota discord.gg/E8RsRhycwK ');
console.log('=========================================================');



//Configurações do BOT
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./Selfie_Config.json");
const delay = ms => new Promise(res => setTimeout(res, ms));



//Mensagem quando o BOT Estiver Online
client.on('ready', () => {
  console.log(`SelfieBOT foi iniciado, alcançando ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`);
  client.user.setPresence({ game: { name: config.Status, type: 0}});
});



//Mensagem de Bem vindo
client.on('guildMemberAdd', async member => {
  console.log(`${member.user.tag} entrou no servidor ${member.guild.name}.`);
    member.send(config.Mensagem)
    .catch(error => console.log(`Erro ao enviar mensagem para ${member.user.tag}.`));
});



//Mensagem para todos os membros do grupo.
client.on('message', async msg => {
  if (msg.author.id == client.user.id && msg.guild && msg.content.startsWith(`${config.Gatilho}`)) {
    console.log(`Mensagem gatilho detectada, enviando mensagem para todos os membros do servidor ${msg.guild.name}`);
    msg.guild.members.forEach(member => {
      if (member.id != client.user.id && !member.user.bot) {
        member.send(`${config.Mensagem}`)
          .catch(error => {
            console.log(`Erro ao enviar mensagem para ${member.user.tag}, envio pausado por 20 segundos.`);
            delay(5000000);
          });
        console.log(`Membro ${member.user.tag} recebeu a mensagem.`);
      }
    });
  }
});



//Controle de Erro
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));


//Roda o BOT
client.login(config.Token);