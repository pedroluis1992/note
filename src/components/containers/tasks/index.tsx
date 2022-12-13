import React, { useState, useEffect } from "react";
import { API, Storage, Auth, graphqlOperation } from 'aws-amplify';
import { useNavigate, } from "react-router-dom";
import { listNotes } from '../../../graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from '../../../graphql/mutations';
import * as Yup from 'yup';
import Card from "../../organisms/Card";
import { Drawer, TextareaAutosize, TextField, Button } from "@mui/material";
import { connect } from "react-redux";
import { Formik, useFormik } from "formik";
import styled from "styled-components";

const ContentItemForm = styled.div`
	margin-bottom: 50px;
	display: grid;
`;

const ButtonSubmit = styled(Button)`
	background-color: #5E35B1 !important;
	text-transform: none !important;
	font-size: 16 !important;
	padding: 6px 12px !important;
	border: 1px solid !important;
	line-height: 1.5 !important;
	color: white !important;
`;
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
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	async function createNote() {
		const user = await Auth.currentAuthenticatedUser({
			bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
		})
		if (!formData.name || !formData.description || !user.attributes) return;
		if (formData.file) {
			const image = await Storage.get(formData.file);
			formData.file = image;
		}
		await API.graphql({ query: createNoteMutation, variables: { input: { ...formData, userId: user.attributes.sub } } });
		setOpenForm(false);
		setNotes([...notes, formData]);
		setFormData(initialFormState);
	}

	async function deleteNote({ id }: any) {
		const newNotesArray = notes.filter((note: any) => note.id !== id);
		setNotes(newNotesArray);
		await API.graphql({ query: deleteNoteMutation, variables: { input: { id } } });
	}

	const goToDetail = (id: string) => {
		navigate(`/task/${id}`)

	}

	const getDateCreated = (date: Date) => {
		const day = new Date(date).getDay();
		const month = new Date(date).getMonth();
		const year = new Date(date).getFullYear();
		return `${day}/${month}/${year}`
	}


	const formik = useFormik({
		initialValues: {
			name: '',
			description: '',
		},
		onSubmit: values => {
			console.log(formData, values)
			setFormData({ ...formData, ...values })
			createNote()
		},
		validationSchema: Yup.object({
			name: Yup.string().required(),
			description: Yup.string().required(),
		}),
	});

	return (
		<>
			<div style={{ display: "grid", alignItems: "center", justifyContent: "center" }}>
				<h1>Notas</h1>
				<Button variant="contained" onClick={() => setOpenForm(true)}>Create Note</Button>
			</div>
			<div style={{ height: "100%", margin: "20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
				{notes.map((note: any) => {
					return (
						<Card
							header={"Featured"}
							title={note.name}
							text={note.description}
							buttonText={"Ver"}
							goToDetail={() => { goToDetail(note.id) }}
							buttonDelete={"Eliminar"}
							footer={getDateCreated(note.createdAt)}
							background={"white"}
							image={note.image}
							removeCard={() => { deleteNote(note) }}
						/>
					)
				})}
			</div>
			<Drawer
				anchor={"right"}
				open={openForm}
				onClose={() => setOpenForm(!openForm)}
			>
				<form onSubmit={formik.handleSubmit} style={{ display: "grid", padding: "10px 40px 0px 40px" }}>
					<ContentItemForm>
						<TextField
							value={formik.values.name}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							// setFormData({ ...formData, 'name': e.target.value})}
							label="name"
							id="name"
							type="text"
							variant="standard"
						/>
						{formik.errors.name && formik.touched.name && formik.errors.name}
					</ContentItemForm>
					<ContentItemForm>
						<TextareaAutosize
							maxRows={4}
							id="description"
							aria-label="maximum height"
							//  onChange={e => setFormData({ ...formData, 'description': e.target.value})}
							onChange={formik.handleChange}
							placeholder="Description"
							value={formik.values.description}
							onBlur={formik.handleBlur}
							style={{ maxWidth: 250 }}
						/>
						{formik.errors.description && formik.touched.description && formik.errors.description}
					</ContentItemForm>
					<ContentItemForm>
						<input
							type="file"
							onChange={onChange}
						/>
					</ContentItemForm>

					<ButtonSubmit type="submit">Guardar</ButtonSubmit>
				</form>

			</Drawer>
		</>
	)
}

const mapStateToProps = (state: any) => {
	return {
		results: state.results,
	}
}
export default connect(mapStateToProps)(Tasks);