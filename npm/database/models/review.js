import MongooseLoader from "#database/connection";
const mongoose = MongooseLoader.mongoose;

const Review = mongoose.model(
	"Review",
	new mongoose.Schema({
		movie: {
			type: String,
			required: true,
		},		
		userName: {
			type: String,
			required: true,
			index: true,
			trim: true,
		},
		review: {
			type: String,
			required: true,
			trim: true,
		},
	}, { timestamps: true })
);

export default Review;