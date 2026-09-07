import "./Admin.Module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { addHotel, updateHotel } from "../../Redux/AdminHotel/action";
import { useDispatch } from "react-redux";

let initialState = {
  image: "",
  name: "",
  place: "",
  price: "",
  description: "",
  additional: "",
};
export const AdminStay = () => {
  const [hotel, setHotel] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      axios.get(`http://localhost:8080/hotel/${id}`).then((res) => {
        const { image, name, place, price, description, additional } =
          res.data;
        setHotel({ image, name, place, price, description, additional });
      });
    } else {
      setHotel(initialState);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setHotel((prev) => {
      return { ...prev, [name]: name === "price" ? +value : value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      dispatch(updateHotel(id, hotel));
    } else {
      dispatch(addHotel(hotel));
    }
    setHotel(initialState);
    navigate("/admin/hotels");
  };

  return (
    <>
      <div className="adminFlightMai">
        <div className="adminSideBr">
        <h1><Link to={"/admin"}>Home</Link></h1>
          <h1><Link to={"/admin/adminflight"}>Add Flight</Link></h1>
          <h1><Link to={"/admin/adminstay"}>Add Stays</Link></h1>
          <h1><Link to={"/admin/products"}>All Flights</Link></h1>
          <h1><Link to={"/admin/hotels"}>All Hotels</Link></h1>
          <h1><Link to={"/admin/users"}>All Users</Link></h1>
          <h1><Link to={"/"}>Log out</Link></h1>

        </div>
        <div className="adminFlightBox">
          <div className="adminHead">
            <h2>{isEditMode ? "Edit Hotel" : "Admin Panel for Hotel"}</h2>
          </div>

          <div className="adminFlightInputs">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="adminFlightInputBx">
                <label htmlFor="">Hotel Image</label>
                <input
                  type="url"
                  name="image"
                  value={hotel.image}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="adminFlightInputBx">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  name="name"
                  value={hotel.name}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="adminFlightInputBx">
                <label htmlFor="">Place</label>
                <input
                  type="text"
                  name="place"
                  value={hotel.place}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  name="price"
                  value={hotel.price}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Description</label>
                <input
                  type="text"
                  name="description"
                  value={hotel.description}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Additional</label>
                <input
                  type="text"
                  name="additional"
                  value={hotel.additional}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="adminFlightInputBx">
                <span></span>
                <button>{isEditMode ? "Update Hotel" : "Add Hotel"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

