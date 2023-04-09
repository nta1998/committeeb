import React, { useState } from 'react'
import { Container, Card, Row, Col, Input, Modal, useModal, Button, Text, Image, Grid, Badge, Dropdown, Collapse } from "@nextui-org/react";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { addProductAsync, addToCart, selecproduct } from '../Slices/productSlice';
import { Product } from '../model/product';
import { Upload } from 'antd';
import { selectGetProfileOne } from '../Slices/profileSlice';


const Store = () => {
  const token = localStorage.getItem("access") || ""
  const products = useAppSelector(selecproduct);
  const { setVisible, bindings } = useModal();
  const [addToStore, setaddToStore] = useState(false)
  const [serarch, setserarch] = useState("")
  const [product_selected, setproduct_selected] = useState<Product>()
  const [Product_name, setProduct_name] = useState("")
  const [Category, setCategory] = useState<any>()
  const [Description, setDescription] = useState("")
  const [Price, setPrice] = useState(0)
  const [productPic, setproductPic] = useState<any>()
  const [serarchCategory, setserarchCategory] = useState<any>("")

  const data = useAppSelector(selectGetProfileOne)
  const dispatch = useAppDispatch();

  const modelView = (pro: Product) => {
    setproduct_selected(pro)
    setVisible(true)
  }
  const add = (product: Product) => {
    setVisible(false)
    dispatch(addToCart(product))
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////
  const { Dragger } = Upload;

  const addProduct = () => {
    const formData = new FormData();
    formData.append('name', Product_name);
    formData.append('category', Category.anchorKey);
    formData.append('Description', Description);
    formData.append('price', Price.toString());
    formData.append('product_pic', productPic);
    formData.append("profile_id", data.id?.toString() || "-1");
    setaddToStore(false)
    dispatch(addProductAsync({ formData, token }))
  }

  return (
    <Container gap={0}>
      <div>
        <Modal
          closeButton
          width="50%"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          {...bindings}
        >
          <Modal.Header>
            <Text id="modal-title" b size={20}>
              {product_selected?.name}
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Image
                  src={`http://44.202.160.222${product_selected?.product_pic}`}
                  width={400}
                  height={300}
                />
                <br />
                <Text h5 b style={{ marginLeft: "10%" }}>price : {product_selected?.price}₪</Text>
              </Col>
              <Col>
                <Text style={{ padding: "1%" }} size={16}>{product_selected?.Description}</Text>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button auto onPress={() => add(product_selected || new Product())}>
              add to cart
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>

        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={addToStore}
          onClose={() => setaddToStore(false)}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Welcome to
              <Text b size={18}>
                Add Product
              </Text>
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Input clearable bordered fullWidth size="lg" placeholder="Product name" onChange={(e) => setProduct_name(e.target.value)} />
            <Dropdown>
      <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
        {Category}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Single selection actions"
        color="secondary"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={Category}
        onSelectionChange={(currentKey) => setCategory(currentKey)}
      >
        <Dropdown.Item key="Art">Art</Dropdown.Item>
        <Dropdown.Item key="Baby">Baby</Dropdown.Item>
        <Dropdown.Item key="Books">Books</Dropdown.Item>
        <Dropdown.Item key="Music">Music</Dropdown.Item>
        <Dropdown.Item key="Cameras & Photo">Cameras & Photo</Dropdown.Item>
        <Dropdown.Item key="Cell Phones & Accessories">Cell Phones & Accessories</Dropdown.Item>
        <Dropdown.Item key="Computers/Tablets">Computers/Tablets</Dropdown.Item>
        <Dropdown.Item key="Pet Supplies">Pet Supplies</Dropdown.Item>
        <Dropdown.Item key="Toys & Hobbies">Toys & Hobbies</Dropdown.Item>
        <Dropdown.Item key="Home & Garden">Home & Garden</Dropdown.Item>
        <Dropdown.Item key="Health & Beauty">Health & Beauty</Dropdown.Item>
        <Dropdown.Item key="Travel">Travel</Dropdown.Item>
        <Dropdown.Item key="Other">Other</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            <Input clearable bordered fullWidth size="lg" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
            <Input clearable bordered fullWidth size="lg" placeholder="Price" onChange={(e) => setPrice(+e.target.value)} />
            <Dragger onChange={(info) => setproductPic(info.file.originFileObj)}>
              <Row>
              </Row>
              <Text>Click or drag file to this area to upload</Text>
            </Dragger >
          </Modal.Body>
          <Modal.Footer>
            <Button auto onPress={() => addProduct()}>
              Add Product
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Row>
        <Col style={{width:"25%"}}>
          <br/>
          <Row><Input size='lg' width={"100%"} placeholder="Serarch" onChange={(e)=> setserarch(e.target.value)} /></Row>
          <br />
          <Row><Button onPress={() => setaddToStore(true)} color="secondary" auto ghost>Add product</Button></Row>
          <br/>
          <Collapse title="Category">
        <Button  light color="secondary"  onClick={()=>setserarchCategory("")}><Text >All</Text></Button>
        <Button  light color="secondary"  onClick={()=>setserarchCategory("Art")}><Text >Art</Text></Button>
        <Button  light color="secondary"  onClick={()=>setserarchCategory("Baby")}><Text >Baby</Text></Button>
        <Button  light color="secondary"  onClick={()=>setserarchCategory("Books")}><Text >Books</Text></Button>
        <Button  light color="secondary"  onClick={()=>setserarchCategory("Music")}><Text >Music</Text></Button>
        <Button  light color="secondary"  onClick={()=>setserarchCategory("Cameras & Photo")}><Text >Cameras & Photo</Text></Button>
        <Button  light color="secondary"  onClick={()=>setserarchCategory("Cell Phones & Accessories")}><Text >Cell Phones & Accessories</Text></Button>
        <Button  light color="secondary"  onClick={()=>setserarchCategory("Computers/Tablets")}><Text >Computers/Tablets</Text></Button>
        <Button  light color="secondary"  onClick={()=>setserarchCategory("Pet Supplies")}><Text >Pet Supplies</Text></Button>
        <Button  light color="secondary"  onClick={()=>setserarchCategory("Toys & Hobbies")}><Text >Toys & Hobbies</Text></Button>
        <Button  light color="secondary"  onClick={()=>setserarchCategory("Home & Garden")}><Text >Home & Garden</Text></Button>
        <Button  light color="secondary"  onClick={()=>setserarchCategory("Health & Beauty")}><Text >Health & Beauty</Text></Button>
        <Button  light color="secondary"  onClick={()=>setserarchCategory("Travel")}><Text >Travel</Text></Button>
        <Button  light color="secondary"  onClick={()=>setserarchCategory("Other")}><Text >Other</Text></Button>
          </Collapse>
          <br/>
        </Col>

        <Col>
          <Grid.Container gap={2}>
            {products.filter(product => product.profile_id.building_id === data?.building_id?.id).length  <= 0 ? <Row style={{justifyContent:"center",padding:"10%"}}><Badge size={"lg"}>No products yet</Badge></Row>:products.filter(product => product.profile_id.building_id === data?.building_id?.id && product.name.includes(serarch) &&product.category.includes(serarchCategory)).map((product, index) => <Grid xs={3}>
              <Card key={index} onClick={() => modelView(product)} style={{ maxWidth: "250px", maxHeight: "200px", margin: "1%" }} isPressable>
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
              </Card></Grid>)}
          </Grid.Container>
        </Col>
      </Row>
    </Container>
  )
};

export default Store