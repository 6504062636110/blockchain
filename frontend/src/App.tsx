import { useState } from "react";
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

  const submitHander = async () => {

    let body = {
      message
    }

    let data = await fetch("http://localhost:3000/messages", {
      method: "POST",
      headers : {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });

    console.log( await data.json() );
  }

    

  return (
    <>
    
    <div style={{backgroundColor: 'pink', textAlign: 'center', fontSize: '30px', padding: '10px',}}>
      GROUP E
    </div>
      <Card>
        <CardHeader>
          <CardTitle>Add message</CardTitle>
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
