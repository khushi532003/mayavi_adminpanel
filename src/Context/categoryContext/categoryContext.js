import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext, useCategoryContext } from "../index.context";

export const CategoryContext = createContext()


function CategoryContextProvider({children}) {
    const { authorizeToken } = useAuthContext()
    
    // Main Category Code
    const [disable,setDisable] = useState(false)
    const [getCatgoryData ,setCategory] = useState(null)
    const [get_Sub_Category_data, setGet_Sub_Category_data] = useState(null)
    
    const getCategory = async () => {
        try {
            const resp = await axios.get("/category/get-admin", {
                headers: {
                    'Authorization': `Bearer ${authorizeToken}`
                }
            })

            setCategory(resp.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const addCategory = async(data)=>{
        setDisable(true)
        const toastId = toast.loading('Loading...');
        try {
            const resp = await axios.post("/category/create", data, {
                headers: {
                    'Authorization': `Bearer ${authorizeToken}`
                }
            })   
            toast.dismiss(toastId);
            toast.success(resp.data.message)
            getCategory()
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.message)
        }finally{
            setDisable(false)
        }
    }


    const deleteCategory =async (id) => {
        const toastId = toast.loading('Loading...');
        
        try {
            const resp = await axios.delete(`/category/delete/${id}` , {
                headers: {
                    'Authorization': `Bearer ${authorizeToken}`
                }
            })
            toast.dismiss(toastId);
            toast.success(resp.data.message)
            getCategory()
        } catch (error) {
           
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.message)
        }
            
    }


    const editCategory =async (data, id) => {
        const toastId = toast.loading('Loading...');
        try {
            const resp = await axios.put(`/category/update/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${authorizeToken}`
                }
            })
            console.log(resp);
            toast.dismiss(toastId);
            toast.success(resp.data.message)
            getCategory()
        } catch (error) {
            console.log(error);
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.message)
        }
    }

    // Sub-Category Code

    const get_Sub_Category = async () => {
        try {
            const resp = await axios.get("sub-category/get", {
                headers: {
                    'Authorization': `Bearer ${authorizeToken}`
                }
            })
            setGet_Sub_Category_data(resp.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    const add_Sub_Category = async (data) => {
        
        setDisable(true)
        const toastId = toast.loading('Loading...');
        try {
            const resp = await axios.post("/sub-category/create", data, {
                headers: {
                    'Authorization': `Bearer ${authorizeToken}`
                }
            })
            toast.dismiss(toastId);
            toast.success(resp.data.message)
            get_Sub_Category()
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.message)
        
        } finally {
            setDisable(false)
        }
    }

    const edit_Sub_Category = async (data, id) => {
        const toastId = toast.loading('Loading...');
        try {
            const resp = await axios.put(`/sub-category/update/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${authorizeToken}`
                }
            })
            console.log(resp);
            toast.dismiss(toastId);
            toast.success(resp.data.message)
            get_Sub_Category()
        } catch (error) {
            console.log(error);
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.message)
        }
    }



    const delete_Sub_Category = async (id) => {
        const toastId = toast.loading('Loading...');

        try {
            const resp = await axios.delete(`sub-category/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${authorizeToken}`
                }
            })
            toast.dismiss(toastId);
            toast.success(resp.data.message)
            get_Sub_Category()
        } catch (error) {

            toast.dismiss(toastId);
            toast.error(error?.response?.data?.message)
        }

    }
    


    // Sub-Inner-Category Code

   

    // const add_Sub_InnerCategory = async (data) => {
    //     console.log(data);
    //     setDisable(true)
    //     const toastId = toast.loading('Loading...');
    //     try {
    //         const resp = await axios.post("/sub-category/create", data, {
    //             headers: {
    //                 'Authorization': `Bearer ${authorizeToken}`
    //             }
    //         })
    //         toast.dismiss(toastId);
    //         toast.success(resp.data.message)
    //         console.log(resp);
    //     } catch (error) {
    //         toast.dismiss(toastId);
    //         toast.error(error?.response?.data?.message)
    //         console.log(error);
    //     } finally {
    //         setDisable(false)
    //     }
    // }

    
    useEffect(() => {

      getCategory()
    get_Sub_Category()
      
    }, [])
    

  




    return (
        <CategoryContext.Provider value={{ addCategory, getCatgoryData, deleteCategory, editCategory, add_Sub_Category, get_Sub_Category_data, edit_Sub_Category, delete_Sub_Category }}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryContextProvider