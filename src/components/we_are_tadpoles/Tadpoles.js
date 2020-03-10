import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import tadpoleSketch from './tadpoleSketch';

class Tadpoles extends React.Component {
    render() {
        return (
            <P5Wrapper sketch={tadpoleSketch}></P5Wrapper>
        );
    }
}

export default (Tadpoles)
