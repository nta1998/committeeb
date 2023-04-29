import { Container, Row, Text, Col, Image, Grid, Card } from '@nextui-org/react'
import one from "../static/img/one.png"
import too from "../static/img/too.png"
import three from "../static/img/three.png"
import Four from "../static/img/Four.png"
import five from "../static/img/five.png"
import six from "../static/img/six.png"
import seven from "../static/img/seven.png"
import eight from "../static/img/eight.png"
import admin_one from "../static/img/admin_one.png"
import admin_too from "../static/img/admin_too.png"
import admin_tree from "../static/img/admin_tree.png"
import admin_singup from "../static/img/admin_singup.png"
import ads1 from "../static/img/ads1.jpg"
import ads2 from "../static/img/ads2.jpg"
import ads3 from "../static/img/ads3.jpg"

import React from 'react'

const How_to_use = () => {
    return (
        <Container>
            <Col>
            <Row justify='center'>
               <Text size={50} b css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>Beginner's Guide</Text>
            </Row>
            <br/>
                     <Card isHoverable>
                    <Card.Header>
                        <Text size={40} b css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>Welcome page</Text>
                    </Card.Header>
                    <Card.Image src={one} />
                </Card>
                <br />
                <Card isHoverable>
                    <Card.Header>
                        <Text size={40} b css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>sign in</Text>
                    </Card.Header>
                    <Card.Image src={too} />
                </Card>
                <br />
                <Card isHoverable>
                    <Card.Header>
                        <Text size={40} b css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>sign up a new building</Text>
                    </Card.Header>
                    <Card.Image src={admin_singup} />
                </Card>
                <br />
                <Card isHoverable>
                    <Card.Header>
                        <Text size={40} b css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>Home</Text>
                    </Card.Header>
                    <Card.Image src={three} />
                </Card>
                <br />
                <Card isHoverable>
                    <Card.Header>
                        <Text size={40} b css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>Side menu</Text>
                    </Card.Header>
                    <Card.Image src={Four} />
                </Card>
                <br />
                <Card isHoverable>
                    <Card.Header>
                        <Text size={40} b css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>Profile</Text>
                    </Card.Header>
                    <Card.Image src={five} />
                </Card>
                <br />
                <Card isHoverable>
                    <Card.Header>
                        <Text size={40} b css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>Ads</Text>
                    </Card.Header>
                    <Card.Image src={ads1} />
                    <Card.Image src={ads2} />
                    <Card.Image src={ads3} />
                </Card>
                <br/>
                <Card isHoverable>
                    <Card.Header>
                        <Text size={40} b css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>Chat</Text>
                    </Card.Header>
                    <Card.Image src={six} />
                </Card>
                <br />
                <Card isHoverable>
                    <Card.Header>
                        <Text size={40} b css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>Store</Text>
                    </Card.Header>
                    <Card.Image src={seven} />
                    <Card.Image src={eight} />
                </Card>
                <br />
                <Card isHoverable>
                    <Card.Header>
                        <Text size={40} b css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>committee admin Home</Text>
                    </Card.Header>
                    <Card.Image src={admin_one} />
                </Card>
                <br />
                <Card isHoverable>
                    <Card.Header>
                        <Text size={40} b css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>Admin page</Text>
                    </Card.Header>
                    <Card.Image src={admin_too} />
                    <Card.Image src={admin_tree} />
                </Card>
                <br />
            </Col>
        </Container>
    )
}

export default How_to_use