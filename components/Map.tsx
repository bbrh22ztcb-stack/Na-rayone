'use client';
import{MapContainer,TileLayer,Marker,Popup}from'react-leaflet';
import{useEffect,useState}from'react';
import'leaflet/dist/leaflet.css';
import L from'leaflet';
const icon=new L.Icon({iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',shadowUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',iconSize:[25,41],iconAnchor:[12,41]});
export default function Map(){const[e,setE]=useState<any[]>([]);useEffect(()=>{fetch('/api/events').then(x=>x.json()).then(setE)},[]);return <div className="map"><MapContainer center={[56.3,38.15]} zoom={13} style={{height:'100%',width:'100%'}}><TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>{e.map(x=><Marker key={x.id} position={[x.lat,x.lng]} icon={icon}><Popup><b>{x.title}</b><br/>{x.placeName}</Popup></Marker>)}</MapContainer></div>}
