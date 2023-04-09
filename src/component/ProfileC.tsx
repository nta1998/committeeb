import React, { useEffect, useState } from 'react';
import { Upload } from 'antd';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loguot, selectlog } from '../Slices/loginSlice';
import { editAsync, getAsync, selecflag, selectGetProfileOne } from '../Slices/profileSlice';
import { Profile } from '../model/profile';
import { Col, Container, Row, User } from "@nextui-org/react";
import { Text, Button, Input, Textarea } from "@nextui-org/react";
const ProfileC = () => {

  const [edit, setedit] = useState(false)
  const dispatch = useAppDispatch();
  const is_login = useAppSelector(selectlog)
  const token = localStorage.getItem("access") || ""
  const flag = useAppSelector(selecflag)
  const data = useAppSelector(selectGetProfileOne)

  const [full_name, setfull_name] = useState("")
  const [Address, setAddress] = useState("")
  const [Email, setEmail] = useState("")
  const [Phone_number, setPhone_number] = useState("")
  const [Apartment, setApartment] = useState("")
  const [bio, setbio] = useState("")
  const [pic, setpic] = useState<any>()

  useEffect(() => {
    dispatch(getAsync(token))
  }, [is_login])

  useEffect(() => {
    dispatch(getAsync(token))
  }, [flag])

  const edit_profile = (id: number, pro: Profile) => {
    const formData = new FormData();
    formData.append('full_name', full_name.length < 2 ? pro.full_name : full_name);
    formData.append('Email', Email.length < 2 ? pro.user : Email);
    formData.append('Address', Address.length < 2 ? pro.building_id?.full_address || "" : Address);
    formData.append('Apartment', Apartment.length < 2 ? pro.apartment : Apartment);
    formData.append('phone_number', Phone_number.length < 2 ? pro.phone_number : Phone_number);
    formData.append("bio", bio.length < 2 ? pro.bio : bio);
    formData.append("is_committee", (pro.is_committee||false).toString())
    formData.append('profile_pic', pic);
    setedit(!edit)
    dispatch(editAsync({ formData, token, id }))
  }
  return (

    <Container style={{ padding: "3% 0%" }}>
      <Col>{!edit ?
        <Col>
          <Col>
            <User src={'http://44.202.160.222/' + data.profile_pic} name={data.full_name} size="xl" />
            <br />
            <Col style={{ padding: '1% 25%' }}>
              <Text h4 size={20} css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%", }} weight="bold">Address</Text>
              <Text blockquote>{data.building_id?.full_address}</Text>
              <Text h4 size={20} css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%", }} weight="bold">Apartment</Text>
              <Text blockquote>{data.apartment}</Text>
              <Text h4 size={20} css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%", }} weight="bold">Email</Text>
              <Text blockquote>{data.user}</Text>
              <Text h4 size={20} css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%", }} weight="bold">Phone number</Text>
              <Text blockquote>{data.phone_number}</Text>
              <Text h4 size={20} css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%", }} weight="bold">bio</Text>
              <Text blockquote>{data.bio}</Text>
            </Col>
            <Row style={{ paddingLeft: "25%" }}>
              <Button shadow color="gradient" auto onClick={() => setedit(!edit)}>edit</Button>
            </Row>
            <br>
            </br>
            <br/>
                <br/>
          </Col>


        </Col>
        :
        <Col style={{ marginLeft: "10%" }}>
        
            <Col>
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploade"
                onChange={(info) => setpic(info.file.originFileObj)}>
                <Text>+</Text>
              </Upload>
              <br />
              <br />
              <Col style={{ paddingLeft: "20%" }}>
                <Text>full name</Text>
                <Input width='60%' placeholder={data.full_name} onChange={(e) => setfull_name(e.target.value)} />
                <br />
                <br />
                <Text>Address</Text>
                <Input disabled={!data.is_committee ? true :false} width='60%' placeholder={data.building_id?.full_address} onChange={(e) => setAddress(e.target.value)} />
                <br />
                <br />
                <Text>Apartment</Text>
                <Input width='10%' placeholder={data.apartment} type={"number"} onChange={(e) => setApartment(e.target.value)} />
                <br />
                <Text>Email</Text>
                <Input width='60%' placeholder={data.user} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <br />
                <Text>Phone number</Text>
                <Input width='30%' placeholder={data.phone_number} style={{ width: '8%' }} onChange={(e) => setPhone_number(e.target.value)} />
                <br />
                <Text>bio</Text>
                <Textarea width='60%' rows={4} placeholder={data.bio} onChange={(e) => setbio(e.target.value)} />
                <br />
                <br />
                <Row style={{ display: "flex", gap: "1%" }}>
                  <Button shadow auto onClick={() => edit_profile(data.id || -1, data)} color="success">save</Button>
                </Row>
                <br/>
                <br/>
                <br/>
                <br/>
              </Col>
            </Col>
        </Col>}
      </Col>
    </Container >
  )
}

export default ProfileC