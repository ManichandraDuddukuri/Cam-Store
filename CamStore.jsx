import { useState, useEffect, useMemo, useCallback, useRef } from "react";

/* ── GLOBAL STYLES ─────────────────────────────────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --bg:#0a0a0a;--bg2:#111;--bg3:#191919;--bg4:#222;
      --gold:#c8a96e;--gold2:#e2c98a;--gold3:rgba(200,169,110,0.12);
      --cream:#ede5d8;--muted:#6b6b6b;--border:rgba(200,169,110,0.18);
      --border2:rgba(200,169,110,0.35);--text:#d8cfc2;
      --red:#d95555;--green:#4faa72;
      --display:'Cormorant Garamond',Georgia,serif;
      --body:'Outfit',system-ui,sans-serif;
    }
    body{background:var(--bg);color:var(--text);font-family:var(--body);overflow-x:hidden;scrollbar-width:thin;scrollbar-color:var(--bg4) var(--bg)}
    body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E");pointer-events:none;z-index:9999;opacity:.55}
    ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--bg4);border-radius:3px}
    input,select,button{font-family:var(--body)}
    @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
    @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
    @keyframes scaleIn{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
    .fade-up{animation:fadeUp .4s ease both}
    .pulse{animation:pulse 1.5s ease infinite}
  `}</style>
);

/* ── CAMERA SVG ICONS ──────────────────────────────────────────────────────── */
const CameraIcons = {
  mirrorless: (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"78%",height:"78%"}}>
      <rect x="8" y="22" width="104" height="58" rx="5" fill="#1e1e1e" stroke="#3a3a3a" strokeWidth="1.5"/>
      <rect x="12" y="26" width="96" height="50" rx="3" fill="#161616"/>
      <rect x="72" y="10" width="28" height="18" rx="3" fill="#1e1e1e" stroke="#3a3a3a" strokeWidth="1.5"/>
      <circle cx="57" cy="51" r="19" fill="#131313" stroke="#3a3a3a" strokeWidth="2"/>
      <circle cx="57" cy="51" r="13" fill="#0e0e0e" stroke="#444" strokeWidth="1"/>
      <circle cx="57" cy="51" r="7" fill="#080808" stroke="#c8a96e" strokeWidth=".9"/>
      <circle cx="57" cy="51" r="2.5" fill="#c8a96e"/>
      <rect x="84" y="26" width="16" height="9" rx="2" fill="#252525" stroke="#3a3a3a" strokeWidth="1"/>
      <circle cx="92" cy="30.5" r="2.5" fill="#c8a96e"/>
      <rect x="12" y="26" width="18" height="7" rx="1" fill="#252525"/>
      <rect x="14" y="28" width="14" height="2" rx="1" fill="#3a3a3a"/>
      <rect x="90" y="55" width="14" height="13" rx="2" fill="#1a1a1a" stroke="#3a3a3a" strokeWidth=".8"/>
      <line x1="93" y1="61.5" x2="101" y2="61.5" stroke="#3a3a3a" strokeWidth="1"/>
      <line x1="97" y1="57.5" x2="97" y2="65.5" stroke="#3a3a3a" strokeWidth="1"/>
    </svg>
  ),
  dslr: (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"78%",height:"78%"}}>
      <rect x="6" y="24" width="108" height="56" rx="4" fill="#1e1e1e" stroke="#3a3a3a" strokeWidth="1.5"/>
      <rect x="72" y="10" width="26" height="20" rx="3" fill="#1e1e1e" stroke="#3a3a3a" strokeWidth="1.5"/>
      <circle cx="52" cy="52" r="20" fill="#131313" stroke="#3a3a3a" strokeWidth="2"/>
      <circle cx="52" cy="52" r="13.5" fill="#0e0e0e" stroke="#444" strokeWidth="1"/>
      <circle cx="52" cy="52" r="7" fill="#080808" stroke="#c8a96e" strokeWidth=".9"/>
      <circle cx="52" cy="52" r="2.5" fill="#c8a96e"/>
      <rect x="6" y="24" width="32" height="9" rx="2" fill="#252525" stroke="#3a3a3a" strokeWidth="1"/>
      <rect x="86" y="26" width="20" height="8" rx="2" fill="#252525" stroke="#3a3a3a" strokeWidth="1"/>
      <circle cx="96" cy="30" r="2.5" fill="#c8a96e"/>
      <rect x="6" y="55" width="10" height="19" rx="2" fill="#1a1a1a" stroke="#3a3a3a" strokeWidth="1"/>
      <rect x="88" y="56" width="20" height="14" rx="2" fill="#1a1a1a" stroke="#3a3a3a" strokeWidth="1"/>
    </svg>
  ),
  lens: (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"78%",height:"78%"}}>
      <rect x="28" y="8" width="64" height="74" rx="7" fill="#1e1e1e" stroke="#3a3a3a" strokeWidth="1.5"/>
      <rect x="32" y="12" width="56" height="66" rx="5" fill="#161616"/>
      <circle cx="60" cy="45" r="23" fill="#131313" stroke="#3a3a3a" strokeWidth="2"/>
      <circle cx="60" cy="45" r="16" fill="#0e0e0e" stroke="#444" strokeWidth="1"/>
      <circle cx="60" cy="45" r="10" fill="#0a0a0a" stroke="#c8a96e" strokeWidth="1"/>
      <circle cx="60" cy="45" r="4" fill="#060606" stroke="#c8a96e" strokeWidth=".8"/>
      <circle cx="60" cy="45" r="1.5" fill="#c8a96e"/>
      <rect x="28" y="28" width="5" height="34" rx="2" fill="#252525" stroke="#3a3a3a" strokeWidth=".8"/>
      <rect x="87" y="33" width="5" height="24" rx="2" fill="#252525" stroke="#3a3a3a" strokeWidth=".8"/>
      <line x1="32" y1="22" x2="88" y2="22" stroke="#3a3a3a" strokeWidth=".8"/>
      <line x1="32" y1="68" x2="88" y2="68" stroke="#3a3a3a" strokeWidth=".8"/>
    </svg>
  ),
  film: (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"78%",height:"78%"}}>
      <rect x="12" y="16" width="96" height="58" rx="4" fill="#1e1e1e" stroke="#3a3a3a" strokeWidth="1.5"/>
      <rect x="16" y="20" width="88" height="50" rx="2" fill="#161616"/>
      {[18,32,46,60].map(y=>(
        <g key={y}>
          <rect x="12" y={y} width="8" height="9" rx="1" fill="#131313" stroke="#3a3a3a" strokeWidth="1"/>
          <rect x="100" y={y} width="8" height="9" rx="1" fill="#131313" stroke="#3a3a3a" strokeWidth="1"/>
        </g>
      ))}
      <circle cx="60" cy="45" r="17" fill="#131313" stroke="#444" strokeWidth="1.5"/>
      <circle cx="60" cy="45" r="11" fill="#0e0e0e" stroke="#3a3a3a" strokeWidth="1"/>
      <circle cx="60" cy="45" r="5.5" fill="#080808" stroke="#c8a96e" strokeWidth=".9"/>
      <circle cx="60" cy="45" r="1.8" fill="#c8a96e"/>
      <rect x="24" y="26" width="22" height="26" rx="2" fill="#131313" stroke="#3a3a3a" strokeWidth=".8"/>
      <rect x="74" y="26" width="22" height="26" rx="2" fill="#131313" stroke="#3a3a3a" strokeWidth=".8"/>
    </svg>
  ),
  accessories: (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"78%",height:"78%"}}>
      <rect x="18" y="33" width="84" height="32" rx="5" fill="#1e1e1e" stroke="#3a3a3a" strokeWidth="1.5"/>
      <rect x="33" y="18" width="16" height="18" rx="3" fill="#1e1e1e" stroke="#3a3a3a" strokeWidth="1.5"/>
      <rect x="71" y="18" width="16" height="18" rx="3" fill="#1e1e1e" stroke="#3a3a3a" strokeWidth="1.5"/>
      <circle cx="44" cy="49" r="9" fill="#131313" stroke="#c8a96e" strokeWidth="1"/>
      <circle cx="44" cy="49" r="5" fill="#0a0a0a"/>
      <circle cx="44" cy="49" r="2" fill="#c8a96e"/>
      <rect x="58" y="42" width="32" height="6" rx="2" fill="#252525" stroke="#3a3a3a" strokeWidth=".8"/>
      <rect x="58" y="52" width="24" height="6" rx="2" fill="#252525" stroke="#3a3a3a" strokeWidth=".8"/>
      <circle cx="76" cy="67" r="3" fill="#c8a96e"/>
      <circle cx="86" cy="67" r="3" fill="#3a3a3a"/>
      <circle cx="96" cy="67" r="3" fill="#3a3a3a"/>
    </svg>
  ),
};

