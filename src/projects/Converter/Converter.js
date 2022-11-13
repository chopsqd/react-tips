import React, {useEffect, useRef, useState} from 'react';
import {Block} from "./Block";
// import './converter.scss'

function Converter() {
    const [fromCurrency, setFromCurrency] = useState('USD')
    const [toCurrency, setToCurrency] = useState('RUB')
    const [fromPrice, setFromPrice] = useState(1)
    const [toPrice, setToPrice] = useState(0)
    const ratesRef = useRef({})

    let myHeaders = new Headers();
    myHeaders.append("apikey", "Z515eLO5MUf0u2ZY3zeaWv61z1QN6sg5");

    useEffect(() => {
        fetch("https://api.apilayer.com/fixer/latest?symbols=USD%2CEUR%2CGBP%2CRUB&base=USD", {
            method: 'GET', redirect: 'follow', headers: myHeaders
        }).then(response => response.text())
            .then(result => JSON.parse(result))
            .then(data => {
                ratesRef.current = data.rates
                onChangeFromPrice(1)
            })
            .catch(err => {
                console.warn(err)
                alert('Не удалось получить информацию с сервера')
            })
    }, [])

    const onChangeFromPrice = (value) => {
        const price = value / ratesRef.current[fromCurrency]
        const result = price * ratesRef.current[toCurrency]
        debugger
        setToPrice(result.toFixed(3))
        setFromPrice(value)
    }

    const onChangeToPrice = (value) => {
        const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value
        setFromPrice(result.toFixed(3))
        setToPrice(value)
    }

    useEffect(() => {
        onChangeFromPrice(fromPrice)
    }, [fromCurrency])

    useEffect(() => {
        onChangeToPrice(toPrice)
    }, [toCurrency])

    return (<div className="App">
            <Block
                value={fromPrice}
                currency={fromCurrency}
                onChangeValue={onChangeFromPrice}
                onChangeCurrency={setFromCurrency}
            />
            <Block
                value={toPrice}
                currency={toCurrency}
                onChangeValue={onChangeToPrice}
                onChangeCurrency={setToCurrency}
            />
        </div>);
}

export default Converter;