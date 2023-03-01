import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import classes from "./Calender.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "../Form/Form";
import api from "../../api";
import ModalCus from "../modal/ModalCus";
import EventCard from "../EventCard";
// import EditModal from "../modal/EditModal";

const Calender = () => {
  const [loading, setLoading] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: "" });
  const [allEvents, setAllEvents] = useState([]);
  const getData = async () => {
    let getUserData = JSON.parse(localStorage.getItem("userData"));
    try {
      const date = new Date().toISOString();
      const res = await api.get(`/event/getUpcoming/${date}`, {
        headers: { authorization: `Bearer ${getUserData.token}` },
      });

      const response = await api.get(`/event/`, {
        headers: { authorization: `Bearer ${getUserData.token}` },
      });
      setUpcomingEvents(res.data);
      setConfirmDelete({ show: false, id: "" });
      setAllEvents(response.data);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    console.log("hello");
    setConfirmDelete({ show: true, id: id });
  };
  //   const handleEdit = (e) => {
  //     console.log(e);
  //     setEditData(e);
  //     console.log(editData);
  //   };

  const mapUpcoming = (events) => {
    return events.map((e) => {
      return (
        <>
          <EventCard
            e={e}
            handleDelete={handleDelete}
            getData={getData}
          ></EventCard>
        </>
      );
    });
  };

  const handleDateClick = (e) => {
    console.log(e);
  };

  return (
    <>
      <ModalCus confirmDelete={confirmDelete} getData={getData}></ModalCus>
      <Container className={classes.Container}>
        <Row style={{ margin: "0" }}>
          <Col lg={8} className={classes.col}>
            <div className={classes.calenderHolder}>
              <FullCalendar
                height="500px"
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={allEvents}
                loading={(e) => setLoading(e)}
                dateClick={handleDateClick}
                displayEventTime={false}
              />
            </div>
          </Col>
          <Col className={classes.col}>
            <h2>Upcoming events</h2>
            <div className={classes.eventHolder}>
              {mapUpcoming(upcomingEvents)}
            </div>
          </Col>
        </Row>
      </Container>
      <Form edit={false} updateUpcoming={getData} />
    </>
  );
};

export default Calender;
