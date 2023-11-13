import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import "./styles/App.css";

function App() {
  const [data, setdata] = useState([]);
  const Url = "https://653526a9c620ba9358ec3537.mockapi.io/UserDetail/";
  const formRef = useRef();
  const buttonRef = useRef();

  function displayForm() {
    formRef.current.style.display = "block";
    (formRef.current.style.display = "block")
      ? (buttonRef.current.style.display = "none")
      : (buttonRef.current.style.display = "block");
  }
  async function fetchData() {
    try {
      setdata(await axios.get(Url).then((response) => response.data));
    } catch (error) {
      console.log("Error is : " + error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

 
  
  function editData(id,datas) {
    formRef.current.style.display = "block";
    buttonRef.current.style.display = "none";
    console.log(datas.name, id);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    formik.initialValues.name = "merlin";
  }
  async function deleteData(id) {
    const ddata = await axios
      .delete(Url + id)
      .then((response) => response.data);

    fetchData();
  }

  return (
    <div className="container main ">
      {/* head */}
      <div className="">
        <h1 className="py-5  text-center text-warning">PROFILE CARDS</h1>
        <div className="container w=100 form" ref={formRef}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              website: "",
              street: "",
              area: "",
              city: "",
              pincode: "",
              cName: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.name) {
                errors.name = "⚠ Name is required";
              }
              if (!values.phone) {
                errors.phone = "⚠ phone number is required";
              } else if (values.phone.length != 10) {
                errors.phone = "⚠ please enter the valid number";
              }
              if (values.email == "") {
                errors.email = "⚠ Email is required";
              } else if (
                !/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i.test(values.email)
              ) {
                errors.email = "⚠ Invalid email address";
              }

              return errors;
            }}
            onSubmit={async (values) => {
              const newdata = {
                name: values.name,
                username: "",
                email: values.email,
                address: {
                  street: values.street,
                  suite: values.area,
                  city: values.city,
                  zipcode: values.pincode,
                },
                phone: values.phone,
                website: values.website,
                company: {
                  name: values.cName,
                  catchPhrase: "",
                  bs: "",
                },
              };
              await axios
                .post(Url, newdata)
                .then((response) => response.data)
                .then((data) => console.log("data added sucessfully..."));
              formRef.current.style.display = "none";
              buttonRef.current.style.display = "block";
              fetchData();
            }}>
            <Form>
              <div className="d-md-flex w-100 ip">
                <div className="w-50 d-flex flex-column m-3 ">
                  <label htmlFor="name">Name</label>
                  <Field type="text" name="name" className="" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>
                <div className="w-50 d-flex flex-column m-3 ">
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" className=" " />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
              </div>

              <div className="d-md-flex w-sm-75">
                <div className="w-50 d-flex flex-column m-3">
                  <label htmlFor="phone">Phone</label>
                  <Field type="phone" name="phone" className="l" />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="w-50 d-flex flex-column m-3">
                  <label htmlFor="website">Website</label>
                  <Field type="text" name="website" className="" />
                  <ErrorMessage
                    name="website"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <div className="d-md-flex w-sm-75">
                  <div className="w-50 d-flex flex-column m-3">
                    <label htmlFor="street">Street :</label>
                    <Field type="text" name="street" className="mb-3" />
                    <label htmlFor="area">Area :</label>
                    <Field type="text" name="area" className="" />
                  </div>
                  <div className="w-50 d-flex flex-column m-3">
                    <label htmlFor="city">City :</label>
                    <Field type="text" name="city" className="mb-3" />
                    <label htmlFor="pincode">Pincode :</label>
                    <Field type="text" name="pincode" className="" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="company">Company Detail </label>
                <div className="w-50 d-flex flex-column m-3">
                  <label htmlFor="cName">Company Name : </label>
                  <Field type="text" name="cName" className="" />
                </div>
              </div>

              <button type="submit" className="btn btn-success mx-1 w-auto">
                Submit
              </button>
            </Form>
          </Formik>
        </div>
        <div ref={buttonRef}>
          <button onClick={displayForm} className="btn btn-info mx-1 w-auto">
            Add Profile
          </button>
        </div>
        <div className="mt-5">
          {/* card section */}
          <div className="row">
            {data.reverse().map((datas) => (
              <div className=" col-md-6 col-lg-4 py-3 " key={datas.id}>
                <div className="card rounded p-3 cardimg">
                  <div className="card-body ">
                    <img
                      src="https://pixd.in/images/100x100.png"
                      class="img mx-auto d-block"
                      alt="..."></img>
                    <h3>{datas.name}</h3>
                    <div className="text-start my-3">
                      <h6>
                        <b>Company :</b> {datas.company.name}
                      </h6>
                      <p>
                        <b>Email : </b>
                        {datas.email}
                      </p>
                      <p>
                        <b>Phone :</b> {datas.phone}
                      </p>
                      <p>
                        <b>Website :</b>
                        <a href="#"> {datas.website}</a>
                      </p>
                      <p>
                        <b>Address : </b>
                        {`${datas.address.street},${datas.address.street},${datas.address.city}. PIN -${datas.address.zipcode}`}
                      </p>
                    </div>
                    <button
                      className="btn btn-primary mx-1 w-auto"
                      onClick={() => editData(datas.id,datas)}>
                      Edit
                    </button>
                    <button
                      className="btn btn-primary mx-1 w-auto"
                      onClick={() => deleteData(datas.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
