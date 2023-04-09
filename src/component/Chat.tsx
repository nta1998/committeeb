import React, { createRef, useEffect, useState } from 'react'
import { Container, Card, Row, Text, Col, Input, User, Button, Badge } from "@nextui-org/react";
import { ChatM } from '../model/chat';
import { selectGetProfileOne } from '../Slices/profileSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Online } from '../model/online';
import { toast } from 'react-toastify';
import { selectchatSocket, selectconnect, selectcontent, selectonline, selectpop, selectref } from '../Slices/chatSlice';




const Chat = () => {
    const bottomRef = createRef<HTMLDivElement>();
    const [message, setmessage] = useState("")
    const user = useAppSelector(selectGetProfileOne)
    const content = useAppSelector(selectcontent)
    const online = useAppSelector(selectonline)
    const chatSocket = useAppSelector(selectchatSocket)

    useEffect(() => {
        if (bottomRef.current?.scrollHeight && bottomRef.current?.clientHeight) {
            const scroll = bottomRef.current.scrollHeight - bottomRef.current.clientHeight;
            bottomRef.current.scrollTo(0, scroll);
        }
    }, [content])

    const sendM=()=>{
        chatSocket.send(JSON.stringify({ "message": message, "profile_id": user?.id, "building_id": user?.building_id?.id, "command": "new_message" }))
        setmessage("")
    }
    return (
        <Container gap={0} style={{ padding: "3%" }}>

            <Row gap={1} >

                <Col style={{ paddingRight: "1%", display: `${window.innerWidth < 950 ? "none" : ""}` }} span={3} >
                    <Card><Text h3 css={{padding: "2%" ,textAlign:"center",textGradient: "1005deg, #C9EEFF -80%, #AA77FF 150%" }} b>{user?.building_id?.full_address || ""}</Text></Card>
                    <br />
                    <Card.Divider />
                    <br />
                    <Card>
                        <User style={{ padding: "2%" }} src={`http://44.202.160.222/static${user?.profile_pic}`} name={user?.full_name} size="md" />
                    </Card>
                    <br />
                    <Card.Divider />
                    <br />
                    <Badge enableShadow disableOutline color="success"><Text b size={15}>online</Text></Badge>
                    <br />
                    <br />
                    {online.filter(online_users => online_users.fullname !== user.full_name).map((user, index) => <User key={index} src={`http://13.48.123.1/static/${user.img}`} name={user.fullname} size="md" />)}
                </Col>
                <Col>
                    <Card style={{ height: "580px" }}>
                        <Card.Body ref={bottomRef}>
                            <Container>
                                <Col  >
                                    {content.map((x, i) => <Row style={{ padding: '1% 0%', justifyContent: `${x.profile_id.id === user.id ? 'end' : ''}` }}>
                                        <Card css={{ $$cardColor: `${x.profile_id.id === user.id ? '#17C964' : '#697177'}`, height: "auto", width: "auto", minWidth: "20%", maxWidth: "40%", position: "relative" }}>
                                            <Card.Body>
                                                <Text h6>{x.profile_id.full_name}</Text>
                                                <Text h4>{x.message}</Text>
                                            </Card.Body>

                                        </Card></Row>)}
                                </Col>
                            </Container>
                        </Card.Body>
                        <br />
                    </Card>
                    <div style={{ width: "100%" }}>
                        <Input value={message} onChange={(e) => setmessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" ? sendM() : "" }
                            width='100%'
                            clearable
                            contentRightStyling={false}
                            placeholder="Type your message..."
                            contentRight={
                                <Button onPress={() =>sendM()}>
                                    <svg
                                        data-name="Iconly/Curved/Lock"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24">
                                        <g transform="translate(2 2)">
                                            <path d="M19.435.582A1.933,1.933,0,0,0,17.5.079L1.408,4.76A1.919,1.919,0,0,0,.024,6.281a2.253,2.253,0,0,0,1,2.1L6.06,11.477a1.3,1.3,0,0,0,1.61-.193l5.763-5.8a.734.734,0,0,1,1.06,0,.763.763,0,0,1,0,1.067l-5.773,5.8a1.324,1.324,0,0,0-.193,1.619L11.6,19.054A1.91,1.91,0,0,0,13.263,20a2.078,2.078,0,0,0,.25-.01A1.95,1.95,0,0,0,15.144,18.6L19.916,2.525a1.964,1.964,0,0,0-.48-1.943"
                                                fill={"fill"} />
                                        </g>
                                    </svg>
                                </Button>} />
                    </div>


                </Col>
            </Row>
        </Container>
    )
}

export default Chat