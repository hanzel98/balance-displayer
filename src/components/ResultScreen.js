import React from 'react';
import { Container, Card } from 'react-bootstrap';

const ResultScreen = ({balance, symbol}) => {
// const ResultScreen = async ({ balance }) => {
    return(
        <Container>
            <Card
              bg={'info'}
              text={'light'}
            >
                <Card.Body>
                    <Card.Title>The balance is: </Card.Title>
                    <Card.Text>{balance} {symbol}</Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ResultScreen;