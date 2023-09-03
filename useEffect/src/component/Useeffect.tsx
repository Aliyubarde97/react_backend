import { useEffect, useRef } from "react";

const Useeffect = () => {

    const ref = useRef<HTMLInputElement>(null);

   
    useEffect(() => {
      if(ref.current) ref.current.focus(); 

    });

    useEffect(() => {
      document.title = 'My app';
    })

  return (
    
      <div className="mb-3">
        <label htmlFor="" className="label-form"></label>
        <input ref={ref} type="text" className="form-control" />
      </div>
  
  );
};

export default Useeffect;
