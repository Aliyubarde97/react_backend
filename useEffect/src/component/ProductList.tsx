import { useEffect, useState } from 'react'



const ProductList = ({category}: {category: string}) => {
    const  [, setproducts] = useState<string[]>([]);

    useEffect(() => {
      console.log('Fetching products in', category);
      setproducts(['clothing', 'Household']);
    
      return () => {
      
      }
    }, [category]);
    
  return (
    <div>
      products
    </div>
  )
}

export default ProductList
