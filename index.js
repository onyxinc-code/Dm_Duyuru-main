const { Client, Intents, MessageEmbed } = require('discord.js');
const config = require('./config.json');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES
    ]
});

const prefix = config.prefix;
const statuses = config.statuses;
const timers = config.timers;
const owners = config.owners;

client.on("ready", () => {
    console.log(`Giriş Yapıldı: ${client.user.tag}`);
    client.user.setStatus("dnd");
    const timeing = Math.floor(timers * 1000);
    setInterval(() => {
        const lengthesof = statuses.length;
        const amounter = Math.floor(Math.random() * lengthesof);
        client.user.setActivity(statuses[amounter], { type: 'PLAYING' }); 
    }, timeing);
});


client.on("messageCreate", message => {
    if (message.content.toLowerCase().startsWith(prefix + "help".toLowerCase())) {
        message.react("💖");
        const help = new MessageEmbed()
            .setTimestamp()
            .setAuthor({
                name: message.author.username,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`> Prefix : \`${prefix}\``)
            .addFields(
                { name: "Komutlar", value: `**\`${prefix}dm\`** Sunucudaki Herkese Özelden Mesaj Atar. \n **\`${prefix}odm\`** Sunucudaki Aktif Olan Kişilere Mesaj Atar. \n **\`${prefix}ping\`** Botun pingini gösterir` }
            );
        message.channel.send({ embeds: [help] });
    }
});

client.on("messageCreate", async message => {
    if (message.content.startsWith(prefix + "odm")) {
        if (!message.member.permissions.has("ADMINISTRATOR")) return;

        message.delete();
        const args = message.content.split(" ").slice(1).join(" ");
        const noargs = new MessageEmbed()
            .setAuthor({
                name: message.author.username,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .addFields(
                { name: `Error :x:`, value: `Lütfen duyurmak istediğiniz mesajı yazınız!` }
            )
            .setTimestamp();
        if (!args) return message.channel.send({ embeds: [noargs] });

        const initialMessage = await message.channel.send(`Online Üyelere Mesajı Gönderiyorum... (biraz zaman alabilir)`);
        console.log(`Komut Kullanıldı: +odm ${args}`); 
		
        let sentCount = 0;
        let failedCount = 0;
        let botCount = 0;

        const members = message.guild.members.cache
            .filter(m => m.presence && m.presence.status !== "offline");

        const sendPromises = members.map(m => {
            if (m.user.bot) {
                botCount++;
                return Promise.resolve(); 
            }

            const dmEmbed = new MessageEmbed()
                .setTitle("Şu Sunucudan Yeni Duyurun Var")
                .setDescription(args)
                .setFooter({
                    text: `Sunucu: ${message.guild.name}`,
                    iconURL: message.guild.iconURL()
                })
                .setTimestamp();

            return m.send({ embeds: [dmEmbed] })
                .then(() => {
                    sentCount++;
                    console.log(`Gönderildi : ${m.user.tag} ✅`);
                })
                .catch(() => {
                    failedCount++;
                    console.log(`Gönderilemedi : ${m.user.tag} ❌ `);
                });
        });

        await Promise.all(sendPromises);

        await initialMessage.delete();

        const embed = new MessageEmbed()
            .setAuthor({
                name: message.author.username,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setDescription(
                `📬 : Mesajınız toplam **\`${sentCount}\`** **online** kişiye gönderildi! \n` +
                `🛑 : **\`${failedCount}\`** kişiye gönderilemedi. \n` +
                `🤖 : **\`${botCount}\`** bota gönderilmedi!`
            )
            .setTimestamp();

        await message.channel.send({ embeds: [embed] });
    }
});

client.on("messageCreate", async message => {
    if (message.content.startsWith(prefix + "dm")) {
        if (!message.member.permissions.has("ADMINISTRATOR")) return;

        message.delete();
        const args = message.content.split(" ").slice(1).join(" ");
        const noargs = new MessageEmbed()
            .setAuthor({
                name: message.author.username,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .addFields(
                { name: `Error :x:`, value: `Lütfen duyurmak istediğiniz mesajı yazınız!` }
            )
            .setTimestamp();
        if (!args) return message.channel.send({ embeds: [noargs] });

        const infoMessage = await message.channel.send(`Mesaj tüm üyelere gönderiliyor... (biraz zaman alabilir)`);
        console.log(`Komut Kullanıldı: +dm ${args}`); 
		 
        let sentCount = 0;
        let failedCount = 0;
        let botCount = 0;
        const promises = [];

        message.guild.members.cache.forEach(m => {
            if (m.user.bot) {
                botCount++;
                return;
            }

            const dmEmbed = new MessageEmbed()
                .setTitle("Yeni Duyuru!")
                .setDescription(args)
                .setFooter({
                    text: `Sunucu: ${message.guild.name}`,
                    iconURL: message.guild.iconURL()
                })
                .setTimestamp();

            promises.push(
                m.send({ embeds: [dmEmbed] })
                    .then(() => {
                        sentCount++;
                        console.log(`Gönderildi : ${m.user.tag} ✅`);
                    })
                    .catch(() => {
                        failedCount++;
                        console.log(`Gönderilemedi : ${m.user.tag} ❌ `);
                    })
            );
        });

        await Promise.all(promises);

        await infoMessage.delete();

        const embed = new MessageEmbed()
            .setAuthor({
                name: message.author.username,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setDescription(
                `📬 : Mesajınız toplam \`${sentCount}\` kişiye gönderildi. \n 🛑\`${failedCount}\` kişiye gönderilemedi. \n 🤖\`${botCount}\` bota gönderilmedi!`
            )
            .setTimestamp();

        await message.channel.send({ embeds: [embed] });
    }
});

client.on("messageCreate", async message => {
    if (message.content.startsWith(prefix + "ping")) {
        message.channel.send("Pinging..").then(m => {
            m.edit(
                `\`\`\`javascript\nDiscord Bot : ${Math.round(client.ws.ping)} ms\n\`\`\` `
            );
        });
    }
});

client.login(config.token);
