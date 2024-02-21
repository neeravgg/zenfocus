import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import Timer from "../components/Timer";
import TaskTracker from "../components/TaskTracker";
import SoundPlayers from "../components/SoundPlayers";
import { StyledApp } from "../styles/App.styled";
import { ImageContainer } from "../styles/ImageContainer.styled";
import { getColors, updateColor, reset } from "../features/colors/colorSlice";
import { CirclePicker, ColorChangeHandler } from "react-color";
import Radio from "../components/Radio";
import { StyledDashboard } from "../styles/Dashboard.styled";
import Spinner from "../components/Spinner";
import Nav from "../components/Nav";
import IconButton from "../components/IconButton";
import GifByColor from "../components/GifByColor";

const Dashboard = () => {
  const [gifLoaded, setGifLoaded] = useState(false);
  const [resetVolume, setResetVolume] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { colors } = useSelector((state: RootState) => state.colors);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getColors());

    // Reset state on unmount
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  const handleOnChange: ColorChangeHandler = (color, event) => {
    if (color.hex === "#181818") {
      dispatch(
        updateColor({
          ...colors,
          backgroundColor: color.hex,
          primaryTextColor: "white",
          secondaryTextColor: "gray",
        })
      );
    } else {
      dispatch(
        updateColor({
          ...colors,
          backgroundColor: color.hex,
          primaryTextColor: "black",
          secondaryTextColor: color.hex,
        })
      );
    }
  };
  const handleCustomizationReset = () => {
    dispatch(
      updateColor({
        ...colors,
        backgroundColor: "white",
        primaryTextColor: "black",
        secondaryTextColor: "white",
      })
    );
    setResetVolume(true);
  };

  return (
    <>
      <StyledDashboard style={{ display: gifLoaded ? "" : "none" }}>
        <Nav />
        <StyledApp>
          <div className="section first">
            <Timer />
            <TaskTracker />
          </div>
          <div className="section middle">
            <div className="slideshow">
              <ImageContainer
                onLoad={() => {
                  setGifLoaded(true);
                }}
              >
                <GifByColor color={colors.backgroundColor} />
              </ImageContainer>
            </div>
            <Radio />
          </div>

          {/* customization */}
          <div className="section last">
            <CirclePicker
              color={colors.backgroundColor}
              colors={[
                "#e0aea4",
                "#e9d887",
                "#a7b78b",
                "#89a99d",
                "#9db4c1",
                "#aba2b9",
                "#9c8f81",
                "white",
                "#181818",
              ]}
              onChange={handleOnChange}
            />
            <SoundPlayers
              resetVolume={resetVolume}
              setResetVolume={setResetVolume}
            />
            <button className="icon-btn" onClick={handleCustomizationReset}>
              Reset
              <IconButton icon={"RestartIcon"} height={20} width={20} />
            </button>
          </div>
        </StyledApp>
      </StyledDashboard>
      {gifLoaded ? "" : <Spinner />}
    </>
  );
};

export default Dashboard;
