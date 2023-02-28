import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import classes from "./form.module.css";
import moment from "moment";
import api from "../../api";

function Form(props) {
  const [value, onChange] = useState(new Date());
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "title") {
      setTitle(value);
    }
  };

  useEffect(() => {
    if (props.edit === true) {
      setTitle(props.editData.title);
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (startTime < endTime) {
      const d = moment(new Date(value)).format("L");
      let sTime = startTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      let eTime = endTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      console.log(d);
      const data = {
        title: title,
        date: new Date(value).toISOString(),
        startTime: moment(d + " " + sTime).format(),
        endTime: moment(d + " " + eTime).format(),
      };
      try {
        let getUserData = JSON.parse(localStorage.getItem("userData"));
        if (props.edit === false) {
          const res = await api.post(
            "/event",
            { ...data, id: props.id },
            {
              headers: { authorization: `Bearer ${getUserData.token}` },
            }
          );
          console.log(res);
        } else {
          const res = await api.patch(`/event/${props.editData._id}`, data, {
            headers: { authorization: `Bearer ${getUserData.token}` },
          });
          console.log(res);
          props.setShowEditForm(false);
        }
        setTitle("");
      } catch (e) {
        alert("meeting already scheduled in this date and time");
      }
    } else {
      alert("start time should be less than end time");
    }

    props.updateUpcoming();
  };
  return (
    <div className={classes.form}>
      <form onSubmit={submitHandler}>
        <table>
          <tr>
            <td>
              <label>Title</label>
            </td>
            <td>
              <input
                placeholder="Title"
                name="title"
                value={title}
                onChange={changeHandler}
                required={true}
              ></input>
            </td>
          </tr>
          <tr>
            <td>
              <label>Date</label>
            </td>
            <td>
              {" "}
              <Calendar
                value={value}
                onChange={(e) => onChange(e.value)}
                minDate={new Date()}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Start time</label>
            </td>
            <td>
              <Calendar
                value={startTime}
                onChange={(e) => setStartTime(e.value)}
                hourFormat="12"
                timeOnly
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>End time</label>
            </td>
            <td>
              {" "}
              <Calendar
                value={endTime}
                onChange={(e) => setEndTime(e.value)}
                hourFormat="12"
                timeOnly
              />
            </td>
          </tr>
        </table>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Form;
