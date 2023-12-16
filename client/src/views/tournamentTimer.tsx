import { Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

function Timer() {
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);

  useEffect(() => {
  
    const targetDate = new Date('2023-11-28T18:00:00Z');
    const targetDate2 = new Date('2023-11-21T18:00:00Z');
    const now = new Date();
    const timeDifference = targetDate.getTime() - now.getTime();
    const timeDifference2 = targetDate2.getTime() - now.getTime();
   

    //This is for the tournament begin
    if (timeDifference2 >= 0 ) {

      const days = Math.floor(timeDifference2 / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference2 % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference2 % (1000 * 60)) / 1000);


      setTimeRemaining(`Tournament round 2 has begun, Join the fight! Round 2 ends in ${days} days, ${hours} hours and  ${minutes} minutes`);
      return;
    }
//This is for Prep phase (or tounament end)
    if (timeDifference > 0 && timeDifference2 < 0) {

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    setTimeRemaining(`Round 2 has ended! PREP and training phase for round 3 will begin in ${days} days, ${hours} hours,  ${minutes} minutes and ${seconds} seconds `
    );}
  }, []);

  return (
    <Box textAlign={'center'} justifyContent={'center'} fontWeight={'bold'} borderWidth='0.2vmax' borderRadius='5px' borderColor={timeRemaining?.includes("begun") ? 'green' : 'red'} width={'90%'} textColor={timeRemaining?.includes("begun") ? 'green' : 'red'} mt={6} fontSize={'1vmax'}>
     
      {timeRemaining}
    </Box>
  );
}

export default Timer;
