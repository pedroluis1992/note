import React, { useState, useEffect } from "react";
import { API, Storage, Auth, graphqlOperation } from 'aws-amplify';
import { useNavigate, } from "react-router-dom";
import { listNotes } from '../../../graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from '../../../graphql/mutations';

import Card from "../../organisms/Card";
import { Drawer, TextareaAutosize, TextField } from "@mui/material";

const initialFormState = { name: '', description: '' }

const Tasks = (props: any) => {
  const [notes, setNotes] = useState<any | null>([]);
  const [formData, setFormData] = useState<any | null>(initialFormState);
	const [openForm, setOpenForm] = useState<boolean>(false);
  const navigate = useNavigate();

	useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
	const user = await Auth.currentAuthenticatedUser({
			bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
	})
		const apiData: any = await API.graphql(graphqlOperation(listNotes, {
			filter: {
					userId: {
							eq: user.attributes.sub
					}
			}
	}));
		const notesFromAPI = apiData.data.listNotes.items;
		await Promise.all(notesFromAPI.map(async (note: { image: string; }) => {
			if (note.image) {
				const image = await Storage.get(note.image);
				note.image = image;
			}
			return note;
		}))
		setNotes(apiData.data.listNotes.items);
  }

	function onChange(e: any) {
		if (!e.target.files[0]) return
		const file = e.target.files[0];
		setFormData({ ...formData, image: file.name });
		Storage.put(file.name, file);
		fetchNotes();
	}

  async function createNote() {
		const user = await Auth.currentAuthenticatedUser({
				bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
		})
		if (!formData.name || !formData.description || !user.attributes) return;
  	await API.graphql({ query: createNoteMutation, variables: { input: {...formData, userId: user.attributes.sub } } });
  	if (formData.image) {
    	const image = await Storage.get(formData.image);
    	formData.image = image;
  	}
		setOpenForm(false);
  	setNotes([ ...notes, formData ]);
  	setFormData(initialFormState);
  }

  async function deleteNote({ id }: any) {
    const newNotesArray = notes.filter( (note: any) => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  }

	const goToDetail = (id: string) =>  {
		navigate(`/task/${id}`)

	}

	const getDateCreated = (date: Date) => {
		const day = new Date(date).getDay();
		const month = new Date(date).getMonth();
		const year = new Date(date).getFullYear();
		return `${day}/${month}/${year}`
	}

	return (
		<>
			<h1>Notas</h1>
      <button onClick={() => setOpenForm(true)}>Create Note</button>
			<div style={{ height: "100%", margin: "20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
				{notes.map((note:any) => {
					return (
						<Card
							header={"Featured"}
							title={note.name}
							text={note.description}
							buttonText={"Ver"}
							goToDetail={() => {goToDetail(note.id)}}
							buttonDelete={"Eliminar"}
							footer={getDateCreated(note.createdAt)}
							background={"white"}
							image={note.image}
							removeCard={() => {deleteNote(note)}}
						/>
					)
					})}
			</div>
			<Drawer
				anchor={"right"}
				open={openForm}
				onClose={() => setOpenForm(!openForm)}
			>
			 <TextField
					value={formData.name}
					onChange={e => setFormData({ ...formData, 'name': e.target.value})}
          label="Name"
          type="text"
          variant="standard"
        />
				<TextareaAutosize
					maxRows={4}
					aria-label="maximum height"
					onChange={e => setFormData({ ...formData, 'description': e.target.value})}
					placeholder="Description"
					value={formData.description}
					style={{ maxWidth: 250 }}
				/>
			<input
  			type="file"
  			onChange={onChange}
			/>
			<button onClick={createNote}>Guardar</button>
    	</Drawer>
		</>
	)
}

export default Tasks;