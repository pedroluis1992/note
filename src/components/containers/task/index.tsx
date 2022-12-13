import React, { useEffect, useState } from "react";
import { API, Storage } from 'aws-amplify';
import { useParams } from 'react-router-dom';
import { getNote } from '../../../graphql/queries';
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"


const Task = () => {
  let { id } = useParams();
  const [task, setTask] = useState<any | null>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchTask(id);
  }, [id]);

  const getDateCreated = (date: Date) => {
    const day = new Date(date).getDay();
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();
    return `${day}/${month}/${year}`
  }

  const fetchTask = async (id: any) => {
    const apiData: any = await API.graphql({ query: getNote, variables: { id } });
    const note = apiData.data.getNote;

    if (note.image) {
      const image = await Storage.get(note.image);
      note.image = image;

    }
    setTask(apiData.data.getNote);
  }
  return (
    <>
      {task.length === 0 &&
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
      {
        task.name &&
        <>
          <button onClick={()=>navigate(-1)}>Go Back Home</button>
          <div style={{ display: "flex", justifyContent: "center"}}>
            <div>
              <Typography variant="h4" gutterBottom>{task.name.toUpperCase()}</Typography>
              {
                task.image &&
                  <img src={task.image} alt="Item" />
              }
              <Typography variant="body1" gutterBottom>
                {task.description}
              </Typography>
              <Typography variant="overline" display="block" gutterBottom>
                {getDateCreated(task.createdAt)}
              </Typography>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Task;