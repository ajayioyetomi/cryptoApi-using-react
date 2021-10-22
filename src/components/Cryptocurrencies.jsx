import React,{useState,useEffect} from 'react';
import millify from 'millify';
import {Link} from 'react-router-dom';
import {Card,Row,Col,Input} from 'antd';
//let asShow = false;

let dataArr = [];
let curText = "";

const postData = async (url = '') => {
    //if(!asShow2){
        const CRYPTO_API_KEY = 'a98a16c9f0msh0428fb47c0b816ep1bfd80jsn550bf3013139';
        // Default options are marked with *
        const response = await fetch(url, {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
            'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
            'x-rapidapi-key': CRYPTO_API_KEY
        }
        });
        console.log('fetch Data')
        return response.json(); // parses JSON response into native JavaScript objects
        //response.json();
    //}
}

const Cryptocurrencies = ({home,asShow}) => {
    const [cryptoData,setCryptoData] = useState([]);
    const [searchTerm,setSearchTerm] = useState('');
    if(!home){
        asShow = 'crypto';
    }
    console.log("Caller " + asShow + " - Current: " + curText)
    const limit = home?10:100;
    let asShow2 = asShow;
    if(curText === asShow ){
        asShow2 = true;
    }
    else{
        asShow2 = false;
        curText = asShow;
    }
 
    if(!asShow2){
        postData(`https://coinranking1.p.rapidapi.com/coins?limit=${limit}`)
        .then(data => { asShow2 = true;
           if(!home){
               dataArr = data;
           }
            setCryptoData(data);
            console.log("show")
        });
    }
      
    const alt = 'alt';
    
    useEffect(() =>{  
       
        let displayData = {
            data: {
                coins: []
            }
        } 
        console.log(dataArr,"data")
        if(dataArr == '' || typeof dataArr == 'undefined'){
        }
        else{
            if( dataArr.data.coins.length){
                displayData.data.coins = dataArr.data.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
                console.log(displayData,"new");
                setCryptoData(displayData)
            }
        }
    },[searchTerm]);

    return (
        <React.Fragment>
            {home?'':(<div>
            <Input placeholder="Enter Search Key" 
                onChange={(e) => {
                        setSearchTerm(e.target.value); 
                        // let newData = dataArr; 
                        // console.log(dataArr, "data2");
                        // console.log(newData,"new");
                        // setCryptoData((tx)=>{
                        //     return {
                        //         data:{
                        //             coins: newData.data.coins.filter((coin) => coin.name.toLowerCase().includes(e.target.value.toLowerCase()))
                        //         }
                        //     };
                        // });

                }
                }/>         
            </div>)}
            <br/>         
            <Row gutter={[32,32]} className="crypto-card-container">
                {cryptoData &&cryptoData.data && (cryptoData.data.coins.map((currency) =>
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                        <Link to={`/crypto/${currency.id}`}>
                            <Card 
                                title={`${currency.rank} .${currency.name}`}
                                extra={<img className="crypto-image" src={currency.iconUrl} alt={alt}/>}
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap:{millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))
                }
            </Row>

        </React.Fragment>
        
    )
}

export default Cryptocurrencies;
