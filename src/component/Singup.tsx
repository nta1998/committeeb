import { Button, Card, Col, Container, Grid, Input, Row, Text } from '@nextui-org/react'
import React, { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { Player } from '@lottiefiles/react-lottie-player';
import { SiSuperuser } from 'react-icons/si';
import { BiOutline } from 'react-icons/bi';
import { MdApartment } from 'react-icons/md';
import { AiOutlinePhone } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { singuphAsync } from '../Slices/loginSlice';
import { ToastContainer } from 'react-toastify';
import {NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const Singup = () => {
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [full_name, setfull_name] = useState("")
  const [bio, setbio] = useState("")
  const [apartment, setapartment] = useState("")
  const [phone_number, setphone_number] = useState("")
  const dispatch = useAppDispatch();

  const { id } = useParams()
  return (
    <NextThemesProvider>
    <NextUIProvider>
    <Container>
      <ToastContainer />
      <br/>
      <br/>
      <Row> 
        <Grid.Container gap={10} justify="center">
        <Grid>
          <Col style={{ padding: "2%" }}>  <Text b size={50} css={{ textGradient: "45deg, $yellow600 -20%, $red600 100%" }} weight="bold">The digital committee</Text>
            <br/>
            <br/>
            <br/>
            <Row>
              <Player src="https://cdn.lordicon.com/vtmsmyks.json" background="transparent" speed={1} style={{ position: "relative", width: "50px", height: "40px" }} autoplay loop />
              <Text size={20} css={{textGradient: "45deg, $blue500 -30%, $pink500 30%" }}>Are you tired of the house committee chasing you </Text></Row>
            <Row>
              <Player src="https://cdn.lordicon.com/fihkmkwt.json" background="transparent" speed={1} style={{ position: "relative", margin: "5% 0%", width: "50px", height: "40px" }} autoplay loop />
              <Text size={20} css={{ textGradient: "45deg, $blue500 -40%, $pink500 40%" }}>all in one place? </Text>
            </Row>
            <Row>
              <Player src="https://cdn.lordicon.com/pimvysaa.json" background="transparent" speed={1} style={{ position: "relative", margin: "5% 0%", width: "50px", height: "40px" }} autoplay loop />
              <Text size={20} css={{ textGradient: "45deg, $blue500 -50%, $pink500 50%" }}>You can pay everything</Text>
            </Row>
            <Row>
              <Player src="https://cdn.lordicon.com/ejnrjovh.json" background="transparent" speed={1} style={{ position: "relative", margin: "5% 0%", width: "50px", height: "40px" }} autoplay loop />
              <Text size={20} css={{ textGradient: "45deg, $blue500 -60%, $pink500 60%" }}>see all the building's ads</Text>
            </Row>
            <Row>
              <Player src="https://cdn.lordicon.com/kjkiqtxg.json" background="transparent" speed={1} style={{ position: "relative", margin: "5% 0%", width: "50px", height: "40px" }} autoplay loop />
              <Text size={20} css={{ textGradient: "45deg, $blue500 -70%, $pink500 70%" }}>talk in a group chat that includes all the members of your building. </Text>
            </Row>
            <Row>
              <Player src="https://cdn.lordicon.com/twopqjaj.json" background="transparent" speed={1} style={{ position: "relative", margin: "5% 0%", width: "50px", height: "40px" }} autoplay loop />
              <Text size={20} css={{ textGradient: "45deg, $blue500 -80%, $pink500 80%" }}>Enter your details here to join the rest of your building </Text>
            </Row>
            <Row>
              <Player src="https://cdn.lordicon.com/bfmwpqst.json" background="transparent" speed={1} style={{ position: "relative", margin: "5% 0%", width: "60px", height: "70px" }} autoplay loop />
              <Text size={35} css={{ textGradient: "45deg, $pink600 -30%, $blue500 90%" }} b>because today everything is digital</Text>
            </Row>
          </Col>
        </Grid>
        <Grid>
          <Card css={{ minWidth:"400px", margin: "15% 0% 0% 0%" }}>
            <Card.Body>
              <Input onChange={(e) => setusername(e.target.value)} clearable fullWidth bordered placeholder='Username' contentLeft={<AiOutlineUser />} />
              <br />
              <Input onChange={(e) => setemail(e.target.value)} clearable fullWidth bordered placeholder='Email' contentLeft={<MdEmail />} />
              <br />
              <Input.Password onChange={(e) => setpassword(e.target.value)} clearable fullWidth bordered placeholder='Password' contentLeft={<RiLockPasswordFill />} />
              <br />
              <Input onChange={(e) => setfull_name(e.target.value)} clearable fullWidth bordered placeholder='full_name' contentLeft={<SiSuperuser />} />
              <br />
              <Input onChange={(e) => setbio(e.target.value)} clearable fullWidth bordered placeholder='bio' contentLeft={<BiOutline />} />
              <br />
              <Input onChange={(e) => setapartment(e.target.value)} clearable fullWidth bordered placeholder='apartment' contentLeft={<MdApartment />} />
              <br />
              <Input onChange={(e) => setphone_number(e.target.value)} clearable fullWidth bordered placeholder='phone_number' contentLeft={<AiOutlinePhone />} />
              <br />
              <br />
              <Button color="warning" auto onClick={() => dispatch(singuphAsync({ "singupData": { username, email, password }, "profile": { full_name, bio, apartment, phone_number, "building_id": id } }))}>singup</Button>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
      </Row>
    </Container>
    </NextUIProvider>
    </NextThemesProvider>
  )
}

export default Singup