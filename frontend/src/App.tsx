import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import "./App.css";

function App() {
  const [message, setMessage] = useState('');
  const [msg,setMsg] = useState("");


  const getMsg = async () => {
    await fetch("http://localhost:3000/status", {
      method: "GET"
    }).then(e => e.json()).then((a) => {
      setMsg(a.data.message)
    }) 
  }

  const submitHander = async () => {

    let body = {
      newMessage: message
    }

    let data = await fetch("http://localhost:3000/update", {
      method: "POST",
      headers : {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });

    setMessage("")
    getMsg();

    console.log( await data.json() );
  }

  useEffect(() => {
    getMsg()
  },[])

    

  return (
    <>
    
    <div style={{backgroundColor: 'pink', textAlign: 'center', fontSize: '30px', padding: '10px',}}>
      GROUP E
    </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-black-100">{msg}</CardTitle>
        </CardHeader>
        
        <CardContent className="flex flex-col gap-4">
          <Input placeholder="Type message..."
                 value={message}
                 onChange={(e) => setMessage(e.currentTarget.value)}/>

          <Button variant="outline"
                  className="w-full"
                  onClick={() => submitHander()}>Submit</Button>
        </CardContent>
      </Card>
      
    </>
  );
}

export default App;
