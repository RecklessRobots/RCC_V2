import axios from "axios"
import { useEffect } from 'react';


    

const GetNFTBalance = () => {
    
    const url1="https://api.cronoscan.com/api?module=account&action=tokenbalance&contractaddress=0xD56AFcdB787e233325757D3ED7A987F11FB3fa08&address="
    const url2= "0x000000000000000000000000000000000000dead"
    const url3= "&tag=latest&apikey=57VGVCF7UM4H74I2XA5AJ4WC4TAI2TJDKC"
   
        useEffect(() => {
            const getData = async () => {
              
                const response = await axios.get(
                    (url1+url2+url3)
                );

                ////////////console.log('this is GetNFTBalance from local');
                
                const NumberOfNFTs=(response.data.result);
            
       
            }
          }, [], 
          
          )
        
    }
        export default GetNFTBalance;