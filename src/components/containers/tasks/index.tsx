import React, { useState, useEffect } from "react";
import { API, Storage } from 'aws-amplify';
import { useNavigate, } from "react-router-dom";
import { listNotes } from '../../../graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from '../../../graphql/mutations';

import Card from "../../organisms/Card";

const initialFormState = { name: '', description: '' }

const Tasks = (props: any) => {
  const [notes, setNotes] = useState<any | null>([]);
  const [formData, setFormData] = useState<any | null>(initialFormState);
  const navigate = useNavigate();

	useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
		const apiData: any = await API.graphql({ query: listNotes });
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
    if (!formData.name || !formData.description) return;
  	await API.graphql({ query: createNoteMutation, variables: { input: formData } });
  	if (formData.image) {
    	const image = await Storage.get(formData.image);
    	formData.image = image;
  	}
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
			<input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Note name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Note description"
        value={formData.description}
				/>
			<input
  			type="file"
  			onChange={onChange}
			/>

      <button onClick={createNote}>Create Note</button>
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
		</>
	)
}

export default Tasks;