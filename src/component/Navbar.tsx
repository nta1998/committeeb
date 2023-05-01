import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectlog, loguot } from '../Slices/loginSlice';
import { Navbar, Button, Text, Avatar, Dropdown, Modal, Input, Row, Checkbox, Badge, Switch } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { colorThemeChange, seleccolor, selectGetProfileOne } from '../Slices/profileSlice';
import React, { useEffect, useState } from 'react';
import { loginAsync, remember } from '../Slices/loginSlice';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Player } from '@lottiefiles/react-lottie-player';
import { addPaymentAdToCart, selecCart, selecPayAds } from '../Slices/productSlice';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import icon from "../static/img/icon.png"
const NavbarC = () => {
  const profile = useAppSelector(selectGetProfileOne)
  const colorM = useAppSelector(seleccolor)
  const Cart = useAppSelector(selecCart)
  const payad = useAppSelector(selecPayAds)
  const is_log = useAppSelector(selectlog)

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")


  const [to_remember] = useState(true)
  const dispatch = useAppDispatch()
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  useEffect(() => {
    if (to_remember) {
      dispatch(remember())
    }
  }, [to_remember, Cart, dispatch])

  const closeHandler = () => {
    setVisible(false);
  };
  const singuot = () => {
    setVisible(false)
    dispatch(loguot())
  }
  const Monthly_payment = () => {
    dispatch(addPaymentAdToCart({ "Content": `Payment to the house committee for ${new Date().getMonth()}/${new Date().getFullYear()}`, "Title": "Monthly payment", "price": profile.building_id?.committee_monthly, "token": "", "building_id": -1 }))
  }

  return (
    <Navbar isBordered variant="static">
      {is_log ? <Navbar.Toggle showIn="sm" aria-label="toggle navigation" /> :""}
      <Navbar.Brand
        css={{ "@xs": { w: "15%" } }}>
        <Link to="/home" style={{ display: "flex" }}>
          <img src={icon} alt="icon" /><Text css={{ textGradient: "1005deg, #C9EEFF -80%, #AA77FF 150%" }} weight="bold" >
            The digital committee
          </Text></Link>
      </Navbar.Brand>
      {is_log ? <Navbar.Content
        enableCursorHighlight
        activeColor="secondary"
        hideIn="sm"
        variant="highlight-rounded">
        <Navbar.Item><Link to="/home"><Text css={{ textGradient: "45deg, $pink600 -10%, $blue600 80%" }} weight="bold">Home</Text></Link></Navbar.Item>
        <Navbar.Item><Link to="/Ads"><Text css={{ textGradient: "45deg, $pink600 -10%, $blue600 80%" }} weight="bold">Ads</Text></Link></Navbar.Item>
        <Navbar.Item><Link to="/Chat"><Text css={{ textGradient: "45deg, $pink600 -10%, $blue600 80%" }} weight="bold">Chat</Text></Link></Navbar.Item>
        {profile?.building_id?.vote_active ? <Navbar.Item><Link to="/vote"><Text css={{ textGradient: "45deg, $pink600 -10%, $blue600 80%" }} weight="bold">Vote</Text></Link></Navbar.Item> : ""}
        <Navbar.Item><Link to="/Store"><Text css={{ textGradient: "45deg, $pink600 -10%, $blue600 80%" }} weight="bold">Store</Text></Link></Navbar.Item>
        {profile?.is_committee ? <Navbar.Item><Link to="/admin"><Text css={{ textGradient: "45deg, $pink600 -10%, $blue600 80%" }} weight="bold">Admin</Text></Link></Navbar.Item> : ""}
        <Navbar.Item><Link to="/About"><Text css={{ textGradient: "45deg, $pink600 -10%, $blue600 80%" }} weight="bold">About</Text></Link></Navbar.Item>
      </Navbar.Content> : ""}

      <Navbar.Content>
        {is_log ? <>
          <Switch style={{ display: window.innerWidth < 950 ? "none" : "block" }}
            onChange={(e) => dispatch(colorThemeChange(e.target.checked))}
            checked={false}
            size="sm"
            color={"secondary"}
            iconOn={<BsFillMoonFill />}
            iconOff={<BsFillSunFill />} />
          <Link to={"/cart"}>
            <Badge color="error" content={(Cart?.length || 0) + (payad?.length || 0)}>
              <Player
                speed={2}
                hover
                src="https://cdn.lordicon.com/lpddubrl.json"
                style={{ height: '50px', width: '50px' }} />
            </Badge>
          </Link>
          <Dropdown>
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="md"
                  src={`${process.env.REACT_APP_MY_SERVER}static` + profile?.profile_pic} />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu

              aria-label="User menu actions"
              color="secondary">
              <Dropdown.Item key={"username"} css={{ height: "$18" }} >
                <Link to="/profile">
                  <Text h6 b css={{ d: "flex" }}>
                    Signed in as

                  </Text>
                  <Text h4 b css={{ d: "flex" }}>
                    {profile.full_name}
                  </Text>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider className="nav-link active">
                <Link to="/profile">
                  <Text>
                    My Profile
                  </Text>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item key="Pay" withDivider className="nav-link active">
                <Text onClick={() => Monthly_payment()}>
                  Monthly payment
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="Beginner's Guide" withDivider className="nav-link active">
                <Link to="/How_to_use">
                  <Text>
                    Beginner's Guide
                  </Text>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item withDivider color="error" >
                <Text onClick={() => singuot()} color='error'>Log Out</Text>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> </>
          :
          <Navbar.Content>
            <Navbar.Item hideIn={"xs"}>
              <Button auto flat color="gradient">
              <Link to='/How_to_use'>   
              <Text  b color='white'>
                    Beginner's Guide
               </Text>
                </Link>
              </Button>
         
           
            </Navbar.Item>
            <Navbar.Item>
              <div>
                <Button auto flat color="secondary" onPress={handler}>
                  Sign in
                </Button>
                <Modal
                  closeButton
                  aria-labelledby="modal-title"
                  open={visible}
                  width={window.innerWidth < 950 ? "80%" : "25%"}
                  onClose={closeHandler}>
                  <Modal.Header>
                    <Text id="modal-title" size={18}>
                      Welcome
                      <br />
                      <Text b size={18}>
                        To digital committee
                      </Text>
                    </Text>
                  </Modal.Header>
                  <Modal.Body>
                    <Input onChange={(e) => setusername(e.target.value)} clearable fullWidth bordered placeholder='Username' contentLeft={<AiOutlineUser />} />
                    <Input.Password onChange={(e) => setpassword(e.target.value)} clearable fullWidth bordered placeholder='Password' contentLeft={<RiLockPasswordFill />} />
                    <Row justify="space-between">
                      <Checkbox onClick={() => dispatch(remember())}><Text size={14}>Remember me</Text></Checkbox>
                    </Row>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button color="secondary" auto ghost onPress={() => dispatch(loginAsync({ username, password }))}>
                      Sign in
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </Navbar.Item>
          </Navbar.Content>
        }
        <Navbar.Collapse>
          <Navbar.Link href='/home'><Text size={30} css={{ textGradient: "45deg, $pink600 -10%, $blue600 80%" }} weight="bold">Home</Text></Navbar.Link>
          <Navbar.Link href="/Ads"><Text size={30} css={{ textGradient: "45deg, $pink600 -10%, $blue600 80%" }} weight="bold">Ads</Text></Navbar.Link>
          <Navbar.Link href="/Chat"><Text size={30} css={{ textGradient: "45deg, $pink600 -10%, $blue600 80%" }} weight="bold">Chat</Text></Navbar.Link>
          {/* <Navbar.Item><Link to="/payment"><Text css={{ textGradient: "45deg, $pink600 -10%, $blue600 80%"}} weight="bold">payment</Text></Navbar.Link> */}
          {profile?.building_id?.vote_active ? <Navbar.Link href="/vote"><Text size={30} css={{ textGradient: "45deg, $pink600 -10%, $blue600 80%" }} weight="bold">vote</Text></Navbar.Link> : ""}
          <Navbar.Link href="/Store"><Text size={30} css={{ textGradient: "45deg, $pink600 -10%, $blue600 80%" }} weight="bold">Store</Text></Navbar.Link>
          {profile?.is_committee ? <Navbar.Link href="/admin"><Text size={30} css={{ textGradient: "45deg, $pink600 -10%, $blue600 80%" }} weight="bold">admin</Text></Navbar.Link> : ""}
          <Navbar.Link href='/About'><Text size={30} css={{ textGradient: "45deg, $pink600 -10%, $blue600 80%" }} weight="bold">About</Text></Navbar.Link>
          <br />
          <Navbar.Item>
            <Switch
              onChange={(e) => dispatch(colorThemeChange(e.target.checked))}
              checked={colorM}
              size="xl"
              color={"secondary"}
              iconOn={<BsFillMoonFill />}
              iconOff={<BsFillSunFill />} />
          </Navbar.Item>
        </Navbar.Collapse>
      </Navbar.Content>
      <Navbar.Collapse>
      </Navbar.Collapse>
    </Navbar>

  )
}

export default NavbarC