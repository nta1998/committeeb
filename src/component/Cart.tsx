import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Button, Text, Image, Badge,Grid } from "@nextui-org/react";
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
             <Grid.Container gap={3}>
                <Grid style={{width:window.innerWidth < 950 ? "100%" : "60%"}}> 
                    <Card variant="bordered" style={{maxHeight:window.innerWidth < 950 ? "600px" : "700px"}}>
                        <Card.Body>
                            <Text h2 css={{ textGradient: "85deg, $blue900 -20%, $yellow400 20%" }}>Your Cart</Text>
                            <br />
                            <Card.Divider />
                            <br />
                            {cartItems.length | payad.length ? <Text h4>items : {(cartItems?.length||0) + (payad?.length||0)}</Text>:""}
                            <br />
                            {!cartItems.length && !payad.length ?  <Row style={{justifyContent:"center"}}><Badge size={"xl"}>No items in the cart yet</Badge></Row> : cartItems?.map((product, index) =>
                             <>
                             <Card key={index} style={{ minHeight: "130px" }} variant="bordered">
                                <Grid.Container>
                                    <Grid><Image width="100px" height="120px" src={`${process.env.REACT_APP_MY_SERVER}static`+product.product_pic} /></Grid>
                                    <Grid><Text h3>{product.name}</Text>
                                   <Text h6>prise : {product.price}₪</Text>
                                        <Button onClick={() => dispatch(popFromCart(product.name))} auto ghost style={{ position: "absolute", right: "5%", bottom: "45%" }} color={"error"} size={"xs"}>-</Button>
                                        </Grid>
                                     
                                </Grid.Container>
                            </Card>
                                <br /></>)}
                                {payad?.map((product, index) => <><Card key={index} style={{ minHeight: "130px" }} variant="bordered">
                                <Col style={{ minHeight: "120px",minWidth:"400px" ,padding:"2%"}}>
                                   <Row><Text h3>{product.Title}</Text></Row>
                                   <Row><Text h5 style={{width:"60%"}}>{product.Content}</Text></Row>
                                   <Text h6>prise : {product.price}₪</Text>
                                   <Button onClick={() => dispatch(popFromCartAd(product.Title))} auto ghost color={"error"} size={"xs"} style={{ position: "absolute", right: "5%", bottom: "45%" }}>-</Button>
                                </Col>
                            </Card>
                                <br /></>)}
                     
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid style={{width:window.innerWidth < 950 ? "100%" : "40%"}}>
                    <Card variant="bordered" style={{maxHeight:window.innerWidth < 950 ? "500px" : "600px"}}>
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
                            <Row style={{justifyContent:"center"}}><Text h4 style={{}}>Total :
                                {total}
                                ₪</Text></Row>
                            
                            <br />


                            <PayPalButton amount={total} onSuccess={()=>delProduct()} />

                            {/* <Button size={"md"} color={"success"}>pay now</Button> */}

                        </Card.Body>
                    </Card>
                </Grid>
                </Grid.Container>
        </Container>
    )
}

export default Cart