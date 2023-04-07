import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [inputValue, setInputValue] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        prompt: `Q: ${inputValue}\nA:`,
        max_tokens: 1024,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        n: 1,
        stop: ["\n"],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer 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`,
        },
      }
    );

    const newConversation = [
      { role: 'user', content: `Q: ${inputValue}` },
      { role: 'bot', content: `A: ${response.data.choices[0].text.trim()}` },
      ...conversation,
    ];

    setConversation(newConversation);
    setInputValue('');
  };


  
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  

  return (
    <div>
<div style={{ textAlign: 'center',paddingTop:"50px" }}>
       <form  onSubmit={handleSubmit}>
        <input type="text" value={inputValue} placeholder='Type ArQue related Questions..' onChange={handleChange} style={{height:"30px", width: '40%',fontSize:"20px", }}/>
        <button type="submit" style={{height:"38px",paddingRight:"10px",backgroundColor:"#20b2aa"}}> Search</button>
      </form>
</div>
      <div style={{ height: '500px', overflowY: '',paddingTop:"50px",textAlign: 'Left',paddingLeft:"370px" }}>
        {conversation.reverse().map((message, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <div
              style={{
                padding: '5px 10px',
                backgroundColor: message.role === 'user' ? '#efefef' : '#dcf8c6',
                borderRadius: '10px',
                display: 'inline-block',
                maxWidth: '60%',
              }}
            >
              {message.content.startsWith('Q:') ? <span style={{ fontWeight: 'bold' }}>Q:</span> : ''}
              {message.content.startsWith('A:') ? <span style={{ fontWeight: 'bold' }}>A:</span> : ''}
              {message.content.slice(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;


