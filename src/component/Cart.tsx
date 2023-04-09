import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Button, Text, Image, Badge } from "@nextui-org/react";
import { Product } from '../model/product';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { delProductAsync, popFromCart, popFromCartAd, selecCart, selecPayAds } from '../Slices/productSlice';
import { PayPalButton } from "react-paypal-button-v2";
import { Payads } from '../model/ads';
import { editPayAsync, selectGetProfileOne } from '../Slices/profileSlice';

const Cart = () => {
    const cart = useAppSelector(selecCart)
    const ads = useAppSelector(selecPayAds)
    const token = localStorage.getItem("access") || ""
    const dispatch = useAppDispatch();
    const [cartItems, setcartItems] = useState<Product[]>(cart)
    const [payad, setpayad] = useState<Payads[]>(ads)
    const data = useAppSelector(selectGetProfileOne)

    useEffect(() => {
        setcartItems(cart)
      setpayad(ads)
    
    }, [cart,ads])
    
    let total: number = 0

    for (let index: number = 0; index < (cartItems?.length || []); index++) {
        const sum = (cartItems ? cartItems[index]?.price : 0)
        total += sum
    }
    for (let index: number = 0; index < (payad?.length || []); index++) {
        const sum = (payad ? payad[index]?.price : 0)
        total += sum
    }
    const delProduct=()=>{

        for (const item of cart) {
            dispatch(delProductAsync({"id":item.id,token}))
        }
        for (const item of payad) {
            if (item.Title === "Monthly payment"){
                dispatch(editPayAsync({"profile":data,token}))
            }
        }
     
    }
    return (
        <Container>
            <Row>
                <Col style={{ height: "750px", padding: "1%" }}>
                    <Card variant="bordered" style={{ height: "100%" }}>
                        <Card.Body>
                            <Text h2 css={{ textGradient: "85deg, $blue900 -20%, $yellow400 20%" }}>Your Cart</Text>
                            <br />
                            <Card.Divider />
                            <br />
                            {cartItems.length | payad.length ? <Text h4>items : {(cartItems?.length||0) + (payad?.length||0)}</Text>:""}
                            <br />
                            {!cartItems.length && !payad.length ?  <Row style={{justifyContent:"center"}}><Badge size={"xl"}>No items in the cart yet</Badge></Row> : cartItems?.map((product, index) => <><Card key={index} style={{ minHeight: "120px" }} variant="bordered">
                                <Row>
                                    <Col><Image width="100px" height="120px" src={`http://44.202.160.222${product.product_pic}`} /></Col>
                                    <Col><Text h3 style={{ position: "absolute", left: "25%", bottom: "35%" }}>{product.name}</Text></Col>
                                    <Col><Text h6 style={{ position: "absolute", right: "15%", bottom: "5%" }}>prise : {product.price}₪</Text>
                                        <Button onClick={() => dispatch(popFromCart(product.name))} auto ghost style={{ position: "absolute", right: "5%", bottom: "45%" }} color={"error"} size={"xs"}>-</Button></Col>
                                </Row>
                            </Card>
                                <br /></>)}
                                {payad?.map((product, index) => <><Card key={index} style={{ minHeight: "120px" }} variant="bordered">
                                <Row style={{ minHeight: "120px" }}>

                                    <Col><Text h3 style={{ position: "absolute", left: "10%",top:"10%" }}>{product.Title}</Text></Col>
                                    <Col><Text h5 style={{ position: "absolute",left:"15%",top:"35%" }}>{product.Content}</Text></Col>
                                    <Col><Text h6 style={{position:"absolute" , top:"75%",right:"10%"}}>prise : {product.price}₪</Text></Col>
                                    <Col><Button onClick={() => dispatch(popFromCartAd(product.Title))} auto ghost color={"error"} size={"xs"} style={{ position: "absolute", right: "5%", bottom: "45%" }}>-</Button></Col>
                                </Row>
                            </Card>
                                <br /></>)}
                     
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ marginTop: "15%", marginLeft: "20%", width: "70%", maxHeight: "600px" }} variant="bordered">
                        <Card.Body>
                            <Text h5>Total Items : {(cartItems?.length||0) + (payad?.length||0)}</Text>

                            <Card.Divider />
                            <br />

                            {cartItems?.map((product, index) => <>
                                <Row key={index}>
                                    <Text>{product.name}</Text><Text style={{ position: "absolute", right: "1%" }}>{product.price} ₪</Text></Row>
                                <Card.Divider /></>)}
                            {payad?.map((ad, index) => <>
                                <Row key={index}>
                                    <Text>{ad.Title}</Text><Text style={{ position: "absolute", right: "1%" }}>{ad.price} ₪</Text></Row>
                                <Card.Divider /></>)}
                            <br />

                            <Text h4 style={{ position: "relative", left: "75%" }}>Total :
                                {total}
                                ₪</Text>
                            <br />


                            <PayPalButton amount={total} onSuccess={()=>delProduct()} />

                            {/* <Button size={"md"} color={"success"}>pay now</Button> */}

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Cart