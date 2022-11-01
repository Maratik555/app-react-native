import axios from 'axios'
import {View, Alert} from 'react-native'
import styled from 'styled-components/native'
import {Loading} from '../components/Loading'
import {useEffect, useState} from 'react'

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`

export const FullPostScreen = ({route, navigation}) => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState()
	const {id, title} = route.params
	
	useEffect(() => {
		navigation.setOptions({title})
		axios
			// .get('https://5c3755177820ff0014d92711.mockapi.io/articles/' + id)
			.get('https://635ea522ed25a0b5fe4a5c07.mockapi.io/articles/' + id)
			.then(({data}) => setData(data))
			.catch((err) => {
				console.log(err)
				Alert.alert('Ошибка', 'Не удалось получить статью')
			})
			.finally(() => setIsLoading(false))
	}, [])
	
	if (isLoading) {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Loading/>
			</View>
		)
	}
	
	return (
		<View style={{padding: 20}}>
			<PostImage source={{uri: data.imageUrl}}/>
			<PostText>{data.text}</PostText>
		</View>
	)
}
