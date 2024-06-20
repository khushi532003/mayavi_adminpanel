import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCategoryContext } from '../../../Context/index.context'

function Category() {

    const {addCategory} = useCategoryContext()
    const [image,setImage] = useState(null)
    const [data,setData] = useState({
        image:null,
        name:null
    })
    const imageHadler = (e) => {
        const file = e.target.files[0]
        const imageURl = URL.createObjectURL(file)
        setImage(imageURl)
        setData({...data,image:file})
    }

    const submitHandler = () => {
        const formData = new FormData()
        formData.append("category_name",data.name)
        formData.append("image",data.image)
        addCategory(formData)
        
    }
   
   
    
   

  return (
    <div>
          <div className="wrapper">
              <div className="page-wrapper">
                  <div className="page-content">
                      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                          <div className="breadcrumb-title pe-3">Mayavi Fashion</div>
                          <div className="ps-3">
                              <nav aria-label="breadcrumb">
                                  <ol className="breadcrumb mb-0 p-0">
                                      <li className="breadcrumb-item"><Link to="javascript:;"><i className="bx bx-home-alt"></i></Link>
                                      </li>
                                      <li className="breadcrumb-item active" aria-current="page">Add Category</li>
                                  </ol>
                              </nav>
                          </div>

                      </div>

                      <div className="card">
                          <div className="card-body p-4">
                              <h5 className="card-title">Add Category</h5>
                              <hr />
                              <div className="form-body mt-4">
                                  <div className="row">
                                      <div className="border border-3 p-4 rounded">

                                          <div className="col-12">
                                              <div className="mb-3">
                                                  <label for="cat_name" className="form-label">Category Name</label>
                                                  <input type="text" className="form-control" id="cat_name" onChange={(e) => setData({...data,name:e.target.value})}  placeholder="Enter Category Name"/>
                                              </div>
                                          </div>
                                          <div className="col-lg-12">

                                              <div className="mb-3 ">
                                                  <label for="inputProductImages" className="form-label">Upload Category Image</label>
                                                  <input id="image-uploadify" type="file" accept=".xlsx,.xls,image/*,.doc,audio/*,.docx,video/*,.ppt,.pptx,.txt,.pdf" onChange={imageHadler} />
                                              </div>
                                              <div className="col-12">
                                                  <div className="d-grid w-50 m-auto">
                                                      <button type="button" className="btn btn-primary" onClick={submitHandler}>Submit</button>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <img src={image} />

                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              
          </div>
    </div>
  )
}

export default Category