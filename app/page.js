'use client';
import { useState, useRef } from 'react';
export default function PokeScout() {
  const [img, setImg] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const scan = async () => {
    if (!img) return;
    setLoading(true);
    const res = await fetch('/api/scan', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({image: img.split(',')[1], mimeType:'image/jpeg'}) });
    const d = await res.json();
    setResult(JSON.stringify(d, null, 2));
    setLoading(false);
  };
  return (
    <div style={{padding:20,background:'#080810',minHeight:'100vh',color:'#fff',fontFamily:'sans-serif'}}>
      <h1 style={{color:'#f5c842',marginBottom:20}}>POKESCOUT ⚡</h1>
      <input ref={ref} type="file" accept="image/*" capture="environment" onChange={e=>{const r=new FileReader();r.onload=ev=>setImg(ev.target.result);r.readAsDataURL(e.target.files[0])}} />
      {img && <img src={img} style={{width:'100%',marginTop:10,borderRadius:10}} />}
      <button onClick={scan} style={{marginTop:10,width:'100%',padding:14,background:'#f5c842',border:'none',borderRadius:10,fontWeight:900,fontSize:16,cursor:'pointer'}}>
        {loading ? '⏳ Analyse...' : '⚡ ANALYSER'}
      </button>
      {result && <pre style={{marginTop:10,background:'#111',padding:10,borderRadius:8,fontSize:11,overflow:'auto'}}>{result}</pre>}
    </div>
  );
}