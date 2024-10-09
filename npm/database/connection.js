import config from "#config/index";
import mongoose from "mongoose";

class Mongoose {
    static mongoose;
    static models = {};

    static init() {
        this.mongoose = mongoose;
        this.mongoose.Promise = global.Promise;
        this.mongoose.set("strictQuery", false);
        let transform = (doc, ret, options) => {
            delete ret.__v;
            return ret;
        };
        this.mongoose.set("toObject", { transform });
        this.mongoose.set("toJSON", { transform });
        this.loadModels();
    }

    static async loadModels() {
        this.models.Review = (await import("#database/models/review")).default;;
    }

    static connect() { 
        return this.mongoose.connect(config.DB_HOST);
    }

    static disconnect() {
        this.mongoose.disconnect();
    }
}

export default Mongoose;