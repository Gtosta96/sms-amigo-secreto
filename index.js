const totalvoice = require('totalvoice-node');
const client = new totalvoice("token");

// lista de participantes
let payload = [
  {name: 'Jaque',      cel: '-', gender: 'F' },
  {name: 'Thaina',     cel: '-', gender: 'F' },
  {name: 'Julinha',    cel: '-', gender: 'F' },
  {name: 'Iza',        cel: '-', gender: 'F' },
  {name: 'Agatha',     cel: '-', gender: 'F' },
  {name: 'Gui',        cel: '-', gender: 'M' },
  {name: 'Jhonson',    cel: '-', gender: 'M' },
  {name: 'Bruna',      cel: '-', gender: 'F' },
  {name: 'Emilly',     cel: '-', gender: 'F' },
  {name: 'Gabriel',    cel: '-', gender: 'M' },
  {name: 'Veronica',   cel: '-', gender: 'F' },
  {name: 'Joel',       cel: '-', gender: 'M' },
  {name: 'Thalisson',  cel: '-', gender: 'M' },
  {name: 'Matheus',    cel: '-', gender: 'M' },
  {name: 'Renatinho',  cel: '-', gender: 'M' },
  {name: 'Vitor',      cel: '-', gender: 'M' },
  {name: 'Jean',       cel: '-', gender: 'M' },
  {name: 'Marcela',    cel: '-', gender: 'F' },
];

// embaralha os participantes
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// define quem pegou quem
function assign(array) {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    const p1 = array[i];
    const p2 = array[i + 1] || array[0];
  
    result.push({ p1, p2 });
  }
  
  return result;
}

// cria objeto pra ser enviado pela lib "totalvoice-node"
function makeBodies(array) {
  return array.map((assign) => {
    const msg = assign.p2.gender === 'M' ? 'seu amigo secreto é' : 'sua amiga secreta é';

    const body = {
      phone: assign.p1.cel,
      message: `${assign.p1.name}, ${msg}: ${assign.p2.name}`,
    }

    // fs.writeFileSync(`./sorteio/${assign.p1.name}.txt`, body.message);
    return body;
  })
}

function send(array) {
  array.forEach((body, i) => {
    setTimeout(() => {
      client.sms.enviar(body.phone, body.message)
        .then((data) => console.log('sucesso', i))
        .catch((error) => console.log('error', error))
    }, 3000 * i);
  });
}

/**
 * RUN!
 */

// embaralha a galera 3x só pra garantir
shuffle(payload);
shuffle(payload);
shuffle(payload);

let result = assign(payload);
const bodies = makeBodies(result);

send(bodies);