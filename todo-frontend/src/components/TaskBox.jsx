//React and Hooks
import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";

//Style and components
import style from "./TaskBox.module.css";
import Icon from "./Icon";
import Button from "./Button";
import CommentPopup from "./CommentPopup";
import { useTheme } from "./ThemeProvider";

//Assets
import ThreeDotIcon from "../assets/threeDotIcon.svg";
import Circle from "../assets/circle.svg";
import ThreeLineIcon from "../assets/ThreeLineIcon.svg";
import MessageIcon from "../assets/MessageIcon.svg";
import Attachicon from "../assets/AttachIcon.svg";

function TaskBox({
  id,
  title,
  description,
  progress,
  date,
  index,
  setActiveBox,
  onDelete,
  onEdit,
  section,
  commentCount
}) {
  //State Management
  const { theme } = useTheme();
  const [isButtonPopupOpen, setIsButtonPopupOpen] = useState(false);
  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(false);
  const [comments, setComments] = useState([]);

  
  const handleClick = async () => {
    try {
      const response = await axiosInstance.get(`/comment/Get/${id}`);

      if (response.data.success) {
        // console.log(response.data.message);
        setComments(response.data.allComment || []);
        setIsCommentPopupOpen(true);
      } else {
        console.log(response.data.message);
        setComments([]);
      }

    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    }
  };

  const handleCloseCommentPopup = () => {
    setIsCommentPopupOpen(false);
  };

  const handleAttachClick = () => {
    console.log("In attach icon");
  };

  const handleAddComment = async (comment) => {
    const newComment = {
      taskId: id,
      text: comment,
      date: new Date().toLocaleString(),
    };

    const response = await axiosInstance.post("/comment/Add", newComment);

    if (response.data.success) {
      console.log(response.data.message);
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setIsCommentPopupOpen(false);
    } else {
      console.log(response.data.message);
    }
  };

  const handleDragStart = (e) => {
    e.target.style.opacity = "0.5";
    setActiveBox(index);
    console.log("in handledragstart");
  };
  
  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
    setActiveBox(null);
    console.log("in handledragEnd");
  };
  
  const handleCircleClick = () => {
    setIsButtonPopupOpen(true);
  };

  const handleCloseButtonPopup = () => {
    setIsButtonPopupOpen(false);
  };

  const handleTaskDelete = () => {
    onDelete(id);
  };

  const handleTaskEdit = (editedData) => {
    onEdit(id, editedData);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div
      className={`${style["main-div"]} ${
        theme === "dark" ? style.darkTheme : ""
      }`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      >
      <div
        className={`${style["box-top"]} ${
          theme === "dark" ? style["box-top-dark"] : ""
        }`}
      >
        <div className={style["top-text"]}>
          <h4 className={style.text1}>{title}</h4>
          <p className={style.text2}>{description}</p>
        </div>

        <div className={style["top-icon"]}>
          <Icon
            className={style.circle}
            src={Circle}
            onClick={handleCircleClick}
          />
          <Icon className={style.threeDotIcon} src={ThreeDotIcon} />
        </div>
      </div>

      <div
        className={`${style["box-progress"]} ${
          theme === "dark" ? style["box-progress-dark"] : ""
        }`}
      >
        <div className={style["progress-text"]}>
          <div className={style["left-div"]}>
            <Icon className={style.ThreeLineIcon} src={ThreeLineIcon} />
            <span className={style.text}>Progress</span>
          </div>
          <span className={style.progressNumber}>{progress}/10</span>
        </div>

        <progress
          className={`${style["rounded-progress"]} ${
            Number(progress) === 10 ? style.done : ""
          }`}
          value={progress}
          max="10"
          style={{ width: "90%" }}
        ></progress>
      </div>

      <div
        className={`${style["box-bottom"]} ${
          theme === "dark" ? style["box-bottom-dark"] : ""
        }`}
      >
        <span className={style["date-badge"]}>{formatDate(date)}</span>
        <div className={style.icons}>
          <div className={style.icon}>
            <Icon src={MessageIcon} onClick={handleClick} />
            <span>{commentCount || 0}</span>
          </div>
          <div className={style.icon}>
            <Icon src={Attachicon} onClick={handleAttachClick} />
            <span>2</span>
          </div>
        </div>
      </div>
      {isCommentPopupOpen && (
        <CommentPopup
          comments={comments}
          onClose={handleCloseCommentPopup}
          onSubmit={handleAddComment}
        />
      )}
      {isButtonPopupOpen && (
        <Button
          onClose={handleCloseButtonPopup}
          setButton={setIsButtonPopupOpen}
          taskId={id}
          task={{ title, description, progress, date }}
          onTaskDelete={handleTaskDelete}
          onTaskEdit={handleTaskEdit}
          section={section}
        />
      )}
    </div>
  );
}

export default TaskBox;

{
  /* <div className={style["progress-bar"]}>
          <div className={style["progress-fill"]}></div>
        </div> */
}



// //Fetch all comments on component mount
  // useEffect(() => {
  //   const fetchComments = async () => {
  //     try {
  //       const response = await axiosInstance.get(`/comment/Get/${id}`);
  //       console.log(response.data);
  //       if (response.data.success) {
  //         console.log(response.data.message);
  //         setComments(response.data.allComment || []);
  //       } else {
  //         console.log(response.data.message);
  //         setComments([]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching comments:", error);
  //       setComments([]);
  //     }
  //   };
  
  //   fetchComments();
  // }, [id]);