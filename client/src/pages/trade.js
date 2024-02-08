import React from 'react'
import { useState } from 'react';
function Trade() {
  const [username,setUsername] = useState('');
  const [items, setItems] = useState('');
  async function handleNewTrade(e)
  {
   e.preventDefault();
   console.log(username,items)
   const res = await fetch('http://localhost:4000/trade',{
	method:'POST',
    body:JSON.stringify({username, items}),
    headers:{
		'content-type':'application/json'
	}
   })
   if(res.ok)
   {
	console.log('all ok')
   }
  }
  return (
	<div>
		<form>
		<input type='text' value={username} onChange={(e)=>setUsername(e.target.value)} />
	    <input type='text' value={items} onChange={(e)=>setItems(e.target.value)} />
		<button onClick={handleNewTrade}>Set up a Trade</button>
		</form>
	</div>
  )
}

export default Trade
