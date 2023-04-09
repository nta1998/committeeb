import { Button, Card, Col, Container, Input, Row, Text } from '@nextui-org/react'
import React, { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { Player } from '@lottiefiles/react-lottie-player';
import { SiSuperuser } from 'react-icons/si';
import { BiOutline } from 'react-icons/bi';
import { MdApartment } from 'react-icons/md';
import { AiOutlinePhone } from 'react-icons/ai';
import { BsImage } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { singuphAsync } from '../Slices/loginSlice';

const Singup = () => {
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [pic, setpic] = useState("")
  const [full_name, setfull_name] = useState("")
  const [bio, setbio] = useState("")
  const [apartment, setapartment] = useState("")
  const [phone_number, setphone_number] = useState("")
  const dispatch = useAppDispatch();

  const { id } = useParams()
  return (
    <Container>
      <Row>
        <Col style={{ padding: "10% 5% 0% 0%" }}>
          <br />
          <br />
          <Player src="https://cdn.lordicon.com/vtmsmyks.json" background="transparent" speed={1} style={{ position: "absolute", left: "0.1%", top: "39%", width: "50px", height: "40px" }} autoplay loop></Player>
          <Player src="https://cdn.lordicon.com/fihkmkwt.json" background="transparent" speed={1} style={{ position: "absolute", left: "0.1%", top: "46%", width: "50px", height: "40px" }} autoplay loop></Player>
          <Player src="https://cdn.lordicon.com/pimvysaa.json" background="transparent" speed={1} style={{ position: "absolute", left: "0.1%", top: "52%",  width: "50px", height: "40px"}} autoplay loop></Player>
          <Player src="https://cdn.lordicon.com/ejnrjovh.json" background="transparent" speed={1} style={{ width: "50px", height: "40px", position: "absolute", left: "0.1%", top: "59%" }} autoplay loop></Player>
          <Player src="https://cdn.lordicon.com/kjkiqtxg.json" background="transparent" speed={1} style={{ position: "absolute", left: "0.1%", top: "67%", width: "50px", height: "40px" }} autoplay loop></Player>
          <Player src="https://cdn.lordicon.com/twopqjaj.json" background="transparent" speed={1} style={{ position: "absolute", left: "0.1%", top: "77%",  width: "50px", height: "40px" }} autoplay loop></Player>
          <Col style={{padding:"0% 5% 0% 10%"}}>
          <Text h1 size={50} css={{ textGradient: "45deg, $yellow600 -20%, $red600 100%" }} weight="bold">The digital committee</Text>
            <Text size={20} css={{ textGradient: "45deg, $blue500 -30%, $pink500 30%" }}>Are you tired of the house committee chasing you </Text>
            <Text size={20} css={{ textGradient: "45deg, $blue500 -40%, $pink500 40%" }}>all in one place? </Text>
            <Text size={20} css={{ textGradient: "45deg, $blue500 -50%, $pink500 50%" }}>You can pay everything</Text>
            <Text size={20} css={{ textGradient: "45deg, $blue500 -60%, $pink500 60%" }}>see all the building's ads</Text>
            <Text size={20} css={{ textGradient: "45deg, $blue500 -70%, $pink500 70%" }}>talk in a group chat that includes all the members of your building. </Text>
            <Text size={20} css={{ textGradient: "45deg, $blue500 -80%, $pink500 80%" }}>Enter your details here to join the rest of your building </Text>
            <Player src="https://cdn.lordicon.com/bfmwpqst.json" background="transparent" speed={1} style={{ position: "absolute", left: "0.1%", top: "86%",  width: "60px", height: "70px"}} autoplay loop></Player>
            <Text size={35} css={{ textGradient: "45deg, $pink600 -30%, $blue500 90%" }} b>because today everything is digital</Text>
          </Col>
        </Col>
        <Col>
          <Card css={{ mw: "420px", margin: "15% 0% 0% 5%" }}>
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
              <Button color="warning" auto onClick={() => dispatch(singuphAsync({ "singupData": { username, email, password }, "profile": { full_name, bio, apartment, phone_number, pic, "building_id": id } }))}>singup</Button>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  )
}

export default Singup