import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Alert, Button, Container, Input, Label, Row,Col, Table,FormGroup } from 'reactstrap';
import { useEffect, useState } from 'react';
import Level1 from './Level1';
import Level2 from './Level2';
import Level3 from "./Level3";
import Level4 from "./Level4";
import Level5 from "./Level5";
import Level6 from "./Level6";
import Level7 from "./Level7";
import Level8 from "./Level8";
let pole =[]; // zde se kontroluje aby nebylo vybráno stejné náhodné číslo
let neobsahuje; // ukládá převrácenou hodnotu boolean z pole.includes(nahodneCislo) >>> !pole.includes(nahodneCislo)
let polevysledku =[]; // ukládají se objekty - jake slovo cz, jake eng, odpoved , dobre ci spatne

let i = 0; // počitadlo otázek
let good =0; // počítadlo dobrých odpovědí
let bad = 0; // počítadlo špatných odpovědí
let rndMax=0;
let x;

function App() {
let rnd;
const [level,setLevel] = useState();
const [menuVisible,setMenuVisible] = useState(true);
const [random,setRandom] = useState(0);
const [filtr,setFiltr]= useState("");
const [odpoved,setOdpoved] = useState("") ;
const [vysledek,setVysledek] = useState("") ;
const [showAlert,setShowAlert] = useState(false)
const [message,setMessage] = useState("")
const [endTest,setEndTest] = useState(false)
const [pocet,setPocet] = useState(0);
const [ok,setOk] = useState(false);

//construktor výsledků testu
function vysledky(id, cz, eng, ans,color) {
  this.id = id+1;
  this.cz = cz;
  this.eng = eng;
  this.ans = ans;
  this.color = color;
}

// klávesa enter odesílá data
const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    potvrdit();
  }
}


// vyber slovo z pole objektů daného levlu
const generateNewWord = () => {
  do{
  rnd = Math.round(Math.random() * (level.length-1) +1);
  neobsahuje = !pole.includes(rnd);
}
  while(!neobsahuje) // porovnej s polem pokud najdes stejné dělej znova random dokud nebudeš mít jiné neopakující se nové
  pole[i] = rnd;
  
  setRandom(rnd);
  
  const vybraneSlovo = level.find(item => item.id === rnd);
  setFiltr(vybraneSlovo.cz);
  setVysledek(''); // Vyčistit input
}

const submit = () => {
  setMenuVisible(false);
  generateNewWord();
}

