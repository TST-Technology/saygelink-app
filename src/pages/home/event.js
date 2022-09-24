import {
  ButtonWithEvent,
  EventCard,
  EventCardText,
  EventContainer,
  EventImageContainer,
  EventPink,
  EventText,
} from "../../style-component/home/event-card";

const EventInfo = () => {
  return (
    <EventCard>
      <EventContainer>
        <EventText>Event</EventText>
        <EventPink>View all</EventPink>
      </EventContainer>
      <hr></hr>
      <EventImageContainer>
        <EventCardText>Job Opportunities</EventCardText>
        <ButtonWithEvent>Join</ButtonWithEvent>
      </EventImageContainer>
    </EventCard>
  );
};
export default EventInfo;
