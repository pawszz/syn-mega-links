import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then(setData);
  }, []);

  const models = [...new Set(data.map(item => item.model))];
  const filtered = selectedModel
    ? data.filter(item => item.model === selectedModel)
    : data;

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Model Link Browser</h1>
      <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} style={{ marginTop: '10px' }}>
        <option value=''>All Models</option>
        {models.map((model) => (
          <option key={model} value={model}>{model}</option>
        ))}
      </select>

      <div style={{ marginTop: '20px' }}>
        {filtered.map((item) => (
          <div key={item.id} style={{ marginBottom: '1rem', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
            <p><strong>Model:</strong> {item.model}</p>
            <p><strong>Time:</strong> {item.ReadableTime}</p>
            <a href={item.link} target='_blank' rel='noopener noreferrer'>Open Link</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
