import React, { useEffect, useState } from 'react'
import { Table, Row, Col, Tooltip, Text, Card, Button, Modal, Input, Badge, Dropdown } from "@nextui-org/react";
import { editPayAsync, selectGetProfile, selectGetProfileOne } from '../Slices/profileSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addadlAsync, addpayadsAsync, addpoolAsync, selecpool } from '../Slices/adsSlice';
import { addAsync, delVoteAsync, selecvote, selecVoteflag } from '../Slices/voteSlice';
import { editAsync, selectBuilding, selectBuildingFlag, voteActivAsync } from '../Slices/buildingSlice';
import { Player } from '@lottiefiles/react-lottie-player';
import { GiVote } from 'react-icons/gi';
import { FcCancel, FcMoneyTransfer, FcApproval, FcHighPriority } from 'react-icons/fc';
import { FaRegCopy } from 'react-icons/fa';
import { WhatsappShareButton, WhatsappIcon, } from "react-share";
import { Chart } from 'primereact/chart';

const Committee = () => {
  const pool = useAppSelector(selecpool)
  const building = useAppSelector(selectBuilding)
  const BuildingFlag = useAppSelector(selectBuildingFlag)
  const all_profiles = useAppSelector(selectGetProfile)
  const profile = useAppSelector(selectGetProfileOne)
  const all_vote = useAppSelector(selecvote)
  const dispatch = useAppDispatch()
  const token = localStorage.getItem("access") || ""
  const [visiblepayent, setVisiblepayent] = useState(false);
  const [visiblepool, setVisiblepool] = useState(false);
  const [visiblead, setvisiblead] = useState(false)
  const [Title, settitel] = useState("")
  const [Question, setquestion] = useState("")
  const [Content, setContent] = useState("")
  const [price, setprice] = useState(0)
  const [edit, setedit] = useState(false)
  const [full_address, setfull_address] = useState("")
  const [committee_phone, setcommittee_phone] = useState("")
  const [committee_monthly, setcommittee_monthly] = useState(0)
  const [payment_date, setpayment_date] = useState("")
  const [paydata, setpaydata] = useState({});
  const [votedata, setvotedata] = useState({});
  const [pooldata, setpooldata] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [link_sing_up, setlink_sing_up] = useState("")
  const flagVote = useAppSelector(selecVoteflag)
  const [selected, setSelected] = useState<any>("Select a survey to view")
  useEffect(() => {
  setlink_sing_up(`http://44.202.160.222/singup/31214/${profile.building_id?.id}/312`)
  setpayment_date(building?.payment_date)
  }, [BuildingFlag])
  
  const saveEdit = () => {
    dispatch(editAsync({
      "building": {
        "id": building.id,
        "full_address": full_address.length > 2 ? full_address : building.full_address,
        "floors": building.floors,
        "vote_active": building.vote_active,
        "payment_date":payment_date,
        "committee_name": building.committee_name,
        "committee_apartment": building.committee_apartment,
        "committee_phone": committee_phone.length > 2 ? committee_phone : building.committee_phone,
        "committee_monthly": committee_monthly > 2 ? committee_monthly : building.committee_monthly
      }, token
    }))
    setedit(false)
  }

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ['payd', 'not pyd'],
      datasets: [{
        data: [all_profiles?.filter(pro => pro?.monthly_payment && pro.building_id?.id === profile.building_id?.id).length, all_profiles.filter(pro => !pro?.monthly_payment && pro.building_id?.id === profile.building_id?.id).length],
        backgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-400')],
        hoverBackgroundColor: [documentStyle.getPropertyValue('--green-600'), documentStyle.getPropertyValue('--red-600')]
      }]
    }
    const options = { plugins: { legend: { labels: { usePointStyle: true } } } }
    setpaydata(data);
    setChartOptions(options);
  }, []);

  useEffect(() => {
    const data = {
      labels: all_vote.filter(vote => vote.building_id === profile.building_id?.id).map(vote => vote.profile_id.full_name),
      datasets: [{
        data: all_vote.filter(vote => vote.building_id === profile.building_id?.id).map(pro => pro.vote)
      }]
    }
    const options = { plugins: { legend: { labels: { usePointStyle: true } } } }
    setvotedata(data);
    setChartOptions(options);
  }, [flagVote]);

  useEffect(() => {
    const data = {
      labels: [pool.filter(pool => pool.building_id === profile.building_id?.id && pool.Title === selected?.anchorKey).map(pool => "yes"),
      pool.filter(pool => pool.building_id === profile.building_id?.id && pool.Title === selected?.anchorKey).map(pool => "no")
      ],
      datasets: [{
        data: [pool.filter(pool => pool.building_id === profile.building_id?.id && pool.Title === selected?.anchorKey).map(pool => pool.no),
        pool.filter(pool => pool.building_id === profile.building_id?.id && pool.Title === selected?.anchorKey).map(pool => pool.yes)]
      }]
    }
    const options = { plugins: { legend: { labels: { usePointStyle: true } } } }
    setpooldata(data);
    setChartOptions(options);
  }, [pool, selected])

  return (
    <>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visiblepool}
        onClose={() => setVisiblepool(false)}
      >
        <Modal.Body style={{ padding: "8%" }}>
          <Input onChange={(e) => settitel(e.target.value)} clearable bordered labelPlaceholder="Titel" />
          <br />
          <Input onChange={(e) => setquestion(e.target.value)} clearable bordered labelPlaceholder="Question" />
        </Modal.Body>
        <Modal.Footer>
          <Button auto onPress={() => dispatch(addpoolAsync({ Title, Question, token, "building_id": profile.building_id?.id || -1, yes: 0, no: 0 }))}>
            add
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visiblead}
        onClose={() => setvisiblead(false)}
      >
        <Modal.Body style={{ padding: "8%" }}>
          <Input onChange={(e) => settitel(e.target.value)} clearable bordered labelPlaceholder="Titel" />
          <br />
          <Input onChange={(e) => setquestion(e.target.value)} clearable bordered labelPlaceholder="Question" />
        </Modal.Body>
        <Modal.Footer>
          <Button auto onPress={() => dispatch(addadlAsync({ Title, Content: Question, token, "building_id": profile.building_id?.id || -1 }))}>
            add
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        closeButton
        aria-labelledby="modal-title1"
        open={visiblepayent}
        onClose={() => setVisiblepayent(false)}
      >
        <Modal.Body style={{ padding: "8%" }}>
          <Input onChange={(e) => settitel(e.target.value)} clearable bordered labelPlaceholder="Titel" />
          <br />
          <Input onChange={(e) => setContent(e.target.value)} clearable bordered labelPlaceholder="Content" />
          <br />
          <Input onChange={(e) => setprice(+e.target.value)} type="number" clearable bordered labelPlaceholder="price" />
        </Modal.Body>
        <Modal.Footer>
          <Button auto onPress={() => dispatch(addpayadsAsync({ Title, Content, price, token, "building_id": profile.building_id?.id || -1 }))}>
            add
          </Button>
        </Modal.Footer>
      </Modal>

      <Col style={{ paddingLeft: "35%", paddingTop: "4%", paddingBottom: "3%", width: "100%" }} >
        <Card css={{ mw: "450px" }}>
          <Card.Body>
            <WhatsappShareButton
              title='lh'
              url={link_sing_up} children={<WhatsappIcon style={{ cursor: "pointer", position: "relative", left: "40%" }} size={25} round />} />
            <FaRegCopy style={{ cursor: "pointer", position: "absolute", left: "93%", top: "25%" }} onClick={() => navigator.clipboard.writeText(link_sing_up)} />
            <Text h4>{link_sing_up}</Text>
          </Card.Body>
        </Card>
      </Col>
      <Row style={{ justifyContent: "center", padding: "3%", gap: "8%" }}>
        <Tooltip content={`${building?.vote_active ? "Close" : "Open"} vote To The Next Commiet`}>
          <Button bordered color="warning" auto onClick={() => dispatch(voteActivAsync({ "building": building, token }))}>{building?.vote_active ? "Close" : "Open"} Vote</Button>
        </Tooltip>
        <Tooltip content={"Add New survey"}>
          <Button bordered color="success" auto onClick={() => setVisiblepool(true)}>Add survey</Button>
        </Tooltip>
        <Tooltip content={"Add New Ad"}>
          <Button bordered color="primary" auto onClick={() => setvisiblead(true)}>Add Ad</Button>
        </Tooltip>
        <Tooltip content={"Add New Payment Ad"}>
          <Button bordered color="gradient" auto onClick={() => setVisiblepayent(true)}>Add Payment Ads</Button>
        </Tooltip>
      </Row>
      <br />
      <Row>
        <Col>
          <Player src="https://cdn.lordicon.com/equajobp.json" background="transparent" speed={1} style={{ width: "300px", height: "300px" }} hover   ></Player>
        </Col>
        <Col>
          <Row>
            <Input onChange={(e) => setfull_address(e.target.value)} width='60%' disabled={edit ? false : true} label="Full Address" placeholder={building?.full_address}></Input>
          </Row>
          <br />
          <br />
          <Row>
            <Input onChange={(e) => setcommittee_phone(e.target.value)} width='40%' disabled={edit ? false : true} label="Phone Number" placeholder={building?.committee_phone}></Input>
          </Row>
          <br/>
          <br/>
          <Row>
            <Input onChange={(e) => setpayment_date(e.target.value)} width='30%' disabled={edit ? false : true} type={"date"} label="House committee payment date" value={payment_date} ></Input>
          </Row>
          <br />
          <br />
          <Row>
            <Input onChange={(e) => setcommittee_monthly(+e.target.value)} width='30%' disabled={edit ? false : true} label="House committee rate" type={"number"} placeholder={building?.committee_monthly.toString() || ""}></Input>
          </Row>
          <br />
          <Row>
            {edit ? <Button color={"warning"} onClick={() => saveEdit()} size={"xs"}>Save</Button>
              : <Button size={"xs"} onClick={() => setedit(true)}>Edit</Button>}
          </Row>
        </Col>
      </Row>
      <br />
      <br />
      <Card style={{ width: "80%", marginLeft: "10%" }}>
        <Card.Body>
          <Row>
            <Col>
              <Row style={{ justifyContent: "center" }}><Text size={26} b >Payment</Text></Row>
              <Chart type="doughnut" data={paydata} options={chartOptions} />
            </Col>

            {building?.vote_active ? <Col>
              <Row style={{ justifyContent: "center" }}><Text size={26} b>Vote</Text></Row>
              <Chart type="doughnut" data={votedata} options={chartOptions} />
            </Col> : <Col style={{ justifyItems: "center", paddingTop: "15%" }}><Badge><Text size={18} b>You need to open vote to see statistics</Text></Badge></Col>}
            <Col>
              <Row style={{ justifyContent: "center" }}>
                <Dropdown>
                  <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
                    {selected}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Single selection actions"
                    color="secondary"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selected}
                    onSelectionChange={(anchorKey) => setSelected(anchorKey)}
                  >
                    {pool.filter(pool => pool.building_id === profile.building_id?.id).map(pool => <Dropdown.Item key={pool.Title}>{pool.Title}</Dropdown.Item>)}
                  </Dropdown.Menu>
                </Dropdown>
              </Row>
              <Col>
                <Chart type="doughnut" data={pooldata} options={chartOptions} />
              </Col>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <br />
      <br />
      <Table
        css={{ maxWidth: "85%", margin: "0% 0% 0% 8%" }}>
        <Table.Header>
          <Table.Column>user</Table.Column>
          <Table.Column>full_name</Table.Column>
          <Table.Column>apartment</Table.Column>
          <Table.Column>phone_number</Table.Column>
          <Table.Column>payment</Table.Column>
          <Table.Column>action</Table.Column>
        </Table.Header>
        <Table.Body>
          {all_profiles.filter(profiles => profiles.building_id?.id === profile.building_id?.id).map((profile, index) => <Table.Row key={index}>
            <Table.Cell>{profile.user}</Table.Cell>
            <Table.Cell>{profile.full_name}</Table.Cell>
            <Table.Cell>{profile.apartment}</Table.Cell>
            <Table.Cell>{profile.phone_number}</Table.Cell>
            <Table.Cell>{profile.monthly_payment ? <FcApproval /> : <FcHighPriority />}</Table.Cell>
            <Table.Cell>
              <Row>
                <Col style={{ width: "20%" }}>
                  <Tooltip content={"Delete from the current vote"}>
                    <Text h3 style={{ cursor: "pointer" }} onClick={() => dispatch(delVoteAsync({ "id": profile.id, token }))}><FcCancel /></Text>
                  </Tooltip>
                </Col>
                <Col style={{ width: "20%" }}>
                  <Tooltip content={"Adding to the current vote"}>
                    <Text h3 style={{ cursor: "pointer" }} onClick={() => dispatch(addAsync({ vote: { "profile_id": profile.id, "building_id": profile.building_id?.id, "vote": 0 }, token }))}><GiVote /></Text>
                  </Tooltip>
                </Col>
                <Col style={{ width: "20%" }}>
                  <Tooltip content={"Pay"}>
                    <Text h3 style={{ cursor: "pointer" }} onClick={() => dispatch(editPayAsync({ profile, token }))}><FcMoneyTransfer /></Text>
                  </Tooltip>
                </Col>

              </Row>
            </Table.Cell>
          </Table.Row>)}
        </Table.Body>
      </Table>
    </>
  );
}


export default Committee


