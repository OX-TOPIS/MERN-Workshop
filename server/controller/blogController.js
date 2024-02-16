//ติดต่อกับฐานข้อมูล ดำเนินการกับฐานข้อมูล
// การประมวลผล ต่อฐานข้อมูลมาเก็บในนี้
const slugify = require("slugify")
const Blogs = require("../models/blog")
const { v4: uuidv4 } = require('uuid');
// บันทึกข้อมูล (Create)
exports.create = (req, res) => {
    const {title, content, author} = req.body
    const slug = slugify(title)

    // id slug is null
    if(!slug) slug = uuidv4();

    switch(true){
        case !title:
            return res.status(400).json({error: "กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error: "กรุณาป้อนบทความ"})
            break;
    }
    // บันทึกข้อมูลลงในฐานข้อมูล Blogsมาจาก Models
    Blogs.create({title, content, author, slug}, (err, blog)=>{
        if(err){
            res.status(400).json({error:"มีบทความชื่อซ้ำกัน"})
        } else{
            res.json(blog)
        }
    })
}

// ดึงข้อมูลบทความทั้งหมด
exports.getAllblogs = (req, res) => {
    // find data all document
    Blogs.find({}).exec((err, blogs)=>{
        res.json(blogs)
    })
}

// ดึงบทความที่สนใจโดยอ้างอิงตาม slug
exports.singleBlog=(req, res)=>{
    const {slug} = req.params
    Blogs.findOne({slug}).exec((err, blog)=>{
        res.json(blog)
    })
}

// ลบบทความ
exports.remove=(req, res)=>{
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec((err, blog)=>{
        if(err) console.log(err);
        res.json({
            message: "ลบบทความเรียบร้อย"
        })
    })
}

// อัพเดตบทความ
exports.update=(req,res)=>{
    const {slug} = req.params
    // ส่งข้อมูล => title , content, author
    const {title,content,author}=req.body
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json(blog)
    })
}