exports = module.exports = function(app, mongoose) {

	var companiesSchema = new mongoose.Schema({
		_id:         			{type: String},
		name: 					{type: String},
		permalink:  			{type: String},
  		crunchbase_url: 		{type: String},
  		homepage_url: 			{type: String},
  		blog_url: 				{type:String},
  		blog_feed_url: 			{type:String},
		twitter_username: 		{type:String},
		category_code: 			{type:String},
		number_of_employees: 	{type:String},
		founded_year: 			{type:String},
		founded_month: 			{type:String},
		founded_day: 			{type:String},
		deadpooled_year: 		{type:Number},
		deadpooled_month: 		{type:Number},
		deadpooled_day: 		{type:Number},
		deadpooled_url: 		{type:String},
		tag_list: 				{type:String},
		alias_list: 			{type:String},
		email_address: 			{type:String},
		phone_number: 			{type:String},
		description: 			{type:String},
		created_at: 			{type:String},
		updated_at: 			{type:String},
		overview: 				{type:String},
		
		genre: 		{
			type: String,
			enum: ['Drama', 'Fantasy', 'Sci-Fi', 'Thriller', 'Comedy']
		},
		summary: 	{ type: String }
	});

	mongoose.model('TVShow', tvshowSchema);

};
