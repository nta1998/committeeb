import { Card, Grid, Text, Container, Col, Row } from "@nextui-org/react";
import React from 'react'
import { FaDev } from "react-icons/fa";
import { SocialIcon } from "react-social-icons";
import About_pic from '../static/img/About_pic.png'

const About = () => {
  return (
    <Container>
    <Grid.Container gap={2}> 
      <Grid>
      <Card>
    <Card.Image
      src={About_pic}
      objectFit="cover"
      width="100%"
      height={340}
      alt="Card image background"
    />
    <Card.Footer  css={{
        position: "absolute",
        bgBlur: "#ffffff66",
        borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
        bottom: 0,
        zIndex: 1,}}>
    <Col>
      <Text size={12} weight="bold" transform="uppercase" color="#000">
          full stack developer
        </Text>
        <Text h4 color="#000">
        Natanel Liloz
        </Text>
      </Col>
    </Card.Footer>
  </Card>
  </Grid>
  <Grid>
    <Card css={{ p: "$6"}}>
      <Card.Header>
    <FaDev size={60}/>
        <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: "$xs" }}>
            Natanel Liloz
            </Text>
          </Grid>
          <Grid xs={12}>
            <Text css={{ color: "$accents8" }}>About Me</Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <br/>
      <Card.Body css={{ py: "$2" }}>
        <Text>
        Hi, I'm Natanel,<br/>
        a full-stack developer with a passion for creating user-friendly software solutions that help businesses and individuals achieve their goals.<br/> 
        I specialize in website development using HTML, CSS, Python, and various frameworks such as Flask, Django, and React.<br/> 
        I believe in collaborating with clients to understand their needs and develop custom solutions that meet their specific goals.<br/> 
        When I'm not coding, I enjoy reading about new technologies, exploring the great outdoors, and spending time with my loved ones.<br/> 
        To learn more about my work or discuss a potential project, feel free to contact me at nta1998@gmail.com.<br/> 
        Let's bring your ideas to life!
        </Text>
      </Card.Body>
      <br/>
      <br/>
      <Card.Footer>
      <Col style={{gap:"1%"}}>
      <Text b>
        More about me in :
      </Text>
      <br/>
      <br/>
      <Row style={{gap:"1%"}} >
          <SocialIcon url="https://github.com/nta1998" fgColor="#ffffff" style={{ height: 50, width: 50 }}/>
          <SocialIcon url="https://www.linkedin.com/in/natanelliloz" fgColor="#ffffff"/>
          <SocialIcon url="https://www.facebook.com/Natanel.liloz/" fgColor="#ffffff" />
          <SocialIcon url="https://www.instagram.com/natanelliloz/" fgColor="#ffffff"/>
          </Row>
        </Col>
      </Card.Footer>
    </Card>
    </Grid>
    </Grid.Container> 
    </Container>
  )
}

export default About