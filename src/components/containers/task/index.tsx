import React, { useEffect, useState } from "react";
import { API, Storage } from 'aws-amplify';
import { useParams } from 'react-router-dom';
import { getNote } from '../../../graphql/queries';
import Card from "../../organisms/Card";


const Task = () => {
  let { id } = useParams();
  const [task, setTask] = useState<any | null>([]);

  useEffect(() => {
    fetchTask(id);
  }, []);
  
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
      <h1>Get de note</h1>
      <Card
        header={"Featured"}
        title={task.name}
        text={task.description}
        footer={getDateCreated(task.createdAt)}
        background={"white"}
        image={task.image}
      />
        </> 
    )
}

export default Task;