import React from 'react';
import { Box, Card, HStack, Image, Text } from '@chakra-ui/react';
import { NameFormat } from '../../../utilities';

const TeamsTable = ({ data }) => {

  const allTeams = [
    'Eagles',
    'Soaring',
    'Blazing',
  ];

  const teamMembers = {};

  data.forEach((agent) => {
    if (agent.EmpPos === 'Agent') {
      if (!teamMembers[agent.Team]) {
        teamMembers[agent.Team] = [];
      }
      teamMembers[agent.Team].push(agent);
    }
  });

  if(data){
    return (
      <Box pt={3}>
        <HStack justifyContent={'center'}>
          {allTeams.map((teamName, tid) => (
            <Card
              key={tid}
              marginBottom={4}
              width="250px" 
              height="350px" 
              overflow="hidden" 
              shadow={'lg'}
            >
              <Text as={'b'} textAlign={'center'} color={'b.300'} p={1}>{teamName}</Text>
              
              <Box p={2} overflowY="auto">
                {teamMembers[teamName] && teamMembers[teamName].map((agent, agentId) => (
                  <Box key={agentId} display="flex" alignItems="center" marginBottom={2}>
                    <Image src={agent.Image} w="45px" h="45px" borderRadius="50%" marginRight={2} />
                    <Text>
                      <NameFormat
                        fName={agent.FName || ''}
                        mName={agent.MName || ''}
                        lName={agent.LName || ''}
                      />
                    </Text>
                  </Box>
                ))}
              </Box>
            </Card>
          ))}
        </HStack>
      </Box>
    );
  }


};

export default TeamsTable;
