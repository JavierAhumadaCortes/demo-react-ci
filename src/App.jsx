import { useState } from 'react'; 

import { saludar } from './mensaje.js'; 

 

export default function App() { 

  const [nombre, setNombre] = useState(''); 

  const [mensaje, setMensaje] = useState('Demo con Jenkins'); 

  function enviar(evento) { 

    evento.preventDefault(); 

    try { setMensaje(saludar(nombre)); } 

    catch (error) { setMensaje(error.message); } 

  } 

  return ( 

    <main> 

      <h1>Demo React CI CD  -- prueba de push</h1> 

      <form onSubmit={enviar}> 

        <label>Nombre 

          <input value={nombre} 

            onChange={e => setNombre(e.target.value)} /> 

        </label> 

        <button type="submit">Saludar</button> 

      </form> 

      <p role="status">{mensaje}</p> 

    </main> 

  ); 

} 