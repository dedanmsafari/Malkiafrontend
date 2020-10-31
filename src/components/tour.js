import React, { useReducer, useEffect } from "react";
import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";

const TOUR_STEPS = [
  {
    target: ".tour-intro",
    content: "Welcome HOME! Lets bring you up to speed with our latest features. You can always press the skip button or the X icon to skip  this introductory tutorial.We however hope you dont,because you might overlook some special details within the system that matter to us.Lets BEGIN!",
    disableBeacon: true // This makes the tour to start automatically without clicking
  },
  {
    target: ".tour-searchshows",
    content: "In this searchbox you can type and look up the database for all your favourite shows.",

  },
  {
    target: ".tour-genre",
    content:
      "Filter your shows by your favourite type.From all genre's to local shows coming up every week.We've got you covered!"
  },
  {
    target: ".tour-newmoviebutton",
    content: "Here you can Add a new show to the system database.It shows up arranged along side other shows alphabetically.Be sure to fill in all the details.Otherwise i will throw errors at you!"
  },
  {
    target: ".tour-sortorder",
    content: "If you click on any name here it will order the contents either in ascending or descending order based on your selection"
  },
  {
    target: ".tour-stock",
    content: "This number here indicates the remaining copies of the shows left.Be sure to grab your favourite from the nearest store before they run out!"
  },
  {
    target: ".tour-rate",
    content: "This number is the Rate. It refers to the number of copies rented everyday.Its also an indicator of the popularity of a show."
  },
  {
    target: ".tour-love",
    content: "Show love to your favourite show by liking it.It helps with our algorithm to figure out what people like.It helps us improve the System"
  },
  {
    target: ".tour-editmovie",
    content: "Click here to Modify existing show by editing its properties such as producers,main actors,description and even the year produced. It's a flexible system for you! "
  },
  {
    target: ".tour-deletemovie",
    content: "Click here to Remove a show completely from the system.This action is IRREVERSIBLE.You can however add it again as a new movie"
  },
  {
    target: ".tour-pagination",
    content: "Click here to continue viewing more of your current content.You can never see enough of our shows!"
  },
  {
    target: ".tour-footer",
    content: "A product of EGERTON UNIVERSITY,Contact us and get to know more about offers,Affiliate marketing,give aways and upcoming Major improvements to the system.You'll love us"
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
      <div className="items-center tour-link" onClick={startTour} style={{width:140}} >
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