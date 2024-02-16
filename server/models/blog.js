//ชื่อบทความ(title), เนื้อหา(content), ผู้เขียน(Author), slug(url)

//slug ทำให้ url สวยขึ้น

const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required:true,
    },
    content:{
        type:{},
        required:true
    },
    author:{
        type:String,
        default:"Admin"
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true
    }
}, {timestamps:true})

module.exports = mongoose.model("Blogs", blogSchema)