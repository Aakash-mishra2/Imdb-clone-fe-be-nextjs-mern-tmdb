import React from 'react'
import { Pagination } from '@mui/material';

interface propType{
    count: number;
    setPageNo: React.Dispatch<React.SetStateAction<number>>;
}

function PaginationComponent({count, setPageNo}:propType) {

    const handleChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setPageNo(page)
    };

  return (
    <div className='flex items-center justify-center mt-4'>
      <Pagination 
        count={count} 
        variant="outlined" 
        onChange={handleChange}
    />
    </div>
  )
}

export default PaginationComponent
