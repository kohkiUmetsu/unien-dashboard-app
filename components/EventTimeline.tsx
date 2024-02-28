"use client"

import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { Button, Label, TextInput, ListGroup, Timeline, Modal } from 'flowbite-react';
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { HiArrowNarrowRight, HiCalendar } from 'react-icons/hi';
import EventInputBtn from "./EventInputBtn"

async function fetchEvents() {
    const res = await fetch(`http://localhost:3001/api/event`, {
        cache: "no-store"
    })

    const data = await res.json()

    return data.events
}

const postEvent = async ( date: string, description: string, title: string, fee: string, place: string, people: string, userId: number ) => {

    try {
        const res = await fetch(`http://localhost:3001/api/event`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({date, description, title, fee, place, people, userId}),
    })

    return res.json()

    } catch (error) {
        console.error('Client-side error:', error);
    }
    
}

const deleteEvent = async (id: number) => {

    try {
        const res = await fetch(`http://localhost:3001/api/event/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })

    return res.json()

    } catch (error) {
        console.error('Client-side error:', error);
    }
    
}

const EventTimeline = () => {

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayDate = today.getFullYear() + '/' + ('0' + (today.getMonth() + 1)).slice(-2) + '/' + ('0' + today.getDate()).slice(-2)

    interface eventListType {
        title: string,
        description: string,
        fee: string,
        people: string,
        place: string,
        id: number,
        date: string,
    }

    const inputRef = useRef<HTMLInputElement | null>(null)
    const [inputEvent, setInputEvent] = useState<string>('')
    const [inputExplanation, setInputExplanation] = useState<string>('')
    const [inputPeople, setInputPeople] = useState<string>('')
    const [inputFee, setInputFee] = useState<string>('')
    const [inputPlace, setInputPlace] = useState<string>('')
    const [countId, setCountId] = useState<number>(0)
    const [dateValue, setDateValue] = useState<string>(todayDate)
    const [eventList, setEventList] = useState<eventListType[]>([])
    const [originalEventList, setOriginalEventList] = useState<eventListType[]>([])
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [uniqueUserId, setUniqueUserId] = useState<number>(1)


    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await fetchEvents()
                setEventList(data)
                setOriginalEventList(data)
                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()

  }, [])

    useEffect (() => {
        setOriginalEventList(eventList)
    }, [eventList])

    const handleClick = (dateValue: string) => {
        setCountId(prevCount => prevCount + 1)
        setEventList((prevItemList) => [...prevItemList, {title: inputEvent, description: inputExplanation, people: inputPeople, fee: inputFee, place: inputPlace, id: countId, date: dateValue}])
        setInputEvent('')
        setInputExplanation('')
        setInputPeople('')
        setInputFee('')
        setInputPlace('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        handleClick(dateValue)
        setOpenModal(false)
        await postEvent(dateValue, inputExplanation, inputEvent, inputFee, inputPlace, inputPeople, uniqueUserId)
    }

    const handleSearch = () => {
        const inputValue = inputRef.current?.value || '';
        setEventList(originalEventList.filter((item) => item.title.toLowerCase().includes(inputValue)))
    }

    const handleDateChange = (date: Date) => {
        const d = date
        const formattedDate = d.getFullYear() + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2)
        setDateValue(formattedDate);
      }

    const handleDelete = async (id: number) => {
        const updatedEventList = eventList.filter(item => item.id !== id)
        setEventList(updatedEventList)

        await deleteEvent(id)
      }

    const sortedEventList = [...eventList]
    .filter(item => new Date(item.date).getTime() >= today.getTime())
    .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        return dateA - dateB;
    });

    const dateColor = (currentDate: string) => {
        const host = new Date(currentDate)
        const hostDate = host.getFullYear() + '/' + ('0' + (host.getMonth() + 1)).slice(-2) + '/' + ('0' + host.getDate()).slice(-2)
        return hostDate === todayDate && "text-cyan-600"
    }

    const eventColor = (currentDate: string) => {
        const host = new Date(currentDate)
        const hostDate = host.getFullYear() + '/' + ('0' + (host.getMonth() + 1)).slice(-2) + '/' + ('0' + host.getDate()).slice(-2)
        return hostDate === todayDate ? "text-cyan-700" : "text-gray-700"
    }

  return (
    <div className="">
       <form action="">
           <div className="flex mt-4">
            <EventInputBtn
            inputEvent={inputEvent}
            setInputEvent={setInputEvent}
            inputPeople={inputPeople}
            setInputPeople={setInputPeople}
            inputFee={inputFee}
            setInputFee={setInputFee}
            inputExplanation={inputExplanation}
            setInputExplanation={setInputExplanation}
            inputPlace={inputPlace}
            setInputPlace={setInputPlace}
            handleClick={() => handleClick(dateValue)}
            handleDateChange={handleDateChange}
            openModal={openModal}
            setOpenModal={setOpenModal}
            handleSubmit={handleSubmit}
            />

            <div className="mb-2 block"><Label color="gray" htmlFor="input-gray"/></div>
            <TextInput color="gray" id="input-gray" placeholder="検索" required className='w-48 ml-auto' ref={inputRef} onChange={() => handleSearch()}/>
           </div>

           <div className="p-4">
                {eventList.length === 0 ?
                    <div className="text-center mt-2 text-gray-500 text-sm">イベントを入力してください</div> : null
                }
               <Timeline>
                {sortedEventList.map((item) => (
                    <Timeline.Item key={item.id} className=''>
                        <Timeline.Point icon={HiCalendar} className='' />
                        <Timeline.Content className='relative'>
                            <Button color="gray" pill size="sm" onClick={() => handleDelete(item.id)} className='absolute right-0 top-0' ><MdOutlineDeleteOutline /></Button>
                            <Timeline.Time className={`flex ${dateColor(item.date)}`}>{item.date}</Timeline.Time>
                            <Timeline.Title className={`text-base mr-16 ${eventColor(item.date)}`}>{item.title}</Timeline.Title>
                            <Timeline.Body className='text-sm'>
                                {item.description &&
                                    <div className="text-gray-600">{item.description}</div>
                                }
                                <div className="mt-1">
                                    {item.people &&
                                        <div className="">人数: <span>{item.people}</span></div>
                                    }
                                    {item.fee &&
                                        <div className="">参加費用: <span>{item.fee}</span></div>
                                    }
                                    {item.place &&
                                        <div className="">場所: <span>{item.place}</span></div>
                                    }
                                </div>
                            </Timeline.Body>
                        </Timeline.Content>
                    </Timeline.Item>
                ))
                }
               
               </Timeline>
           </div>
       </form>
    </div>
  )
}

export default EventTimeline