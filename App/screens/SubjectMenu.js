import React, { useEffect, useState } from "react";
import {
	FlatList,
	ActivityIndicator,
	SafeAreaView,
	StyleSheet,
} from "react-native";
import VideoCardModel from "../components/VideoCardModel";
import { AuthContext } from "../context";
import colors from "../styles/styles";

const SubjectMenu = ({ route }) => {
	const { API_URL } = React.useContext(AuthContext);
	const [videos, setVideos] = useState([{}]);
	const [isLoaded, setIsLoaded] = useState(0);

	useEffect(() => {
		fetch(
			API_URL +
				`/api/videos/${route.params.subject}/${route.params.name}/${route.params.userclass}`
		)
			.then((response) => response.json())
			.then((json) => {
				setVideos(json.response);
				setIsLoaded(1);
			})
			.catch((error) => {
				alert("Network Issue!.Check your internet connection");
			});
	}, []);

	if (!isLoaded) {
		return (
			<ActivityIndicator
				size="large"
				style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
			/>
		);
	}

	return (
		<SafeAreaView style={styles.cardContainer}>
			<FlatList
				data={videos}
				renderItem={({ item }) => (
					<VideoCardModel
						id={item.id}
						url={item.url}
						title={item.title}
						description={item.description}
						image={item.image}
						subject={item.subject}
						topic={item.topic}
						navigation={route.params.nav}
						isfree={item.isfree}
						class={item.class}
					/>
				)}
				numColumns={1}
				keyExtractor={(item, index) => index.toString()}
			/>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		backgroundColor: colors.BACKGROUND_COLOR,
		justifyContent: "center",
		alignContent: "center",
	},
});
export default SubjectMenu;
