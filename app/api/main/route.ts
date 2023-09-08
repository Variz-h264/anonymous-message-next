import { NextRequest, NextResponse } from 'next/server'
 
export async function GET(req: NextRequest){
  try {
    const result = { subject: "ส่งข้อความแบบไร้ตัวตน ❤️", details: "นี้คือเว็บเวอร์ชั่นใหม่แน่นอนว่ารอบนี้ตั้งใจทำกว่าตัวเวอร์ชั่นก่อนหน้ามากๆ ทั้งเรื่องระบบป้องกันและเรื่องอื่นๆ ถึงรอบนี้เราจะให้ความสำคัญกับระบบป้องกันมากแต่ก็ยังมีช่องโห่วอยู่ดี เพราะพวกที่จะมา Hack ทั้งหลายก็พยายามเข้าน้าา" }

    return NextResponse.json({ message: "Succeed", result }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 })
  }
}