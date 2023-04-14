const handler = require("../helper")
const hotelModel = require("../../database/models/hotelModel");
const Handler = require("../helper");
class Hotel {
    static newHotel = async (req, res) => {
        try {
            const newHotel = await new hotelModel(req.body)
            await newHotel.save()
            handler.responseHandler(res, 200, true, newHotel, "hotel added successfully")
        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static viewAllHotels = async (req, res) => {
        try {
            const hotels = await hotelModel.find();
            handler.responseHandler(res, 200, true, hotels, "hotels fetched successfully")

        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static viewOneHotel = async (req, res) => {
        try {
            const hotels = await hotelModel.findById(req.params.id);
            handler.responseHandler(res, 200, true, hotels, "hotels fetched successfully")

        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static updateHotel = async (req, res) => {
        try {
            const hotels = await hotelModel.findById(req.params.id)
            for (let el in req.body) {
                hotels[el] = req.body[el]
                await hotels.save()
                Handler.responseHandler(res, 200, true, hotels, "hotel edited successfully")
            }
        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static deleteHotel = async (req, res) => {
        try {
            const hotels = await hotelModel.findByIdAndDelete(req.params.id)
            handler.responseHandler(res, 200, true, hotels, "deleted one hotel")
        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };
    static delAllHotels = async (req, res) => {
        try {
            await hotelModel.deleteMany()
            handler.responseHandler(res, 200, true, [], "deleted all hotels")
        } catch (e) { handler.responseHandler(res, 500, false, e.message, "error") }
    };

}
module.exports = Hotel