/* ── DATA ──────────────────────────────────────────────────────────────────── */
const RAW_PRODUCTS = [
  {id:1,name:"Alpha 7R V",brand:"Sony",category:"mirrorless",price:3899,specs:["61MP","8-stop IBIS","AI AF"],stock:12,badge:"new"},
  {id:2,name:"EOS R5 Mark II",brand:"Canon",category:"mirrorless",price:4299,specs:["45MP","8K RAW","DPAF II"],stock:7,badge:null},
  {id:3,name:"Z9 Flagship",brand:"Nikon",category:"mirrorless",price:5499,specs:["45.7MP","20fps","ProRes"],stock:3,badge:"low"},
  {id:4,name:"GFX100S II",brand:"Fujifilm",category:"mirrorless",price:5999,salePrice:6499,specs:["102MP","Medium Format","IBIS"],stock:5,badge:"sale"},
  {id:5,name:"Lumix S5 IIX",brand:"Panasonic",category:"mirrorless",price:2499,specs:["24.2MP","6K","Phase AF"],stock:18,badge:null},
  {id:6,name:"OM-1 Mark II",brand:"OM System",category:"mirrorless",price:2199,specs:["20MP","m4/3","120fps"],stock:9,badge:null},
  {id:7,name:"EOS-1D X Mark III",brand:"Canon",category:"dslr",price:6499,specs:["20MP","20fps","Dual CFe"],stock:2,badge:"low"},
  {id:8,name:"D6 Professional",brand:"Nikon",category:"dslr",price:6499,specs:["20.8MP","14fps","Dual XQD"],stock:4,badge:null},
  {id:9,name:"D850 Studio",brand:"Nikon",category:"dslr",price:2699,salePrice:2999,specs:["45.7MP","9fps","Tilt LCD"],stock:11,badge:"sale"},
  {id:10,name:"90D Enthusiast",brand:"Canon",category:"dslr",price:1249,specs:["32.5MP","10fps","4K Crop"],stock:22,badge:null},
  {id:11,name:"FE 24-70mm f/2.8 GM II",brand:"Sony",category:"lens",price:2299,specs:["24-70mm","f/2.8","Nano AR II"],stock:15,badge:null},
  {id:12,name:"RF 85mm f/1.2L USM",brand:"Canon",category:"lens",price:2699,specs:["85mm","f/1.2","IS II"],stock:6,badge:null},
  {id:13,name:"NIKKOR Z 58mm f/0.95 Noct",brand:"Nikon",category:"lens",price:7999,specs:["58mm","f/0.95","Nano Crystal"],stock:1,badge:"low"},
  {id:14,name:"XF 56mm f/1.2 R WR",brand:"Fujifilm",category:"lens",price:999,specs:["56mm","f/1.2","Weather Sealed"],stock:19,badge:"new"},
  {id:15,name:"Otus 55mm f/1.4",brand:"Zeiss",category:"lens",price:4199,specs:["55mm","f/1.4","T* Coating"],stock:3,badge:null},
  {id:16,name:"Milvus 21mm f/2.8",brand:"Zeiss",category:"lens",price:2199,salePrice:2499,specs:["21mm","f/2.8","Manual"],stock:7,badge:"sale"},
  {id:17,name:"Bessa R4M",brand:"Voigtländer",category:"film",price:899,specs:["28-21mm VF","Leica M","Manual"],stock:4,badge:null},
  {id:18,name:"Nikon F6 Pro",brand:"Nikon",category:"film",price:2699,specs:["Multi-AF","Matrix Meter","Databack"],stock:2,badge:"low"},
  {id:19,name:"FM3A Classic",brand:"Nikon",category:"film",price:1299,specs:["Hybrid Shutter","TTL","Aperture-Pri"],stock:5,badge:null},
  {id:20,name:"Canonet QL17 G-III",brand:"Canon",category:"film",price:349,specs:["40mm f/1.7","Rangefinder","Battery-free"],stock:8,badge:null},
  {id:21,name:"ProGrade CFexpress B 1TB",brand:"ProGrade",category:"accessories",price:349,specs:["1750 MB/s","Type B","1TB"],stock:30,badge:null},
  {id:22,name:"Peak Design Capture v3",brand:"Peak Design",category:"accessories",price:79,specs:["QR System","Arca-Swiss","Aluminum"],stock:45,badge:null},
  {id:23,name:"Atomos Ninja V+",brand:"Atomos",category:"accessories",price:849,salePrice:999,specs:["5.2\" HDR","8K ProRes","HDMI 2.1"],stock:12,badge:"sale"},
  {id:24,name:"Zhiyun Crane 4",brand:"Zhiyun",category:"accessories",price:499,specs:["6.5kg Payload","3-Axis","LiDAR AF"],stock:9,badge:"new"},
];

