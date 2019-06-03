import React from 'react'
import { Row, Col, Card, Button, Icon } from 'react-materialize';

export default function LoginCard(props) {
  return (
    <div>
      <center>
        <Row>
          <Col >
            <Card
              title="Click here to sign in"
              reveal={
                <div>
                  <br /><br />
                  <Button
                    node="a"
                    waves="light"
                    large
                    onClick={props.loginClick}
                  >
                    Log In With Google
                          <Icon left>
                      cloud
                          </Icon>
                  </Button>
                </div>
              }>
              <img
                src="https://content.screencast.com/users/khari9987274/folders/Default/media/cd034270-ed95-4387-836a-c0daada0c4be/logo.jpg"
              />
            </Card>
          </Col>
        </Row>
      </center>
    </div>
  )
}
