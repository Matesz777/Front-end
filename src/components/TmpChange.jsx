import { useDispatch } from "react-redux";
import { toggleUnits } from "../redux/changeunits";
import style from './TmpChange.module.css';
import { useState, useEffect } from "react";
import { Thermometer } from 'lucide-react';

function TempChange() {
  const dispatch = useDispatch();

  const [smallerScreen, setSmallerScreen] = useState(window.innerWidth < 1300);

  useEffect(() => {
    const handleResize = () => {
      setSmallerScreen(window.innerWidth < 1300);
    };
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); }; 
  }, []);


  return (
    <div className={style.tmpButton}>
        <button onClick={()=>dispatch(toggleUnits())}>
          {smallerScreen ? < Thermometer/> : "Przełącz °C/°F" }
        </button>
    </div>
  );
}

export default TempChange;