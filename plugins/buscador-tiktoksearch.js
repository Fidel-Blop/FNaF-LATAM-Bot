import axios from 'axios';
const {
  proto,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  generateWAMessageContent,
  getDevice
} = (await import("@whiskeysockets/baileys")).default;

let handler = async (message, { conn, text, usedPrefix, command }) => {
  const firma = '🎭 *Respaldado por FNAF LATAM* 🎭';

  if (!text) {
    return conn.reply(message.chat, `🔍 *Debes ingresar un término para buscar en TikTok.*\n\n📌 _Ejemplo:_ ${usedPrefix + command} animatronics\n\n${firma}`, message, rcanal);
  }

  async function createVideoMessage(url) {
    const { videoMessage } = await generateWAMessageContent({
      video: { url }
    }, {
      upload: conn.waUploadToServer
    });
    return videoMessage;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  try {
    await conn.reply(message.chat, '🕒 *Buscando videos de TikTok...*, por favor espera unos segundos.', message, {
      contextInfo: { 
        externalAdReply: { 
          mediaUrl: null, 
          mediaType: 1, 
          showAdAttribution: true,
          title: '🎬 Explorando TikToks...',
          body: dev,
          previewType: 0, 
          thumbnail: avatar,
          sourceUrl: redes 
        }
      }
    });

    let results = [];
    let { data } = await axios.get("https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=" + text);
    let searchResults = data.data;
    shuffleArray(searchResults);
    let topResults = searchResults.splice(0, 7);

    for (let result of topResults) {
      results.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: dev }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: `🎵 ${result.title}`,
          hasMediaAttachment: true,
          videoMessage: await createVideoMessage(result.nowm)
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
      });
    }

    const messageContent = generateWAMessageFromContent(message.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `✨ *Resultados para:* "${text}"`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: firma
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: [...results]
            })
          })
        }
      }
    }, {
      quoted: message
    });

    await conn.relayMessage(message.chat, messageContent.message, {
      messageId: messageContent.key.id
    });

  } catch (error) {
    conn.reply(message.chat, `❌ *Ha ocurrido un error inesperado:* ${error.message}\n\n${firma}`, message);
  }
};

handler.help = ["tiktoksearch <txt>"];
handler.register = true;
handler.group = true;
handler.tags = ["buscador"];
handler.command = ["tiktoksearch", "ttss", "tiktoks"];

export default handler;
