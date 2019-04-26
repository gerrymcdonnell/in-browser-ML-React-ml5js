import React, { Component } from 'react';
import './App.css';

import tiger from "./tiger.jpg";
import nottiger from "./not_tiger.jpg"

// Importing ml5.js as ml5
import * as ml5 from "ml5";

class App extends Component {
  state = {
    predictions: []  // Set the empty array predictions state
  }

  setPredictions = (pred) => {
    // Set the prediction state with the model predictions
    this.setState({
      predictions: pred
    });
  }

  classifyImg = () => {
    // Initialize the Image Classifier method with MobileNet
    const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
    // When the model is loaded
    function modelLoaded() {
      console.log('Model Loaded!');
    }
    // Put the image to classify inside a variable
    const image1 = document.getElementById('image1');
    //img2
    const image2 = document.getElementById('image2');

    // Make a prediction with a selected image1
    classifier.predict(image1, 5, function(err, results) {
    // Return the results
      return results;
    })
    .then((results) => {
      // Set the predictions in the state
      this.setPredictions(results)
    })

    // Make a prediction with a selected image2
    classifier.predict(image2, 5, function(err, results) {
      // Return the results
        return results;
      })
      .then((results) => {
        // Set the predictions in the state
        this.setPredictions(results)
      })
  }

  componentDidMount(){
    // once the component has mount, start the classification
    this.classifyImg();
  }

  render() {
    // First set the predictions to a default value while loading
    let predictions = (<div className="loader"></div>);
    // Map over the predictions and return each prediction with probability
    if(this.state.predictions.length > 0){
      predictions = this.state.predictions.map((pred, i) => {
        let { className, probability } = pred;
        // round the probability with 2 decimal
        probability = Math.floor(probability * 10000) / 100 + "%";
        return (
          <div key={ i + "" }>{ i+1 }. Prediction: { className } at { probability } </div>
        )
      })
    }

    return (
      <div className="App">
      <h1>Image classification with ML5.js</h1>
      {/* original tiger image */}
      <img src={ tiger } id="image1" width="400" alt="" />
      { predictions }

      {/* an image thats not a tiger */}
      <img src={ nottiger } id="image2" width="400" alt="" />
      { predictions }
      </div>
    );
  }
}

export default App;
