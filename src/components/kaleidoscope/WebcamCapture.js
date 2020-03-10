import React from "react";
import Webcam from "react-webcam";

export default class WebcamCapture extends React.Component {
    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        console.log(imageSrc);
    };

    render() {
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
        };

        return (
            <div>
                <Webcam
                    ref={this.setRef}
                    videoConstraints={videoConstraints}
                />
                <button onClick={this.capture}>Capture photo</button>
            </div>
        );
    }
}
