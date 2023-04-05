import React, { useEffect, useState } from 'react'
import { Card, Form, Input, Select } from 'antd'

function Converter() {
    const api_url="https://api.coingecko.com/api/v3/exchange_rates";
    const [cryptoList, setCryptoList]=useState([]);
    const [inputValue, setInputValue]=useState("0");
    const [firstSelect, setFirstSelect]=useState("Bitcoin");
    const [secondSelect, setSecondSelect]=useState("Ether");
    const [result, setResult]=useState("0");

    useEffect(()=>{
        fetchData();
    }, []);

    useEffect(()=>{
    if(cryptoList.length>0){
       const firstSelectRate=cryptoList.find((item)=>{
        return item.value===firstSelect; 
       }).rate;

       const secondSelectRate=cryptoList.find((item)=>{
        return item.value===secondSelect; 
       }).rate;

       const resultValue=(inputValue*secondSelectRate)/firstSelectRate;

       setResult(resultValue.toFixed(6));
    }
    }, [inputValue, firstSelect, secondSelect]);

    async function fetchData(){
        const response=await fetch(api_url);
        const jsonData=await response.json();
        
        const data=jsonData.rates;
        const tempArray=[];
        Object.entries(data).forEach((item)=>{
            const tempObj={
                value: item[1].name,
                label: item[1].name,
                rate: item[1].value
            }
            tempArray.push(tempObj);
            
        })

        setCryptoList(tempArray);

    }

   
     
  return (
    <div className='container'>
      <Card className="crypto-card" title={<h1>Crypto Converter</h1>}>
     <Form>
        <Form.Item>
             <Input placeholder="Input Value" onChange={(event)=>{
                setInputValue(event.target.value)
             }}/>
        </Form.Item>
     </Form>


     <div className='select-box'>
       <Select style={{width:"200px"}} defaultValue="Bitcoin" options={cryptoList} onChange={(value)=>{
        setFirstSelect(value)   
       }} />
       <Select style={{width:"200px"}} defaultValue="Ether" options={cryptoList} onChange={(value)=>{
        setSecondSelect(value);
       }} />
     </div>

     <p>{inputValue} {firstSelect}={result} {secondSelect}</p>
     
     </Card>
    
    </div>
  )
}

export default Converter;