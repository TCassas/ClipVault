const mongoose = require('mongoose');

const clipSchema = new mongoose.Schema({
    twitchData: {
        slug: String,
        tracking_id: String,
        url: String,
        embed_url: String,
        embed_html: String,
        broadcaster: {
            id: String,
            name: String,
            display_name: String,
            channel_url: String,
            logo: String
        },
        curator: {
            id: String,
            name: String,
            display_name: String,
            channel_url: String,
            logo: String
        },
        vod: {
            id: String,
            url: {
                type: String,
                default: ''
            },
            offset: {
                type: Number,
                default: 0
            },
            preview_image_url: {
                type: String,
                default: ''
            }
        },
        broadcast_id: String,
        game: String,
        language: String,
        title: String,
        views: Number,
        duration: Number,
        created_at: Date,
        thumbnails: {
            medium: String,
            small: String,
            tiny: String
        }
    },
    date: Date
});

const Clip = mongoose.model('Clip', clipSchema);

module.exports = Clip;