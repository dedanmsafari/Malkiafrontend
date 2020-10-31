import React, { useReducer, useEffect } from "react";
import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";

const TOUR_STEPS = [
  {
    target: ".tour-placeRental",
    content: "From here you can place a rental for a customer.You will need the unique customer and movie ID from the API.",
    disableBeacon: true
  },
  {
    target: ".tour-rentalsearch",
    content: "Here you can search  for rentals based on the user.To view what shows they took,The date and other critical details"
  },
  {
    target: ".tour-rentalblue",
    content: "This customer has a blue bar,it indicates a User who took and returned his rental.He has both a date returned and a rental fee.They are done using their rental!"
  },
  {
    target: ".tour-rentalred",
    content: "This customer has red bar,it indicates a User who took a rental and has NOT returned it yet.He lacks both date returned and a rental fee.They are still using their rental!"
  },
  {
    target: ".tour-sortorder",
    content: "Here you can Query anything.Order your Queries either in Ascending or Descending order .Order them using either name,rental fee,date returned ,date ordered and even by the show list and rate"
  },
  {
    target: ".tour-report",
    content: "Based on your Query from the above table a report will be generated to match your needs.i.eTry to search for a user then click report to get their specific report.Sort your reports by date,rental fee and even by show.Your reports will be in PDF and are automatically downloaded"
  },
  {
    target: ".tour-link",
    content: "This is where you can start the tour again in future."
  } 
];

const INITIAL_STATE = {
  key: new Date(), // This field makes the tour to re-render when we restart the tour
  run: false,
  continuous: true,
  loading: false,
  stepIndex: 0,
  steps: TOUR_STEPS
};

// Reducer will manage updating the local state
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START":
      return { ...state, run: true };
    case "RESET":
      return { ...state, stepIndex: 0 };
    case "STOP":
      return { ...state, run: false };
    case "NEXT_OR_PREV":
      return { ...state, ...action.payload };
    case "RESTART":
      return {
        ...state,
        stepIndex: 0,
        run: true,
        loading: false,
        key: new Date()
      };
    default:
      return state;
  }
};

// Tour component
const Tour = () => {
  // Tour state is the state which control the JoyRide component
  const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    // Auto start the tour if the tour is not viewed before
    if (!localStorage.getItem("tour")) {
      dispatch({ type: "START" });
    }
  }, []);

  // Set once tour is viewed, skipped or closed
  const setTourViewed = () => {
    // localStorage.setItem("tour", "1");
  };

  const callback = data => {
    const { action, index, type, status } = data;

    if (
      // If close button clicked, then close the tour
      action === ACTIONS.CLOSE ||
      // If skipped or end tour, then close the tour
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      setTourViewed();
      dispatch({ type: "STOP" });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      // Check whether next or back button click and update the step.
      dispatch({
        type: "NEXT_OR_PREV",
        payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) }
      });
    }
  };

  const startTour = () => {
    // Start the tour manually
    dispatch({ type: "RESTART" });
  };

  return (
    <>
      <div className="items-center tour-link" onClick={startTour} style={{width:140}}>
        <button className="btn btn-info">
         Take Page tour
        </button>
      </div>
      <JoyRide
        {...tourState}
        callback={callback}
        showSkipButton={true}
        styles={{
          tooltipContainer: {
            textAlign: "left"
          },
          buttonBack: {
            marginRight: 10
          }
        }}
        locale={{
          last: "End tour"
        }}
      />
    </>
  );
};

export default Tour;