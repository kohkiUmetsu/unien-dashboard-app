"use client"
import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MemberEditBtn from './MemberEditBtn';

async function fetchMemberData() {
    const res = await fetch(`http://localhost:3001/api/memberChart`, {
        cache: "no-store"
    })

    const data = await res.json()

    return data.memberData
}

const postMemberData = async (userId: number, year: number, member: number) => {

    try {
        const res = await fetch(`http://localhost:3001/api/memberChart`, {
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

const MemberLineChart = () => {

    interface memberDataType {
        userId: number,
        year: number,
        member: number,
    }

    // const memberData: memberDataType[] = [
    //     {year: 2015, 入サー人数: 40},
    //     {year: 2016, 入サー人数: 52},
    //     {year: 2017, 入サー人数: 67},
    //     {year: 2018, 入サー人数: 32},
    //     {year: 2019, 入サー人数: 46},
    //     {year: 2020, 入サー人数: 74},
    //     {year: 2021, 入サー人数: 32},
    //     {year: 2022, 入サー人数: 12},
    //     {year: 2023, 入サー人数: 50},
    // ]

    const [selectYear, setSelectYear] = useState<number>(2015)
    const [selectPeople, setSelectPeople] = useState<number>(0)
    const [memberData, setMemberData] = useState<memberDataType[]>([])
    const [uniqueUserId, setUniqueUserId] = useState<number>(1)
    const [uniqueId, setUniqueId] = useState<number>(0)
    const [openModal, setOpenModal] = useState<boolean>(false);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await fetchMemberData()
                setMemberData(data)
                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()

    }, [])

    const handleClick = () => {
        const existingMemberIndex = memberData.findIndex(item => item.year === selectYear)

        if (existingMemberIndex !== -1) {
            const updatedMemberData = [...memberData]
            updatedMemberData.splice(existingMemberIndex, 1)
            setMemberData(updatedMemberData)
        }
        
        setMemberData((prevMemberList) => [...prevMemberList, {userId: uniqueUserId, year: selectYear, member: selectPeople}])
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        handleClick()
        setOpenModal(false)
        await postMemberData(uniqueUserId, selectYear, selectPeople)
    }

    const sortedMemberData = memberData.sort((a, b) => {
        return a.year - b.year
    })

  return (
    <div className="">
        <MemberEditBtn
            selectYear={selectYear}
            setSelectYear={setSelectYear}
            handleSubmit={handleSubmit}
            selectPeople={selectPeople}
            setSelectPeople={setSelectPeople}
            openModal={openModal}
            setOpenModal={setOpenModal}
        />
        <div className="overflow-x-scroll overflow-y-visible hidden-scrollbar">
            <LineChart
            width={500}
            height={200}
            data={sortedMemberData}
            margin={{top: 12, right: 48, left: 0, bottom: 0,}}
            >
            <CartesianGrid strokeDasharray="5 2" />
            <XAxis
            dataKey="year"
            interval={0}
            dy={5}
            tick={{
                fontSize: 14,
                fill: '#6b7280',
              }}
            />
            <YAxis
            dataKey="member"
            interval={0}
            tick={{
                fontSize: 14,
                fill: '#6b7280',
              }}
            />
            <Line type="monotone" dataKey="member" stroke="#0891b2" />
            <Legend
        
            />
            <Tooltip />
            </LineChart>
        </div>
    </div>
  )
}

export default MemberLineChart