// porovnej vybrané slovo a odpověď uživatele
const potvrdit = () => {
  const vybraneSlovo = level.find(item => item.id === random);
  
  const odpovedLowerCase = odpoved.toLowerCase();
  const vybraneSlovoLowerCase = vybraneSlovo.eng.toLowerCase();
// správná odpověď
  if (odpovedLowerCase === vybraneSlovoLowerCase) {
    setOk(true)
    setVysledek("správně");
    generateNewWord();
    setTimeout(() => {
      setOk(false);
    }, 1500);
    good++
    polevysledku.push(new vysledky(i, vybraneSlovo.cz, vybraneSlovo.eng, odpovedLowerCase,"ok"));
  } 
  // špatná odpověď
  else {
    bad++;
    setVysledek("chyba");
    setShowAlert(true);
    setMessage(vybraneSlovo.cz + " = " + vybraneSlovo.eng);
    polevysledku.push(new vysledky(i, vybraneSlovo.cz, vybraneSlovo.eng, odpovedLowerCase,"fail"));
    generateNewWord();
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  }
// navyšuje počet kol o 1
  i++;
// pokud je počet roven maximálnímu počtu slov v testu tak se test ukončí a vyhodnotí
  if (i === pocet) {
    setEndTest(true);
  }
  setOdpoved('');
}

  return (
    <div>
  <div className={menuVisible? "": "hide"}>
    <Container>
    <h4 className='center'>** Testovací provoz **</h4>
    <h1 className='center'>Počítačová angličtina</h1>
    <br/>
    <h4 className='center'>Zvolte si úroveň</h4>
    <FormGroup >
      <Row>
        <Col xs={3}> <Input type="radio"  onChange={()=>setLevel(Level1)} name='lvl' value={"lvl1"}></Input>{"   "}<Label  check for='lvl1'>Základy</Label></Col>
        <Col xs={3}><Input type="radio"  onChange={()=>setLevel(Level2)} name='lvl' value={"lvl2"}></Input>{"   "}<Label  check for='lvl2'>Windows, Word, Excel</Label></Col>
        <Col xs={3}> <Input type="radio"  onChange={()=>setLevel(Level3)} name='lvl' value={"lvl3"}></Input>{"   "}<Label  check for='lvl3'>Sítě 1</Label></Col>
        <Col xs={3}><Input type="radio" onChange={()=>setLevel(Level4)} name='lvl' value={"lvl4"}></Input>{"   "}<Label check for='lvl4'>Sítě 2</Label></Col>
      </Row>
   
    
   
    
    <br/>
    
    <Row>
    <Col xs={3}> <Input type="radio" onChange={()=>setLevel(Level5)} name='lvl' value={"lvl5"}></Input>{"  "}<Label  check for='lvl5'>Sítě 3 (**)</Label></Col>
    
    <Col xs={3}><Input type="radio" onChange={()=>setLevel(Level6)} name='lvl' value={"lvl6"}></Input>{"  "}<Label  check for='lvl5'>Sítě 4 (***)</Label> </Col>
    
    <Col xs={3}><Input type="radio" onChange={()=>setLevel(Level7)} name='lvl' value={"lvl7"}></Input>{"  "}<Label  check for='lvl5'>Win server</Label> </Col>
    
    <Col xs={3}><Input type="radio" onChange={()=>setLevel(Level8)} name='lvl' value={"lvl8"}></Input>{"  "}<Label check for='lvl5'>Programing</Label> </Col>
    </Row>
    
    </FormGroup>
   <br></br>
   <h4 className='center'>Zvolte počet slov</h4>
   <FormGroup >
    <Row>
   <Col xs={3}><Input
          name="radio2"
          type="radio"
          
          value={10}
          check
          onChange={()=>setPocet(10)}
        />
        {' '}
        <Label >
          10 slov
        </Label> </Col>
   <Col xs={3}> <Input
         value={20}
         onChange={()=>setPocet(20)}
          name="radio2"
          type="radio"
        />
        {' '}
        <Label >
          20 slov
        </Label> </Col>
   <Col xs={3}>
        <Input
          name="radio2"
          type="radio"
          value={30}
          onChange={()=>setPocet(30)}
        />
        {' '}
        <Label check>
          30 slov
        </Label> </Col>
        <Col xs={3}><Input
          name="radio2"
          type="radio"
          
          value={50}
          check
          onChange={()=>setPocet(50)}
        />
        {' '}
        <Label >
          50 slov
        </Label> </Col> 
      
      
       
        </Row>
        </FormGroup>
        <Row><Col className='center'><Button disabled={!level || pocet === 0} color='success'  onClick={submit}>Začít test</Button></Col></Row>
    <Row> <p className='center'>* na mobilu misto tlacitka ok používat enter (neschovává se klávesnice)</p></Row>
    <Row> <p className='center'>** Konec test ukončí a vyhodnotí</p></Row>
    </Container>
    </div>
    <div className={endTest? "hide": ""}>
    <div className={menuVisible? "hide":""}>
    <Container>
      <Row>
        <Col>
        <h4 className='center'>Přelož do angličtiny : </h4>
        </Col>
      </Row>
      <Row>
        <Col>
        <h3 className='center czword'>{filtr}</h3>
        </Col>
      </Row>
      <Row><Col className='center'>
          <Input className='center inp' placeholder='anglické slovíčko' onChange={(e) => setOdpoved(e.target.value)} type='text' value={odpoved} onKeyPress={handleKeyPress}></Input>
          
          <Button onClick={()=>setEndTest(true)}>Konec</Button>
          <br/>
          <br/>
          <Button onClick={potvrdit}>OK</Button>
          <br/>
          <br/>
          {ok && <h3 className='ok center'>Správně</h3>}
          <Alert className="center"color='danger' isOpen={showAlert}>Chyba: {message}</Alert>
          </Col></Row>
        </Container>
    </div>
    </div>
    <div className={endTest? "" : "hide"}>
     <Container>
      <Row>
      <h1 className='center'>Výsledky</h1>
      </Row>
      <Row ><h3 className='center'>{`Z ${i} otázek bylo správně ${good} odpovědí. Úspěšnost ${Math.round((good/i)*100)} %`}</h3></Row>
      <Table responsive >
      <thead>
      <tr>
      <th>
        CZ
      </th>
      <th>
        ENG
      </th>
      <th>
        Vaše odpověď
      </th>
    </tr>
  </thead>
  <tbody>
  {polevysledku.map((neco)=>(
  <tr key={neco.id}
  className={
    neco.color === "fail"
      ? "table-danger"
      : "table-success"
  }>
      {/* <th >
        {neco.id}
      </th> */}
      <td scope="row">
      {neco.cz}
      </td>
      <td>
      {neco.eng}
      </td>
      <td>
      {neco.ans}
      </td>
    </tr>
    

      ))}  
      </tbody>
        </Table>
      <Row>
        <Col sm={4}>
        </Col>
        <Col className='center' sm={4}>
        <Button onClick={()=>window.location.reload()}>Zpět na start</Button>
        </Col>
        <Col sm={4}>
        </Col>
      </Row>
      </Container>
    </div>
    </div>
  );
}

export default App;
