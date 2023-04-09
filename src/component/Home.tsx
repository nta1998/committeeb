import { Container, Row, Col, Card, Text, Button, Grid, Badge, Modal, Input } from '@nextui-org/react';
import homeimg from '../static/img/tokyo-cityscape-digital-art.jpg'
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectlog, singupbuildingAsync } from '../Slices/loginSlice';
import Ads from './Ads';
import Store from './StoreC';
import React, { useEffect, useState } from 'react';
import { getAsync, selectGetProfileOne } from '../Slices/profileSlice';
import { getAsyncbuilding } from '../Slices/buildingSlice';
import { addVoteAsync, selecads, selecpayads, selecpool } from '../Slices/adsSlice';
import { addPaymentAdToCart, addToCart, selecproduct } from '../Slices/productSlice';
import Bulletin_Board from "../static/img/Bulletin_Board.jpg"
import home1 from "../static/img/home1.jpg"
import happens from "../static/img/happens.jpg"
import store_img from "../static/img/store_img.jpg"
import building_img from "../static/img/building_img.jpg"
import { SiSuperuser } from 'react-icons/si';
import { BiOutline } from 'react-icons/bi';
import { MdApartment } from 'react-icons/md';
import { AiOutlinePhone } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const is_login = useAppSelector(selectlog)
  const token = localStorage.getItem("access") || ""
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectGetProfileOne)
  const ads = useAppSelector(selecads).filter(ad => ad.building_id === profile?.building_id?.id)[0]
  const pool = useAppSelector(selecpool).filter(pool => pool.building_id === profile?.building_id?.id)[0]
  const payads = useAppSelector(selecpayads).filter(payads => payads.building_id === profile?.building_id?.id)[0]
  const products = useAppSelector(selecproduct);

  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [pic, setpic] = useState("")
  const [full_name, setfull_name] = useState("")
  const [bio, setbio] = useState("")
  const [apartment, setapartment] = useState("")
  const [phone_number, setphone_number] = useState("")
  const [full_address, setfull_address] = useState("")
  const [floors, setfloors] = useState(0)
  const [payment_date, setpayment_date] = useState("")
  const [committee_monthly, setcommittee_monthly] = useState(0)
  return (
    <Container gap={0}>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Sing Up To
            <Text b size={18}>
            The digital committee
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
        <Input onChange={(e) => setusername(e.target.value)} clearable fullWidth bordered placeholder='Username' contentLeft={<AiOutlineUser />} />
              <Input onChange={(e) => setemail(e.target.value)} clearable fullWidth bordered placeholder='Email' contentLeft={<MdEmail />} />
              <Input.Password onChange={(e) => setpassword(e.target.value)} clearable fullWidth bordered placeholder='Password' contentLeft={<RiLockPasswordFill />} />
              <Input onChange={(e) => setfull_name(e.target.value)} clearable fullWidth bordered placeholder='full_name' contentLeft={<SiSuperuser />} />
              <Input onChange={(e) => setapartment(e.target.value)} clearable fullWidth bordered placeholder='apartment' contentLeft={<MdApartment />} />
              <Input onChange={(e) => setphone_number(e.target.value)} clearable fullWidth bordered placeholder='phone_number' contentLeft={<AiOutlinePhone />} />
              <Input onChange={(e) => setbio(e.target.value)} clearable fullWidth bordered placeholder='bio' contentLeft={<BiOutline />} />
              <Input onChange={(e) => setfull_address(e.target.value)} clearable fullWidth bordered placeholder='full_address' contentLeft={<MdEmail />} />
              <Input onChange={(e) => setfloors(+e.target.value)} clearable fullWidth bordered placeholder='floors' contentLeft={<MdEmail />} />
              <Input onChange={(e) => setpayment_date(e.target.value)} clearable fullWidth bordered placeholder='payment_date' contentLeft={<MdEmail />} />
              <Input onChange={(e) => setcommittee_monthly(+e.target.value)} clearable fullWidth bordered placeholder='committee_monthly' contentLeft={<MdEmail />} />
        </Modal.Body>
        <Modal.Footer>
          <Button auto onClick={()=>dispatch(singupbuildingAsync({ "user": { username, email, password }, "building": {full_address,floors,payment_date,committee_monthly,"committee_apartment":apartment,"committee_name":full_name,"committee_phone":phone_number}, "profile": { full_name, bio, apartment, phone_number, pic,} }))}>
            Sign up
          </Button>
        </Modal.Footer>
      </Modal>
      <br />
      {is_login ?
        <Container>
          <Row gap={1}>
            <Col>
              <Text h1 css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }} weight="bold">Chat</Text>
              <Card css={{ w: "100%", h: "400px" }} variant="bordered">
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                  <Col>
                    <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">Your day your way</Text>
                    <Text h3 color="white">Go to Chat and communicate with the whole building</Text>
                  </Col>
                </Card.Header>
                <Card.Body css={{ p: 0 }}>
                  <Card.Image src={home1} objectFit="cover" width="100%" height="100%" alt="Relaxing app background" />
                </Card.Body>
                <Card.Footer isBlurred css={{ position: "absolute", bgBlur: "#0f111466", borderTop: "$borderWeights$light solid $gray800", bottom: 0, zIndex: 1 }}>
                  <Row>
                    <Col>
                      <Row>
                        <Col>
                          <Text color="#d1d1d1" size={18}>
                            Chat
                          </Text>
                          <Text color="#d1d1d1" size={14}>
                            The whole building is in the palm of your hand
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row justify="flex-end">
                        <Button type='button' flat auto rounded css={{ color: "#94f9f0", bg: "#94f9f026" }}>
                          <Link to="/Chat" style={{ color: "inherit" }}>
                            <Text css={{ color: "inherit" }} size={12} weight="bold">
                              Go Chat
                            </Text>
                          </Link>
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
          <Col>
            <Row style={{ padding: "1%" }}>
              <Link to={"/Ads"}><Text b size={50} css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>Ads</Text></Link>
            </Row>
            <Row gap={3}>
              <Col>
                <Row><Text b size={30} css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>Ads</Text></Row>
                <br/>
                {!ads ? <Card css={{ maxWidth: "330px", minWidth: "330px", minHeight: "150px", margin: "1%", justifyContent: "center" }}><Badge css={{ marginLeft: "35%" }} size={"lg"}>No ads yet</Badge></Card> :
                  <Card css={{ maxWidth: "330px", minWidth: "330px"}}>
                    <Card.Header>
                      <Text b >{ads?.Title}</Text>
                    </Card.Header>
                    <Card.Divider />
                    <Card.Body>
                      <Text h4 style={{ padding: "1%" }}> {ads?.Content} </Text>
                      <Card.Divider />
                      <br />
                      <Text h6 style={{ position: "absolute", bottom: "1%", right: "3%" }} color="#889096"> {ads?.Post_time}</Text>
                    </Card.Body>
                  </Card>}
              </Col>
              <Col>
                <Row><Text b size={30} css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>survey</Text></Row>
                <br/>
                  <Row>
                    {!pool ? <Card css={{ maxWidth: "330px", minWidth: "330px", minHeight: "150px", justifyContent: "center" }}><Badge css={{ marginLeft: "22%" }} size={"lg"}>No survey to view yet</Badge> </Card> :
                      <Card css={{maxWidth: "330px", minWidth: "330px" }}>
                        <Card.Header>
                          <Text b>{pool.Title}</Text>
                        </Card.Header>
                        <Card.Divider />
                        <Card.Body>
                          <Text h4 style={{ padding: "1%" }}>{pool.Question}</Text>
                        </Card.Body>
                        <Card.Divider />
                        <Card.Footer>
                          <Row justify="flex-end">
                            <Button flat size="sm" color="success" onClick={() => dispatch(addVoteAsync({ pool, action: "yes", token }))}>
                              👍
                            </Button>
                            <Button flat size="sm" color="error" style={{ marginLeft: "5%" }} onClick={() => dispatch(addVoteAsync({ pool, action: "no", token }))}>👎</Button>
                          </Row>
                        </Card.Footer>

                      </Card>
                    }
                  </Row>
              </Col>
              <Col>
                <Row ><Text b size={30} css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>Payent ads</Text></Row>
                <br />
                {!payads ? <Card css={{ maxWidth: "330px", minWidth: "330px", minHeight: "150px", justifyContent: "center" }}><Badge css={{ marginLeft: "23%" }} size={"lg"}>No payment ads yet</Badge></Card> :
                  <Card css={{ maxWidth: "330px", minWidth: "330px" }}>
                    <Card.Header>
                      <Text b>{payads?.Title}</Text>
                    </Card.Header>
                    <Card.Divider />
                    <Card.Body>
                      <Text h4 style={{ padding: "1%" }}> {payads?.Content} </Text>
                      <br />
                      <Text h5 style={{ position: "absolute", bottom: "1%", left: "5%" }}> price: {payads?.price}</Text>
                      <br />
                      <Text h6 style={{ position: "absolute", bottom: "1%", right: "3%" }} color="#889096"> {payads?.Post_time}</Text>
                    </Card.Body>
                    <Card.Divider />
                    <Card.Footer>
                      <Row justify="flex-end">
                        <Button size="sm" color="default" onClick={() => dispatch(addPaymentAdToCart(ads))}>
                          Add To Cart
                        </Button>
                      </Row>
                    </Card.Footer>
                  </Card>}
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Link to={"/Store"}><Text size={50} b css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%", padding: "1%" }} weight="bold">Store</Text></Link>
            </Row>
            <Row>
              <Grid.Container gap={2} justify="center">
                {!products.length ? <Card css={{ minWidth: "1000px", minHeight: "450px", justifyContent: "center" }}><Badge css={{marginLeft:"45%"}} size={"lg"}>No products yet</Badge></Card> :products.filter(product => product.profile_id.building_id === profile?.building_id?.id).map((product, index) => index < 12 ? <Grid xs={2} key={index} >
                  <Card onClick={() => dispatch(addToCart(product))} style={{ maxWidth: "250px", maxHeight: "200px", margin: "1%" }} isPressable>
                    <Card.Body css={{ p: 0 }}>
                      <Card.Image
                        src={`http://44.202.160.222${product.product_pic}`}
                        objectFit="cover"
                        width="100%"
                        height={200}
                        alt=""
                      />
                    </Card.Body>
                    <Card.Footer css={{ justifyItems: "flex-start" }}>
                      <Row wrap="wrap" justify="space-between" align="center">
                        <Text b>{product.name}</Text>
                        <br />
                        <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                          {product.price} ₪
                        </Text>
                      </Row>
                    </Card.Footer>
                  </Card>
                </Grid>
                  : "")}
              </Grid.Container>
            </Row>
            <br />
            <br />
          </Col>
        </Container >
        :

        <Col>
          <br />
          <Row>
            <Card>
              <Card.Header css={{ position: "absolute", zIndex: 1, top: '10%', left: '23%' }}>
                <Col>
                  <Text size={18} b color='white'>
                    Welcome to
                  </Text><br/>
                  <Text size={18} b color='white'>
                    The digital house committee
                  </Text>
                </Col>
              </Card.Header>
              <Card.Image
                src={building_img}
                objectFit="cover"
                width="100%"
                height={440}
                alt="Card image background"
              />
                  <Card.Footer isBlurred css={{ position: "absolute", bgBlur: "#0f111466", borderTop: "$borderWeights$light solid $gray800", bottom: 0, zIndex: 1 }}>
                  <Row>
                    <Col>
                      <Row>
                        <Col>
                          <Text color="#d1d1d1" size={20} b>
                            get start today and singup to the The digital committee
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row justify="flex-end">
                        <Button type='button' onClick={()=>setVisible(true)} flat auto rounded css={{ color: "#f0b59c", bg: "#94f9f026" }}>
                            <Text css={{ color: "inherit" }} size={15} weight="bold">
                              Sing Up
                            </Text>
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                </Card.Footer>
            </Card>
          </Row>
          <br />
          <Row style={{ gap: "2%", marginLeft: "3%" }}>
            <Card style={{ width: "30%" }}>
              <Card.Header css={{ position: "absolute", zIndex: 1, bottom: '1%', left: '-2%' }}>
                <Col>
                  <Text size={20} b color='white'>
                    All the
                  </Text><br/>
                  <Text size={25} b color='white'>
                    Most important ads
                  </Text>
                </Col>
              </Card.Header>
              <Card.Image
                src={Bulletin_Board}
                objectFit="cover"
                width="100%"
                height={440}
                alt="Card image background"
              />
            </Card>
            <Card style={{ width: "30%" }}>
              <Card.Header css={{ position: "absolute", zIndex: 1, top: '0%', left: '10%' }}>
                <Col>
                <Text size={15} b color='white'>
                    Stay updated on
                  </Text><br/>
                  <Text size={18} b color='white'>
                    Everything that happens in the building
                  </Text>
                </Col>
              </Card.Header>
              <Card.Image
                src={happens}
                objectFit="cover"
                width="100%"
                height={440}
                alt="Card image background"
              />
            </Card>
            <Card style={{ width: "30%" }}>
              <Card.Header css={{ position: "absolute", zIndex: 1, top: '13%', left: '9%' }}>
                <Col>
                  <Text size={12} weight="bold" color='white' transform="uppercase" >
                    Buy and sell
                  </Text>
                  <Text h4 color='white'>
                    Inside your building
                  </Text>
                </Col>
              </Card.Header>
              <Card.Image
                src={store_img}
                objectFit="cover"
                width="100%"
                height={440}
                alt="Card image background"
              />
            </Card>
          </Row>
          <br/>
          <br/>
        </Col>}
    </Container>
  )
}

export default Home