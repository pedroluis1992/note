import React from "react";
import styled from "styled-components";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

interface CardProps {
	footer?: any;
	header?: any;
	title: string;
	text?: string;
	buttonText?: any;
	background?: any;
	buttonDelete?: any;
	removeCard?: any;
	image?: any;
	goToDetail?: any;
}

const StyleCard = styled(Card)`
	width: 300px;
	margin-bottom: 20px;
	height: 300px;
`

const StyleBodyText = styled.div`
	height:40px;
	width:270px;
	overflow: hidden;
	text-overflow: ellipsis;
`
const StyleTitleText = styled(Typography)`
	font-weight: bold !important;
`

const StyleFooterText = styled(Typography)`
	align-self: center;
`

// const StyledMBDCard = styled(Card)`
// 	width: 300px;
// 	margin-bottom: 20px;
// 	${props => `1px solid ${console.log(props)}`};
// `
const StyledWrapperImage = styled.div`
	height: 100px;
	width: 100px;
	margin: auto;
	margin-bottom: 20px;
`;

const CardComponent = ({ footer, header, title, text, buttonText, background, buttonDelete, removeCard, image, goToDetail }: CardProps) => {
	return (
		<StyleCard>
				{
					!!header && 
					<CardHeader>{header}</CardHeader>
				}
				<CardContent>
					<StyleTitleText>{title}</StyleTitleText>
					<StyleBodyText > 
						<Typography variant="body2">
							{text}
						</Typography>
						</StyleBodyText>
					{
						<StyledWrapperImage>
							{image && 
								<img src={image} style={{width: 100, height: 120}} />
							}
						</StyledWrapperImage>
      		}
					<div>
						{
							!!buttonText &&
							<Button variant="contained"  style={{marginRight: "10px"}} onClick={() => goToDetail()}>{buttonText}</Button>
						}
						{
							!!buttonDelete &&
							<Button onClick={() => removeCard()}>{buttonDelete}</Button>
						}
						{
							!!footer &&
							<StyleFooterText variant="caption" >{footer}</StyleFooterText>
						}
					</div>
				</CardContent>
		</StyleCard>
	)
}

export default CardComponent;