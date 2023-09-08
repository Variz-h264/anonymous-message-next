'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import { FormMsg } from '@/components/FormMsg';
import { LoadCard } from '@/components/LoadCard';

export default function Home() {
  const [data, setData] = useState<{ subject?: string, details?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await axios.get('http://localhost:3000/api/main')
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.result);
        }
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
    }

    fetchData();
  }, []);
  
  return (
    <>
      {loading ? 
        <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-md dark:bg-gray-700 w-72 mb-4 p-4"></div>
            <div className="h-2 bg-gray-200 rounded-md dark:bg-gray-700 max-w-[360px] mb-2.5 p-3"></div>
        </div>
      : (
        <>
          <h1 className="text-5xl text-red-400 mb-3">{data ? data.subject : 'No Data'}</h1>
          <span className="text-white/50">{data ? data.details : 'No Data'}</span>
          <p className="text-white/50">Create By TechTitanByte == variz.h264</p>
        </>
      )}

      {loading ? 
        <>
          <LoadCard />
          <LoadCard />
        </>
      : (
        <>
          <FormMsg btnmsg = "ส่งข้อความ 📩" />

          <Card title = "ข้อความที่ชอบที่สุด" details = "เอาไว้โชว์ข้อความปั่นๆ" msg = "ยังไม่เจอไอพวกปั่นๆ" />
          <Card title = "ข้อความทั้งหมด" details = "ข้อความของทุกคนรวมถึงคุณอยู่ที่นี่" msg = "ยังไม่มีข้อความ" />
        </>
      )}
    </>
  )
}