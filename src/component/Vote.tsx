import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { editAsync, getVoteAsync,selecvote } from '../Slices/voteSlice';
import { Card, Text, Button, Row, User, Container, Grid, Badge, Col } from "@nextui-org/react";
import { selectGetProfileOne } from '../Slices/profileSlice';

const Vote = () => {
  const token = localStorage.getItem("access")||""
  const all_people = useAppSelector(selecvote)
  const profile = useAppSelector(selectGetProfileOne)
  const dispatch = useAppDispatch();
  
  return (
    <Container> 
   <Row>
    <Grid.Container gap={3} justify="center">
   
    {!all_people.filter(vote => vote.building_id === profile.building_id?.id).length ? <Row style={{justifyContent:"center"}}><Badge size={"lg"}>No profile to vote yet</Badge></Row> :all_people.filter(vote => vote.building_id === profile.building_id?.id).map((people,index)=> <Grid>


      <Card key={index} css={{ mw: "330px" ,minWidth:"300px"}}>
        <Card.Header>
        <User
        src={`${process.env.REACT_APP_MY_SERVER}static/images/`+people.profile_id.profile_pic}
        name={people.profile_id.full_name}
        size="md"
      />
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ py: "$10" }}>
          <Text>
          {`vote for ${people.profile_id.full_name} to the committee`}
          </Text>
        </Card.Body>
        <Card.Footer>
          <Row justify="flex-end">
            <Button auto animated shadow color={"success"} size="md" onClick={()=> dispatch(editAsync({people,token,"profile":profile.id}))}>vote</Button>
          </Row>
        </Card.Footer>
      </Card>   </Grid>
    )} 
 
    </Grid.Container>
    </Row>
    
    </Container>
  )
}

export default Vote