import React from 'react';
import { Grid, GridItem, Image, Text, Box, Progress, VStack, SimpleGrid, HStack } from "@chakra-ui/react";
import Location from '../Tasks/Task';
import CaptainPlanet from '../../images/captain-planet.png';
import GoldWarrior from '../../images/gold-warrior.png';
import Planeteer from '../../images/planeteer-badge.png';
import SilverWarrior from '../../images/silver-warrior.png';
import RecycleBadge from '../../images/recycle-badge.png';
import TrashBadge from '../../images/trash-badge.png';
import TreeBadge from '../../images/tree-badge.png';

const Profile = ({currentUser, setCurrentUser, captain}) => {
  const calcLength = (taskType) => {
    return currentUser.complete_tasks.map(task => task.name.includes(taskType) ? task : null).length
  }
  const calcPoints = (taskType) => {
    return currentUser.complete_tasks.map(task => task.name.includes(taskType) ? task.point : null).reduce((a, b) => a + b, 0)
  }
  const titleBadges = {planeteer: Planeteer, silverWarrior: SilverWarrior, goldWarrior: GoldWarrior, captainPlanet: CaptainPlanet}
  const titleAvatar = () => {
    const userPoints = currentUser.complete_tasks.map(task => task.point).reduce((a, b) => a + b, 0)
    if (currentUser === captain) {
      return titleBadges.captainPlanet
    } else if (userPoints < 250) {
      return titleBadges.planeteer
    } else if (userPoints < 500) {
      return titleBadges.silverWarrior
    } else {
      return titleBadges.goldWarrior
    }
  }
  const title = () => {
    const userPoints = currentUser.complete_tasks.map(task => task.point).reduce((a, b) => a + b, 0)
    if (currentUser === captain) {
      return "Captain Planet"
    } else if (userPoints < 250) {
      return "Planeteer"
    } else if (userPoints < 500) {
      return "Silver Warrior"
    } else {
      return "Gold Warrior"
    }
  }
  
  return (
    <Grid
      minH="100vh"
      templateRows="repeat(4, 1fr)"
      templateColumns="repeat(7, 1fr)"
      gap={9}
      p={4}
    >
      <GridItem
        rowSpan={2}
        colSpan={5}
        borderWidth="1px"
        maxW="4xl"
        borderRadius="lg"
        p={5}
        shadow="md"
        textAlign="center"
        overflow="hidden"
      >
        TASKS IN PROGRESS
        
          <HStack mt={10} spacing={6}>
            {currentUser.pending_tasks.map(task => <Location task={task} currentUser={currentUser} setCurrentUser={setCurrentUser}/>)}
          </HStack>
        <Text mt={10}>RECENTLY COMPLETED</Text>
          <HStack mt={10} spacing={6}>
            {currentUser.complete_tasks.slice(-3).map(task => <Location task={task} currentUser={currentUser} setCurrentUser={setCurrentUser}/>)}
          </HStack>
        
      </GridItem>

      <GridItem
        align="center"
        rowSpan={1}
        colSpan={2}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        shadow="md"
        p={14}
      >
        <VStack spacing={6}>
          <Image
            borderRadius="full"
            boxSize="150px"
            src={currentUser.image}
            alt="User Title"
            fallbackSrc="https://via.placeholder.com/150"
          />
          <Text fontSize="xl" >{currentUser.name}</Text>
          
        </VStack>
      </GridItem>

      <GridItem
        align="center"
        rowSpan={1}
        colSpan={2}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        shadow="md"
        p={14}
      >
        <VStack spacing={6}>
          <Image
            borderRadius="full"
            boxSize="150px"
            src={titleAvatar()}
            alt="User Title"
          />
          <Text fontSize="2xl" >{title()}</Text>
          <Text color="green" fontSize="2xl"> Points: {currentUser.complete_tasks.map(task => task.point).reduce((a, b) => a + b, 0)}</Text>
        </VStack>
      </GridItem>

      <GridItem textAlign="center" rowSpan={1} colSpan={7} borderWidth="1px" borderRadius="lg" overflow="hidden" p={5} shadow="md">

        <Text>ACCOMPLISHMENTS</Text>
        <VStack mt={5} align="left" spacing={10}>
          <Box>
            <Text align="left" spacing={10}>Plastic - You've picked up enough plastic to span the state of Texas!</Text>
            <Progress hasStripe mt={4} value={calcPoints("plastic")} colorScheme="green" />
            <Text align="left">{100 - calcPoints("plastic")} points to go until your next accomplishment!</Text>
          </Box>
          <Box>
            <Text align="left" spacing={10}>Trash - You've picked up enough trash to span the Pacific Crest Trail!</Text>
            <Progress hasStripe mt={4} value={calcPoints("trash")} colorScheme="green" />
            <Text align="left">{100 - calcPoints("trash")} points to go until your next accomplishment!</Text>
          </Box>
          <Box>
            <Text align="left" spacing={10}>Trees - You've planted enough trees to cover a small backyard!</Text>
            <Progress hasStripe mt={4} value={calcPoints("tree")} colorScheme="green" />
            <Text align="left">{100 - calcPoints("tree")} points to go until your next accomplishment!</Text>
          </Box>
        </VStack>
      </GridItem>
      <GridItem textAlign="center" rowSpan={1} colSpan={7} borderWidth="1px" borderRadius="lg" overflow="hidden" p={5} shadow="md">
        BADGES
        <SimpleGrid mt={5} columns={[3, null, 5]} spacing="40px">
        {calcLength("plastic") > 1 
        ? <Image
            borderRadius="full"
            boxSize="150px"
            src={RecycleBadge}
            alt="Recycle Badge"
          />
        : null}
        {calcLength("trash") > 1 
        ? <Image
            borderRadius="full"
            boxSize="150px"
            src={TrashBadge}
            alt="Trash Badge"
          />
        : null}
        {calcLength("tree") > 1 
        ? <Image
            borderRadius="full"
            boxSize="150px"
            src={TreeBadge}
            alt="Tree Badge"
          />
        : null}
        </SimpleGrid>
      </GridItem>
    </Grid>
  )
}

export default Profile
