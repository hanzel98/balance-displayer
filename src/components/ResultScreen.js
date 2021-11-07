import React from 'react';
import { Container, Card } from 'react-bootstrap';

const ResultScreen = ({balance, symbol}) => {
// const ResultScreen = async ({ balance }) => {
    return(

            <Card
              bg={'info'}
              text={'light'}
              style={{ width: '80%' }}
            >
                <Card.Body>
                    <Card.Title>The balance is: </Card.Title>
                    <Card.Text>{balance} {symbol}</Card.Text>
                </Card.Body>
            </Card>
        // <Container>
        //     <h3>The balance is: {balance} {symbol}</h3>
        // </Container>
    );
}

export default ResultScreen;