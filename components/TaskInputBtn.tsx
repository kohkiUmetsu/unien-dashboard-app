'use client';

import { Button, Modal, Label, TextInput, Datepicker } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'

interface taskInputBtnProps {
    inputValue: string
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    handleSubmit: (e: React.FormEvent) => void
    handleDateChange: (date: Date) => void
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const TaskInputBtn: React.FC<taskInputBtnProps> = ({inputValue, setInputValue, handleSubmit, handleDateChange, openModal, setOpenModal}) => {

  return (
    <>
      <Button onClick={() => setOpenModal(true)} pill className='relative px-1'><AiOutlinePlus className='text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' /></Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <form action="" onSubmit={(e) => {handleSubmit(e)}}>
          <Modal.Header>タスク追加</Modal.Header>
          <Modal.Body className=''>
            <div className="space-y-6">
              <div className="">
                  <div className="mb-2 text-sm font-medium">期限</div>
                  <Datepicker className='' onSelectedDateChanged={handleDateChange} />
              </div>
              <div>
                  <div className="mb-2 block">
                  <Label htmlFor="input-gray" color="gray" value="タスク説明" />
                  </div>
                  <TextInput id="input-gray" placeholder="タスクを入力してください" required color="gray" onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit'>追加</Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>閉じる</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default TaskInputBtn
