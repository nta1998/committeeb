
import React, {useState } from 'react'
import {
  selecads,
  selecpayads,
  selecpool,
  addVoteAsync
} from '../Slices/adsSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Card, Text, Row, Button, Container, Col, Badge } from "@nextui-org/react";
import { selectGetProfileOne } from '../Slices/profileSlice';
import { addPaymentAdToCart } from '../Slices/productSlice';


const Ads = () => {
  const token = localStorage.getItem("access") || ""
  const ads = useAppSelector(selecads)
  const pool = useAppSelector(selecpool)
  const payads = useAppSelector(selecpayads)
  const profile = useAppSelector(selectGetProfileOne)
  const dispatch = useAppDispatch();

  return (
    <Container gap={0} style={{ paddingTop: "2%" }}>
      <Col style={{ padding: "4%" }}>
        <Col>
          <Col>
            <Row style={{ justifyContent: "center" }}><Text b size={30} css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>Ads</Text></Row>
            <br />
          </Col>
          <Card style={{ width: "100%" }}>
            <Card.Body >
              <Container>
                <Row>
                  {ads.filter(ads => ads.building_id === profile.building_id?.id).length <= 0 ? <Badge size={"lg"}>No ads yet</Badge> : ads.filter(ads => ads.building_id === profile.building_id?.id).map((ad, index) =>
                    <Card css={{ maxWidth: "330px", minWidth: "330px", margin: "1%" }}>
                      <Card.Header>
                        <Text b >{ad.Title}</Text>
                      </Card.Header>
                      <Card.Divider />
                      <Card.Body>
                        <Text h4 style={{ padding: "1%" }}> {ad.Content} </Text>
                        <Card.Divider />
                        <br />
                        <Text h6 style={{ position: "absolute", bottom: "1%", right: "3%" }} color="#889096"> {ad.Post_time}</Text>
                      </Card.Body>
                    </Card>)}
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
        <br/>
        <Col>
        <br/>
          <Row style={{ justifyContent: "center" }}><Text b size={30} css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>survey</Text></Row>
          <br/>
          <Card style={{ width: "100%" }}>
            <Card.Body >
              <Container>
                <Row>
                  {pool.filter(pool => pool.building_id === profile.building_id?.id).length <= 0 ? <Badge size={"lg"}>No survey to view yet</Badge> : pool.filter(pool => pool.building_id === profile.building_id?.id).map((pool, index) =>
                    <Card css={{ margin: "1%", maxWidth: "330px", minWidth: "330px" }}>
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
                          <Button flat size="sm" color="success" onClick={() => dispatch(addVoteAsync({ pool, action: "yes","profile":profile.id, token }))}>
                            👍
                          </Button>
                          <Button flat size="sm" color="error" style={{ marginLeft: "5%" }} onClick={() => dispatch(addVoteAsync({ pool, action: "no","profile":profile.id, token }))}>👎</Button>
                        </Row>
                      </Card.Footer>

                    </Card>
                  )}
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
          <br/>
          
        <Col>
        <br/>
            <Row style={{ justifyContent: "center" }}><Text b size={30} css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>Payent ads</Text></Row>
            <br />
          <Card style={{ width: "100%" }}>
            <Card.Body >
              <Container>
                <Row>
                  {payads.filter(payads => payads.building_id === profile.building_id?.id).length <= 0 ? <Badge size={"lg"}>No payment ads  yet</Badge> : payads.filter(payads => payads.building_id === profile.building_id?.id).map((ads, index) =>
                    <Card key={index} css={{ maxWidth: "330px", minWidth: "330px", margin: "1%" }}>
                      <Card.Header>
                        <Text b>{ads.Title} </Text>
                      </Card.Header>
                      <Card.Divider />
                      <Card.Body>
                        <Text h4 style={{ padding: "1%" }}> {ads.Content} </Text>
                        <br />
                        <Text h5 style={{ position: "absolute", bottom: "1%", left: "5%" }}> price: {ads.price}</Text>
                        <br />
                        <Text h6 style={{ position: "absolute", bottom: "1%", right: "3%" }} color="#889096"> {ads.Post_time}</Text>

                      </Card.Body>
                      <Card.Divider />
                      <Card.Footer>
                        <Row justify="flex-end">
                          <Button size="sm" color="default" onClick={() => dispatch(addPaymentAdToCart(ads))}>
                            Add To Cart
                          </Button>
                        </Row>
                      </Card.Footer>
                    </Card>)}
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Col>
    </Container>
  )
}

export default Ads


