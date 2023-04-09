import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { editAsync, getVoteAsync,selecvote } from '../Slices/voteSlice';
import { Card, Text, Button, Row, User, Container, Grid, Badge } from "@nextui-org/react";
import { selectGetProfileOne } from '../Slices/profileSlice';

const Vote = () => {
  const token = localStorage.getItem("access")||""
  const all_people = useAppSelector(selecvote)
  const profile = useAppSelector(selectGetProfileOne)
  const dispatch = useAppDispatch();
  
  return (
    <Container> 
   
    <Grid.Container gap={2}>
    {!all_people.filter(vote => vote.building_id === profile.building_id?.id).length ? <Row style={{justifyContent:"center"}}><Badge size={"lg"}>No profile to vote yet</Badge></Row> :all_people.filter(vote => vote.building_id === profile.building_id?.id).map((people,index)=> <Grid xs={4}>


      <Card key={index} css={{ mw: "330px" }}>
        <Card.Header>
        <User
        src={`http://44.202.160.222/static/images/${people.profile_id.profile_pic}`}
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
      </Card></Grid>
    )} 
    </Grid.Container>
    
    </Container>
  )
}

export default Vote