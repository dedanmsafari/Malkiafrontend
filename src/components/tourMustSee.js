import React, { useReducer, useEffect } from "react";
import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";

const TOUR_STEPS = [
   {
    target: ".tour-mustsee",
    content: "Remember the most watched shows?well here you can view them and order them.You can even order them based on their description.This section auto updates dynamically based on the rates.",
    disableBeacon: true
  }, 
   {
    target: ".tour-mustseeSearch",
    content: "In this searchbox you can search and see all the most watched shows."
  }, 
   {
    target: ".tour-mustseeProducer",
    content: "This are the star producers.Keep an eye on this section to alway see your best producers show .i.e Coelib or Egerton Tv"
  }, 
   {
    target: ".tour-mustseeYear",
    content: "Here you can order your shows by the date the show was produced either in Ascending or Descending order"
  }, 
   {
    target: ".tour-mustseeStarActor",
    content: "Want more of your favourite actors?Keep an eye on this section to see how they've ranked in their shows.You can also order by their names in Ascending or descending order"
  }, 
   {
    target: ".tour-mustseeDescription",
    content: "Here you can view a detailed description of  the most ranked shows"
  }, 
  {
    target: ".tour-pagination",
    content: "Dont forget to scroll to the next.You can never see enough of our shows!"
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