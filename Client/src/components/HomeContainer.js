import React, {Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import axios from 'axios';

import Details from './Details';
import Footer from './Footer';
import DefaultImg from '../img/default_img.jpg';
import LogoImg from '../img/recycle_bits_logo.png';

class HomeContainer extends Component {

    /*======================================================================
    // This will set state for a variety of program vital functions.
    ======================================================================*/
    constructor() {
        super();
        this.state = {
            displayUpload: true,
            displayConfirm: false,
            displayResults: false,
            displayLoading: false,
            displayError: false,
            imgDetails: [],
            itemRecyclable: false
        };
      }

      
    /*======================================================================
    // This will handle the image selection process as well as posting
    // to the API.
    ======================================================================*/
    selectImg = (e) => {
        this.setState({
            imgDetails: []
        })

        let file = e.target.files[0];
        console.log(file);
        
        let data = new FormData();
        data.append('file', file);
        
        axios({
            method: 'post',
            url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.1/Prediction/f263980e-3b19-49b8-8444-d97a0b67ed2b/image?iterationId=b17e369b-d99b-4a3b-b1ea-7ade0bfd1b24',
            headers: {'Content-Type': 'application/octet-stream',
                'Prediction-Key': 'd8fab3898adc430c80ad1669c875c4ff'},
            data: data
        })
        .then(function (response) {
            console.log(response);
            this.setState({
                imgDetails: [
                    response.data.predictions
                ],
              })
            console.log(this.state.imgDetails);
          })
        .catch(function (error) {
            console.log(error);
        });
    }

    /*======================================================================
    // This will handle the image upload process once the user clicks the
    // Upload Image button.
    ======================================================================*/
    uploadImg = (e) => {
        this.setState({
            displayUpload: false,
            displayConfirm: true,
            displayResults: false,
            displayLoading: false
        })
    }

    /*======================================================================
    // This will handle displaying results once the user has confirmed
    // the image to upload.
    ======================================================================*/
    confirmImg = (e) => {
        this.setState({
            displayUpload: false,
            displayConfirm: false,
            displayResults: true,
            displayLoading: false
        })
    }

    /*======================================================================
    // This will handle resetting the interface to the pre upload state
    // when the user clicks the Start Over button.
    ======================================================================*/
    newImg = (e) => {
        this.setState({
            displayUpload: true,
            displayConfirm: false,
            displayResults: false,
            displayLoading: false
          })
    }

    /*======================================================================
    // This will render the home page.
    ======================================================================*/
    render() {
        return (
        <div className="home-container">
            <div className="header">
                <img src={LogoImg} alt='' />
            </div>
            
            <div className="main-body">
                <div className="main-upload">
                    {(this.state.displayUpload)
                        ? <input type="file" onChange={this.selectImg} />
                        : <p></p> }
                </div>
                <div className="main-upload">
                    {(this.state.displayUpload)
                        ? <Button bsStyle="primary" className="upload-btn btn" onClick={this.uploadImg}>Select Image</Button>
                        : <p></p> }
                </div>
                <div className="main-confirm">
                    {(this.state.displayConfirm)
                        ? <img src={DefaultImg} alt='' />
                        : <p></p> }
                    {(this.state.displayConfirm)
                        ? <Button bsStyle="primary" className="confirm-btn btn" onClick={this.confirmImg}>Upload Image</Button>
                        : <p></p> }
                </div>
                <div className="main-results">
                    {(this.state.displayResults)
                        ? <img src={DefaultImg} alt='' />
                        : <p></p> }
                    {(this.state.displayResults)
                        ? <Details imageDetails={this.state.imgDetails} />
                        : <p></p> }
                    {(this.state.displayResults)
                        ? <Button bsStyle="primary" className="results-btn btn" onClick={this.newImg}>Start Over</Button>
                        : <p></p> }
                </div>
                <div className="main-loading">
                    {(this.state.displayLoading)
                        ? <p className="loader"></p>
                        : <p></p> }
                </div>
                <div className="main-error">
                    {(this.state.displayError)
                        ? <p>An error has occurred.</p>
                        : <p></p> }
                </div>
            </div>
            <Footer />
        </div>
        )
    }
}

export default HomeContainer;
