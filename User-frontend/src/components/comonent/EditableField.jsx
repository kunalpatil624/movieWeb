import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EditableField = ({lable, value, helperText, placeholder} ) => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState({input:value || ""})
    const [loading, setLoading] = useState(false);
    const onChangeHandle = (e)=> {
        setInput({...input, [e.target.name] : e.target.value})
    }
    const handleUpdate = async()=> {
    try {
      setLoading(true);
      
    } catch (error) {
      
    }
  }
  return (
    <div>
        <div onClick={()=> setOpen(true)} className="bg-black w-auto m-5 p-3">
            <div className="block flex justify-between items-center mb-2">
              <div><label className="block text-sm font-medium text-left opacity-50 ">{lable?.toUpperCase()}</label></div>
              <div><Button variant='link' className="text-[#c2800e] hover:text-white text-sm hover:cursor-pointer" onClick={(e)=> {if(open){e.stopPropagation(); setOpen(false)}}}>{!open ? "Edit" : "cancle"}</Button></div>
            </div>
            <div>
                {
                    !open ? (
                        <p className='text-left'> {value ? value : placeholder} </p>
                    ) : (
                        <div>
                            <Input name="input" value={input.input} onChange={onChangeHandle} placeholder={placeholder} className="max-w-70"></Input>
                            <p className='text-left mt-2 text-sm opacity-50'>{helperText}</p>
                            <div className='text-right mt-5'><Button variant="inline" className="bg-amber-500 text-black">Submit</Button></div>
                        </div>                        
                    )
                }
            </div>
         </div>
    </div>
  )
}

export default EditableField