function simulateFetch() {
  return new Promise(res => setTimeout(() => {
    const data = RAW_PRODUCTS.map(p => ({
      ...p,
      livePrice: Math.round(p.price * (1 + (Math.random() - 0.5) * 0.04)),
    }));
    res(data);
  }, 700));
}

const CATEGORIES = [
  {key:"all",label:"All"},
  {key:"mirrorless",label:"Mirrorless"},
  {key:"dslr",label:"DSLR"},
  {key:"lens",label:"Lenses"},
  {key:"film",label:"Film"},
  {key:"accessories",label:"Accessories"},
];

/* ── STYLES OBJECTS ─────────────────────────────────────────────────────────── */
const S = {
  // Nav
  nav:{position:"sticky",top:0,zIndex:100,background:"rgba(10,10,10,0.95)",backdropFilter:"blur(16px)",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 clamp(1rem,4vw,3rem)",height:62},
  logo:{fontFamily:"var(--display)",fontSize:"1.35rem",fontWeight:700,letterSpacing:"0.18em",color:"var(--gold)",textDecoration:"none",userSelect:"none"},
  logoSpan:{color:"var(--cream)",fontWeight:400,fontStyle:"italic"},
  // Hero
  hero:{padding:"clamp(3rem,7vw,5.5rem) clamp(1rem,4vw,3rem)",borderBottom:"1px solid var(--border)",position:"relative",overflow:"hidden"},
  heroGlow:{position:"absolute",top:"-50%",right:"-5%",width:"55vw",height:"160%",background:"radial-gradient(ellipse,rgba(200,169,110,0.07) 0%,transparent 68%)",pointerEvents:"none"},
  eyebrow:{fontSize:11,letterSpacing:"0.3em",color:"var(--gold)",textTransform:"uppercase",marginBottom:"1rem",fontFamily:"var(--body)"},
  heroTitle:{fontFamily:"var(--display)",fontSize:"clamp(2.8rem,6.5vw,5.5rem)",fontWeight:700,lineHeight:1.02,color:"var(--cream)",marginBottom:"1.25rem"},
  heroTitleEm:{color:"var(--gold)",fontStyle:"italic"},
  heroSub:{fontSize:15,color:"var(--muted)",maxWidth:480,lineHeight:1.75,marginBottom:"2rem",fontWeight:300},
  statsRow:{display:"flex",gap:"2.5rem",flexWrap:"wrap",paddingTop:"1.5rem",borderTop:"1px solid var(--border)"},
  statNum:{fontFamily:"var(--display)",fontSize:"2rem",color:"var(--gold)",fontWeight:600,lineHeight:1},
  statLabel:{fontSize:10,letterSpacing:"0.18em",color:"var(--muted)",textTransform:"uppercase",marginTop:3},
  // Filter
  filterBar:{padding:"1.25rem clamp(1rem,4vw,3rem)",borderBottom:"1px solid var(--border)",background:"var(--bg2)",position:"sticky",top:62,zIndex:90},
  filterTop:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem",flexWrap:"wrap",marginBottom:"1rem"},
  searchWrap:{position:"relative",flex:1,maxWidth:320,minWidth:180},
  searchIcon:{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"var(--muted)",fontSize:15,pointerEvents:"none",lineHeight:1},
  searchInput:{width:"100%",background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:3,color:"var(--text)",fontSize:14,padding:"9px 12px 9px 36px",outline:"none",transition:"border .2s"},
  sortSelect:{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:3,color:"var(--text)",fontSize:13,padding:"9px 14px",outline:"none",cursor:"pointer"},
  pillsRow:{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center"},
  filterLabel:{fontSize:10,letterSpacing:"0.2em",color:"var(--muted)",textTransform:"uppercase",marginRight:4},
  // Grid
  resultsBar:{padding:"0.85rem clamp(1rem,4vw,3rem)",fontSize:13,color:"var(--muted)",borderBottom:"1px solid rgba(200,169,110,0.08)"},
  grid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(255px,1fr))",gap:1,background:"var(--border)"},
  // Card
  card:{background:"var(--bg)",padding:"1.4rem",cursor:"pointer",position:"relative",overflow:"hidden",transition:"background .25s"},
  imgWrap:{aspectRatio:"4/3",background:"var(--bg3)",borderRadius:2,overflow:"hidden",marginBottom:"1.2rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background .25s"},
  brand:{fontSize:10,letterSpacing:"0.22em",textTransform:"uppercase",color:"var(--gold)",marginBottom:4},
  name:{fontFamily:"var(--display)",fontSize:"1.05rem",fontWeight:600,color:"var(--cream)",lineHeight:1.28,marginBottom:8},
  specPill:{fontSize:11,letterSpacing:"0.04em",color:"var(--muted)",background:"var(--bg3)",padding:"2px 7px",borderRadius:2,lineHeight:1.6},
  cardBottom:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,marginTop:10},
  price:{fontFamily:"var(--display)",fontSize:"1.35rem",fontWeight:600,color:"var(--cream)"},
  priceOld:{fontSize:11,color:"var(--muted)",textDecoration:"line-through",marginTop:2},
  // Cart btn
  addBtn:{background:"none",border:"1px solid var(--border)",color:"var(--text)",fontSize:12,letterSpacing:"0.07em",padding:"7px 13px",borderRadius:3,cursor:"pointer",transition:"all .2s",whiteSpace:"nowrap"},
  // Drawer
  overlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:200,transition:"opacity .3s"},
  drawer:{position:"fixed",top:0,right:0,width:"min(420px,100vw)",height:"100vh",background:"var(--bg2)",borderLeft:"1px solid var(--border)",zIndex:201,display:"flex",flexDirection:"column"},
  drawerHeader:{padding:"1.4rem 1.5rem",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between"},
  drawerTitle:{fontFamily:"var(--display)",fontSize:"1.3rem",color:"var(--cream)",fontWeight:600},
  closeBtn:{background:"none",border:"none",color:"var(--muted)",fontSize:18,cursor:"pointer",padding:"4px 8px",lineHeight:1},
  cartItemsWrap:{flex:1,overflowY:"auto",padding:"0.5rem 1rem"},
  cartEmpty:{textAlign:"center",padding:"4rem 2rem",color:"var(--muted)"},
  cartItem:{display:"grid",gridTemplateColumns:"58px 1fr auto",gap:12,alignItems:"start",padding:"1rem 0",borderBottom:"1px solid var(--border)"},
  cartThumb:{background:"var(--bg3)",borderRadius:2,width:58,height:48,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"},
  cartItemName:{fontFamily:"var(--display)",fontSize:"0.88rem",color:"var(--cream)",marginBottom:3},
  cartItemBrand:{fontSize:10,color:"var(--gold)",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:8},
  qtyCtrl:{display:"flex",alignItems:"center",gap:8},
  qtyBtn:{background:"var(--bg3)",border:"1px solid var(--border)",color:"var(--text)",width:22,height:22,borderRadius:2,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"},
  cartFooter:{padding:"1.25rem 1.5rem",borderTop:"1px solid var(--border)",background:"var(--bg)"},
  cartRow:{display:"flex",justifyContent:"space-between",fontSize:13,color:"var(--muted)",marginBottom:6},
  cartTotal:{display:"flex",justifyContent:"space-between",fontFamily:"var(--display)",fontSize:"1.2rem",color:"var(--cream)",paddingTop:"0.75rem",marginBottom:"1.2rem",borderTop:"1px solid var(--border)"},
  checkoutBtn:{width:"100%",background:"var(--gold)",border:"none",color:"#0a0a0a",fontFamily:"var(--display)",fontSize:"1rem",fontWeight:700,letterSpacing:"0.06em",padding:14,borderRadius:3,cursor:"pointer",transition:"background .2s"},
  // Modal
  modalOverlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem",transition:"opacity .3s"},
  modal:{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:4,width:"100%",maxWidth:520,maxHeight:"90vh",overflowY:"auto"},
  modalHeader:{padding:"1.4rem 1.5rem",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between"},
  modalTitle:{fontFamily:"var(--display)",fontSize:"1.4rem",color:"var(--cream)",fontWeight:600},
  modalBody:{padding:"1.5rem"},
  sectionTitle:{fontSize:10,letterSpacing:"0.28em",textTransform:"uppercase",color:"var(--gold)",marginBottom:"1rem",paddingBottom:"0.5rem",borderBottom:"1px solid var(--border)"},
  formRow:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12},
  formGroup:{display:"flex",flexDirection:"column",gap:5,marginBottom:12},
  label:{fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--muted)"},
  input:{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:3,color:"var(--text)",fontSize:14,padding:"10px 12px",outline:"none",transition:"border .2s",width:"100%"},
  modalFooter:{padding:"1.2rem 1.5rem",borderTop:"1px solid var(--border)",display:"flex",gap:10},
  cancelBtn:{background:"none",border:"1px solid var(--border)",color:"var(--muted)",fontSize:14,padding:"11px 18px",borderRadius:3,cursor:"pointer",flex:1},
  payBtn:{background:"var(--gold)",border:"none",color:"#0a0a0a",fontFamily:"var(--display)",fontSize:"1rem",fontWeight:700,padding:"11px 20px",borderRadius:3,cursor:"pointer",flex:2,transition:"background .2s"},
};

/* ── SMALL COMPONENTS ───────────────────────────────────────────────────────── */
const Badge = ({type}) => {
  const styles = {
    new:{background:"var(--gold)",color:"#0a0a0a"},
    sale:{background:"var(--red)",color:"#fff"},
    low:{background:"transparent",border:"1px solid var(--red)",color:"var(--red)"},
  };
  const labels = {new:"New",sale:"Sale",low:"Low Stock"};
  if (!type || !styles[type]) return null;
  return <span style={{position:"absolute",top:12,right:12,fontSize:10,fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",padding:"3px 8px",borderRadius:2,...styles[type]}}>{labels[type]}</span>;
};

const StockBadge = ({stock}) => {
  if (stock === 0) return <span style={{fontSize:11,color:"var(--red)",display:"flex",alignItems:"center",gap:5}}><span style={{width:6,height:6,borderRadius:"50%",background:"var(--red)",display:"inline-block"}}/>Out of stock</span>;
  if (stock <= 3) return <span style={{fontSize:11,color:"#d08040",display:"flex",alignItems:"center",gap:5}}><span style={{width:6,height:6,borderRadius:"50%",background:"#d08040",display:"inline-block"}}/>Only {stock} left</span>;
  return <span style={{fontSize:11,color:"var(--green)",display:"flex",alignItems:"center",gap:5}}><span style={{width:6,height:6,borderRadius:"50%",background:"var(--green)",display:"inline-block"}}/>In stock</span>;
};

const Pill = ({label,active,onClick}) => (
  <button onClick={onClick} style={{background:active?"var(--gold)":"none",border:`1px solid ${active?"var(--gold)":"var(--border)"}`,borderRadius:20,color:active?"#0a0a0a":"var(--muted)",fontFamily:"var(--body)",fontSize:12,letterSpacing:"0.05em",padding:"5px 15px",cursor:"pointer",transition:"all .2s",fontWeight:active?500:400}}>
    {label}
  </button>
);

/* ── PRODUCT CARD ────────────────────────────────────────────────────────────── */
const ProductCard = ({product, inCart, onAdd, animDelay}) => {
  const [hovered, setHovered] = useState(false);
  const price = product.livePrice || product.price;
  const icon = CameraIcons[product.category] || CameraIcons.mirrorless;

  return (
    <div
      className="fade-up"
      style={{...S.card, background: hovered ? "var(--bg2)" : "var(--bg)", animationDelay:`${animDelay}ms`}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Badge type={product.badge}/>
      <div style={{...S.imgWrap, background: hovered ? "var(--bg4)" : "var(--bg3)"}}>
        <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",transform:hovered?"scale(1.04)":"scale(1)",transition:"transform .3s"}}>
          {icon}
        </div>
      </div>
      <div style={S.brand}>{product.brand}</div>
      <div style={S.name}>{product.name}</div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
        {product.specs.map(s=><span key={s} style={S.specPill}>{s}</span>)}
      </div>
      <div style={S.cardBottom}>
        <div>
          <div style={S.price}>${price.toLocaleString()}</div>
          {product.salePrice && <div style={S.priceOld}>Was ${product.salePrice.toLocaleString()}</div>}
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
          <StockBadge stock={product.stock}/>
          <button
            disabled={product.stock === 0}
            onClick={() => onAdd(product.id)}
            style={{
              ...S.addBtn,
              ...(inCart ? {background:"var(--gold)",borderColor:"var(--gold)",color:"#0a0a0a",fontWeight:500} : {}),
              ...(product.stock === 0 ? {opacity:.4,cursor:"not-allowed"} : {}),
            }}
          >
            {product.stock === 0 ? "Unavailable" : inCart ? "✓ Added" : "+ Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── CART DRAWER ─────────────────────────────────────────────────────────────── */
const CartDrawer = ({open, cart, onClose, onRemove, onChangeQty, onCheckout}) => {
  const subtotal = cart.reduce((s,c) => s + c.price * c.qty, 0);

  return (
    <>
      <div style={{...S.overlay,opacity:open?1:0,pointerEvents:open?"all":"none"}} onClick={onClose}/>
      <aside style={{...S.drawer,transform:open?"translateX(0)":"translateX(100%)",transition:"transform .35s cubic-bezier(0.4,0,0.2,1)"}}>
        <div style={S.drawerHeader}>
          <h2 style={S.drawerTitle}>Your Cart</h2>
          <button style={S.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={S.cartItemsWrap}>
          {cart.length === 0 ? (
            <div style={S.cartEmpty}>
              <div style={{fontSize:"2.5rem",opacity:.25,marginBottom:"1rem"}}>📷</div>
              <p style={{fontFamily:"var(--display)",fontSize:"1.1rem",color:"var(--cream)",marginBottom:6}}>Cart is empty</p>
              <p style={{fontSize:13}}>Add a camera to get started</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="fade-up" style={S.cartItem}>
              <div style={S.cartThumb}>
                {CameraIcons[item.category] || CameraIcons.mirrorless}
              </div>
              <div>
                <div style={S.cartItemBrand}>{item.brand}</div>
                <div style={S.cartItemName}>{item.name}</div>
                <div style={S.qtyCtrl}>
                  <button style={S.qtyBtn} onClick={() => onChangeQty(item.id, -1)}>−</button>
                  <span style={{fontSize:13,minWidth:20,textAlign:"center"}}>{item.qty}</span>
                  <button style={S.qtyBtn} onClick={() => onChangeQty(item.id, 1)}>+</button>
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}>
                <span style={{fontFamily:"var(--display)",fontSize:"1rem",color:"var(--gold)"}}>${(item.price*item.qty).toLocaleString()}</span>
                <button style={{background:"none",border:"none",color:"var(--muted)",fontSize:12,cursor:"pointer"}} onClick={() => onRemove(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div style={S.cartFooter}>
            <div style={S.cartRow}><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
            <div style={S.cartRow}><span>Shipping</span><span>Free</span></div>
            <div style={S.cartTotal}><span>Total</span><span style={{color:"var(--gold)"}}>${subtotal.toLocaleString()}</span></div>
            <button style={S.checkoutBtn} onMouseEnter={e=>e.target.style.background="var(--gold2)"} onMouseLeave={e=>e.target.style.background="var(--gold)"} onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

/* ── FORM INPUT COMPONENT ───────────────────────────────────────────────────── */
const FormInput = ({label,id,placeholder,value,onChange,error,maxLength,type="text"}) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={S.formGroup}>
      <label style={S.label}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        maxLength={maxLength}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{...S.input, borderColor: error ? "var(--red)" : focused ? "var(--gold)" : "var(--border)"}}
      />
      {error && <span style={{fontSize:11,color:"var(--red)"}}>{error}</span>}
    </div>
  );
};

/* ── CHECKOUT FORM ───────────────────────────────────────────────────────────── */
const CheckoutModal = ({open, cart, onClose, onSuccess}) => {
  const total = cart.reduce((s,c) => s + c.price * c.qty, 0);
  const [form, setForm] = useState({fname:"",lname:"",email:"",phone:"",addr:"",city:"",zip:"",card:"",expiry:"",cvc:""});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [orderNum] = useState("CS-" + Date.now().toString().slice(-6));

  const set = (key) => (val) => {
    let v = val;
    if (key === "card") {
      v = val.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
    }
    if (key === "expiry") {
      v = val.replace(/\D/g,"").slice(0,4);
      if (v.length >= 2) v = v.slice(0,2) + "/" + v.slice(2);
    }
    if (key === "cvc") v = val.replace(/\D/g,"").slice(0,3);
    if (key === "zip") v = val.replace(/[^\d-]/g,"").slice(0,10);
    setForm(f => ({...f,[key]:v}));
    setErrors(e => ({...e,[key]:""}));
  };

  const validate = () => {
    const e = {};
    if (!form.fname.trim()) e.fname = "Required";
    if (!form.lname.trim()) e.lname = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (form.phone.replace(/\D/g,"").length < 10) e.phone = "Valid phone required";
    if (!form.addr.trim()) e.addr = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!/^\d{5}(-\d{4})?$/.test(form.zip)) e.zip = "5-digit ZIP required";
    if (form.card.replace(/\D/g,"").length !== 16) e.card = "16-digit card number required";
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = "MM/YY format";
    if (!/^\d{3}$/.test(form.cvc)) e.cvc = "3 digits";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    setSubmitted(true);
    onSuccess();
  };

  if (!open) return null;

  return (
    <div style={{...S.modalOverlay,opacity:open?1:0,pointerEvents:open?"all":"none"}}>
      <div style={{...S.modal,animation:"scaleIn .3s ease both"}}>
        {submitted ? (
          <div style={{textAlign:"center",padding:"3rem 2rem"}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:"rgba(79,170,114,0.12)",border:"1px solid rgba(79,170,114,0.4)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1.5rem",fontSize:"1.5rem"}}>✓</div>
            <h2 style={{fontFamily:"var(--display)",fontSize:"1.7rem",color:"var(--cream)",marginBottom:"0.75rem"}}>Order Confirmed</h2>
            <p style={{color:"var(--muted)",lineHeight:1.75,fontSize:14,marginBottom:"0.75rem"}}>Your equipment is being prepared for dispatch.</p>
            <p style={{fontFamily:"var(--display)",color:"var(--gold)",fontSize:"1.1rem",margin:"1rem 0"}}>Order {orderNum} · ${total.toLocaleString()}</p>
            <p style={{color:"var(--muted)",fontSize:13,marginBottom:"2rem"}}>Estimated delivery: 3–5 business days</p>
            <button style={{...S.checkoutBtn,maxWidth:220,margin:"0 auto",display:"block"}} onClick={onClose}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div style={S.modalHeader}>
              <h2 style={S.modalTitle}>Checkout</h2>
              <button style={S.closeBtn} onClick={onClose}>✕</button>
            </div>
            <div style={S.modalBody}>
              <div style={{marginBottom:"1.5rem"}}>
                <div style={S.sectionTitle}>Contact Information</div>
                <div style={S.formRow}>
                  <FormInput label="First Name" id="fname" placeholder="James" value={form.fname} onChange={set("fname")} error={errors.fname}/>
                  <FormInput label="Last Name" id="lname" placeholder="Nachtwey" value={form.lname} onChange={set("lname")} error={errors.lname}/>
                </div>
                <FormInput label="Email" id="email" type="email" placeholder="james@studio.com" value={form.email} onChange={set("email")} error={errors.email}/>
                <FormInput label="Phone" id="phone" placeholder="+1 (555) 000-0000" value={form.phone} onChange={set("phone")} error={errors.phone}/>
              </div>
              <div style={{marginBottom:"1.5rem"}}>
                <div style={S.sectionTitle}>Shipping Address</div>
                <FormInput label="Street Address" id="addr" placeholder="123 Photography Lane" value={form.addr} onChange={set("addr")} error={errors.addr}/>
                <div style={S.formRow}>
                  <FormInput label="City" id="city" placeholder="New York" value={form.city} onChange={set("city")} error={errors.city}/>
                  <FormInput label="ZIP Code" id="zip" placeholder="10001" value={form.zip} onChange={set("zip")} error={errors.zip}/>
                </div>
              </div>
              <div>
                <div style={S.sectionTitle}>Payment Details</div>
                <FormInput label="Card Number" id="card" placeholder="4242 4242 4242 4242" value={form.card} onChange={set("card")} error={errors.card} maxLength={19}/>
                <div style={S.formRow}>
                  <FormInput label="Expiry" id="expiry" placeholder="MM/YY" value={form.expiry} onChange={set("expiry")} error={errors.expiry} maxLength={5}/>
                  <FormInput label="CVC" id="cvc" placeholder="123" value={form.cvc} onChange={set("cvc")} error={errors.cvc} maxLength={3}/>
                </div>
              </div>
            </div>
            <div style={S.modalFooter}>
              <button style={S.cancelBtn} onClick={onClose}>Cancel</button>
              <button style={S.payBtn} onClick={submit}>Pay ${total.toLocaleString()} →</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ── MAIN APP ────────────────────────────────────────────────────────────────── */
export default function CamStore() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQ, setSearchQ] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("camstore-cart") || "[]"); } catch { return []; }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Load products
  useEffect(() => {
    simulateFetch().then(data => { setProducts(data); setLoading(false); });
    const interval = setInterval(() => {
      simulateFetch().then(data => setProducts(data));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Persist cart
  useEffect(() => {
    try { localStorage.setItem("camstore-cart", JSON.stringify(cart)); } catch {}
  }, [cart]);

  // Keyboard close
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") { setCartOpen(false); setCheckoutOpen(false); }};
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  // Filtered + sorted products
  const filtered = useMemo(() => {
    let list = products.filter(p => {
      const matchCat = activeFilter === "all" || p.category === activeFilter;
      const q = searchQ.toLowerCase();
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.specs.some(s => s.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
    if (sortBy === "price-asc") list = [...list].sort((a,b) => (a.livePrice||a.price)-(b.livePrice||b.price));
    if (sortBy === "price-desc") list = [...list].sort((a,b) => (b.livePrice||b.price)-(a.livePrice||a.price));
    if (sortBy === "name-asc") list = [...list].sort((a,b) => a.name.localeCompare(b.name));
    return list;
  }, [products, activeFilter, searchQ, sortBy]);

  const cartCount = cart.reduce((s,c) => s + c.qty, 0);
  const inStockCount = products.filter(p => p.stock > 0).length;

  const addToCart = useCallback((id) => {
    const product = products.find(p => p.id === id);
    if (!product || product.stock === 0) return;
    setCart(prev => {
      const existing = prev.find(c => c.id === id);
      if (existing) return prev.map(c => c.id===id ? {...c,qty:Math.min(c.qty+1,product.stock)} : c);
      return [...prev, {id:product.id,name:product.name,brand:product.brand,price:product.livePrice||product.price,category:product.category,qty:1,stock:product.stock}];
    });
  }, [products]);

  const removeFromCart = useCallback((id) => setCart(prev => prev.filter(c => c.id !== id)), []);

  const changeQty = useCallback((id, delta) => {
    setCart(prev => prev.map(c => c.id===id ? {...c,qty:Math.max(1,Math.min(c.qty+delta,c.stock))} : c));
  }, []);

  const handleCheckoutSuccess = useCallback(() => setCart([]), []);

  return (
    <>
      <GlobalStyle/>

      {/* NAV */}
      <nav style={S.nav}>
        <span style={S.logo}>CAM <span style={S.logoSpan}>store</span></span>
        <button
          onClick={() => setCartOpen(true)}
          style={{background:"none",border:"1px solid var(--border)",color:"var(--text)",fontFamily:"var(--body)",fontSize:13,letterSpacing:"0.07em",padding:"7px 16px",borderRadius:3,cursor:"pointer",display:"flex",alignItems:"center",gap:8,transition:"all .2s"}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.color="var(--gold)"}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--text)"}}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          Cart
          <span style={{background:"var(--gold)",color:"#0a0a0a",fontSize:11,fontWeight:700,width:18,height:18,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
            {cartCount}
          </span>
        </button>
      </nav>

      {/* HERO */}
      <section style={S.hero}>
        <div style={S.heroGlow}/>
        <div style={S.eyebrow}>The Art of Photography</div>
        <h1 style={S.heroTitle}>
          Capture Every<br/>
          <em style={S.heroTitleEm}>Decisive Moment</em>
        </h1>
        <p style={S.heroSub}>Curated selection of professional cameras, lenses, and accessories from the world's finest optical manufacturers.</p>
        <div style={S.statsRow}>
          {[
            {num:products.length || 24, label:"Products"},
            {num:8, label:"Brands"},
            {num:inStockCount || "—", label:"In Stock"},
            {num:"Live", label:"Pricing"},
          ].map(({num,label}) => (
            <div key={label}>
              <div style={S.statNum}>{num}</div>
              <div style={S.statLabel}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FILTER BAR */}
      <div style={S.filterBar}>
        <div style={S.filterTop}>
          <div style={S.searchWrap}>
            <span style={S.searchIcon}>⌕</span>
            <input
              style={S.searchInput}
              placeholder="Search cameras, lenses…"
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              onFocus={e => e.target.style.borderColor="var(--gold)"}
              onBlur={e => e.target.style.borderColor="var(--border)"}
            />
          </div>
          <select style={S.sortSelect} value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A–Z</option>
          </select>
        </div>
        <div style={S.pillsRow}>
          <span style={S.filterLabel}>Filter</span>
          {CATEGORIES.map(c => (
            <Pill key={c.key} label={c.label} active={activeFilter===c.key} onClick={() => setActiveFilter(c.key)}/>
          ))}
        </div>
      </div>

      {/* RESULTS BAR */}
      <div style={S.resultsBar}>
        {loading
          ? <span className="pulse">Loading live inventory…</span>
          : <span>Showing <strong style={{color:"var(--cream)"}}>{filtered.length}</strong> products — <strong style={{color:"var(--cream)"}}>{filtered.filter(p=>p.stock>0).length}</strong> in stock</span>
        }
      </div>

      {/* PRODUCT GRID */}
      <main style={S.grid}>
        {loading ? (
          Array.from({length:8}).map((_,i) => (
            <div key={i} style={{...S.card,background:"var(--bg)"}}>
              <div style={{...S.imgWrap,background:"var(--bg3)"}} className="pulse"/>
              <div style={{height:10,background:"var(--bg3)",borderRadius:2,width:"60%",marginBottom:8}} className="pulse"/>
              <div style={{height:14,background:"var(--bg3)",borderRadius:2,marginBottom:12}} className="pulse"/>
              <div style={{height:10,background:"var(--bg3)",borderRadius:2,width:"80%"}} className="pulse"/>
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div style={{gridColumn:"1/-1",textAlign:"center",padding:"5rem 2rem",background:"var(--bg)"}}>
            <div style={{fontSize:"2.5rem",opacity:.2,marginBottom:"1rem"}}>📷</div>
            <div style={{fontFamily:"var(--display)",fontSize:"1.4rem",color:"var(--cream)",marginBottom:6}}>No cameras found</div>
            <div style={{color:"var(--muted)"}}>Try a different search or filter</div>
          </div>
        ) : filtered.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            inCart={cart.some(c => c.id === product.id)}
            onAdd={addToCart}
            animDelay={Math.min(i * 35, 380)}
          />
        ))}
      </main>

      {/* CART DRAWER */}
      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onChangeQty={changeQty}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />

      {/* CHECKOUT MODAL */}
      <CheckoutModal
        open={checkoutOpen}
        cart={cart}
        onClose={() => setCheckoutOpen(false)}
        onSuccess={handleCheckoutSuccess}
      />

      {/* FOOTER */}
      <footer style={{marginTop:"4rem",padding:"2rem clamp(1rem,4vw,3rem)",borderTop:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
        <span style={{fontFamily:"var(--display)",fontSize:"1rem",color:"var(--gold)",fontWeight:700,letterSpacing:"0.18em"}}>CAM STORE</span>
        <span style={{fontSize:12,color:"var(--muted)"}}>© 2025 Cam Store · Prices update live every 30s</span>
      </footer>
    </>
  );
}
