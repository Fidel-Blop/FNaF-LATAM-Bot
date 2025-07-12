let handler = (m, { usedPrefix, command, text }) => {
  if (!text) return conn.reply(m.chat, `🎮 *[FNaF LATAM - ZODIACO]*\n\n🔧 Ingresá tu fecha de nacimiento con el siguiente formato:\n> Ejemplo: *${usedPrefix + command} 2007 06 01*`, m)

  const date = new Date(text)
  if (date == 'Fecha invalida, prueba con el siguiente formato AAAA MM DD Ejemplo: 2003 02 07 ') throw date

  const d = new Date()
  const [yearNow, monthNow, dayNow] = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
  const birth = [date.getFullYear(), date.getMonth() + 1, date.getDate()]

  const zodiac = getZodiac(birth[1], birth[2])
  const ageD = new Date(d - date)
  const age = ageD.getFullYear() - new Date(1970, 0, 1).getFullYear()

  const birthday = [yearNow + (birth[1] < monthNow), ...birth.slice(1)]
  const checkBirthday = monthNow === birth[1] && dayNow === birth[2] ? `${age} 🎉 ¡Feliz cumpleaños, sobreviviente! 🎂` : `${age} años 🧸`

  const message = `
🕯️ *[REPORTE FNaF - INFORME ZODIACAL]* 🕯️

📅 Fecha de nacimiento:
> ${birth.join('-')}

🎂 Próximo cumpleaños:
> ${birthday.join('-')}

📈 Edad actual:
> ${checkBirthday}

🔮 Signo zodiacal:
> ${zodiac}

🗃️ Registro archivado en el sistema de vigilancia.
`.trim()

  m.reply(message)
}

handler.help = ['zodiac *2002 02 25*']
handler.tags = ['fun']
handler.group = true
handler.register = true
handler.command = ['zodia', 'zodiac']

export default handler

const zodiak = [
  ["Capricornio", new Date(1970, 0, 1)],
  ["Acuario", new Date(1970, 0, 20)],
  ["Piscis", new Date(1970, 1, 19)],
  ["Aries", new Date(1970, 2, 21)],
  ["Tauro", new Date(1970, 3, 21)],
  ["Geminis", new Date(1970, 4, 21)],
  ["Cancer", new Date(1970, 5, 22)],
  ["Leo", new Date(1970, 6, 23)],
  ["Virgo", new Date(1970, 7, 23)],
  ["Libra", new Date(1970, 8, 23)],
  ["Scorpion", new Date(1970, 9, 23)],
  ["Sagitario", new Date(1970, 10, 22)],
  ["Capricornio", new Date(1970, 11, 22)]
].reverse()

function getZodiac(month, day) {
  let d = new Date(1970, month - 1, day)
  return zodiak.find(([_, _d]) => d >= _d)[0]
}
