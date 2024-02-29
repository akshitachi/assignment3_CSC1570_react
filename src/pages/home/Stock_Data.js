import React from 'react'

function Stock_Data({symbolToPass}) {
  console.log(`Symbol passed to Stock_Data: ${symbolToPass}`);
  return (
    <div>
      {symbolToPass}
    </div>
  )
}

export default Stock_Data
