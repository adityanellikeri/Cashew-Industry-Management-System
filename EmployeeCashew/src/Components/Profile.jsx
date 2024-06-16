import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    image: "" 
  });

  useEffect(() => {
    axios.get('http://localhost:3000/auth/admin/')
      .then(result => {
        const adminData = result.data.Result[0];
        setAdmin({
          name: adminData.name,
          email: adminData.email,
          image: adminData.image // Set image filename from data
        });
      }).catch(err => console.log(err));
  }, []);

  const handleImageChange = (event) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);

    axios.put("http://localhost:3000/auth/admin/uploadImage", formData)
      .then(response => {
        setAdmin({ ...admin, image: response.data.filename });
        window.location.reload();
      })
      .catch(error => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put('http://localhost:3000/auth/admin/edit_admin',admin)
    .then(result => {
        if(result.data.Status) {
            window.location.reload();
        } else {
            alert(result.data.Error)
        }
    }).catch(err => console.log(err))
}

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h2 className="text-center mb-3">Profile</h2>
            <form className="row g-1" onSubmit={handleSubmit}>
            <div className="col-12 d-flex justify-content-center mb-3">
            <img src={`http://localhost:3000/Images/`+admin.image} className='justify-content-center' style={{ maxWidth: "300px", maxHeight: "300px" }}/>
            </div>
        
            <div className="col-12">
            <div className="input-group">
              <label className="input-group-text" htmlFor="inputImage">
                Choose file
              </label>
              <input
                type="file"
                className="form-control"
                id="inputImage"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }} // Hide the default file input
              />
            </div>
          </div>


            <div className="col-12">
              <input
                type="text"
                className="form-control rounded-0"
                id="inputName"
                placeholder="Enter name"
                value={admin.name}
                onChange={(a) =>
                  setAdmin({ ...admin, name: a.target.value })
                }
              />
            </div>
            <div className="col-12">
              <input
                type="text"
                className="form-control rounded-0"
                id="inputEmail"
                placeholder="Enter Email"
                value={admin.email}
                onChange={(a) =>
                  setAdmin({ ...admin, email: a.target.value })
                }
              />
            </div>
            <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
            </div>
            </form>
          </div>
      </div>
    </div>
  );
};

export default Profile;
