import express from 'express'
import morgan from 'morgan'

const app = express()
const PORT = process.env.PORT || 3001;

let personas = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :results'))

//RUTAS

app.get('/api/persons', (req, res) => {
  res.json(personas);
})

app.post('/api/persons', (req,res) => {
  const body = req.body;
  if(!body.number || !body.name){
    return res.status(400).json({

    });
  };

  if(personas.some(p => p.name === body.name)){
    return res.json()
  }

  personas.push({id: generarId(), name: body.name, number: body.number });
  res.json(personas);
})

app.get('/api/persons/:id', (req,res) => {
    const id = req.params.id;
    const personaBuscada = personas.find(p => p.id == id);
    console.log(personaBuscada);
    if(personaBuscada){
        return res.json({...personaBuscada});
    }
    res.status(404).end();
})

app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id);
    personas = personas.filter(p => !(p.id === id));
    res.json(personas);
})

app.get('/info', (req,res) => {
    const hora = (new Date()).toString();
    res.send("la agenda tiene información para " + personas.length + " personas <br>" + hora);
})

//FIN RUTAS

function generarId(){
    return Math.max(...personas.map(p => p.id)) + 1;
}

morgan.token('results', function (req, res) { return JSON.stringify(req.body) })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})