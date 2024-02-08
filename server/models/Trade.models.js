import mongoose from "mongoose";
const tradeSchema = new mongoose.Schema({
	user: {
	  type: mongoose.Schema.Types.ObjectId,
	  ref: 'User', 
	  required: true,
	},
	itemOffered: {
	  type: mongoose.Schema.Types.ObjectId,
	  ref: 'Item', 
	  required: true,
	},
	itemRequested: {
	  type: mongoose.Schema.Types.ObjectId,
	  ref: 'Item',
	  required: true,
	},
	status: {
	  type: String,
	  enum: ['pending', 'accepted', 'declined'],
	  default: 'pending',
	},
  });

  const Trade = mongoose.model('Trade', tradeSchemaSchema);

  module.exports = Trade;