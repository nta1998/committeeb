import { Container, Row, Col, Card, Text, Button, Grid, Badge, Modal, Input} from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectlog, singupbuildingAsync } from '../Slices/loginSlice';
import React, {useState} from 'react';
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
import { AiOutlineCheckCircle, AiOutlinePhone } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { TbBuildingSkyscraper } from 'react-icons/tb';
import confetti from 'canvas-confetti';
import { selectGetProfileOne } from '../Slices/profileSlice';
import { GiLevelEndFlag, GiTakeMyMoney } from 'react-icons/gi';
import { BsCalendar2Date } from 'react-icons/bs';

const Home = () => {
  const is_login = useAppSelector(selectlog)
  const token = localStorage.getItem("access") || ""
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectGetProfileOne)
  const ads = useAppSelector(selecads).filter(ad => ad.building_id === profile?.building_id?.id).pop()
  const pool = useAppSelector(selecpool).filter(pool => pool.building_id === profile?.building_id?.id).pop()
  const payads = useAppSelector(selecpayads).filter(payads => payads.building_id === profile?.building_id?.id).pop()
  const products = useAppSelector(selecproduct);

  const [visible, setVisible] = useState(false);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const pic = useState("")
  const [full_name, setfull_name] = useState("")
  const [bio, setbio] = useState("")
  const [apartment, setapartment] = useState("")
  const [phone_number, setphone_number] = useState("")
  const [full_address, setfull_address] = useState("")
  const [floors, setfloors] = useState(0)
  const [payment_date, setpayment_date] = useState("2000-10-10")
  const [committee_monthly, setcommittee_monthly] = useState(0)
  const handleConfetti = () => {
    confetti({ decay: 0.9, particleCount: 1000, spread: 360, ticks: 200, zIndex: 100 })
    dispatch(singupbuildingAsync({ "user": { username, email, password }, "building": { full_address, floors, payment_date, committee_monthly, "committee_apartment": apartment, "committee_name": full_name, "committee_phone": phone_number }, "profile": { full_name, bio, apartment, phone_number, pic, } }))
  };
  
  return (
    <Container>
      {is_login ? 
        <Container>
          <Row>
            <Col>
              <Card css={{ w: "100%", h: "400px" }} variant="bordered">
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                  <Col>
                    <Text size={12} b transform="uppercase" color="#9E9E9E">Your day your way</Text><br />
                    <Text size={24} color="black" b>Go to Chat and communicate with the whole building</Text>
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
                          <Text color="#d1d1d1" size={20} b>
                            Chat
                          </Text>
                          <br />
                          <Text color="#d1d1d1" size={15} b>
                            The whole building is in the palm of your hand
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row justify="flex-end">
                        <Button type='button' flat auto rounded css={{ color: "#94f9f0", bg: "#94f9f026" }}>
                          <Link to="/Chat" style={{ color: "inherit" }}>
                            <Text css={{ color: "inherit" }} size={17} weight="bold">
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
            <Grid.Container justify="center" gap={5}>
              <Row style={{ padding: "1%" }}>
                <Link to={"/Ads"}><Text b size={50} css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }} weight="bold">Bulletin Board</Text></Link>
              </Row>

              <Grid>
                <Row><Text b size={30} css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>Ads</Text></Row>
                <br />
                {!ads ? <Card css={{ maxWidth: "330px", minWidth: "330px", minHeight: "150px", margin: "1%", justifyContent: "center" }}><Badge css={{ marginLeft: "35%" }} size={"lg"}>No ads yet</Badge></Card> :
                  <Card css={{ maxWidth: "330px", minWidth: "330px" }}>
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
              </Grid>
              <Grid>
                <Row><Text b size={30} css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>survey</Text></Row>
                <br />
                <Row>
                  {!pool ? <Card css={{ maxWidth: "330px", minWidth: "330px", minHeight: "150px", justifyContent: "center" }}><Badge css={{ marginLeft: "22%" }} size={"lg"}>No survey to view yet</Badge> </Card> :
                    <Card css={{ maxWidth: "330px", minWidth: "330px" }}>
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
              </Grid>
              <Grid>
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
                        <Button size="sm" color="default" onClick={() => dispatch(addPaymentAdToCart(payads))}>
                          Add To Cart
                        </Button>
                      </Row>
                    </Card.Footer>
                  </Card>}
              </Grid>

              <Row>
                <Link to={"/Store"}><Text size={50} b css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }} weight="bold">Building store</Text></Link>
              </Row>
              {!products.length ? <Card css={{ maxWidth: "330px", minWidth: "330px", minHeight: "150px", justifyContent: "center" }}><Badge css={{ marginLeft: "29%" }} size={"lg"}>No products yet</Badge></Card> : ""}
              <Grid.Container gap={1} justify="center">
                {products.filter(product => product.profile_id.building_id === profile?.building_id?.id).map((product, index) => <Grid>
                  <Card onClick={() => dispatch(addToCart(product))} style={{ minWidth: window.innerWidth < 950 ? "130px" : "170px", maxWidth: window.innerWidth < 950 ? "130px" : "170px", minHeight: window.innerWidth < 950 ? "110px" : "200px", maxHeight: window.innerWidth < 950 ? "130px" : "200px" }} isPressable>
                    <Card.Body css={{ p: 0 }}>
                      <Card.Image
                        src={`${process.env.REACT_APP_MY_SERVER}static`+product.product_pic}
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
                </Grid>)}
              </Grid.Container>
            </Grid.Container>

            <br />
            <br />
            <br />
            <br />
          </Col>
          
        </Container >
        :

        <Col>
          <br />
          <Col>
            <Row justify='center'>
              <Text h2 css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>Welcome to The digital committee</Text>
            </Row><br />
              <Row>
                <Card>
                  <Card.Header css={{ position: "absolute", zIndex: 1, top: '10%', left: '23%' }}>
                    <Col>
                      <Text size={18} b color='white'>
                        The digital committee
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
                              get start today and signup to the The digital committee
                            </Text>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Row justify="flex-end">
                          <Button type='button' onClick={() => setVisible(true)} flat auto rounded css={{ color: "#f0b59c", bg: "#94f9f026" }}>
                            <Text css={{ color: "inherit" }} size={15} weight="bold">
                              Sign Up
                            </Text>
                          </Button>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              </Row>
            <Col>
              <br />
              <Text h4>The Digital House Committee System is a powerful platform designed to help house committees and management companies efficiently manage shared housing.
                With its intuitive interface and comprehensive feature set, the system simplifies the process of handling important issues related to the management of the house committee.</Text><br/>
              <Text css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }} b>
              <AiOutlineCheckCircle/>Payment management<br />
              <AiOutlineCheckCircle/>Payment of commission fees by credit card<br />
              <AiOutlineCheckCircle/>Publishing ads and surveys and payment ads for the entire building<br />
              <AiOutlineCheckCircle/>Chat for the whole building<br />
              <AiOutlineCheckCircle/>Second Hand Store<br />
              <AiOutlineCheckCircle/> Management of votes for the house committee</Text><br /><br/>
              <Text>
                One of the key features of the system is its capability to manage votes during the committee elections.
                This feature enables the house committee to easily manage the voting process and ensure that important decisions are made democratically and efficiently.
              </Text><br />
              <Text>
                Communication is also a key aspect of the system, with a built-in chat function that allows residents to easily communicate with each other.
                This helps foster a sense of community and ensures that everyone is informed about important events and issues.
              </Text><br />
              <Text>
                For those looking to sell or donate items, the system includes a second-hand store feature.
                This provides a convenient platform for residents to buy and sell goods within the building, promoting sustainability and reducing waste.
              </Text><br />
              <Text>
                In addition, the system offers payment management capabilities, allowing residents to easily pay their commission fees using credit card, streamlining the payment process and reducing administrative overhead.
                The system also allows for the publishing of ads and surveys, enabling residents to share information and opinions about the building.
                Payment ads can also be posted for the entire building to ensure that everyone is aware of important financial matters.
              </Text><br />
              <Text>
                Overall, the Digital House Committee System is an ideal solution for anyone looking to streamline the management of shared housing.
                With its comprehensive feature set and user-friendly interface, it makes it easy to handle the important issues that arise when managing a house committee.</Text><br/>

            <Text>Want to add your building</Text><Text color="primary" onClick={() => setVisible(true)}>Click here</Text> <Text>Your building is already registered Ask for a link from the housing committee to register for an existing building</Text><br/><br/>
            </Col>
          </Col>
          <Row style={{ gap: "2%", marginLeft: "3%" }}>
            <Card style={{ width: "30%" }}>
              <Card.Header css={{ position: "absolute", zIndex: 1, bottom: '1%', left: '-2%' }}>
                <Col>
                  <Text size={20} b color='white'>
                    All the
                  </Text><br />
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
                  </Text><br />
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
              <Card.Header css={{ position: "absolute",top: '13%', left: '9%' }}>
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
          <br />
          <br />
        </Col>}
        <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        width={window.innerWidth < 950 ? "90%" : "45%"}
        onClose={closeHandler}
      >
        <Modal.Header>
            <Text b size={18}><br />
            Sign Up your building
            </Text>
        </Modal.Header>
        <Modal.Body>
          <br />
          <Grid.Container gap={3}>
            <Grid>
              <Col><Input onChange={(e) => setusername(e.target.value)} fullWidth clearable bordered labelPlaceholder='Username' contentLeft={<AiOutlineUser />} /><br /><br /><br />
                <Input.Password onChange={(e) => setpassword(e.target.value)} fullWidth clearable bordered labelPlaceholder='Password' contentLeft={<RiLockPasswordFill />} /><br /><br /><br />
                <Input onChange={(e) => setemail(e.target.value)} clearable fullWidth bordered labelPlaceholder='Email' contentLeft={<MdEmail />} /> <br /><br /><br />
                <Input onChange={(e) => setfull_name(e.target.value)} clearable fullWidth bordered labelPlaceholder='full name' contentLeft={<SiSuperuser />} /> <br /><br /><br />
                <Input onChange={(e) => setphone_number(e.target.value)} clearable fullWidth bordered labelPlaceholder='phone number' contentLeft={<AiOutlinePhone />} /> <br /><br /><br />
                <Input onChange={(e) => setbio(e.target.value)} clearable fullWidth bordered labelPlaceholder='bio' contentLeft={<BiOutline />} />
              </Col>
            </Grid>
            <Grid>
              <Input onChange={(e) => setfull_address(e.target.value)} clearable fullWidth bordered labelPlaceholder='full address' contentLeft={<TbBuildingSkyscraper />} /> <br /><br /><br />
              <Input onChange={(e) => setapartment(e.target.value)} clearable fullWidth bordered labelPlaceholder='your apartment' type={"number"} contentLeft={<MdApartment />} /> <br /><br /><br />
              <Input onChange={(e) => setfloors(+e.target.value)} clearable fullWidth bordered labelPlaceholder='floors in your building' type={"number"} contentLeft={<GiLevelEndFlag />} /> <br /><br /><br />
              <Input onChange={(e) => setpayment_date(e.target.value)} fullWidth bordered type={"date"} value={payment_date} labelPlaceholder='Payment date' contentLeft={<BsCalendar2Date />} /> <br /><br /><br />
              <Input onChange={(e) => setcommittee_monthly(+e.target.value)} clearable fullWidth bordered labelPlaceholder='House committee rate' type={"number"} contentLeft={<GiTakeMyMoney />} />
            </Grid>
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button auto onPress={() => setVisible(false)} onClick={() => handleConfetti()}>
            Sign up
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Home