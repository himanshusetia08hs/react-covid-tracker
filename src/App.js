// use of hooks and react keywords
import React, { useEffect, useState } from 'react';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// react-strap
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'
import Accordion from 'react-bootstrap/Accordion'

// readct-icons
import { FcGlobe } from "react-icons/fc";

// HTTP library, API 
import axios from "axios";

// components
import Header from './components/Header'
import Footer from './components/Footer'
import Datatable from './components/Datatable';

// utilities
import moment from 'moment';
import Columns from 'react-columns'
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";


// functional component
function App() {

  // hooks and destructuring of array
  const [latest, setLatest] = useState([])
  const [india, setIndia] = useState([])
  const [results, setResults] = useState([])
  const [searchStates, setSearchStates] = useState("")
  const [loading, setLoading] = useState(true)
  const [districts, setDistricts] = useState()

  // call to get data from disease.sh
  useEffect(() => {
    axios
      .all([
        axios.get("https://disease.sh/v2/all"),
        axios.get("https://api.covid19india.org/data.json"),
        axios.get("https://disease.sh/v2/countries/india"),
        axios.get("https://api.covid19india.org/state_district_wise.json")
      ])
      // assigning data in arrays after call to an API's
      .then(responseArr => {
        setLatest(responseArr[0].data)
        setResults(responseArr[1].data.statewise)
        setIndia(responseArr[2].data)
        setLoading(false)
        setDistricts(responseArr[3]);
      })
      .catch(err => {
        console.log("There is error in fetching data");
      });
  }, []);

  // preloader
  if (loading) {
    return loading;
  }

  // method for obtaining current date in IST 
  const date = new Date(parseInt(latest.updated))
  const lastUpdated = date.toString();

  // search method 
  const filterStates = results.filter(item => {
    // console.log("in filterstate" + item.state);
    return searchStates !== "" ? item.state.toLowerCase().includes(searchStates.toLowerCase()) : item
  })

  // displaying Accordion and Datatable
  const states = filterStates.map((data, i) => {
    if ((data.state === "Total") || (data.state === "State Unassigned")) {
      return null;
    }
    else if (districts) {
      // console.log(districts);
      // console.log(districts.data);

      return (

        // styling for each card
        <Card border="secondary" key={i} bg="dark" text="light" className="text-center" style={{ margin: "8px" }} >

          {/* layout and toggling of accordion */}
          <Accordion >

            <Card >

              {/* toggling on accordion */}
              <Accordion.Toggle as={Card.Header} eventKey="0" >
                <b style={{ color: "black" }}>{data.state}{" "}<img width="20ch" src="info.png" alt="info icon" /></b>
              </Accordion.Toggle>

              <Accordion.Collapse eventKey="0">
                <Datatable state={data.state} districts={districts} />
              </Accordion.Collapse>

            </Card>

          </Accordion>

          {/* Data rendeering on pocket of accordion */}
          <Card.Body>

            <Card.Text><b>Active: </b>{data.active}</Card.Text>
            <Card.Text>

              {/* {
                  data.deltaconfirmed !== 0 ? <Badge pill variant="primary"><small><i className="fas fa-arrow-up"/> {data.deltaconfirmed}</small></Badge> : <></>  
                } */}
              <b>Confirmed: </b>{data.confirmed}
            </Card.Text>
            <Card.Text><b>Deceased: </b>{data.deaths}</Card.Text>
            <Card.Text><b>Recovered: </b>{data.recovered}</Card.Text>

          </Card.Body>

        </Card>

      )
    }
    return null;
  })

  // layout array containing objects for positioning
  var layout = [{
    columns: 2,
    query: 'min-width: 400px'
  }, {
    columns: 3,
    query: 'min-width: 870px'
  }, {
    columns: 3,
    query: 'min-width: 1100px'
  }];

  // rendering method of main functional component
  return (
    <div>
      
      {/* Header component  */}
      <Header />

      {/* Displaying global and national total count: cases, deceased, recovered */}
      <CardDeck>

        {/* Cases card */}
        <Card bg="warning" text="white" className="text-center" style={{ margin: "10px" }}>
          <Card.Body>
            <Card.Title> <FcGlobe />{' '}{latest.cases} </Card.Title>
            <Card.Title > <b style={{ color: "black" }}> <img width="25ch" src="india.png" alt="indian flag icon" /> {' '} </b>
              {
                india.todayCases !== 0 ? <Badge pill variant="danger"><small><i className="fas fa-arrow-up" />{india.todayCases}</small></Badge> : <></>
              }
              {india.cases}
            </Card.Title>
          </Card.Body>
          <Card.Footer> <b>Cases</b> </Card.Footer>
        </Card>

        {/* Deceased card */}
        <Card bg="danger" text="white" className="text-center" style={{ margin: "10px" }}>
          <Card.Body>
            <Card.Title><FcGlobe />{' '}{latest.deaths}</Card.Title>
            <Card.Title><b style={{ color: "black" }}><img width="25ch" src="india.png" alt="indian flag icon" />{' '}</b>{india.deaths}</Card.Title>
          </Card.Body>
          <Card.Footer> <b>Deceased</b> </Card.Footer>
        </Card>

        {/* Recovered card */}
        <Card bg="success" text="white" className="text-center" style={{ margin: "10px" }}>
          <Card.Body>
            <Card.Title><FcGlobe />{' '}{latest.recovered}</Card.Title>
            <Card.Title><b style={{ color: "black" }}><img width="25ch" src="india.png" alt="indian flag icon" />{' '}</b>{india.recovered}</Card.Title>
          </Card.Body>
          <Card.Footer> <b>Recovered</b> </Card.Footer>
        </Card>

      </CardDeck>

      {/* Plotting the specific time/ moment */}
      <small style={{ color: "white" }}>Last updated {moment(lastUpdated).calendar()}</small>

      {/* form block for selecting the states manually */}
      <Form>
        <Form.Group controlId="formGroupSearch" >
          <Form.Control type="text" placeholder="Search a state..." onChange={e => setSearchStates(e.target.value)} />
          <small style={{ color: "white" }}>{' '}[Tap on state for district details]</small>
        </Form.Group>
      </Form>

      {/* In-built tag used for layout of accordions (Positioning) by passing layout array */}
      <Columns layout={layout}>{states}</Columns>

      {/* Footer component */}
      <Footer />
      
      {/* scroll-up button component */}
      <ScrollUpButton />

    </div>
  );
}

export default App;
