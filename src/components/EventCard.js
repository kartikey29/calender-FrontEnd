import React, { useState } from "react";
import classes from "./EventCard.module.css";
import Form from "./Form/Form";

const EventCard = (props) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [editData, setEditData] = useState({});
  return (
    <>
      <div key={props.e._id} className={classes.event}>
        <p>
          {props.e.title} on{" "}
          <span>{new Date(props.e.date).toLocaleDateString()}</span>
        </p>
        <p>
          From :{" "}
          {new Date(props.e.startTime).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}{" "}
          To :
          {new Date(props.e.endTime).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
        <span>
          <button
            onClick={() => {
              props.handleDelete(props.e._id);
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setShowEditForm(!showEditForm);
              setEditData(props.e);
            }}
          >
            Edit
          </button>
        </span>
        {showEditForm && (
          <Form
            edit={true}
            updateUpcoming={props.getData}
            editData={editData}
            setShowEditForm={setShowEditForm}
          />
        )}
      </div>
    </>
  );
};

export default EventCard;
