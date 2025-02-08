  import React, { useEffect, useState } from 'react'
  import { useSelector } from 'react-redux';

  export const RequestDebit = () => {
    const {user} = useSelector((state) => state.auth_state)
    const [debitRequest, setDebitRequest] = useState(null);
    const [loading, setLoading] = useState(false);
    const [transactionKey, setTransactionKey] = useState('');
    const [responseSent, setResponseSent] = useState(false);

    useEffect(() => {
      const socket = new WebSocket('ws://localhost:8000/ws/debit_room_' + user.id + '/');

      socket.onopen = () => {
        console.log('Conexión WebSocket establecida.');
      };

      socket.onmessage = (e) => {
        const message = JSON.parse(e.data);

        // Si es una solicitud de débito, la mostramos en la interfaz
        if (message.type === 'debit_request') {
          setDebitRequest(message);
          setLoading(false); // Dejamos de mostrar el mensaje de espera
        }
      };

      return () => {
        socket.close(); // Cerramos el socket cuando el componente se desmonte
      };
    }, [user.id]);

    const handleValidateTransaction = () => {
      // Validación de la clave transaccional (aquí solo simulamos la validación)
      const isValid = transactionKey === '1234'; // Validación de ejemplo

      const socket = new WebSocket('ws://localhost:8000/ws/debit_room_' + user.id + '/');

      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            type: 'debit_response',
            response: isValid, // true o false
            admin_id: debitRequest.admin_id,
          })
        );
      };

      setResponseSent(true);
    };

    return (
      <div>
        <h1>Cliente</h1>

        {debitRequest ? (
          <div>
            <h3>Solicitud de Débito</h3>
            <p>Producto: {debitRequest.product_id}</p>
            <p>Monto: ${debitRequest.amount}</p>

            {!responseSent ? (
              <div>
                <input
                  type="password"
                  placeholder="Ingrese su clave transaccional"
                  value={transactionKey}
                  onChange={(e) => setTransactionKey(e.target.value)}
                />
                <button onClick={handleValidateTransaction}>Validar Transacción</button>
              </div>
            ) : (
              <p>Respuesta enviada.</p>
            )}
          </div>
        ) : (
          <p>No tienes ninguna solicitud de débito pendiente.</p>
        )}
      </div>
    )
  }
