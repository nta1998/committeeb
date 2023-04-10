import React from "react";
import { Row, Container, Col, Text, Card, Grid } from "@nextui-org/react";
import { FacebookOutlined, GithubOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';
import icon from "../static/img/icon.png"
import { Link } from "react-router-dom";
import { SocialIcon } from 'react-social-icons';
import { useAppSelector } from "../app/hooks";
import { selectGetProfileOne } from "../Slices/profileSlice";
import { selectBuilding } from "../Slices/buildingSlice";
const FooterComponent = () => {
  const profile = useAppSelector(selectGetProfileOne)
  const building = useAppSelector(selectBuilding)
  return (
    <Container>
      <Card>
        <Card.Body>
        <Grid.Container gap={2} justify="center">
        <Row style={{justifyContent:"center"}}>
        <Grid>
          <Col style={{ padding: '1%', width: "10%" }}>
            <Link to={"/home"}><Text>Home</Text></Link>
            <Link to={"/profile"}><Text>Profile</Text> </Link>
            {profile?.is_committee ? <Link to={"/admin"}><Text>admin</Text></Link>:""}
          </Col>
          </Grid>
          <Grid>
          <Col style={{ padding: '1%', width: "10%" }}>
            <Link to={"Chat"}><Text>Chat</Text></Link>
            <Link to={"/store"}><Text>Store</Text></Link>
            {building?.vote_active ? <Link to={"/vote"}><Text>Vote</Text></Link>:""}
          </Col>
          </Grid>
          <Grid>
          <Col style={{ padding: '1%', width: "10%" }}>
            <Link to={"/Ads"}><Text>Pool</Text></Link>
            <Link to={"/Ads"}><Text>Ads</Text></Link>
            <Link to={"/Ads"}><Text>ads</Text></Link>
          </Col>
          </Grid>
        </Row>
        </Grid.Container>
        <br/>        
        <Row style={{display:"flex", justifyContent:"center"}}>
          <Text h5><img src={icon} height={23} alt="icon" />©2023 Created by natennel Liloz</Text>
          </Row>
        <Row style={{display:"flex", justifyContent:"center",gap:"1%"}}>
            <SocialIcon url="https://github.com/nta1998" fgColor="#ffffff" style={{ height: 50, width: 50 }}/>
          <SocialIcon url="https://www.linkedin.com/in/netanelliloz" fgColor="#ffffff"/>
          <SocialIcon url="https://www.facebook.com/netanel.liluz" fgColor="#ffffff" />
          <SocialIcon url="https://www.instagram.com/netanelliluz/" fgColor="#ffffff"/>
        </Row>
      </Card.Body>
  </Card>
  <br/>
    </Container >
  )
}

export default FooterComponent