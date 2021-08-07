import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { sizing } from "@material-ui/system";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";

var analyze = require("Sentimental").analyze,
  positivity = require("Sentimental").positivity,
  negativity = require("Sentimental").negativity;

function App() {
  const [UserText, setUserText] = useState("enter your thoughts...");
  // const [sentiment, setSentiment] = useState({overallScore: 0, positive: 0});
  const [positive, setPositive] = useState(0);
  const [negative, setNegative] = useState(0);
  const [overallScore, setOverallScore] = useState(0);
  const MIN = 0;
  const MAX = 10;

  const normalise = (value) => ((Math.abs(value) - MIN) * 100) / (MAX - MIN);

  const getSentiments = () => {
    let sentimentResults = analyze(UserText);
    console.log(analyze(UserText));
    setPositive(sentimentResults.positive.score);
    setNegative(sentimentResults.negative.score);
    setOverallScore(sentimentResults.score);
  };

  const handleChange = (e) => {
    setUserText(e.target.value);
  };

  return (
    <div className="App">
      <Box m={4}>
        <h1>Analyse your Sentimental thoughts...</h1>
      </Box>
      <Container maxWidth="sm">
        <Box m={2}>
          <TextField
            onChange={handleChange}
            rows={8}
            id="outlined-multiline-static"
            label="Your thoughts"
            multiline
            variant="outlined"
            fullWidth
          >
            {UserText}
          </TextField>
        </Box>
        <Button variant="contained" color="primary" onClick={getSentiments}>
          Get Sentimental Score
        </Button>
        <h2>The score of your results:</h2>
        <h3 id="positive"> Positive Score: {positive} </h3>
        <LinearProgress
          variant="determinate"
          value={normalise(positive)}
        ></LinearProgress>
        <h3 id="negative"> Negative Score: {negative} </h3>
        <LinearProgress
          variant="determinate"
          value={normalise(negative)}
          color="secondary"
        ></LinearProgress>
        <h3 id="overallScore"> Overall Score: {overallScore} </h3>
        <LinearProgress
          variant="determinate"
          value={normalise(overallScore)}
          color={overallScore < 0 ? "secondary" : "primary"}
        ></LinearProgress>
      </Container>
    </div>
  );
}

export default App;
