"use client"

import { useState, useEffect } from 'react'
import FeeEditBtn from './FeeEditBtn'

async function fetchFeeData() {
    const res = await fetch(`http://localhost:3001/api/fee`, {
        cache: "no-store"
    })

    const data = await res.json()

    return data.fees
}

const postFeeData = async (userId: number, year: number, member: number) => {

    try {
        const res = await fetch(`http://localhost:3001/api/fee`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({userId, year, member}),
    })

    return res.json()

    } catch (error) {
        console.error('Client-side error:', error);
    }
    
}

const FeeContent = () => {

    interface FeeDataType {
        fee: number,
        people: number,
        result: number,
        userId: number,
    }

    // interface FeeDataType {
    //     fee: string,
    //     people: string,
    //     result: string,
    //     userId: number,
    // }

    const [inputFee, setInputFee] = useState<string>("")
    const [inputMemberNum, setInputMemberNum] = useState<string>("")
    const [inputEventPeople, setInputEventPeople] = useState<string>("")
    const [inputEventFee, setInputEventFee] = useState<string>("")
    const [totalFeeSum, setTotalFeeSum] = useState<FeeDataType[]>([])
    const [uniqueUserId, setUniqueUserId] = useState<number>(1)


    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await fetchFeeData()
                setTotalFeeSum(data)
                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()

    }, [])

    const handleClick = () => {

        const parseFee = parseInt(inputFee, 10)
        const parseMemberNum = parseInt(inputMemberNum, 10)

        const totalFee = parseFee * parseMemberNum

        const parseEventPeople = parseInt(inputEventPeople, 10)
        const parseEventFee = parseInt(inputEventFee, 10)

        if (!isNaN(parseEventPeople) && !isNaN(parseEventFee) && totalFee !== null) {
            if (totalFeeSum === null) {
                const resultFee = totalFee - parseEventPeople * parseEventFee
                setTotalFeeSum((prevTotalFeeSum) => [...prevTotalFeeSum, {fee: parseFee, people: parseMemberNum, result: resultFee, userId: uniqueUserId}])
            } else {
                // setTotalFeeSum((prevTotalFeeSum) => prevTotalFeeSum !== null ? prevTotalFeeSum - parseEventPeople * parseEventFee : null)
                setTotalFeeSum((prevTotalFeeSum) => [...prevTotalFeeSum, {fee: parseFee, people: parseMemberNum, result: prevTotalFeeSum !== null ? prevTotalFeeSum - parseEventPeople * parseEventFee : null, userId: uniqueUserId}])
            }
        } else {
            // setTotalFeeSum(totalFee)
        }

        setInputEventPeople("")
        setInputEventFee("")
    }

  return (
    <div className='relative h-full'>
        <FeeEditBtn 
        handleClick={handleClick}
        inputFee={inputFee}
        setInputFee={setInputFee}
        inputMemberNum={inputMemberNum}
        setInputMemberNum={setInputMemberNum}
        inputEventPeople={inputEventPeople}
        setInputEventPeople={setInputEventPeople}
        inputEventFee={inputEventFee}
        setInputEventFee={setInputEventFee}
        />
        {totalFeeSum !== null ? (
            isNaN(totalFeeSum) ? (
                <div className='text-red-500 text-base absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4'>費用と人数を数値で入力してください</div>
            ) : (
                <div className='font-bold text-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'><span>¥</span>{totalFeeSum}</div>
            )
        ) : (
            <div className='text-gray-500 text-base absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4'>費用を入力してください</div>
        )}
    </div>
  )
}

export default FeeContent